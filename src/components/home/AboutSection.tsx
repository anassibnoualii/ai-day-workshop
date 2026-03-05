import { useTranslation } from 'react-i18next'

export default function AboutSection() {
  const { t } = useTranslation()

  return (
    <section className="py-16 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-prussian mb-4">{t('about.title')}</h2>
        <p className="text-dark-slate leading-relaxed">{t('about.text')}</p>
      </div>
    </section>
  )
}
