import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="bg-prussian text-white py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'radial-gradient(circle, #9DC241 1px, transparent 1px)',
        backgroundSize: '30px 30px'
      }} />
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold mb-6">{t('hero.title')}</h1>
        <p className="text-lg text-white/80 mb-4 max-w-2xl mx-auto">{t('hero.subtitle')}</p>
        <p className="text-sushi font-semibold mb-8">{t('hero.date')}</p>
        <Link
          to="/live"
          className="inline-block bg-sushi text-prussian font-bold px-8 py-3 rounded-full hover:bg-sushi-dark transition"
        >
          {t('hero.cta')} &rarr;
        </Link>
      </div>
    </section>
  )
}
