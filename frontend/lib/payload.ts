const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'

export async function getMedia(id: string) {
  const res = await fetch(`${PAYLOAD_URL}/api/media/${id}`, { next: { revalidate: 60 } })
  if (!res.ok) return null
  return res.json()
}

export async function getServices() {
  const res = await fetch(`${PAYLOAD_URL}/api/services`, { next: { revalidate: 60 } })
  if (!res.ok) return []
  const data = await res.json()
  return data.docs || []
}

export async function getFeaturedServices() {
  const res = await fetch(`${PAYLOAD_URL}/api/services?where[featured][equals]=true`, { next: { revalidate: 60 } })
  if (!res.ok) return []
  const data = await res.json()
  return data.docs || []
}

export async function getBlogPosts(limit = 10) {
  const res = await fetch(`${PAYLOAD_URL}/api/blog?limit=${limit}&where[status][equals]=published`, { next: { revalidate: 60 } })
  if (!res.ok) return []
  const data = await res.json()
  return data.docs || []
}

export async function getGallery(limit = 10) {
  const res = await fetch(`${PAYLOAD_URL}/api/gallery?limit=${limit}`, { next: { revalidate: 60 } })
  if (!res.ok) return []
  const data = await res.json()
  return data.docs || []
}

export async function getSiteSettings() {
  const res = await fetch(`${PAYLOAD_URL}/api/globals/site-settings`, { next: { revalidate: 60 } })
  if (!res.ok) return null
  return res.json()
}
