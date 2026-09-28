'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Coffee,
  Menu,
  X,
  MapPin,
  Clock,
  Mail,
  Instagram,
  Facebook,
  ChevronLeft,
  ChevronRight,
  Star,
  Cake,
  Sandwich,
  Send,
} from 'lucide-react'

interface MenuItem {
  id: number
  category: string
  name: string
  description: string
  price: string
}

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#menu', label: 'Menú' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#galeria', label: 'Galería' },
  { href: '#contacto', label: 'Contacto' },
]

const stats = [
  { value: '15+', label: 'años sirviendo café de calidad' },
  { value: '47', label: 'productores directos' },
  { value: '9,200+', label: 'tazas al mes' },
  { value: '100%', label: 'granos de origen certificado' },
]

const testimonials = [
  {
    name: 'María García',
    initials: 'MG',
    role: 'Diseñadora Gráfica',
    content: 'El mejor café de especialidad que he probado en la ciudad. El ambiente es perfecto para trabajar y el personal siempre te recomienda nuevos orígenes.',
    rating: 5,
  },
  {
    name: 'Carlos Rodríguez',
    initials: 'CR',
    role: 'Desarrollador de Software',
    content: 'Mi oficina improvisada favorita. El wifi es excelente, los pasteles son increíbles y siempre descubro un nuevo café de origen que me sorprende.',
    rating: 5,
  },
  {
    name: 'Ana Martínez',
    initials: 'AM',
    role: 'Profesora Universitaria',
    content: 'Cada visita es una experiencia. Los baristas conocen la historia de cada grano y te la cuentan con pasión. El croissant de chocolate es adictivo.',
    rating: 5,
  },
]

const categoryIcons: Record<string, React.ReactNode> = {
  'Café de Origen': <Coffee className="w-6 h-6" />,
  'Lattes Signature': <Coffee className="w-6 h-6" />,
  'Pasteles Artesanales': <Cake className="w-6 h-6" />,
  'Sándwiches del Día': <Sandwich className="w-6 h-6" />,
}

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [activeCategory, setActiveCategory] = useState('Café de Origen')
  const [testimonialIndex, setTestimonialIndex] = useState(0)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    fetch('/api/menu')
      .then((res) => res.json())
      .then((data) => setMenuItems(data))
      .catch(console.error)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = [...new Set(menuItems.map((item) => item.category))]
  const filteredItems = menuItems.filter((item) => item.category === activeCategory)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormStatus('sending')

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_CONSTRUCTOR_API}/v1/forms/${process.env.NEXT_PUBLIC_PROJECT_ID}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        }
      )
      if (res.ok) {
        setFormStatus('success')
      } else {
        setFormStatus('error')
      }
    } catch {
      setFormStatus('error')
    }
  }

  const nextTestimonial = () => setTestimonialIndex((i) => (i + 1) % testimonials.length)
  const prevTestimonial = () => setTestimonialIndex((i) => (i - 1 + testimonials.length) % testimonials.length)

  return (
    <div className="min-h-screen bg-cream">
      {/* Sticky Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'bg-cream/95 backdrop-blur-sm shadow-sm' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <a href="#inicio" className="flex items-center gap-2">
              <Coffee className="w-8 h-8 text-coffee" />
              <span className="font-serif text-2xl font-semibold text-coffee">Café Aroma</span>
            </a>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-charcoal hover:text-coffee transition-colors font-medium"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-coffee"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-cream/95 backdrop-blur-sm shadow-lg transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            mobileMenuOpen
              ? 'opacity-100 translate-y-0 pointer-events-auto'
              : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
        >
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-lg text-charcoal hover:text-coffee transition-all"
                style={{ transitionDelay: mobileMenuOpen ? `${index * 60}ms` : '0ms' }}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Split */}
      <section id="inicio" className="min-h-screen pt-20 flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1 text-center lg:text-left">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-coffee leading-tight mb-6">
                El café que cuenta historias
              </h1>
              <p className="text-lg sm:text-xl text-mocha mb-8 max-w-xl mx-auto lg:mx-0">
                Granos de origen único, tostados artesanalmente en nuestro espacio en el corazón de la ciudad.
              </p>
              <Button
                asChild
                className="bg-coffee text-cream hover:bg-coffee/90 text-lg px-8 py-6 rounded-full"
              >
                <a href="#menu">Explora nuestro menú</a>
              </Button>
            </div>
            <div className="order-1 lg:order-2 relative">
              <div className="aspect-square max-w-lg mx-auto relative rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/hero.png"
                  alt="Café de especialidad recién preparado con vapor visible"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-sand/50 rounded-full blur-2xl" />
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-mocha/30 rounded-full blur-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Banner */}
      <section className="py-16 bg-coffee">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex items-center justify-center gap-3">
                  <span className="font-serif text-3xl sm:text-4xl font-bold text-cream">{stat.value}</span>
                  {index < stats.length - 1 && (
                    <span className="hidden lg:block w-2 h-2 rounded-full bg-sand/50" />
                  )}
                </div>
                <p className="text-sand text-sm sm:text-base mt-2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Menu Categories */}
      <section id="menu" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee mb-4">Nuestro Menú</h2>
            <p className="text-mocha max-w-2xl mx-auto">
              Cada producto es seleccionado con pasión. Nuestro café viaja desde fincas familiares hasta tu taza.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {(categories.length > 0 ? categories : ['Café de Origen', 'Lattes Signature', 'Pasteles Artesanales', 'Sándwiches del Día']).map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
                  activeCategory === category
                    ? 'bg-coffee text-cream'
                    : 'bg-sand/30 text-charcoal hover:bg-sand/50'
                }`}
              >
                {categoryIcons[category]}
                <span className="hidden sm:inline">{category}</span>
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="bg-white border-sand/30 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-serif text-xl font-semibold text-coffee">{item.name}</h3>
                    <span className="text-mocha font-medium text-sm whitespace-nowrap ml-2">
                      {item.price}
                    </span>
                  </div>
                  <p className="text-charcoal text-sm leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Split */}
      <section id="nosotros" className="py-20 bg-sand/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="aspect-[4/5] relative rounded-2xl overflow-hidden shadow-xl border-8 border-white">
                <Image
                  src="/images/feature.png"
                  alt="Proceso de preparación artesanal de café en Café Aroma"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-48 h-48 bg-coffee/10 rounded-full blur-2xl -z-10" />
            </div>
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee mb-6">
                Historia de Café Aroma
              </h2>
              <div className="space-y-4 text-charcoal leading-relaxed">
                <p>
                  Fundada en 2008 por Sofia Mendoza, una barista colombiana con pasión por conectar consumidores con caficultores pequeños, Café Aroma nació con una promesa: servir café que importa.
                </p>
                <p>
                  Cada taza cuenta la historia de una familia, una montaña, una cosecha. Hoy contamos historias diarias con 47 productores directos en cinco continentes.
                </p>
                <p className="font-medium text-coffee">
                  Nuestra misión es simple: café de excelencia y personas genuinas.
                </p>
              </div>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-mocha/20 flex items-center justify-center text-coffee font-bold text-xl font-serif">
                  SM
                </div>
                <div>
                  <p className="font-serif font-semibold text-coffee">Fundadora</p>
                  <p className="text-mocha text-sm">Barista colombiana, apasionada del café de origen</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section id="galeria" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee mb-4">Galería</h2>
            <p className="text-mocha max-w-2xl mx-auto">
              Descubre nuestro espacio, nuestros productos y la pasión que ponemos en cada detalle.
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="col-span-2 row-span-2 rounded-2xl overflow-hidden relative aspect-square">
              <Image
                src="/images/feature.png"
                alt="Interior acogedor de Café Aroma"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-cream">
                <p className="font-serif text-2xl">Nuestro Interior</p>
                <p className="text-sand text-sm mt-1">Un espacio diseñado para ti</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden relative aspect-square">
              <Image
                src="/images/hero.png"
                alt="Café de especialidad preparado artesanalmente"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee/50 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-cream">
                <p className="font-serif text-lg">Café Artesanal</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-mocha to-coffee aspect-square flex items-center justify-center">
              <div className="text-center text-cream p-4">
                <Coffee className="w-10 h-10 mx-auto mb-2" />
                <p className="font-serif text-lg">Latte Art</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-sand to-cream aspect-square flex items-center justify-center">
              <div className="text-center text-coffee p-4">
                <Cake className="w-10 h-10 mx-auto mb-2" />
                <p className="font-serif text-lg">Pastelería</p>
              </div>
            </div>
            <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-coffee/80 to-charcoal aspect-square flex items-center justify-center">
              <div className="text-center text-cream p-4">
                <Sandwich className="w-10 h-10 mx-auto mb-2" />
                <p className="font-serif text-lg">Cocina Fresca</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="py-20 bg-coffee">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-cream text-center mb-12">
            Lo que dicen nuestros clientes
          </h2>
          <div className="relative">
            <div className="bg-cream/10 backdrop-blur rounded-2xl p-8 sm:p-12">
              <div className="flex justify-center mb-4">
                {[...Array(testimonials[testimonialIndex].rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-sand fill-sand" />
                ))}
              </div>
              <blockquote className="text-center">
                <p className="text-cream text-lg sm:text-xl italic mb-6 leading-relaxed">
                  &quot;{testimonials[testimonialIndex].content}&quot;
                </p>
                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-sand flex items-center justify-center text-coffee font-bold text-lg">
                    {testimonials[testimonialIndex].initials}
                  </div>
                  <div className="text-left">
                    <p className="text-cream font-semibold">{testimonials[testimonialIndex].name}</p>
                    <p className="text-sand text-sm">{testimonials[testimonialIndex].role}</p>
                  </div>
                </div>
              </blockquote>
            </div>
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={prevTestimonial}
                className="w-12 h-12 rounded-full bg-cream/10 hover:bg-cream/20 text-cream flex items-center justify-center transition-colors"
                aria-label="Testimonio anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setTestimonialIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === testimonialIndex ? 'bg-cream w-6' : 'bg-cream/40'
                    }`}
                    aria-label={`Ir a testimonio ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={nextTestimonial}
                className="w-12 h-12 rounded-full bg-cream/10 hover:bg-cream/20 text-cream flex items-center justify-center transition-colors"
                aria-label="Testimonio siguiente"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Split */}
      <section id="contacto" className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee mb-6">Visítanos</h2>
              <p className="text-charcoal mb-8">
                Te esperamos con un café recién preparado y una sonrisa. Escríbenos o ven a conocernos.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-sand/30 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-coffee" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-coffee">Ubicación</h3>
                    <p className="text-charcoal">Centro histórico de la ciudad</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-sand/30 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-coffee" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-coffee">Horarios</h3>
                    <p className="text-charcoal">Lun - Vie: 7am - 8pm</p>
                    <p className="text-charcoal">Sáb: 8am - 10pm</p>
                    <p className="text-charcoal">Dom: 8am - 6pm</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-sand/30 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-coffee" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-coffee">Contacto</h3>
                    <p className="text-charcoal">Usa el formulario o visítanos</p>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <iframe
                  src="https://maps.google.com/maps?q=Specialty+Coffee+Shop&output=embed"
                  className="w-full h-64 rounded-xl border border-sand/30"
                  allowFullScreen
                  loading="lazy"
                  title="Ubicación de Café Aroma"
                />
              </div>
            </div>

            <div>
              <Card className="bg-white border-sand/30 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="font-serif text-2xl font-semibold text-coffee mb-6">Envíanos un mensaje</h3>
                  {formStatus === 'success' ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8 text-green-600" />
                      </div>
                      <p className="text-lg font-medium text-coffee">✓ Mensaje enviado</p>
                      <p className="text-mocha mt-2">Te contactaremos pronto</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                          Nombre
                        </label>
                        <Input
                          id="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="border-sand/50 focus:border-coffee focus:ring-coffee"
                          placeholder="Tu nombre"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                          Email
                        </label>
                        <Input
                          id="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="border-sand/50 focus:border-coffee focus:ring-coffee"
                          placeholder="tu@email.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                          Mensaje
                        </label>
                        <Textarea
                          id="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="border-sand/50 focus:border-coffee focus:ring-coffee resize-none"
                          placeholder="¿En qué podemos ayudarte?"
                        />
                      </div>
                      {formStatus === 'error' && (
                        <p className="text-red-600 text-sm">Error al enviar. Inténtalo de nuevo.</p>
                      )}
                      <Button
                        type="submit"
                        disabled={formStatus === 'sending'}
                        className="w-full bg-coffee text-cream hover:bg-coffee/90 py-6"
                      >
                        {formStatus === 'sending' ? 'Enviando…' : 'Enviar mensaje'}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-charcoal py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Coffee className="w-8 h-8 text-cream" />
                <span className="font-serif text-2xl font-semibold text-cream">Café Aroma</span>
              </div>
              <p className="text-sand/80 text-sm leading-relaxed">
                Cafetería de especialidad que celebra los orígenes premium del café y la repostería artesanal.
              </p>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-cream mb-4">Navegación</h4>
              <ul className="space-y-2">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a href={link.href} className="text-sand/80 hover:text-cream transition-colors text-sm">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-cream mb-4">Horarios</h4>
              <ul className="space-y-2 text-sand/80 text-sm">
                <li>Lun - Vie: 7am - 8pm</li>
                <li>Sábado: 8am - 10pm</li>
                <li>Domingo: 8am - 6pm</li>
                <li className="text-mocha">Festivos: Cerrado</li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg font-semibold text-cream mb-4">Síguenos</h4>
              <div className="flex gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center text-cream transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-cream/10 hover:bg-cream/20 flex items-center justify-center text-cream transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              </div>
              <p className="text-sand/60 text-sm mt-6">© 2024 Café Aroma. Todos los derechos reservados.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
