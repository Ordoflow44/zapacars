import { ArrowLeft, Clock, Calendar, User } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBlogPost, getAllBlogSlugs } from '@/lib/payload'

export const dynamic = 'force-dynamic'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'

function getImageUrl(media: { url?: string } | string | null | undefined): string {
  if (!media) return 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200'
  if (typeof media === 'string') return media
  if (media.url) {
    return media.url.startsWith('http') ? media.url : `${PAYLOAD_URL}${media.url}`
  }
  return 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=1200'
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('pl-PL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  })
}

export async function generateStaticParams() {
  const slugs = await getAllBlogSlugs()
  return slugs.map((slug: string) => ({ slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getBlogPost(slug)

  if (!post) {
    notFound()
  }

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

      {/* ARTICLE HEADER */}
      <article className="bg-black pt-24">
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img
            src={getImageUrl(post.featuredImage)}
            alt={post.title}
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto px-6 -mt-32 relative z-10">
          <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#E30613] transition-colors mb-6">
            <ArrowLeft className="w-4 h-4" />
            Wróć do artykułów
          </Link>

          {/* Meta */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-4">
            {post.category && (
              <span className="text-[#E30613] uppercase tracking-wider font-medium">{post.category}</span>
            )}
            {post.readingTime && (
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {post.readingTime} min czytania
              </span>
            )}
            {post.publishedAt && (
              <span className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                {formatDate(post.publishedAt)}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl md:text-5xl font-medium text-white mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          {post.excerpt && (
            <p className="text-xl text-gray-400 mb-8 leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {/* Author */}
          <div className="flex items-center gap-3 pb-8 mb-8 border-b border-white/10">
            <div className="w-10 h-10 rounded-full bg-[#E30613] flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">Zespół ZapaCars</p>
              <p className="text-gray-500 text-sm">Eksperci motoryzacyjni</p>
            </div>
          </div>

          {/* Content */}
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:text-white prose-headings:font-medium
              prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
              prose-p:text-gray-300 prose-p:leading-relaxed
              prose-a:text-[#E30613] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-white
              prose-ul:text-gray-300 prose-ol:text-gray-300
              prose-li:marker:text-[#E30613]
              prose-blockquote:border-[#E30613] prose-blockquote:text-gray-400
              prose-code:text-[#E30613] prose-code:bg-white/5 prose-code:px-1 prose-code:rounded
              pb-16"
            dangerouslySetInnerHTML={{ __html: post.content || '' }}
          />

          {/* CTA */}
          <div className="bg-neutral-900/50 border border-white/10 rounded-2xl p-8 mb-16">
            <h3 className="text-2xl font-medium text-white mb-3">Potrzebujesz pomocy z autem?</h3>
            <p className="text-gray-400 mb-6">Umów się na bezpłatną wycenę w naszym warsztacie.</p>
            <Link
              href="/#kontakt"
              className="inline-block bg-[#E30613] text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-red-700 transition-all"
            >
              Skontaktuj się
            </Link>
          </div>
        </div>
      </article>

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
