import { defineField, defineType } from 'sanity'

export const category = defineType({
  name: 'category',
  title: 'Blog Category',
  type: 'document',
  fieldsets: [
    {
      name: 'styling',
      title: 'Advanced Styling',
      options: { collapsible: true, collapsed: true },
      description: 'Optional: Customize the UI colors for this category.',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'e.g., EV INTELLIGENCE, MOTORSPORT',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'accentColor',
      title: 'Accent Hex Color',
      type: 'string',
      fieldset: 'styling',
      description: 'Used for headlines (e.g., #4AE080)',
    }),
    defineField({
      name: 'barColor',
      title: 'Bar Hex Color',
      type: 'string',
      fieldset: 'styling',
      description: 'Used for top border markers (e.g., #1A7A3C)',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'slug.current' },
  },
})
