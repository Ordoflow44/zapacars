'use client'

import { useState, useEffect } from 'react'
import { Wrench, CheckCircle, Paintbrush } from 'lucide-react'
import { pricingData } from '@/data/pricing'

function getRandomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

export function PricingSection() {
  const [items, setItems] = useState({
    serwis: pricingData.serwisEksploatacyjny.slice(0, 7),
    hamulce: pricingData.ukladHamulcowy.slice(0, 5),
  })

  useEffect(() => {
    setItems({
      serwis: getRandomItems(pricingData.serwisEksploatacyjny, 7),
      hamulce: getRandomItems(pricingData.ukladHamulcowy, 5),
    })
  }, [])

  return (
    <section id="cennik" className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-medium text-white mb-4">CENNIK</h2>
          <p className="text-gray-400">
            Ceny orientacyjne – ostateczna kwota zależy od modelu auta i zakresu prac.
            Zadzwoń lub napisz, wycenimy bezpłatnie.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Serwis eksploatacyjny */}
          <div className="bg-neutral-900 border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <Wrench className="w-8 h-8 text-[#E30613]" />
              <h3 className="text-xl font-semibold text-white uppercase">SERWIS EKSPLOATACYJNY</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              {items.serwis.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span className="text-white">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Układ hamulcowy */}
          <div className="bg-neutral-900 border border-white/10 p-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="w-8 h-8 text-[#E30613]" />
              <h3 className="text-xl font-semibold text-white uppercase">UKŁAD HAMULCOWY</h3>
            </div>
            <ul className="space-y-3 text-gray-300">
              {items.hamulce.map((item, index) => (
                <li key={index} className="flex justify-between">
                  <span>{item.name}</span>
                  <span className="text-white">{item.price}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Lakiernictwo */}
          <div className="bg-neutral-900 border border-white/10 p-8 md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <Paintbrush className="w-8 h-8 text-[#E30613]" />
              <h3 className="text-xl font-semibold text-white uppercase">LAKIERNICTWO I RENOWACJA</h3>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {pricingData.lakiernictwo.map((item, index) => (
                <div key={index}>
                  <p className="text-gray-300 mb-2">{item.name}</p>
                  <p className="text-2xl font-semibold text-white">{item.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 mb-6">Nie znalazłeś swojej usługi? Zadzwoń – wycenimy bezpłatnie.</p>
          <a
            href="#kontakt"
            className="inline-block bg-[#E30613] text-white px-8 py-4 text-sm font-medium uppercase tracking-widest hover:bg-red-700 transition-all"
          >
            UMÓW BEZPŁATNĄ WYCENĘ
          </a>
        </div>
      </div>
    </section>
  )
}
