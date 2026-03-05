import { useTranslation } from 'react-i18next'

export default function GamificationPreview() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-prussian-dark relative overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-20" />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-1.5 h-8 rounded-full bg-sushi" />
          <h2 className="font-display text-2xl md:text-3xl font-bold text-white">{t('gamification.title')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-sushi/30 transition-all">
            <h3 className="font-bold text-sushi mb-4 text-xs uppercase tracking-[0.15em]">{t('gamification.flags')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-card-green shadow-sm shadow-card-green/30" />
                <span className="text-sm text-white/70">{t('gamification.flag_green')}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-card-orange shadow-sm shadow-card-orange/30" />
                <span className="text-sm text-white/70">{t('gamification.flag_orange')}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-4 h-4 rounded-full bg-card-red shadow-sm shadow-card-red/30" />
                <span className="text-sm text-white/70">{t('gamification.flag_red')}</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-sushi/30 transition-all">
            <h3 className="font-bold text-sushi mb-4 text-xs uppercase tracking-[0.15em]">{t('gamification.cards')}</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-md bg-card-red shadow-sm shadow-card-red/30" />
                <span className="text-sm text-white/70">{t('gamification.card_red')}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-md bg-card-orange shadow-sm shadow-card-orange/30" />
                <span className="text-sm text-white/70">{t('gamification.card_orange')}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="w-5 h-5 rounded-md bg-card-green shadow-sm shadow-card-green/30" />
                <span className="text-sm text-white/70">{t('gamification.card_green')}</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-sushi/30 transition-all">
            <h3 className="font-bold text-sushi mb-4 text-xs uppercase tracking-[0.15em]">{t('gamification.awards_title')}</h3>
            <ul className="space-y-2.5">
              <li className="text-sm text-white/70 flex items-center gap-2"><span className="text-card-orange">&#9733;</span>{t('gamification.award1')}</li>
              <li className="text-sm text-white/70 flex items-center gap-2"><span className="text-card-orange">&#9733;</span>{t('gamification.award2')}</li>
              <li className="text-sm text-white/70 flex items-center gap-2"><span className="text-card-orange">&#9733;</span>{t('gamification.award3')}</li>
              <li className="text-sm text-white/70 flex items-center gap-2"><span className="text-card-orange">&#9733;</span>{t('gamification.award4')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
