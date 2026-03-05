import { useTranslation } from 'react-i18next'
import FlagSystem from '../components/rules/FlagSystem'
import ScoringTable from '../components/rules/ScoringTable'
import CardGrid from '../components/rules/CardGrid'
import AwardsSection from '../components/rules/AwardsSection'

export default function RulesPage() {
  const { t } = useTranslation()

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-prussian mb-8">{t('rules.title')}</h1>
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
