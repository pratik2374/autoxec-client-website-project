import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const categoriesToMigrate = [
  { _id: 'cat-ev', title: 'EV INTELLIGENCE', slug: 'ev', badgeClass: 'ev', accentColor: '#4AE080', barColor: '#1A7A3C', description: 'Electric vehicles and future tech.' },
  { _id: 'cat-engineering', title: 'ENGINEERING DEEP DIVES', slug: 'engineering', badgeClass: 'engineering', accentColor: '#B48FE8', barColor: '#6B3FA0', description: 'Deep technical analysis.' },
  { _id: 'cat-launch', title: 'LAUNCHES', slug: 'launch', badgeClass: 'launch', accentColor: '#FFA500', barColor: '#CC8400', description: 'New vehicle launches.' },
  { _id: 'cat-motorsport', title: 'MOTORSPORT', slug: 'motorsport', badgeClass: 'motorsport', accentColor: '#FF4500', barColor: '#CC3700', description: 'Racing and performance analytics.' },
  { _id: 'cat-twowheeler', title: 'TWO-WHEELERS', slug: 'twowheeler', badgeClass: 'twowheeler', accentColor: '#00CED1', barColor: '#00abaa', description: 'Bikes and scooters.' },
  { _id: 'cat-industry', title: 'INDUSTRY', slug: 'industry', badgeClass: 'industry', accentColor: '#4682B4', barColor: '#326087', description: 'Business and market analytics.' },
]

const articlesToMigrate = [
  {
    slug: 'ather-450x-gen-4-battery-lfp',
    cat: 'cat-ev',
    title: 'Ather 450X Gen 4 Battery Pack: Why LFP Chemistry Changes Everything for Indian Summers',
    deck: 'When ambient temperatures routinely exceed 40°C, chemistry matters more than rated kWh.',
    excerpt: 'The shift from NMC to LFP in the 450X Gen 4 is not just a cost decision — it fundamentally alters how the battery behaves at 45°C ambient temperatures common across Rajasthan and Gujarat.',
    bodyParagraphs: [
      'LFP cells trade energy density for thermal stability and cycle life. On paper that reads like a brochure — on Indian roads it translates to fewer derating events when the pack is heat-soaked after a fast-charge followed by sustained highway load.',
      'BMS strategies differ too: voltage plateau characteristics change how state-of-charge estimation behaves near the top and bottom of the pack. That affects real-world range consistency more than any single WLTP figure.',
    ],
    tags: ['#lfp', '#ev', '#ather'],
    upvotes: 847,
    imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
    published: '28 Mar 2026',
  },
  {
    slug: 'kia-syros-platform-nios-engineering',
    cat: 'cat-launch',
    title: 'Kia Syros: Why the Platform Sharing With Nios Is the Most Interesting Engineering Decision Kia India Has Made',
    deck: 'Shared underpinnings, different tuning objectives — how Kia re-spent its engineering budget.',
    excerpt: 'It uses the K1 platform — the same base as the Nios — but with a completely revised suspension tune and a new turbocharged engine calibration specifically for Indian fuel quality variations.',
    bodyParagraphs: [
      'Platform sharing is usually framed as cost cutting. Here, the more accurate read is risk distribution: crash structure, hardpoints, and supply chain commonality free up engineering hours for ride-and-handling and powertrain calibration.',
      'Indian fuel quality variance means knock control and enrichment maps need margin that European calibration files do not carry. That is invisible in a spec sheet but decisive in driveability.',
    ],
    tags: ['#kia', '#launch', '#platform'],
    upvotes: 1203,
    imageUrl: 'https://images.unsplash.com/photo-1494976388531-d085849cfcbf?auto=format&fit=crop&w=800&q=80',
    published: '28 Mar 2026',
  },
  {
    slug: 'suspension-geometry-indian-roads-guide',
    cat: 'cat-engineering',
    title: 'What Suspension Geometry Tells You About a Vehicle Before You Drive It: A Complete Guide for Indian Roads',
    deck: 'Caster, scrub radius, and kingpin inclination predict steering feel and stability — before you turn the key.',
    excerpt: 'Caster angle, scrub radius, kingpin inclination — these three numbers, available in any workshop manual, predict how a vehicle will feel on a potholed city road before you sit in the driver’s seat.',
    bodyParagraphs: [
      'Suspension geometry is not “sporty” or “comfort” branding — it is vectors. Caster stabilises straight-line tracking and builds self-centering torque as slip angles develop. On broken surfaces, too little caster can feel nervous; too much can fight the wheel through holes and crown changes.',
      'Scrub radius is the distance between the tyre contact patch centre and the steering axis intersection on the road. It amplifies or damps torque steer, tramlining, and the violence you feel when one wheel hits a sharp edge.',
      'Kingpin inclination (or steering axis inclination on strut cars) sets mechanical trail with caster and influences how braking and bump steer couple into the steering wheel. Indian traffic patterns — hard braking in uneven lanes — make this coupling audible and tactile long before a skid pad test does.',
    ],
    tags: ['#suspension', '#engineering', '#chassis'],
    upvotes: 2341,
    imageUrl: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=800&q=80',
    published: '27 Mar 2026',
  },
  {
    slug: 'motogp-2025-india-buddh-layout',
    cat: 'cat-motorsport',
    title: 'MotoGP 2025 Indian Round Confirmed for Buddh — What the Track Layout Means for Motorcycle Setup',
    deck: 'Straights reward slip, chicanes punish instability — setup becomes a sequenced compromise.',
    excerpt: "Buddh’s long straights and slow chicanes create a unique aerodynamic challenge: teams must choose between top-speed gain and cornering stability at very different points on the track.",
    bodyParagraphs: [
      'MotoGP setup is rarely one optimum — it is a time-ordered compromise. A lap begins with tyre temperature state, moves through braking zones that test front tyre construction, then loads the rear asymmetrically through direction changes.',
      'Air density and late-afternoon track temperature at Greater Noida historically swing grip more than riders expect. That pushes engineers toward conservative mechanical grip packages unless the weather forecast pins humidity and cloud cover.',
    ],
    tags: ['#motogp', '#buddh', '#aero'],
    upvotes: 1876,
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
    published: '27 Mar 2026',
  },
  {
    slug: 'royal-enfield-guerrilla-450-vs-himalayan-450',
    cat: 'cat-twowheeler',
    title: 'Royal Enfield Guerrilla 450 vs Himalayan 450: Same Engine, Completely Different Motorcycle — Here’s Why',
    deck: 'Shared Sherpa 450 — divergent targets for gearing, fuelling, and chassis.',
    excerpt: 'Both use the Sherpa 450 engine but differ in fuelling map, gearing ratios, chassis geometry, and suspension tuning — two motorcycles that feel fundamentally different despite sharing 60% of components.',
    bodyParagraphs: [
      'Same displacement and bore-stroke do not imply same torque rise shape at the rear wheel. Secondary gearing and sprocketing shift the operating points on the map riders actually use in Indian traffic — low-speed lugging versus loaded mountain passes.',
      'Wheel diameter, fork offset, and swingarm length change trail and anti-squat — which is why two siblings can diverge emotionally even when the exhaust note is familiar.',
    ],
    tags: ['#royalenfield', '#450', '#twowheeler'],
    upvotes: 934,
    imageUrl: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    published: '26 Mar 2026',
  },
  {
    slug: 'auto-components-india-2025-turnover',
    cat: 'cat-industry',
    title: 'India’s Auto Component Industry in 2025: Why ₹8.5 Lakh Crore Turnover Doesn’t Tell the Full Engineering Story',
    deck: 'Aggregate scale hides tier divergence — and EV localisation lives in that gap.',
    excerpt: 'The components sector has grown, but the engineering sophistication divide between Tier 1 suppliers and Tier 2–3 vendors has widened. What this means for EV localisation targets.',
    bodyParagraphs: [
      'Turnover aggregates volume; it does not aggregate validation depth. Modules that touch high voltage, functional safety, and thermal runaway pathways concentrate in a thin layer of suppliers with full test matrices.',
      'Policy targets accelerate capacity faster than they accelerate capability. The engineering story of the next five years is who closes the validation gap — not who announces the most factories.',
    ],
    tags: ['#industry', '#pli', '#components'],
    upvotes: 612,
    imageUrl: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
    published: '25 Mar 2026',
  },
  {
    slug: 'mahindra-be-6e-800v-architecture-india',
    cat: 'cat-launch',
    title: 'Mahindra BE.6e: The 800V Architecture India Has Been Waiting For — And What It Actually Means For Real-World Charging',
    excerpt: 'The featured lead story on AutoXec — 800V architecture, real charging curves, and what it changes for Indian owners day to day.',
    upvotes: 2400,
    imageUrl: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2000&q=85',
    published: '29 Mar 2026',
  }
]

async function migrateData() {
  const envPath = path.join(__dirname, '.env')
  if (fs.existsSync(envPath)) {
    const envFile = fs.readFileSync(envPath, 'utf8')
    envFile.split('\n').forEach(line => {
      const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/)
      if (match) {
        process.env[match[1]] = match[2]
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

  console.log("Starting migration into Sanity project:", projectId, "dataset:", dataset)

  console.log("1. Creating Categories...")
  for (const cat of categoriesToMigrate) {
    try {
      await client.createOrReplace({
        _type: 'category',
        _id: cat._id,
        title: cat.title,
        slug: { _type: 'slug', current: cat.slug },
        badgeClass: cat.badgeClass,
        accentColor: cat.accentColor,
        barColor: cat.barColor,
        description: cat.description,
      })
      console.log(`✅ Category: ${cat.title}`)
    } catch (err) {
      console.error(`❌ Failed migrating category: ${cat.title}`)
      console.error(err.message)
    }
  }

  console.log("2. Creating Articles...")
  for (const article of articlesToMigrate) {
    const doc = {
      _type: 'article',
      title: article.title,
      slug: { _type: 'slug', current: article.slug },
      cat: { _type: 'reference', _ref: article.cat },
      excerpt: article.excerpt,
      imageUrl: article.imageUrl,
      upvotes: article.upvotes,
      published: article.published,
      seoTitle: article.title,
      seoDescription: article.deck || article.excerpt,
      tags: article.tags,
      content: article.bodyParagraphs ? article.bodyParagraphs.map((para) => ({
        _type: 'block',
        _key: Math.random().toString(36).substring(7),
        style: 'normal',
        markDefs: [],
        children: [{
          _type: 'span',
          _key: Math.random().toString(36).substring(7),
          text: para,
          marks: []
        }]
      })) : []
    }

    try {
      const res = await client.create(doc)
      console.log(`✅ Article: ${res.title}`)
    } catch (err) {
      console.error(`❌ Failed migrating article: ${article.title}`)
      console.error(err.message)
    }
  }

  console.log("3. Seeding Default Site Config...")
  try {
    const configId = 'global-site-config'
    await client.createOrReplace({
      _id: configId,
      _type: 'siteConfig',
      title: 'Global Site Config',
      heroConfig: { strategy: 'latest' },
      quickReadsConfig: { strategy: 'popular' },
      categoryRows: [
        {
          _key: 'row-ev',
          category: { _type: 'reference', _ref: 'cat-ev' },
          strategy: 'latest'
        },
        {
          _key: 'row-engineering',
          category: { _type: 'reference', _ref: 'cat-engineering' },
          strategy: 'latest'
        }
      ]
    })
    console.log(`✅ Config: Homepage settings generated!`)
  } catch (err) {
    console.error(`❌ Failed migrating config:`, err.message)
  }

  console.log("Migration complete!")
}

migrateData()
