import { CollectionConfig } from 'payload/types'

export const Users: CollectionConfig = {
  slug: 'users',
  auth: {
    useAPIKey: true,
  },
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Imię',
    },
    {
      name: 'role',
      type: 'select',
      label: 'Rola',
      defaultValue: 'editor',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
    },
  ],
}
