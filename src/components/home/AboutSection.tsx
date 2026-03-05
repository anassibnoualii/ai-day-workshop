import { useTranslation } from 'react-i18next'

export default function AboutSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1.5 h-8 rounded-full bg-sushi" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-prussian">{t('about.title')}</h2>
        </div>
        <p className="text-dark-slate/80 leading-relaxed text-lg pl-5 border-l-2 border-surface-dark">
          {t('about.text')}
        </p>
      </div>
    </section>
  )
}
