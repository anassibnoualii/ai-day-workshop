import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative bg-prussian-dark text-white overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-prussian-dark/80" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-sushi/5 blur-[120px]" />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-28 md:py-36 text-center relative z-10">
        <div className="inline-flex items-center gap-2 bg-sushi/10 border border-sushi/20 rounded-full px-4 py-1.5 mb-8">
          <div className="w-2 h-2 rounded-full bg-sushi animate-pulse" />
          <span className="text-sushi text-xs font-semibold tracking-wide">{t('hero.date')}</span>
        </div>
        <h1 className="font-display text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
          {t('hero.title')}
        </h1>
        <p className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
          {t('hero.subtitle')}
        </p>
        <Link
          to="/live"
          className="inline-flex items-center gap-2 bg-sushi text-prussian-dark font-bold px-8 py-4 rounded-2xl hover:bg-sushi-dark hover:shadow-lg hover:shadow-sushi/20 transition-all duration-300 text-sm tracking-wide"
        >
          {t('hero.cta')}
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
        </Link>
      </div>
    </section>
  )
}
