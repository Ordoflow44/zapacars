import { buildConfig } from 'payload/config'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { slateEditor } from '@payloadcms/richtext-slate'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import path from 'path'

import { Services } from './collections/Services'
import { Blog } from './collections/Blog'
import { Gallery } from './collections/Gallery'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { SiteSettings } from './globals/SiteSettings'
import { Logo } from './admin/components/Logo'
import { Icon } from './admin/components/Icon'

export default buildConfig({
  serverURL: process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3000',
  cors: [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.FRONTEND_URL || 'https://jsk4sw84skcggoc840k8wkwg.31.97.36.209.sslip.io',
  ].filter(Boolean),
  csrf: [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.FRONTEND_URL || 'https://jsk4sw84skcggoc840k8wkwg.31.97.36.209.sslip.io',
  ].filter(Boolean),
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    meta: {
      titleSuffix: '- ZapaCars CMS',
      favicon: '/favicon.ico',
      ogImage: '/og-image.jpg',
    },
    components: {
      graphics: {
        Logo,
        Icon,
      },
    },
    css: path.resolve(__dirname, 'admin/styles/custom.scss'),
  },
  collections: [
    Services,
    Blog,
    Gallery,
    Media,
    Users,
  ],
  globals: [
    SiteSettings,
  ],
  editor: slateEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
})
