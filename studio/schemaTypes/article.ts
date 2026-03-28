import { defineField, defineType } from 'sanity'

const categories = [
  { title: 'EV', value: 'ev' },
  { title: 'Launch', value: 'launch' },
  { title: 'Engineering', value: 'engineering' },
  { title: 'Motorsport', value: 'motorsport' },
  { title: 'Two-wheeler', value: 'twowheeler' },
  { title: 'Industry', value: 'industry' },
]

const badgeClasses = [
  { title: 'EV', value: 'ev' },
  { title: 'Launch', value: 'launch' },
  { title: 'Engineering', value: 'engineering' },
  { title: 'Motorsport', value: 'motorsport' },
  { title: 'Two-wheeler', value: 'twowheeler' },
  { title: 'Industry', value: 'industry' },
]

export const article = defineType({
  name: 'article',
  title: 'Article',
  type: 'document',
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'cat',
      title: 'Category',
      type: 'string',
      options: { list: categories, layout: 'dropdown' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge label',
      type: 'string',
      description: 'e.g. EV INTELLIGENCE, LAUNCH',
    }),
    defineField({
      name: 'badgeClass',
      title: 'Badge style',
      type: 'string',
      options: { list: badgeClasses, layout: 'dropdown' },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'deck',
      title: 'Deck',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'bodyParagraphs',
      title: 'Body (paragraphs)',
      type: 'array',
      of: [{ type: 'text', rows: 4 }],
    }),
    defineField({
      name: 'keyTakeaways',
      title: 'Key takeaways',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'upvotes',
      title: 'Upvotes (number)',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'readTime',
      title: 'Read time',
      type: 'string',
      description: 'e.g. 8 MIN READ',
      initialValue: '5 MIN READ',
    }),
    defineField({
      name: 'meta',
      title: 'Byline / meta line',
      type: 'string',
    }),
    defineField({
      name: 'thumbLabel',
      title: 'Thumb label (fallback)',
      type: 'string',
    }),
    defineField({
      name: 'thumbGradient',
      title: 'Thumb gradient CSS (fallback)',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Hero / card image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageUrl',
      title: 'External image URL (optional)',
      type: 'url',
      description: 'Overrides asset if set.',
    }),
    defineField({
      name: 'deepDive',
      title: 'Deep dive',
      type: 'boolean',
    }),
    defineField({
      name: 'published',
      title: 'Published label',
      type: 'string',
    }),
    defineField({
      name: 'updated',
      title: 'Updated label',
      type: 'string',
    }),
    defineField({
      name: 'heroCategoryLabel',
      title: 'Hero: category line override',
      type: 'string',
      description: 'Optional — defaults to badge.',
    }),
    defineField({
      name: 'heroAuthorLine',
      title: 'Hero: author line',
      type: 'string',
    }),
    defineField({
      name: 'heroUpvotesLabel',
      title: 'Hero: upvotes label',
      type: 'string',
      description: 'e.g. 2.4K UPVOTES',
    }),
  ],
  preview: {
    select: { title: 'title', media: 'mainImage', cat: 'cat' },
    prepare({ title, media, cat }) {
      return { title: title || 'Untitled', subtitle: cat, media }
    },
  },
})
