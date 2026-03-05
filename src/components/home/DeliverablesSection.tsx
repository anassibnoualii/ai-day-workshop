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
    <section className="py-20 bg-white">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1.5 h-8 rounded-full bg-sushi" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-prussian">{t('deliverables.title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((item, i) => (
            <div
              key={item.num}
              className="group bg-surface rounded-2xl p-6 border border-transparent hover:border-sushi/30 hover:shadow-md hover:shadow-sushi/5 transition-all duration-300"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-mono font-bold text-sushi bg-sushi/10 w-8 h-8 rounded-lg flex items-center justify-center">{item.num}</span>
                <span className="text-2xl group-hover:scale-110 transition-transform">{item.icon}</span>
              </div>
              <h3 className="font-semibold text-dark-slate mb-2">{t(`deliverables.${item.titleKey}`)}</h3>
              <p className="text-sm text-slate-gray leading-relaxed">{t(`deliverables.${item.descKey}`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
