import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAdminAuth } from '../hooks/useAdminAuth'
import { useEventState } from '../hooks/useEventState'
import { useWorkshops } from '../hooks/useWorkshops'
import { useTeams } from '../hooks/useTeams'
import { useConfig } from '../hooks/useConfig'
import AdminLogin from '../components/admin/AdminLogin'
import WorkshopActivator from '../components/admin/WorkshopActivator'
import TimerControls from '../components/admin/TimerControls'
import ScoreboardManager from '../components/admin/ScoreboardManager'
import CardDistributor from '../components/admin/CardDistributor'
import LinkManager from '../components/admin/LinkManager'
import FeedbackUrlConfig from '../components/admin/FeedbackUrlConfig'

const TABS = [
  { id: 'timeline', icon: '\u23F1\uFE0F', key: 'admin.tabTimeline' },
  { id: 'scores', icon: '\u{1F3C6}', key: 'admin.tabScores' },
  { id: 'cards', icon: '\u{1F0CF}', key: 'admin.tabCards' },
  { id: 'settings', icon: '\u2699\uFE0F', key: 'admin.tabSettings' },
] as const

type TabId = (typeof TABS)[number]['id']

export default function AdminPage() {
  const { t } = useTranslation()
  const { isAuthenticated, login, logout, error } = useAdminAuth()
  const [activeTab, setActiveTab] = useState<TabId>('timeline')

  const eventState = useEventState(isAuthenticated)
  const workshops = useWorkshops(isAuthenticated)
  const teams = useTeams(isAuthenticated)
  const config = useConfig(isAuthenticated)

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} error={error} />
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-prussian">{t('admin.dashboard')}</h1>
        <button
          onClick={logout}
          className="text-sm text-slate-gray hover:text-card-red transition"
        >
          {t('admin.logout')}
        </button>
      </div>

      <div className="flex gap-1 mb-6 bg-surface rounded-xl p-1">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition ${
              activeTab === tab.id
                ? 'bg-prussian text-white shadow-sm'
                : 'text-slate-gray hover:text-dark-slate hover:bg-white'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{t(tab.key)}</span>
          </button>
        ))}
      </div>

      {activeTab === 'timeline' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <WorkshopActivator workshops={workshops} eventState={eventState} />
          <TimerControls eventState={eventState} />
        </div>
      )}

      {activeTab === 'scores' && (
        <ScoreboardManager teams={teams} />
      )}

      {activeTab === 'cards' && (
        <CardDistributor teams={teams} />
      )}

      {activeTab === 'settings' && (
        <div className="space-y-6">
          <LinkManager config={config} workshops={workshops} />
          <FeedbackUrlConfig config={config} />
        </div>
      )}
    </div>
  )
}
