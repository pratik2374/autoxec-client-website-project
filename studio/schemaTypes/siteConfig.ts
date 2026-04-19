import { defineField, defineType } from 'sanity'

const strategyOptions = [
  { title: 'Latest (Automatic)', value: 'latest' },
  { title: 'Highest Viewed (Automatic)', value: 'popular' },
  { title: 'Manual Selection', value: 'manual' },
]

export const siteConfig = defineType({
  name: 'siteConfig',
  title: 'Homepage Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Config Title',
      type: 'string',
      initialValue: 'Global Site Config',
      description: 'Used internally. Only keep ONE configuration document active.',
    }),

    // NAVIGATION
    defineField({
      name: 'navigation',
      title: 'Main Navigation',
      type: 'array',
      description: 'Define the top level navigation bar for the site.',
      of: [
        {
          type: 'object',
          name: 'navItem',
          title: 'Navigation Item',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'linkType',
              title: 'Type of Link',
              type: 'string',
              options: { list: ['dropdown', 'category', 'path'], layout: 'radio' },
              initialValue: 'path',
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'path',
              title: 'Internal Path',
              type: 'string',
              description: 'e.g. /quick-reads or /get-advice. Must start with a slash.',
              hidden: ({ parent }) => parent?.linkType !== 'path',
            },
            {
              name: 'category',
              title: 'Target Category',
              type: 'reference',
              to: [{ type: 'category' }],
              hidden: ({ parent }) => parent?.linkType !== 'category',
            },
            {
              name: 'dropdownItems',
              title: 'Dropdown Categories',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'category' }] }],
              hidden: ({ parent }) => parent?.linkType !== 'dropdown',
            },
          ],
          preview: {
            select: { title: 'title', subtitle: 'linkType' },
            prepare({ title, subtitle }) { return { title: title || 'Unnamed', subtitle: `Type: ${subtitle}` } }
          }
        }
      ]
    }),

    // TICKER
    defineField({
      name: 'tickerItems',
      title: 'Live Moving Ticker',
      type: 'array',
      description: 'The moving text headlines at the very top of the page.',
      of: [{ type: 'string' }],
    }),
    
    // HERO CONFIG
    defineField({
      name: 'heroConfig',
      title: 'Hero Configuration (Main Slide)',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'strategy',
          title: 'Selection Strategy',
          type: 'string',
          options: { list: strategyOptions, layout: 'radio' },
          initialValue: 'latest',
        },
        {
          name: 'manualArticles',
          title: 'Manual Articles Selection',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'article' }] }],
          description: 'Max 5. Only used if Strategy is "Manual Selection".',
          hidden: ({ parent }) => parent?.strategy !== 'manual',
        },
      ],
    }),

    // HERO SIDE CONFIG
    defineField({
      name: 'heroSideConfig',
      title: 'Hero Side Configuration (Top Left 3 Blogs)',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'strategy',
          title: 'Selection Strategy',
          type: 'string',
          options: { list: strategyOptions, layout: 'radio' },
          initialValue: 'latest',
        },
        {
          name: 'limit',
          title: 'Number of Items',
          type: 'number',
          initialValue: 3,
          validation: Rule => Rule.min(1).max(10)
        },
        {
          name: 'manualArticles',
          title: 'Manual Articles Selection',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'article' }] }],
          description: 'Only used if Strategy is "Manual Selection".',
          hidden: ({ parent }) => parent?.strategy !== 'manual',
        },
      ],
    }),

    // QUICK READS CONFIG
    defineField({
      name: 'quickReadsConfig',
      title: 'Quick Reads Strip',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'strategy',
          title: 'Selection Strategy',
          type: 'string',
          options: { list: strategyOptions, layout: 'radio' },
          initialValue: 'latest',
        },
        {
          name: 'limit',
          title: 'Number of Items',
          type: 'number',
          initialValue: 8,
          validation: Rule => Rule.min(1).max(20)
        },
        {
          name: 'manualArticles',
          title: 'Manual Articles Selection',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'quickRead' }] }],
          description: 'Only used if Strategy is "Manual Selection".',
          hidden: ({ parent }) => parent?.strategy !== 'manual',
        },
      ],
    }),

    // TRENDING CONFIG
    defineField({
      name: 'trendingConfig',
      title: 'Trending Now Sidebar',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'strategy',
          title: 'Selection Strategy',
          type: 'string',
          options: { list: strategyOptions, layout: 'radio' },
          initialValue: 'popular',
        },
        {
          name: 'limit',
          title: 'Number of Items',
          type: 'number',
          initialValue: 5,
          validation: Rule => Rule.min(1).max(10)
        },
        {
          name: 'manualArticles',
          title: 'Manual Articles Selection',
          type: 'array',
          of: [{ type: 'reference', to: [{ type: 'article' }] }],
          description: 'Only used if Strategy is "Manual Selection".',
          hidden: ({ parent }) => parent?.strategy !== 'manual',
        },
      ],
    }),

    // TYPOGRAPHY CONFIG
    defineField({
      name: 'typographyConfig',
      title: 'Global Typography',
      type: 'object',
      options: { collapsible: true, collapsed: false },
      fields: [
        {
          name: 'fontFamily',
          title: 'Primary Font Family',
          type: 'string',
          initialValue: "'Barlow', sans-serif",
          description: 'Select a font for all body and UI text. The site loads these from Google Fonts.',
          options: {
            list: [
              { title: 'Barlow (Current — Clean, Modern)', value: "'Barlow', sans-serif" },
              { title: 'Barlow Condensed (Compact, Editorial)', value: "'Barlow Condensed', sans-serif" },
              { title: 'Inter (Neutral, Highly Readable)', value: "'Inter', sans-serif" },
              { title: 'Outfit (Friendly, Tech-forward)', value: "'Outfit', sans-serif" },
              { title: 'Roboto (Classic Google)', value: "'Roboto', sans-serif" },
              { title: 'IBM Plex Sans (Technical, Precise)', value: "'IBM Plex Sans', sans-serif" },
              { title: 'DM Sans (Modern, Clean)', value: "'DM Sans', sans-serif" },
              { title: 'Sora (Futuristic, Bold)', value: "'Sora', sans-serif" },
              { title: 'Space Grotesk (Geometric, Distinctive)', value: "'Space Grotesk', sans-serif" },
              { title: 'Manrope (Engineering Feel)', value: "'Manrope', sans-serif" },
            ],
            layout: 'dropdown',
          },
        },
        {
          name: 'lineHeight',
          title: 'Global Line Height',
          type: 'number',
          initialValue: 1.6,
          description: 'Vertical spacing between lines. Recommended: 1.5 – 1.8. Current default: 1.6',
          validation: (Rule: any) => Rule.min(1).max(3),
        },
        {
          name: 'letterSpacing',
          title: 'Global Letter Spacing (px)',
          type: 'number',
          initialValue: 0,
          description: 'Horizontal spacing between characters. 0 = default; try 0.2–0.5 for a wider feel.',
        },
      ]
    }),

    // EXPLORE TOPICS
    defineField({
      name: 'exploreTopics',
      title: 'Explore Topics Sidebar',
      type: 'array',
      description: 'Editable list of tags shown in the Explore Topics box.',
      of: [{ type: 'string' }],
    }),

    // LATEST STORIES LIMIT
    defineField({
      name: 'latestStoriesLimit',
      title: 'Latest Stories Limit (Initial Load)',
      type: 'number',
      description: 'Number of articles to load initially in the main feed before showing the "Load More" button.',
      initialValue: 6,
      validation: Rule => Rule.min(1).max(50),
    }),

    // CATEGORY PAGE LIMIT
    defineField({
      name: 'categoryPageLimit',
      title: 'Category Page — Articles Per Page',
      type: 'number',
      description: 'How many articles to show per page on category pages. Users can navigate with Previous/Next.',
      initialValue: 9,
      validation: Rule => Rule.min(1).max(50),
    }),

    // DYNAMIC CATEGORY ROWS
    defineField({
      name: 'topCategoryRows',
      title: 'Top Category Rows (Above Latest Stories)',
      type: 'array',
      description: 'These category blocks render at the TOP of the homepage, ABOVE the latest stories grid.',
      of: [
        {
          type: 'object',
          name: 'categoryRow',
          title: 'Category Row',
          fields: [
            {
              name: 'category',
              title: 'Target Category',
              type: 'reference',
              to: [{ type: 'category' }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'strategy',
              title: 'Row Selection Strategy',
              type: 'string',
              options: { list: strategyOptions, layout: 'radio' },
              initialValue: 'latest',
            },
            {
              name: 'limit',
              title: 'Number of Items',
              type: 'number',
              initialValue: 3,
            },
            {
              name: 'manualArticles',
              title: 'Manual Articles',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'article' }] }],
              hidden: ({ parent }) => parent?.strategy !== 'manual',
            },
          ],
          preview: {
            select: { title: 'category.title', subtitle: 'strategy' },
            prepare({ title, subtitle }) { return { title: title || 'Unnamed', subtitle: `Strategy: ${subtitle}` } }
          }
        },
      ],
    }),

    // DYNAMIC CATEGORY ROWS BOTTOM
    defineField({
      name: 'bottomCategoryRows',
      title: 'Bottom Category Rows (Below Latest Stories)',
      type: 'array',
      description: 'These category blocks render at the BOTTOM of the homepage, BELOW the latest stories grid.',
      of: [
        {
          type: 'object',
          name: 'categoryRow',
          title: 'Category Row',
          fields: [
            {
              name: 'category',
              title: 'Target Category',
              type: 'reference',
              to: [{ type: 'category' }],
              validation: (Rule) => Rule.required(),
            },
            {
              name: 'strategy',
              title: 'Row Selection Strategy',
              type: 'string',
              options: { list: strategyOptions, layout: 'radio' },
              initialValue: 'latest',
            },
            {
              name: 'limit',
              title: 'Number of Items',
              type: 'number',
              initialValue: 3,
            },
            {
              name: 'manualArticles',
              title: 'Manual Articles',
              type: 'array',
              of: [{ type: 'reference', to: [{ type: 'article' }] }],
              hidden: ({ parent }) => parent?.strategy !== 'manual',
            },
          ],
          preview: {
            select: { title: 'category.title', subtitle: 'strategy' },
            prepare({ title, subtitle }) { return { title: title || 'Unnamed', subtitle: `Strategy: ${subtitle}` } }
          }
        },
      ],
    }),
  ],
})
