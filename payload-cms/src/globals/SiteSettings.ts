import { GlobalConfig } from 'payload/types'

export const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'tracking',
      type: 'group',
      label: 'Kody śledzenia',
      fields: [
        {
          name: 'ga4TrackingId',
          type: 'text',
          label: 'Google Analytics 4 - Tracking ID',
          admin: {
            description: 'Np. G-XXXXXXXXXX',
            placeholder: 'G-XXXXXXXXXX',
          },
        },
        {
          name: 'facebookPixelId',
          type: 'text',
          label: 'Facebook Pixel ID',
          admin: {
            description: 'Identyfikator Facebook Pixel',
            placeholder: '1234567890',
          },
        },
        {
          name: 'gtmId',
          type: 'text',
          label: 'Google Tag Manager ID',
          admin: {
            description: 'Opcjonalnie - np. GTM-XXXXXXX',
            placeholder: 'GTM-XXXXXXX',
          },
        },
      ],
    },
    {
      name: 'cookies',
      type: 'group',
      label: 'Ustawienia Cookies',
      fields: [
        {
          name: 'cookieBannerEnabled',
          type: 'checkbox',
          label: 'Włącz banner cookies',
          defaultValue: true,
        },
        {
          name: 'cookieBannerText',
          type: 'textarea',
          label: 'Tekst banneru cookies',
          defaultValue: 'Ta strona używa plików cookie, aby poprawić Twoje doświadczenia. Kontynuując przeglądanie, zgadzasz się na używanie plików cookie.',
          admin: {
            description: 'Tekst wyświetlany w bannerze informującym o cookies',
          },
        },
        {
          name: 'cookieBannerButtonText',
          type: 'text',
          label: 'Tekst przycisku akceptacji',
          defaultValue: 'Akceptuję',
        },
      ],
    },
    {
      name: 'privacyPolicy',
      type: 'group',
      label: 'Polityka prywatności',
      fields: [
        {
          name: 'content',
          type: 'richText',
          label: 'Treść polityki prywatności',
          admin: {
            description: 'Pełna treść polityki prywatności',
          },
        },
        {
          name: 'lastUpdated',
          type: 'date',
          label: 'Data ostatniej aktualizacji',
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'dd.MM.yyyy',
            },
          },
        },
      ],
    },
    {
      name: 'cookiePolicy',
      type: 'group',
      label: 'Polityka cookies',
      fields: [
        {
          name: 'content',
          type: 'richText',
          label: 'Treść polityki cookies',
          admin: {
            description: 'Pełna treść polityki dotyczącej plików cookie',
          },
        },
        {
          name: 'lastUpdated',
          type: 'date',
          label: 'Data ostatniej aktualizacji',
          admin: {
            date: {
              pickerAppearance: 'dayOnly',
              displayFormat: 'dd.MM.yyyy',
            },
          },
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO - Ustawienia domyślne',
      fields: [
        {
          name: 'metaTitle',
          type: 'text',
          label: 'Domyślny tytuł meta',
          admin: {
            description: 'Używany gdy strona nie ma własnego tytułu',
          },
        },
        {
          name: 'metaDescription',
          type: 'textarea',
          label: 'Domyślny opis meta',
          admin: {
            description: 'Używany gdy strona nie ma własnego opisu',
          },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          label: 'Domyślny obrazek Open Graph',
          admin: {
            description: 'Obrazek używany przy udostępnianiu w social media',
          },
        },
      ],
    },
    {
      name: 'contact',
      type: 'group',
      label: 'Dane kontaktowe',
      fields: [
        {
          name: 'companyName',
          type: 'text',
          label: 'Nazwa firmy',
        },
        {
          name: 'address',
          type: 'textarea',
          label: 'Adres',
        },
        {
          name: 'phone',
          type: 'text',
          label: 'Telefon główny',
        },
        {
          name: 'phone2',
          type: 'text',
          label: 'Telefon dodatkowy',
        },
        {
          name: 'email',
          type: 'email',
          label: 'Email',
        },
        {
          name: 'nip',
          type: 'text',
          label: 'NIP',
        },
        {
          name: 'regon',
          type: 'text',
          label: 'REGON',
        },
      ],
    },
    {
      name: 'socialMedia',
      type: 'group',
      label: 'Social Media',
      fields: [
        {
          name: 'facebook',
          type: 'text',
          label: 'Facebook URL',
        },
        {
          name: 'instagram',
          type: 'text',
          label: 'Instagram URL',
        },
        {
          name: 'youtube',
          type: 'text',
          label: 'YouTube URL',
        },
        {
          name: 'linkedin',
          type: 'text',
          label: 'LinkedIn URL',
        },
        {
          name: 'tiktok',
          type: 'text',
          label: 'TikTok URL',
        },
      ],
    },
  ],
}
