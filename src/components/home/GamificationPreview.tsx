import { useTranslation } from 'react-i18next'

export default function GamificationPreview() {
  const { t } = useTranslation()

  return (
    <section className="py-16 bg-surface">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-prussian mb-8">{t('gamification.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-5">
            <h3 className="font-bold text-dark-slate mb-3 uppercase text-sm tracking-wide">{t('gamification.flags')}</h3>
            <ul className="space-y-2 text-sm text-slate-gray">
              <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-card-green" /> {t('gamification.flag_green')}</li>
              <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-card-orange" /> {t('gamification.flag_orange')}</li>
              <li className="flex items-center gap-2"><span className="w-3 h-3 rounded-full bg-card-red" /> {t('gamification.flag_red')}</li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-5">
            <h3 className="font-bold text-dark-slate mb-3 uppercase text-sm tracking-wide">{t('gamification.cards')}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-card-red" /> <span className="text-slate-gray">{t('gamification.card_red')}</span></li>
              <li className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-card-orange" /> <span className="text-slate-gray">{t('gamification.card_orange')}</span></li>
              <li className="flex items-center gap-2"><span className="w-4 h-4 rounded bg-card-green" /> <span className="text-slate-gray">{t('gamification.card_green')}</span></li>
            </ul>
          </div>
          <div className="bg-white rounded-xl p-5">
            <h3 className="font-bold text-dark-slate mb-3 uppercase text-sm tracking-wide">{t('gamification.awards_title')}</h3>
            <ul className="space-y-1 text-sm text-slate-gray">
              <li>{t('gamification.award1')}</li>
              <li>{t('gamification.award2')}</li>
              <li>{t('gamification.award3')}</li>
              <li>{t('gamification.award4')}</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
