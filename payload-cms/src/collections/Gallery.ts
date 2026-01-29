import { CollectionConfig } from 'payload/types'

export const Gallery: CollectionConfig = {
  slug: 'gallery',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tytuł realizacji',
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Opis',
    },
    {
      name: 'images',
      type: 'array',
      label: 'Zdjęcia',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        {
          name: 'caption',
          type: 'text',
          label: 'Podpis',
        },
      ],
    },
    {
      name: 'category',
      type: 'select',
      label: 'Kategoria',
      options: [
        { label: 'Lakiernictwo', value: 'lakiernictwo' },
        { label: 'Renowacja', value: 'renowacja' },
        { label: 'Serwis', value: 'serwis' },
      ],
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Wyróżniona realizacja',
      defaultValue: false,
    },
    {
      name: 'completedAt',
      type: 'date',
      label: 'Data ukończenia',
    },
  ],
}
