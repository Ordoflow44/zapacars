import { Phone, Mail, Wrench, Paintbrush, Sparkles, CheckCircle, Star } from 'lucide-react'
import { getSiteSettings } from '@/lib/payload'
import { PricingSection } from '@/components/PricingSection'

// Force dynamic rendering - don't try to build static page
export const dynamic = 'force-dynamic'

const PAYLOAD_URL = process.env.NEXT_PUBLIC_PAYLOAD_URL || 'http://localhost:3001'

// Default images (fallbacks)
const defaultImages = {
  serwis: 'https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=800',
  lakiernictwo: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?q=80&w=800',
  renowacja: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800',
}

function getImageUrl(media: { url?: string } | null | undefined, fallback: string): string {
  if (media?.url) {
    return media.url.startsWith('http') ? media.url : `${PAYLOAD_URL}${media.url}`
  }
  return fallback
}

export default async function Home() {
  // Try to fetch CMS settings, fall back to defaults if unavailable
  let settings = null
  try {
    settings = await getSiteSettings()
  } catch {
    // CMS unavailable - use default images
  }
  const centreImages = settings?.centreImages || {}

  const serwisImage = getImageUrl(centreImages.serwisImage, defaultImages.serwis)
  const lakiernistwoImage = getImageUrl(centreImages.lakiernistwoImage, defaultImages.lakiernictwo)
  const renowacjaImage = getImageUrl(centreImages.renowacjaImage, defaultImages.renowacja)

  return (
    <>
      {/* NAVIGATION */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="text-2xl font-bold text-white tracking-tight">
              ZAPA<span className="text-[#E30613]">CARS</span>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <a href="#serwis" className="hover:text-[#E30613] transition-colors">SERWIS</a>
            <a href="#lakiernictwo" className="hover:text-[#E30613] transition-colors">LAKIERNICTWO</a>
            <a href="#renowacja" className="hover:text-[#E30613] transition-colors">RENOWACJA</a>
            <a href="#cennik" className="hover:text-[#E30613] transition-colors">CENNIK</a>
            <a href="#o-nas" className="hover:text-[#E30613] transition-colors">O NAS</a>
            <a href="#faq" className="hover:text-[#E30613] transition-colors">FAQ</a>
            <a href="#kontakt" className="bg-[#E30613] text-white px-6 py-2 hover:bg-red-700 transition-colors">KONTAKT</a>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center bg-black pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent z-10"></div>
        <div className="absolute inset-0 opacity-40">
          <img
            src="/Hero_supra.webp"
            alt="Toyota Supra ZapaCars"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-20 max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            <p className="text-[#E30613] text-sm uppercase tracking-widest mb-4">WARSZTAT SAMOCHODOWY • MYSŁOWICE</p>
            <h1 className="text-5xl md:text-7xl font-medium mb-6 leading-tight">
              <span className="text-white">SERWIS.</span><br/>
              <span className="text-white">LAKIERNICTWO.</span><br/>
              <span className="bg-gradient-to-r from-[#E30613] to-white bg-clip-text text-transparent">RENOWACJA.</span>
            </h1>
            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Kompleksowy warsztat samochodowy w Mysłowicach. Serwis bieżący, profesjonalne lakiernictwo
              i renowacja klasyków – wszystko pod jednym dachem.
            </p>
            <div className="flex flex-wrap gap-4">
              <a href="#cennik" className="bg-[#E30613] text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-red-700 transition-all">
                SPRAWDŹ OFERTĘ
              </a>
              <a href="#kontakt" className="border border-white/20 text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:border-[#E30613] hover:text-[#E30613] transition-all">
                UMÓW BEZPŁATNĄ DIAGNOZĘ
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CENTRUM NAPRAW */}
      <section id="uslugi" className="bg-neutral-950 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-16">
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-4 tracking-tight">CENTRUM NAPRAW</h2>
            <p className="text-gray-400 text-lg">
              Kompleksowy warsztat samochodowy w Mysłowicach. Serwis bieżący, profesjonalne lakiernictwo
              i renowacja klasyków – wszystko pod jednym dachem.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Serwis */}
            <a href="#cennik" id="serwis" className="group glass-card-image cursor-pointer block">
              <div className="aspect-video relative overflow-hidden rounded-t-[19px]">
                <img
                  src={serwisImage}
                  alt="Serwis"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <Wrench className="absolute bottom-4 left-4 w-12 h-12 text-[#E30613] drop-shadow-[0_0_12px_rgba(227,6,19,0.6)]" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-[#E30613] transition-colors">SERWIS</h3>
                <p className="text-gray-400 leading-relaxed">
                  Kompleksowy serwis eksploatacyjny, diagnostyka komputerowa, naprawa układów hamulcowych i zawieszenia.
                </p>
              </div>
            </a>

            {/* Lakiernictwo */}
            <a href="#cennik" id="lakiernictwo" className="group glass-card-image cursor-pointer block">
              <div className="aspect-video relative overflow-hidden rounded-t-[19px]">
                <img
                  src={lakiernistwoImage}
                  alt="Lakiernictwo"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <Paintbrush className="absolute bottom-4 left-4 w-12 h-12 text-[#E30613] drop-shadow-[0_0_12px_rgba(227,6,19,0.6)]" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-[#E30613] transition-colors">LAKIERNICTWO</h3>
                <p className="text-gray-400 leading-relaxed">
                  Profesjonalne naprawy lakiernicze po stłuczkach, renowacja elementów, kompleksowe malowanie.
                </p>
              </div>
            </a>

            {/* Renowacja */}
            <a href="#cennik" id="renowacja" className="group glass-card-image cursor-pointer block">
              <div className="aspect-video relative overflow-hidden rounded-t-[19px]">
                <img
                  src={renowacjaImage}
                  alt="Renowacja"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                <Sparkles className="absolute bottom-4 left-4 w-12 h-12 text-[#E30613] drop-shadow-[0_0_12px_rgba(227,6,19,0.6)]" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-[#E30613] transition-colors">RENOWACJA</h3>
                <p className="text-gray-400 leading-relaxed">
                  Robimy samochody, których inne warsztaty się boją. Klasyki, niezwykłe modele, projekty od podstaw.
                </p>
              </div>
            </a>
          </div>

          <div className="text-center mt-12">
            <a href="#kontakt" className="inline-block bg-[#E30613] text-white px-10 py-5 text-sm font-medium uppercase tracking-widest hover:bg-red-700 transition-all hover:shadow-[0_0_30px_rgba(227,6,19,0.4)]">
              UMÓW BEZPŁATNĄ WYCENĘ
            </a>
          </div>
        </div>
      </section>

      {/* CENNIK */}
      <PricingSection />

      {/* O NAS */}
      <section id="o-nas" className="relative bg-neutral-950 py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/wlasciciele-supra.webp"
            alt="Właściciele ZapaCars przy Toyota Supra"
            className="w-full h-full object-cover opacity-60"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent"></div>

        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-8">
            BENZYNĘ MAMY WE KRWI
          </h2>

          <div className="max-w-3xl">
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Poznaj historię, która zaczęła się od jednej <strong className="text-white">TOYOTA SUPRA</strong> i dwóch kuzynów z
              niemożliwą do ugaszenia pasją do czterech kółek.
            </p>

            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              <strong className="text-white">AREK I MACIEJ</strong> – jeden z pełnym placem samochodów, drugi poszukujący
              swojego wymarzonego auta – wspólnie kupili ten legendarny model. To był moment, który zmienił wszystko.
            </p>

            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
              Szybko zrozumieliśmy, że to coś więcej niż jedno auto. To była szansa, żeby pasję przekuć w misję – pomagać
              innym spełniać motoryzacyjne marzenia. Łącząc świetną lokalizację w Mysłowicach z naszym doświadczeniem,
              stworzyliśmy miejsce wyjątkowe. Tak powstało <strong className="text-[#E30613]">ZAPACARS</strong>.
            </p>

            <div className="flex items-center gap-12 mb-8">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="w-6 h-6 text-[#E30613]" />
                  <span className="text-3xl font-bold text-white">100%</span>
                </div>
                <p className="text-gray-400 text-sm uppercase tracking-wide">CZYSTEJ PASJI</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="bg-black py-20">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">NAJCZĘŚCIEJ ZADAWANE PYTANIA</h2>
            <p className="text-gray-400">
              Odpowiedzi na pytania, które najczęściej słyszymy od naszych klientów.
            </p>
          </div>

          <div className="space-y-4">
            {/* FAQ Item 1 */}
            <details className="group glass-faq">
              <summary className="flex justify-between items-center cursor-pointer p-6 text-white font-medium">
                <span>Czy muszę umawiać się na wizytę?</span>
                <span className="text-[#E30613] group-open:rotate-45 transition-transform duration-300 text-2xl">+</span>
              </summary>
              <div className="px-6 pb-6 text-gray-400">
                Zalecamy wcześniejszy kontakt telefoniczny, abyśmy mogli zarezerwować dla Ciebie czas.
                W nagłych przypadkach staramy się pomóc od ręki, ale nie zawsze jest to możliwe.
              </div>
            </details>

            {/* FAQ Item 2 */}
            <details className="group glass-faq">
              <summary className="flex justify-between items-center cursor-pointer p-6 text-white font-medium">
                <span>Jak długo trwa standardowy serwis?</span>
                <span className="text-[#E30613] group-open:rotate-45 transition-transform duration-300 text-2xl">+</span>
              </summary>
              <div className="px-6 pb-6 text-gray-400">
                Wymiana oleju i filtrów to zazwyczaj 30-60 minut. Bardziej złożone naprawy mogą zająć
                od kilku godzin do kilku dni – zawsze informujemy o przewidywanym czasie.
              </div>
            </details>

            {/* FAQ Item 3 */}
            <details className="group glass-faq">
              <summary className="flex justify-between items-center cursor-pointer p-6 text-white font-medium">
                <span>Czy mogę dostarczyć własne części?</span>
                <span className="text-[#E30613] group-open:rotate-45 transition-transform duration-300 text-2xl">+</span>
              </summary>
              <div className="px-6 pb-6 text-gray-400">
                Tak, akceptujemy części dostarczone przez klienta. Pamiętaj jednak, że w takim przypadku
                gwarancja obejmuje tylko wykonaną usługę, nie samą część.
              </div>
            </details>

            {/* FAQ Item 4 */}
            <details className="group glass-faq">
              <summary className="flex justify-between items-center cursor-pointer p-6 text-white font-medium">
                <span>Jakie marki samochodów obsługujecie?</span>
                <span className="text-[#E30613] group-open:rotate-45 transition-transform duration-300 text-2xl">+</span>
              </summary>
              <div className="px-6 pb-6 text-gray-400">
                Obsługujemy wszystkie marki – od popularnych europejskich i azjatyckich po amerykańskie muscle cars
                i klasyki. Specjalizujemy się również w autach sportowych i tuningowanych.
              </div>
            </details>

            {/* FAQ Item 5 */}
            <details className="group glass-faq">
              <summary className="flex justify-between items-center cursor-pointer p-6 text-white font-medium">
                <span>Czy udzielacie gwarancji na naprawy?</span>
                <span className="text-[#E30613] group-open:rotate-45 transition-transform duration-300 text-2xl">+</span>
              </summary>
              <div className="px-6 pb-6 text-gray-400">
                Tak, na wszystkie wykonane przez nas usługi udzielamy gwarancji. Okres gwarancji zależy od
                rodzaju naprawy – szczegóły ustalamy indywidualnie.
              </div>
            </details>

            {/* FAQ Item 6 */}
            <details className="group glass-faq">
              <summary className="flex justify-between items-center cursor-pointer p-6 text-white font-medium">
                <span>Czy oferujecie bezpłatną wycenę?</span>
                <span className="text-[#E30613] group-open:rotate-45 transition-transform duration-300 text-2xl">+</span>
              </summary>
              <div className="px-6 pb-6 text-gray-400">
                Tak! Wycena jest zawsze bezpłatna i niezobowiązująca. Zadzwoń lub przyjedź – chętnie
                obejrzymy auto i przedstawimy kosztorys.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* BLOG - 3 artykuły */}
      <section id="blog" className="bg-neutral-950 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12">
            <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">WIEDZA I PORADY</h2>
            <p className="text-gray-400">
              Praktyczne porady motoryzacyjne od mechaników z ZapaCars. Dowiedz się, jak dbać o swój samochód.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Article 1 */}
            <article className="group glass-blog">
              <div className="overflow-hidden rounded-xl mb-4 aspect-video">
                <img
                  src="https://images.unsplash.com/photo-1625047509248-ec889cbff17f?q=80&w=600"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  alt="Wymiana oleju"
                />
              </div>
              <span className="text-xs text-[#E30613] block mb-2">Serwis • 5 min czytania</span>
              <h3 className="text-xl font-semibold text-white group-hover:text-[#E30613] transition-colors mb-2">
                Ile kosztuje wymiana oleju? Cennik 2026
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2">
                Wymiana oleju kosztuje od 100 do 300 zł. Sprawdź, od czego zależy cena i jak nie przepłacać w warsztacie.
              </p>
            </article>

            {/* Article 2 */}
            <article className="group glass-blog">
              <div className="overflow-hidden rounded-xl mb-4 aspect-video">
                <img
                  src="https://images.unsplash.com/photo-1632823469636-2b0962d19bb8?q=80&w=600"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  alt="Wymiana klocków hamulcowych"
                />
              </div>
              <span className="text-xs text-[#E30613] block mb-2">Hamulce • 4 min czytania</span>
              <h3 className="text-xl font-semibold text-white group-hover:text-[#E30613] transition-colors mb-2">
                Jak często wymieniać klocki hamulcowe?
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2">
                Klocki wymienia się co 30 000-60 000 km. Poznaj objawy zużycia, kiedy jechać do warsztatu.
              </p>
            </article>

            {/* Article 3 */}
            <article className="group glass-blog">
              <div className="overflow-hidden rounded-xl mb-4 aspect-video">
                <img
                  src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=600"
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100"
                  alt="Tarcza hamulcowa"
                />
              </div>
              <span className="text-xs text-[#E30613] block mb-2">Bezpieczeństwo • 3 min czytania</span>
              <h3 className="text-xl font-semibold text-white group-hover:text-[#E30613] transition-colors mb-2">
                5 oznak, że Twoje hamulce wymagają wymiany
              </h3>
              <p className="text-gray-500 text-sm line-clamp-2">
                Piszczenie, wibracje, dłuższa droga hamowania? Poznaj sygnały ostrzegawcze, których nie wolno ignorować.
              </p>
            </article>
          </div>

          <div className="text-center mt-12">
            <a href="/blog" className="inline-block border border-white/20 text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:border-[#E30613] hover:text-[#E30613] transition-all">
              ZOBACZ WIĘCEJ PORAD
            </a>
          </div>
        </div>
      </section>

      {/* OPINIE KLIENTÓW */}
      <section id="opinie" className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-6 text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">CO MÓWIĄ NASI KLIENCI</h2>
          <p className="text-gray-400">
            Opinie z Google od kierowców, którzy nam zaufali.
          </p>
        </div>
        <div className="w-full px-4 md:px-8">
          <div className="elfsight-app-7563ee5a-4fb4-4203-815e-dffe9f9456d6" data-elfsight-app-lazy></div>
        </div>
      </section>

      {/* KONTAKT */}
      <section id="kontakt" className="bg-neutral-950 border-t border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h2 className="text-3xl font-semibold text-white mb-2 tracking-tight">SKONTAKTUJ SIĘ</h2>
            <p className="text-gray-400 mb-8 text-sm">Wypełnij formularz. Odpowiemy w ciągu kilku godzin roboczych.</p>

            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input type="text" placeholder="Imię" required className="bg-neutral-900 border border-white/10 p-4 text-white text-sm focus:border-[#E30613] focus:outline-none transition-colors w-full" />
                <input type="tel" placeholder="Telefon" required className="bg-neutral-900 border border-white/10 p-4 text-white text-sm focus:border-[#E30613] focus:outline-none transition-colors w-full" />
              </div>
              <input type="email" placeholder="Email" className="bg-neutral-900 border border-white/10 p-4 text-white text-sm focus:border-[#E30613] focus:outline-none transition-colors w-full" />
              <textarea rows={4} placeholder="Wiadomość / Opisz problem z autem" className="bg-neutral-900 border border-white/10 p-4 text-white text-sm focus:border-[#E30613] focus:outline-none transition-colors w-full"></textarea>
              <button type="submit" className="bg-[#E30613] text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-red-700 transition-all w-full md:w-auto">
                Wyślij Wiadomość
              </button>
            </form>
          </div>

          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-white font-semibold text-lg mb-4 uppercase tracking-wide">Adres warsztatu</h3>
                <address className="text-gray-400 text-sm leading-relaxed not-italic">
                  <strong>ZapaCars</strong><br />
                  ul. Fabryczna 12<br />
                  41-404 Mysłowice<br />
                  Polska
                </address>
                <p className="text-gray-500 text-xs mt-3">
                  <strong>Godziny otwarcia:</strong><br />
                  Pon-Pt: 8:00 - 16:00<br />
                  Sob-Nd: Zamknięte
                </p>
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg mb-4 uppercase tracking-wide">Kontakt</h3>
                <div className="text-gray-400 text-sm leading-relaxed flex flex-col gap-2">
                  <a href="tel:+48666959570" className="hover:text-[#E30613] transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4" /> 666 959 570 (Maciej)
                  </a>
                  <a href="tel:+48730140666" className="hover:text-[#E30613] transition-colors flex items-center gap-2">
                    <Phone className="w-4 h-4" /> 730 140 666 (Arek)
                  </a>
                  <a href="mailto:kontakt.zapacars@gmail.com" className="hover:text-[#E30613] transition-colors flex items-center gap-2 mt-2">
                    <Mail className="w-4 h-4" /> kontakt.zapacars@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="w-full h-64 bg-neutral-900 border border-white/10">
              <iframe
                width="100%"
                height="100%"
                src="https://maps.google.com/maps?q=Fabryczna%2012%20Mysłowice&t=&z=15&ie=UTF8&iwloc=&output=embed"
                style={{ filter: 'grayscale(100%) invert(92%) contrast(83%)', border: 0 }}
                loading="lazy"
                title="Mapa ZapaCars"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 pt-8 mt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>© 2026 ZapaCars. Wszelkie prawa zastrzeżone.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="/polityka-prywatnosci" className="hover:text-[#E30613] transition-colors">Polityka Prywatności</a>
            <a href="/regulamin" className="hover:text-[#E30613] transition-colors">Regulamin</a>
          </div>
        </div>
      </section>
    </>
  )
}
