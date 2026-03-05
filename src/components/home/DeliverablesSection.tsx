import { useTranslation } from 'react-i18next'

const items = [
  { num: '01', icon: '\u{1F916}', titleKey: 'd1_title', descKey: 'd1_desc' },
  { num: '02', icon: '\u{1F4DA}', titleKey: 'd2_title', descKey: 'd2_desc' },
  { num: '03', icon: '\u{1F527}', titleKey: 'd3_title', descKey: 'd3_desc' },
  { num: '04', icon: '\u2699\uFE0F', titleKey: 'd4_title', descKey: 'd4_desc' },
  { num: '05', icon: '\u{1F3A4}', titleKey: 'd5_title', descKey: 'd5_desc' },
]

export default function DeliverablesSection() {
  const { t } = useTranslation()

  return (
    <section className="py-16 bg-white">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-prussian mb-8">{t('deliverables.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item) => (
            <div key={item.num} className="bg-surface rounded-xl p-5 border border-transparent hover:border-sushi/30 transition">
              <div className="flex items-center gap-3 mb-2">
                <span className="text-sm font-mono text-sushi font-bold">{item.num}</span>
                <span className="text-2xl">{item.icon}</span>
              </div>
              <h3 className="font-semibold text-dark-slate mb-1">{t(`deliverables.${item.titleKey}`)}</h3>
              <p className="text-sm text-slate-gray">{t(`deliverables.${item.descKey}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
