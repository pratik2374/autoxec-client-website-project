import { defineField, defineType } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'ticker',
      title: 'Breaking ticker lines',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'heroSlideRefs',
      title: 'Hero carousel (ordered)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
    }),
    defineField({
      name: 'heroSideRefs',
      title: 'Hero rail (3 cards)',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'article' }] }],
    }),
    defineField({
      name: 'stories',
      title: 'Quick reads strip',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'storyItem',
          fields: [
            { name: 'slug', type: 'string', title: 'Slug' },
            { name: 'icon', type: 'string', title: 'Icon (emoji)' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'meta', type: 'string', title: 'Meta line' },
            { name: 'gradient', type: 'string', title: 'CSS gradient' },
            { name: 'imageUrl', type: 'url', title: 'Image URL' },
          ],
        },
      ],
    }),
    defineField({
      name: 'trending',
      title: 'Trending sidebar',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'trendItem',
          fields: [
            { name: 'num', type: 'string', title: 'Rank' },
            { name: 'slug', type: 'string', title: 'Article slug' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'meta', type: 'string', title: 'Meta' },
          ],
        },
      ],
    }),
    defineField({
      name: 'topics',
      title: 'Explore topics',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'evMini',
      title: 'EV Intelligence row',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'miniItem',
          fields: [
            { name: 'slug', type: 'string', title: 'Slug' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'meta', type: 'string', title: 'Meta' },
            { name: 'imageUrl', type: 'url', title: 'Image URL' },
          ],
        },
      ],
    }),
    defineField({
      name: 'engMini',
      title: 'Engineering row',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'miniItemEng',
          fields: [
            { name: 'slug', type: 'string', title: 'Slug' },
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'meta', type: 'string', title: 'Meta' },
            { name: 'imageUrl', type: 'url', title: 'Image URL' },
          ],
        },
      ],
    }),
    defineField({
      name: 'filterCounts',
      title: 'Filter chip counts (homepage)',
      type: 'object',
      fields: [
        { name: 'all', type: 'number', title: 'All' },
        { name: 'ev', type: 'number', title: 'EV' },
        { name: 'launch', type: 'number', title: 'Launch' },
        { name: 'engineering', type: 'number', title: 'Engineering' },
        { name: 'motorsport', type: 'number', title: 'Motorsport' },
        { name: 'twowheeler', type: 'number', title: 'Two-wheeler' },
        { name: 'industry', type: 'number', title: 'Industry' },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Homepage configuration' }
    },
  },
})
