import { ArrowLeft, Clock, Calendar } from 'lucide-react'
import Link from 'next/link'
import { getBlogPosts } from '@/lib/payload'

export const dynamic = 'force-dynamic'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'

function getImageUrl(media: { url?: string } | string | null | undefined): string {
  if (!media) return 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800'
  if (typeof media === 'string') return media
  if (media.url) {
    return media.url.startsWith('http') ? media.url : `${PAYLOAD_URL}${media.url}`
  }
  return 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800'
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export default async function BlogPage() {
  const posts = await getBlogPosts(50)

  return (
    <>
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="text-2xl font-bold text-white tracking-tight">
              ZAPA<span className="text-[#E30613]">CARS</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <Link href="/#serwis" className="hover:text-[#E30613] transition-colors">SERWIS</Link>
            <Link href="/#lakiernictwo" className="hover:text-[#E30613] transition-colors">LAKIERNICTWO</Link>
            <Link href="/#renowacja" className="hover:text-[#E30613] transition-colors">RENOWACJA</Link>
            <Link href="/#cennik" className="hover:text-[#E30613] transition-colors">CENNIK</Link>
            <Link href="/#o-nas" className="hover:text-[#E30613] transition-colors">O NAS</Link>
            <Link href="/blog" className="text-[#E30613]">BLOG</Link>
            <Link href="/#kontakt" className="bg-[#E30613] text-white px-6 py-2 hover:bg-red-700 transition-colors">KONTAKT</Link>
          </div>
        </div>
      </nav>

      {/* HEADER */}
      <section className="bg-black pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-6">
          <Link href="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#E30613] transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" />
            Powrót do strony głównej
          </Link>
          <h1 className="text-4xl md:text-6xl font-medium text-white mb-4">WIEDZA I PORADY</h1>
          <p className="text-gray-400 text-lg max-w-2xl">
            Praktyczne porady motoryzacyjne od mechaników z ZapaCars. Dowiedz się, jak dbać o swój samochód.
          </p>
        </div>
      </section>

      {/* ARTICLES GRID */}
      <section className="bg-neutral-950 py-16">
        <div className="max-w-7xl mx-auto px-6">
          {posts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post: {
                id: string
                slug: string
                title: string
                excerpt?: string
                category?: string
                readingTime?: number
                publishedAt?: string
                featuredImage?: { url?: string } | string
              }) => (
                <Link key={post.id} href={`/blog/${post.slug}`} className="group">
                  <article className="bg-neutral-900/50 border border-white/5 rounded-2xl overflow-hidden hover:border-[#E30613]/30 transition-all duration-300">
                    <div className="aspect-video relative overflow-hidden">
                      <img
                        src={getImageUrl(post.featuredImage)}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                        {post.category && (
                          <span className="text-[#E30613] uppercase tracking-wider">{post.category}</span>
                        )}
                        {post.readingTime && (
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {post.readingTime} min
                          </span>
                        )}
                      </div>
                      <h2 className="text-xl font-semibold text-white group-hover:text-[#E30613] transition-colors mb-3 line-clamp-2">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="text-gray-500 text-sm line-clamp-2 mb-4">
                          {post.excerpt}
                        </p>
                      )}
                      {post.publishedAt && (
                        <div className="flex items-center gap-1 text-xs text-gray-600">
                          <Calendar className="w-3 h-3" />
                          {formatDate(post.publishedAt)}
                        </div>
                      )}
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg mb-4">Brak opublikowanych artykułów.</p>
              <p className="text-gray-600">Wróć wkrótce po nowe porady motoryzacyjne!</p>
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black border-t border-white/10 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>© 2026 ZapaCars. Wszelkie prawa zastrzeżone.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/polityka-prywatnosci" className="hover:text-[#E30613] transition-colors">Polityka Prywatności</Link>
            <Link href="/regulamin" className="hover:text-[#E30613] transition-colors">Regulamin</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
