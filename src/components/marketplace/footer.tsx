'use client'

import { Instagram, Facebook, Youtube, Mail, Phone, MapPin } from 'lucide-react'
import Image from 'next/image'
import { useMarketplace } from '@/lib/store'
import { CATEGORIES, CITIES } from '@/lib/constants'

export function Footer() {
  const { setView, setFilters } = useMarketplace()

  return (
    <footer className="mt-auto border-t border-border/60 bg-gradient-to-b from-background to-muted/40">
      {/* Top CTA strip */}
      <div className="border-b border-border/40 bg-primary/5">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h3 className="font-serif text-xl font-bold text-foreground">
                Apna business grow karein ShaadiSet pe
              </h3>
              <p className="text-sm text-muted-foreground">
                Pakistan-wide reach. Free listing for first 100 vendors.
              </p>
            </div>
            <button
              onClick={() => setView('vendor-signup')}
              className="rounded-md bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition hover:bg-primary/90"
            >
              List Your Business — Free
            </button>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-2">
            <div className="flex items-center gap-2">
              <Image src="/shaadiset-mark.svg" alt="" width={40} height={40} className="h-9 w-9 rounded-lg" />
              <div>
                <div className="font-serif text-lg font-bold text-foreground">
                  ShaadiSet
                </div>
                <div className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                  Wedding Marketplace
                </div>
              </div>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              Pakistan ka pehla wedding vendor marketplace. Photographers, decorators,
              caterers aur baaki sab vendors ek jagah — browse, compare, aur book karein.
            </p>
            <div className="mt-4 flex items-center gap-3">
              {[Instagram, Facebook, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="grid h-9 w-9 place-items-center rounded-full border border-border/60 text-muted-foreground transition hover:bg-primary hover:text-primary-foreground hover:border-primary"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Categories</h4>
            <ul className="space-y-2">
              {CATEGORIES.slice(0, 5).map((cat) => (
                <li key={cat.slug}>
                  <button
                    onClick={() => {
                      setFilters({ category: cat.slug })
                      setView('browse')
                    }}
                    className="text-sm text-muted-foreground transition hover:text-primary"
                  >
                    {cat.shortName}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Cities</h4>
            <ul className="space-y-2">
              {CITIES.map((city) => (
                <li key={city}>
                  <button
                    onClick={() => {
                      setFilters({ city })
                      setView('city')
                    }}
                    className="text-sm text-muted-foreground transition hover:text-primary"
                  >
                    Vendors in {city}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-3 text-sm font-semibold text-foreground">Contact</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0" /> hello@shaadiset.pk
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 flex-shrink-0" /> +92 300 1234567
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" /> Lahore · Karachi · Islamabad
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/40 pt-6 text-xs text-muted-foreground md:flex-row">
          <div>
            © {new Date().getFullYear()} ShaadiSet. Made with{' '}
            <span className="text-primary">♥</span> in Pakistan.
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-primary transition">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition">Terms</a>
            <a href="#" className="hover:text-primary transition">Vendor Agreement</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
