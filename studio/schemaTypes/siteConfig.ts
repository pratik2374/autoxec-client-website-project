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
          of: [{ type: 'reference', to: [{ type: 'article' }] }],
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
