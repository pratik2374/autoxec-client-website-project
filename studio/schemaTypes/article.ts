import { defineField, defineType } from 'sanity'



export const article = defineType({
  name: 'article',
  title: 'Blog Article',
  type: 'document',
  fieldsets: [
    {
      name: 'seo',
      title: 'SEO Settings',
      description: 'Perfectly customize how this post appears in search engines and social media.',
      options: { collapsible: true, collapsed: false },
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
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
      name: 'cat',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'mainImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'imageUrl',
      title: 'External image URL (optional)',
      type: 'url',
      description: 'Overrides Hero Image asset if set.',
    }),
    defineField({
      name: 'content',
      title: 'Content (Word-Style Editor)',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alternative text',
              description: 'Important for SEO and accessibility.',
            },
          ],
        },
      ],
      description: 'Write your article here just like a Word Document. Add Headings (H2, H3), bold text, and drag-and-drop images right into the text!',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      description: 'A short description shown on the homepage.',
    }),
    // ---- SEO fields ----
    defineField({
      name: 'seoTitle',
      title: 'SEO Meta Title',
      type: 'string',
      fieldset: 'seo',
      description: 'If empty, defaults to the article Title.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Meta Description',
      type: 'text',
      rows: 2,
      fieldset: 'seo',
      description: 'If empty, defaults to the Excerpt.',
    }),
    // Optional / Advanced
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'upvotes',
      title: 'Base Upvotes',
      type: 'number',
      initialValue: Math.floor(Math.random() * 500) + 500, // Fun default
    }),
    defineField({
      name: 'published',
      title: 'Published Date Override (String)',
      type: 'string',
      description: 'e.g. 28 Mar 2026',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'cat.title',
      media: 'mainImage',
    },
    prepare({ title, subtitle, media }) {
      return { title: title || 'Untitled', subtitle, media }
    },
  },
})
