import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TICKER_ITEMS = [
  'MAHINDRA BE.6E 800V ARCHITECTURE REVEALED',
  'TATA CURVV EV DELIVERIES BEGIN NEXT WEEK',
  'TOYOTA HYBRID SALES SURGE 40% IN Q1',
  'HONDA CITY FACELIFT SPIED TESTING IN PUNE',
  'BAJAJ PULSAR NS400 LAUNCH CONFIRMED FOR MAY',
]

const EXPLORE_TOPICS = [
  'Battery BMS',
  'Turbocharger',
  'ADAS',
  'Suspension',
  'EV Range',
  'F1 2025',
  'CNG',
  'MotoGP',
  'Torque',
  'OBD',
  'Chassis',
  'BSVI',
  'Hybrid',
  'Hydrogen',
]

async function migrateData() {
  const envPath = path.join(__dirname, '.env')
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8')
    envFile.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
      if (match) {
        process.env[match[1]] = match[2]?.replace(/^["'](.*)["']$/, '$1')
      }
    })
  }

  const projectId = process.env.VITE_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID
  const dataset = process.env.VITE_SANITY_DATASET || process.env.SANITY_DATASET || 'production'
  const token = process.env.SANITY_API_TOKEN

  if (!projectId || !token) {
    console.log("Usage: Ensure SANITY_PROJECT_ID and SANITY_API_TOKEN are set in your .env file or environment.")
    return
  }

  const client = createClient({
    projectId,
    dataset,
    useCdn: false,
    token,
    apiVersion: '2024-01-01',
  })

  console.log("Syncing config back to Sanity...")

  try {
    const configId = 'global-site-config'
    const doc = await client.getDocument(configId)
    
    if (doc) {
      let patch = client.patch(configId)
      
      // Move old categoryRows to topCategoryRows
      if (doc.categoryRows && doc.categoryRows.length > 0) {
        patch = patch.setIfMissing({ topCategoryRows: [] })
                     .set({ topCategoryRows: doc.categoryRows })
                     .unset(['categoryRows'])
      }
      
      // Seed tickerItems and exploreTopics if empty
      if (!doc.tickerItems || doc.tickerItems.length === 0) {
        patch = patch.set({ tickerItems: TICKER_ITEMS })
      }
      if (!doc.exploreTopics || doc.exploreTopics.length === 0) {
        patch = patch.set({ exploreTopics: EXPLORE_TOPICS })
      }

      await patch.commit()
      console.log(`✅ Default Limits, Ticker, and Topics synced successfully!`)
    } else {
      console.log("No global-site-config found. You should create it in Sanity Studio first.")
    }
  } catch (err) {
    console.error(`❌ Failed migrating config:`, err.message)
  }
}

migrateData()
