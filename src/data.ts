export type ArticleCategory =
  | 'all'
  | 'ev'
  | 'launch'
  | 'engineering'
  | 'motorsport'
  | 'twowheeler'
  | 'industry'

export type NavCategory = Exclude<ArticleCategory, 'all'>

export const NAV_CATEGORIES: { id: NavCategory | 'all'; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'ev', label: 'EV & Future' },
  { id: 'launch', label: 'Launches' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'motorsport', label: 'Motorsport' },
  { id: 'twowheeler', label: 'Two-Wheelers' },
  { id: 'industry', label: 'Industry' },
]

export const TICKER_ITEMS = [
  'Mahindra BE.6e crosses 50,000 booking milestone in 72 hours',
  'KTM 390 Duke 2025 India launch confirmed for Q2 — pricing expected ₹2.7L',
  'Tata Motors EV division reports 340% YoY growth in Q4 FY25',
  'Ather Rizta crosses 10,000 units delivered ahead of schedule',
  'Formula Bharat 2025 — IIT Bombay team wins design event for second consecutive year',
  'Maruti Suzuki eVitara bookings open — ₹1 lakh token amount',
] as const

/** Category path segment for `/category/:slug` links from the hero badge. */
export type HeroCategoryPath = 'ev' | 'launches' | 'engineering' | 'motorsport' | 'two-wheelers' | 'industry'

export type HeroSlide = {
  slug: string
  category: string
  categoryClass: 'ev' | 'launch' | 'engineering' | 'motorsport' | 'twowheeler' | 'industry'
  categoryPath: HeroCategoryPath
  title: string
  author: string
  readTime: string
  upvotes: string
  imageUrl: string
  imageAlt: string
}

export const HERO_SLIDES: HeroSlide[] = [
  {
    slug: 'mahindra-be-6e-800v-architecture-india',
    category: 'LAUNCH ANALYSIS',
    categoryClass: 'launch',
    categoryPath: 'launches',
    title:
      'Mahindra BE.6e: The 800V Architecture India Has Been Waiting For — And What It Actually Means For Real-World Charging',
    author: 'PREETAM · AUTOXEC',
    readTime: '8 MIN READ',
    upvotes: '2.4K UPVOTES',
    imageUrl:
      'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=2000&q=85',
    imageAlt: 'Modern car exterior studio light',
  },
  {
    slug: 'ev-range-numbers-thermal-physics-india',
    category: 'EV INTELLIGENCE',
    categoryClass: 'ev',
    categoryPath: 'ev',
    title:
      "Why India's EV Range Numbers Are Always 30% Lower Than Claimed — The Thermal Physics Explanation",
    author: 'PREETAM · AUTOXEC',
    readTime: '6 MIN READ',
    upvotes: '1.8K UPVOTES',
    imageUrl:
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=2000&q=85',
    imageAlt: 'Electric vehicle charging cable',
  },
  {
    slug: 'kia-syros-platform-nios-engineering',
    category: 'LAUNCH',
    categoryClass: 'launch',
    categoryPath: 'launches',
    title:
      'Kia Syros: Why the Platform Sharing With Nios Is the Most Interesting Engineering Decision Kia India Has Made',
    author: 'PREETAM · AUTOXEC',
    readTime: '8 MIN READ',
    upvotes: '1.2K UPVOTES',
    imageUrl:
      'https://images.unsplash.com/photo-1494976388531-d085849cfcbf?auto=format&fit=crop&w=2000&q=85',
    imageAlt: 'Car on coastal road',
  },
  {
    slug: 'formula-bharat-2025-iit-bombay-monocoque',
    category: 'MOTORSPORT',
    categoryClass: 'motorsport',
    categoryPath: 'motorsport',
    title: "Formula Bharat 2025: IIT Bombay's Carbon Fibre Monocoque — A Technical Breakdown",
    author: 'PREETAM · AUTOXEC',
    readTime: '5 MIN READ',
    upvotes: '1.1K UPVOTES',
    imageUrl:
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=2000&q=85',
    imageAlt: 'Race car on track',
  },
  {
    slug: 'suspension-geometry-indian-roads-guide',
    category: 'ENGINEERING',
    categoryClass: 'engineering',
    categoryPath: 'engineering',
    title:
      'What Suspension Geometry Tells You About a Vehicle Before You Drive It: A Complete Guide for Indian Roads',
    author: 'PREETAM · AUTOXEC',
    readTime: '12 MIN READ',
    upvotes: '2.3K UPVOTES',
    imageUrl:
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=2000&q=85',
    imageAlt: 'Car suspension and wheel detail',
  },
]

export const HERO_MAIN = HERO_SLIDES[0]!

export const HERO_SIDE = [
  {
    slug: 'ev-range-numbers-thermal-physics-india',
    cat: 'EV INTELLIGENCE' as const,
    catClass: 'ev' as const,
    title:
      "Why India's EV Range Numbers Are Always 30% Lower Than Claimed — The Thermal Physics Explanation",
    meta: '6 MIN · 1.8K ↑',
    imageUrl:
      'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'formula-bharat-2025-iit-bombay-monocoque',
    cat: 'MOTORSPORT' as const,
    catClass: 'motorsport' as const,
    title: "Formula Bharat 2025: IIT Bombay's Carbon Fibre Monocoque — A Technical Breakdown",
    meta: '5 MIN · 1.1K ↑',
    imageUrl:
      'https://images.unsplash.com/photo-1458322493963-27c0e9f6b108?auto=format&fit=crop&w=800&q=80',
  },
  {
    slug: 'bajaj-triumph-speed-400-engine-cost-engineering',
    cat: 'ENGINEERING' as const,
    catClass: 'engineering' as const,
    title: 'How Bajaj-Triumph Built the Speed 400 Engine for ₹2.4L — The Cost-Engineering Tradeoffs',
    meta: '7 MIN · 2.1K ↑',
    imageUrl:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
  },
] as const

export const STORIES = [
  {
    slug: '800v-vs-400v-charging-india',
    icon: '⚡',
    title: '800V vs 400V: Which Charges Faster in India?',
    meta: 'EV · 3 MIN',
    gradient: 'linear-gradient(135deg,#1a0a30,#3d1a7a)',
    imageUrl:
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=600&h=800&q=80',
  },
  {
    slug: 'turbo-lag-explained-90-seconds',
    icon: '🏁',
    title: 'Turbo Lag Explained in 90 Seconds',
    meta: 'ENG · 2 MIN',
    gradient: 'linear-gradient(135deg,#1a0a0a,#5a1010)',
    imageUrl:
      'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&h=800&q=80',
  },
  {
    slug: 'thar-roxx-suspension-geometry',
    icon: '🛻',
    title: 'Thar Roxx Suspension Geometry — What Changed',
    meta: 'LAUNCH · 4 MIN',
    gradient: 'linear-gradient(135deg,#0a1a0a,#0a4020)',
    imageUrl:
      'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=600&h=800&q=80',
  },
  {
    slug: 'ktm-lc8c-four-valves-per-cylinder',
    icon: '🏍',
    title: 'KTM LC8c Engine — Why 4 Valves Per Cylinder',
    meta: '2W · 3 MIN',
    gradient: 'linear-gradient(135deg,#0a0a1a,#1a1a5a)',
    imageUrl:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=600&h=800&q=80',
  },
  {
    slug: 'ev-sales-march-2025-by-state',
    icon: '📊',
    title: 'EV Sales Data March 2025 — State by State',
    meta: 'INDUSTRY · 3 MIN',
    gradient: 'linear-gradient(135deg,#1a0a1a,#4a1a4a)',
    imageUrl:
      'https://images.unsplash.com/photo-1504222490345-c075b600dfa4?auto=format&fit=crop&w=600&h=800&q=80',
  },
  {
    slug: 'adas-indian-roads-engineering',
    icon: '🔧',
    title: 'How ADAS Fails on Indian Roads — Engineering View',
    meta: 'ENG · 5 MIN',
    gradient: 'linear-gradient(135deg,#1a1a0a,#4a3a0a)',
    imageUrl:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=600&h=800&q=80',
  },
  {
    slug: 'f1-miami-2025-downforce-numbers',
    icon: '🏎',
    title: 'F1 Miami 2025: What the Downforce Numbers Tell Us',
    meta: 'F1 · 4 MIN',
    gradient: 'linear-gradient(135deg,#0a1a1a,#0a3a3a)',
    imageUrl:
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&h=800&q=80',
  },
  {
    slug: 'cng-vs-petrol-physics',
    icon: '⛽',
    title: 'Why CNG Is Actually Better Physics Than Petrol',
    meta: 'ENG · 3 MIN',
    gradient: 'linear-gradient(135deg,#1a0f0a,#4a2a0a)',
    imageUrl:
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=600&h=800&q=80',
  },
] as const

export const FILTER_COUNTS: Record<ArticleCategory, number> = {
  all: 24,
  ev: 8,
  launch: 5,
  engineering: 6,
  motorsport: 3,
  twowheeler: 4,
  industry: 1,
}

export type Article = {
  id: string
  slug: string
  cat: Exclude<ArticleCategory, 'all'>
  badge: string
  badgeClass: 'ev' | 'launch' | 'engineering' | 'motorsport' | 'twowheeler' | 'industry'
  title: string
  excerpt: string
  deck?: string
  bodyParagraphs?: string[]
  keyTakeaways?: string[]
  tags?: string[]
  upvotes: number
  readTime: string
  meta: string
  thumbLabel: string
  thumbGradient: string
  deepDive?: boolean
  published?: string
  updated?: string
  /** Prefer over gradient+label thumbnails when set. */
  imageUrl?: string
}

export const ARTICLES: Article[] = [
  {
    id: '1',
    slug: 'ather-450x-gen-4-battery-lfp',
    cat: 'ev',
    badge: 'EV INTELLIGENCE',
    badgeClass: 'ev',
    title:
      'Ather 450X Gen 4 Battery Pack: Why LFP Chemistry Changes Everything for Indian Summers',
    deck: 'When ambient temperatures routinely exceed 40°C, chemistry matters more than rated kWh.',
    excerpt:
      'The shift from NMC to LFP in the 450X Gen 4 is not just a cost decision — it fundamentally alters how the battery behaves at 45°C ambient temperatures common across Rajasthan and Gujarat.',
    bodyParagraphs: [
      'LFP cells trade energy density for thermal stability and cycle life. On paper that reads like a brochure — on Indian roads it translates to fewer derating events when the pack is heat-soaked after a fast-charge followed by sustained highway load.',
      'BMS strategies differ too: voltage plateau characteristics change how state-of-charge estimation behaves near the top and bottom of the pack. That affects real-world range consistency more than any single WLTP figure.',
    ],
    tags: ['#lfp', '#ev', '#ather'],
    upvotes: 847,
    readTime: '6 MIN READ',
    meta: 'PREETAM · 2H AGO',
    thumbLabel: 'EV',
    thumbGradient: 'linear-gradient(135deg,#0a1f0a,#1a4020)',
    imageUrl:
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80',
    published: '28 Mar 2026',
    updated: '28 Mar 2026',
  },
  {
    id: '2',
    slug: 'kia-syros-platform-nios-engineering',
    cat: 'launch',
    badge: 'LAUNCH',
    badgeClass: 'launch',
    title:
      'Kia Syros: Why the Platform Sharing With Nios Is the Most Interesting Engineering Decision Kia India Has Made',
    deck: 'Shared underpinnings, different tuning objectives — how Kia re-spent its engineering budget.',
    excerpt:
      'It uses the K1 platform — the same base as the Nios — but with a completely revised suspension tune and a new turbocharged engine calibration specifically for Indian fuel quality variations.',
    bodyParagraphs: [
      'Platform sharing is usually framed as cost cutting. Here, the more accurate read is risk distribution: crash structure, hardpoints, and supply chain commonality free up engineering hours for ride-and-handling and powertrain calibration.',
      'Indian fuel quality variance means knock control and enrichment maps need margin that European calibration files do not carry. That is invisible in a spec sheet but decisive in driveability.',
    ],
    tags: ['#kia', '#launch', '#platform'],
    upvotes: 1203,
    readTime: '8 MIN READ',
    meta: 'PREETAM · 4H AGO',
    thumbLabel: 'KIA',
    thumbGradient: 'linear-gradient(135deg,#1a0a0a,#3a1010)',
    imageUrl:
      'https://images.unsplash.com/photo-1494976388531-d085849cfcbf?auto=format&fit=crop&w=800&q=80',
    published: '28 Mar 2026',
    updated: '28 Mar 2026',
  },
  {
    id: '3',
    slug: 'suspension-geometry-indian-roads-guide',
    cat: 'engineering',
    badge: 'ENGINEERING',
    badgeClass: 'engineering',
    title:
      'What Suspension Geometry Tells You About a Vehicle Before You Drive It: A Complete Guide for Indian Roads',
    deck: 'Caster, scrub radius, and kingpin inclination predict steering feel and stability — before you turn the key.',
    excerpt:
      'Caster angle, scrub radius, kingpin inclination — these three numbers, available in any workshop manual, predict how a vehicle will feel on a potholed city road before you sit in the driver’s seat.',
    deepDive: true,
    bodyParagraphs: [
      'Suspension geometry is not “sporty” or “comfort” branding — it is vectors. Caster stabilises straight-line tracking and builds self-centering torque as slip angles develop. On broken surfaces, too little caster can feel nervous; too much can fight the wheel through holes and crown changes.',
      'Scrub radius is the distance between the tyre contact patch centre and the steering axis intersection on the road. It amplifies or damps torque steer, tramlining, and the violence you feel when one wheel hits a sharp edge.',
      'Kingpin inclination (or steering axis inclination on strut cars) sets mechanical trail with caster and influences how braking and bump steer couple into the steering wheel. Indian traffic patterns — hard braking in uneven lanes — make this coupling audible and tactile long before a skid pad test does.',
    ],
    keyTakeaways: [
      'Workshop geometry numbers predict steering weight, stability, and bump feedback more honestly than marketing adjectives.',
      'Scrub radius is the hidden multiplier behind torque steer and tramlining on one-wheel bumps.',
      'Indian roads reward combinations that tolerate asymmetric inputs — not the same optima as smooth European reference surfaces.',
    ],
    tags: ['#suspension', '#engineering', '#chassis'],
    upvotes: 2341,
    readTime: '12 MIN READ',
    meta: 'PREETAM · 1D AGO',
    thumbLabel: 'ENG',
    thumbGradient: 'linear-gradient(135deg,#0a0a1f,#1a1a40)',
    imageUrl:
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=800&q=80',
    published: '27 Mar 2026',
    updated: '28 Mar 2026',
  },
  {
    id: '4',
    slug: 'motogp-2025-india-buddh-layout',
    cat: 'motorsport',
    badge: 'MOTORSPORT',
    badgeClass: 'motorsport',
    title:
      'MotoGP 2025 Indian Round Confirmed for Buddh — What the Track Layout Means for Motorcycle Setup',
    deck: 'Straights reward slip, chicanes punish instability — setup becomes a sequenced compromise.',
    excerpt:
      "Buddh’s long straights and slow chicanes create a unique aerodynamic challenge: teams must choose between top-speed gain and cornering stability at very different points on the track.",
    bodyParagraphs: [
      'MotoGP setup is rarely one optimum — it is a time-ordered compromise. A lap begins with tyre temperature state, moves through braking zones that test front tyre construction, then loads the rear asymmetrically through direction changes.',
      'Air density and late-afternoon track temperature at Greater Noida historically swing grip more than riders expect. That pushes engineers toward conservative mechanical grip packages unless the weather forecast pins humidity and cloud cover.',
    ],
    tags: ['#motogp', '#buddh', '#aero'],
    upvotes: 1876,
    readTime: '7 MIN READ',
    meta: 'PREETAM · 1D AGO',
    thumbLabel: 'GP',
    thumbGradient: 'linear-gradient(135deg,#1a1a0a,#3a2800)',
    imageUrl:
      'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80',
    published: '27 Mar 2026',
    updated: '28 Mar 2026',
  },
  {
    id: '5',
    slug: 'royal-enfield-guerrilla-450-vs-himalayan-450',
    cat: 'twowheeler',
    badge: 'TWO-WHEELERS',
    badgeClass: 'twowheeler',
    title:
      'Royal Enfield Guerrilla 450 vs Himalayan 450: Same Engine, Completely Different Motorcycle — Here’s Why',
    deck: 'Shared Sherpa 450 — divergent targets for gearing, fuelling, and chassis.',
    excerpt:
      'Both use the Sherpa 450 engine but differ in fuelling map, gearing ratios, chassis geometry, and suspension tuning — two motorcycles that feel fundamentally different despite sharing 60% of components.',
    bodyParagraphs: [
      'Same displacement and bore-stroke do not imply same torque rise shape at the rear wheel. Secondary gearing and sprocketing shift the operating points on the map riders actually use in Indian traffic — low-speed lugging versus loaded mountain passes.',
      'Wheel diameter, fork offset, and swingarm length change trail and anti-squat — which is why two siblings can diverge emotionally even when the exhaust note is familiar.',
    ],
    tags: ['#royalenfield', '#450', '#twowheeler'],
    upvotes: 934,
    readTime: '9 MIN READ',
    meta: 'PREETAM · 2D AGO',
    thumbLabel: '2W',
    thumbGradient: 'linear-gradient(135deg,#0a0f1a,#0a1a30)',
    imageUrl:
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=800&q=80',
    published: '26 Mar 2026',
    updated: '28 Mar 2026',
  },
  {
    id: '6',
    slug: 'auto-components-india-2025-turnover',
    cat: 'industry',
    badge: 'INDUSTRY',
    badgeClass: 'industry',
    title:
      'India’s Auto Component Industry in 2025: Why ₹8.5 Lakh Crore Turnover Doesn’t Tell the Full Engineering Story',
    deck: 'Aggregate scale hides tier divergence — and EV localisation lives in that gap.',
    excerpt:
      'The components sector has grown, but the engineering sophistication divide between Tier 1 suppliers and Tier 2–3 vendors has widened. What this means for EV localisation targets.',
    bodyParagraphs: [
      'Turnover aggregates volume; it does not aggregate validation depth. Modules that touch high voltage, functional safety, and thermal runaway pathways concentrate in a thin layer of suppliers with full test matrices.',
      'Policy targets accelerate capacity faster than they accelerate capability. The engineering story of the next five years is who closes the validation gap — not who announces the most factories.',
    ],
    tags: ['#industry', '#pli', '#components'],
    upvotes: 612,
    readTime: '10 MIN READ',
    meta: 'PREETAM · 3D AGO',
    thumbLabel: 'IND',
    thumbGradient: 'linear-gradient(135deg,#0a1a1a,#0a2a2a)',
    imageUrl:
      'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?auto=format&fit=crop&w=800&q=80',
    published: '25 Mar 2026',
    updated: '28 Mar 2026',
  },
]

export const TRENDING = [
  { num: '01', slug: HERO_MAIN.slug, title: 'Mahindra BE.6e 800V Analysis', meta: '2.4K ↑ · 3H AGO' },
  {
    num: '02',
    slug: 'suspension-geometry-indian-roads-guide',
    title: 'Suspension Geometry for Indian Roads',
    meta: '2.3K ↑ · 1D AGO',
  },
  {
    num: '03',
    slug: 'motogp-2025-india-buddh-layout',
    title: 'MotoGP India 2025 — Buddh Circuit Setup',
    meta: '1.9K ↑ · 1D AGO',
  },
  {
    num: '04',
    slug: 'royal-enfield-guerrilla-450-vs-himalayan-450',
    title: 'RE Guerrilla 450 vs Himalayan 450',
    meta: '934 ↑ · 2D AGO',
  },
  { num: '05', slug: 'kia-syros-platform-nios-engineering', title: 'Kia Syros Platform Deep Dive', meta: '1.2K ↑ · 4H AGO' },
] as const

export const TOPICS = [
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
] as const

export const EV_MINI = [
  {
    slug: 'lfp-vs-nmc-india-climate-2025',
    title: 'LFP vs NMC in 2025: Which Chemistry Wins for Indian Climate Conditions?',
    meta: '8 MIN · 1.4K ↑',
    imageUrl:
      'https://images.unsplash.com/photo-1619771917827-3c6696e2616a?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'maruti-evitara-bms-delhi-heat',
    title: "How Maruti's eVitara BMS Handles Delhi Summer Heat: A Technical Comparison",
    meta: '6 MIN · 890 ↑',
    imageUrl:
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'v2g-india-infrastructure-gap-2028',
    title: 'Vehicle-to-Grid in India: Why It Will Not Work Until 2028 — The Infrastructure Gap Explained',
    meta: '9 MIN · 1.1K ↑',
    imageUrl:
      'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=80',
  },
] as const

export const ENG_MINI = [
  {
    slug: 'indian-roads-euro-suspension-specs',
    title: 'Why Indian Road Surfaces Destroy European Susp Specs — And What Should Replace Them',
    meta: '11 MIN · 2.1K ↑',
    imageUrl:
      'https://images.unsplash.com/photo-1489824904134-891ab64532f1?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'ci-vs-si-diesel-2025',
    title: 'Compression Ignition vs Spark Ignition in 2025: The Case for Diesel Nobody Is Making',
    meta: '8 MIN · 1.6K ↑',
    imageUrl:
      'https://images.unsplash.com/photo-1449426468159-96ae08ce730d?auto=format&fit=crop&w=900&q=80',
  },
  {
    slug: 'monocoque-engineered-to-fail-safety',
    title: 'How a Monocoque Chassis Is Engineered to Fail — And Why That Makes You Safer',
    meta: '7 MIN · 1.9K ↑',
    imageUrl:
      'https://images.unsplash.com/photo-1619405399517-d7fce0f13302?auto=format&fit=crop&w=900&q=80',
  },
] as const

export const CATEGORY_META: Record<
  NavCategory,
  { headline: string; description: string; accent: string; bar: string }
> = {
  ev: {
    headline: 'EV INTELLIGENCE',
    description:
      'Engineering-first coverage of India’s electric vehicle transition — battery systems, charging infrastructure, platform architecture, and real-world performance.',
    accent: '#4AE080',
    bar: '#1A7A3C',
  },
  launch: {
    headline: 'VEHICLE LAUNCHES',
    description:
      'Engineering decisions behind new products — platforms, calibration, and manufacturing intent — not specification trivia.',
    accent: '#FF6B70',
    bar: '#C0000A',
  },
  engineering: {
    headline: 'ENGINEERING DEEP DIVES',
    description:
      'How vehicles work at component and system level — written for readers who want mechanisms, not adjectives.',
    accent: '#B48FE8',
    bar: '#6B3FA0',
  },
  motorsport: {
    headline: 'MOTORSPORT',
    description:
      'F1, MotoGP, Indian national racing — with setup language, aerodynamics, and tyre physics in plain technical English.',
    accent: '#E8B84A',
    bar: '#A06010',
  },
  twowheeler: {
    headline: 'TWO-WHEELERS',
    description:
      'India’s dominant mobility form, covered with the same engineering depth as four-wheeled platforms.',
    accent: '#70A8FF',
    bar: '#0D4B8A',
  },
  industry: {
    headline: 'INDUSTRY & POLICY',
    description:
      'PLI, FAME, supply chain localisation, and OEM strategy — with numbers traced back to engineering consequences.',
    accent: '#4ADADA',
    bar: '#0A6060',
  },
}

function inferStoryCat(meta: string): Article['cat'] {
  const p = meta.split('·')[0]?.trim().toUpperCase() ?? ''
  if (p === 'EV') return 'ev'
  if (p === 'LAUNCH') return 'launch'
  if (p === '2W') return 'twowheeler'
  if (p === 'INDUSTRY') return 'industry'
  if (p === 'F1') return 'motorsport'
  return 'engineering'
}

function inferStoryBadge(meta: string): Article['badgeClass'] {
  const c = inferStoryCat(meta)
  if (c === 'ev') return 'ev'
  if (c === 'launch') return 'launch'
  if (c === 'twowheeler') return 'twowheeler'
  if (c === 'industry') return 'industry'
  if (c === 'motorsport') return 'motorsport'
  return 'engineering'
}

function buildStubArticle(
  p: Omit<Article, 'id' | 'upvotes' | 'readTime' | 'meta' | 'thumbLabel' | 'thumbGradient'> &
    Partial<Pick<Article, 'upvotes' | 'readTime' | 'meta' | 'thumbLabel' | 'thumbGradient'>>,
): Article {
  return {
    id: `stub-${p.slug}`,
    upvotes: p.upvotes ?? 840,
    readTime: p.readTime ?? '5 MIN READ',
    meta: p.meta ?? 'PREETAM · AUTOXEC',
    thumbLabel: p.thumbLabel ?? 'AX',
    thumbGradient: p.thumbGradient ?? 'linear-gradient(135deg,#1a0f30,#2d1060)',
    ...p,
  }
}

function heroSideCat(h: (typeof HERO_SIDE)[number]): Article['cat'] {
  if (h.catClass === 'ev') return 'ev'
  if (h.catClass === 'motorsport') return 'motorsport'
  return 'engineering'
}

const STUB_POOL: Article[] = [
  buildStubArticle({
    slug: HERO_MAIN.slug,
    cat: 'launch',
    badge: 'LAUNCH ANALYSIS',
    badgeClass: 'launch',
    title: HERO_MAIN.title,
    excerpt:
      'The featured lead story on AutoXec — 800V architecture, real charging curves, and what it changes for Indian owners day to day.',
    thumbLabel: 'BE',
    thumbGradient: 'linear-gradient(135deg,#1A0F30 0%,#2D1060 50%,#0D0820 100%)',
    imageUrl: HERO_MAIN.imageUrl,
    upvotes: 2400,
    readTime: '8 MIN READ',
    meta: 'PREETAM · AUTOXEC',
  }),
  ...HERO_SIDE.map((h) =>
    buildStubArticle({
      slug: h.slug,
      cat: heroSideCat(h),
      badge: h.cat,
      badgeClass: h.catClass,
      title: h.title,
      excerpt: 'From the homepage hero rail — open for full technical analysis.',
      imageUrl: h.imageUrl,
    }),
  ),
  ...STORIES.map((s) =>
    buildStubArticle({
      slug: s.slug,
      cat: inferStoryCat(s.meta),
      badge: 'QUICK READ',
      badgeClass: inferStoryBadge(s.meta),
      title: s.title,
      excerpt: `${s.title} — a bite-size explainer from the AutoXec Quick Reads strip.`,
      thumbLabel: 'QR',
      thumbGradient: s.gradient,
      imageUrl: s.imageUrl,
      readTime: '3 MIN READ',
    }),
  ),
  ...EV_MINI.map((m) =>
    buildStubArticle({
      slug: m.slug,
      cat: 'ev',
      badge: 'EV INTELLIGENCE',
      badgeClass: 'ev',
      title: m.title,
      excerpt: 'From the EV spotlight row — battery systems, thermal behaviour, and charging in India.',
      imageUrl: m.imageUrl,
    }),
  ),
  ...ENG_MINI.map((m) =>
    buildStubArticle({
      slug: m.slug,
      cat: 'engineering',
      badge: 'ENGINEERING',
      badgeClass: 'engineering',
      title: m.title,
      excerpt: 'From the engineering spotlight row — mechanisms, trade-offs, and verified sources.',
      readTime: '8 MIN READ',
      imageUrl: m.imageUrl,
    }),
  ),
]

export function findArticleOrStub(slug: string): Article | undefined {
  const main = ARTICLES.find((a) => a.slug === slug)
  if (main) return main
  return STUB_POOL.find((a) => a.slug === slug)
}

export function getArticleBySlug(slug: string): Article | undefined {
  return findArticleOrStub(slug)
}

export function allArticlesMerged(): Article[] {
  const bySlug = new Map<string, Article>()
  for (const a of STUB_POOL) bySlug.set(a.slug, a)
  for (const a of ARTICLES) bySlug.set(a.slug, a)
  return [...bySlug.values()]
}

export function articlesInCategory(cat: NavCategory): Article[] {
  return allArticlesMerged().filter((a) => a.cat === cat)
}
