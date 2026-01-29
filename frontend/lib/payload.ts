const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'

export async function getServices() {
  const res = await fetch(`${PAYLOAD_URL}/api/services`, { next: { revalidate: 60 } })
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
