import { useTranslation } from 'react-i18next'
import FlagSystem from '../components/rules/FlagSystem'
import ScoringTable from '../components/rules/ScoringTable'
import CardGrid from '../components/rules/CardGrid'
import AwardsSection from '../components/rules/AwardsSection'

export default function RulesPage() {
  const { t } = useTranslation()

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-1.5 h-10 rounded-full bg-sushi" />
        <h1 className="font-display text-3xl md:text-4xl font-bold text-prussian">{t('rules.title')}</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <FlagSystem />
        <ScoringTable />
      </div>
      <div className="mb-10">
        <CardGrid />
      </div>
      <AwardsSection />
    </div>
  )
}
