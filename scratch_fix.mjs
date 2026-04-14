import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function fixOrder() {
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

  console.log("Fixing row order in Sanity...")

  try {
    const configId = 'global-site-config'
    const doc = await client.getDocument(configId)
    
    if (doc) {
      let patch = client.patch(configId)
      
      // Move topCategoryRows back to bottomCategoryRows
      if (doc.topCategoryRows && doc.topCategoryRows.length > 0) {
        patch = patch.setIfMissing({ bottomCategoryRows: [] })
                     .set({ bottomCategoryRows: doc.topCategoryRows })
                     .unset(['topCategoryRows'])
      }
      
      await patch.commit()
      console.log(`✅ Order reverted!`)
    }
  } catch (err) {
    console.error(`❌ Failed migrating config:`, err.message)
  }
}

fixOrder()
