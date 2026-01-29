import { CollectionConfig } from 'payload/types'

export const Blog: CollectionConfig = {
  slug: 'blog',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'publishedAt', 'status'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tytuł',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      label: 'Krótki opis (excerpt)',
      maxLength: 300,
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      label: 'Treść artykułu',
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Zdjęcie główne',
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategoria',
      options: [
        { label: 'Serwis', value: 'serwis' },
        { label: 'Hamulce', value: 'hamulce' },
        { label: 'Bezpieczeństwo', value: 'bezpieczenstwo' },
        { label: 'Porady', value: 'porady' },
        { label: 'Renowacja', value: 'renowacja' },
      ],
    },
    {
      name: 'readingTime',
      type: 'number',
      label: 'Czas czytania (min)',
      admin: {
        description: 'np. 3, 5, 10',
      },
    },
    {
      name: 'publishedAt',
      type: 'date',
      label: 'Data publikacji',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'status',
      type: 'select',
      label: 'Status',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
