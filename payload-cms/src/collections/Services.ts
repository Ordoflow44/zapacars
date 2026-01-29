import { CollectionConfig } from 'payload/types'

export const Services: CollectionConfig = {
  slug: 'services',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'price', 'updatedAt'],
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
      label: 'Nazwa usługi',
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
      name: 'description',
      type: 'richText',
      label: 'Opis',
    },
    {
      name: 'shortDescription',
      type: 'textarea',
      label: 'Krótki opis',
      maxLength: 200,
    },
    {
      name: 'price',
      type: 'text',
      label: 'Cena',
      admin: {
        description: 'np. "150-300 PLN" lub "od 100 zł"',
      },
    },
    {
      name: 'icon',
      type: 'text',
      label: 'Ikona (Lucide)',
      admin: {
        description: 'Nazwa ikony z lucide-react, np. "Wrench"',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Zdjęcie',
    },
    {
      name: 'featured',
      type: 'checkbox',
      label: 'Wyróżniona usługa',
      defaultValue: false,
    },
  ],
}
