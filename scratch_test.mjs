import { createClient } from '@sanity/client'


const client = createClient({
  projectId: process.env.VITE_SANITY_PROJECT_ID || 'dgew98n9',
  dataset: process.env.VITE_SANITY_DATASET || 'production',
  useCdn: false,
  apiVersion: '2024-01-01',
})

async function check() {
  try {
    const res = await client.fetch(`*[_type == "siteConfig"][0]{
      categoryRows[]{ category->{title}, strategy }
    }`)
    console.log(JSON.stringify(res, null, 2))
  } catch (err) {
    console.error('Error fetching:', err.message)
  }
}
check()
