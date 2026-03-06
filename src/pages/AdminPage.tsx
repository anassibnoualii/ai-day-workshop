import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAdminAuth } from '../hooks/useAdminAuth'
import { useEventState } from '../hooks/useEventState'
import { useWorkshops } from '../hooks/useWorkshops'
import { useTeams } from '../hooks/useTeams'
import { useConfig } from '../hooks/useConfig'
import { useScoreHistory } from '../hooks/useScoreHistory'
import Button from '../components/shared/Button'
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
  const [activeTab, setActiveTab] = useState<TabId>(() =>
    (localStorage.getItem('adminTab') as TabId) || 'timeline'
  )

  const changeTab = (tab: TabId) => {
    setActiveTab(tab)
    localStorage.setItem('adminTab', tab)
  }

  const eventState = useEventState(isAuthenticated)
  const workshops = useWorkshops(isAuthenticated)
  const teams = useTeams(isAuthenticated)
  const config = useConfig(isAuthenticated)
  const scoreHistory = useScoreHistory(isAuthenticated)

  if (!isAuthenticated) {
    return <AdminLogin onLogin={login} error={error} />
  }

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-1.5 h-10 rounded-full bg-sushi" />
          <h1 className="font-display text-2xl md:text-3xl font-bold text-prussian">{t('admin.dashboard')}</h1>
        </div>
        <Button variant="ghost" size="sm" onClick={logout} className="text-slate-gray hover:text-card-red hover:!bg-card-red/5">
          {t('admin.logout')}
        </Button>
      </div>

      <div className="flex gap-1 mb-8 bg-surface rounded-2xl p-1.5">
        {TABS.map((tab) => (
          <Button
            key={tab.id}
            variant="ghost"
            size="sm"
            onClick={() => changeTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-2 !px-4 !py-3 !rounded-xl text-sm font-semibold ${
              activeTab === tab.id
                ? '!bg-prussian !text-white shadow-md shadow-prussian/20'
                : '!text-slate-gray hover:!text-dark-slate hover:!bg-white'
            }`}
          >
            <span>{tab.icon}</span>
            <span className="hidden sm:inline">{t(tab.key)}</span>
          </Button>
        ))}
      </div>

      <div>
        {activeTab === 'timeline' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <WorkshopActivator workshops={workshops} eventState={eventState} />
            <TimerControls eventState={eventState} />
          </div>
        )}

        {activeTab === 'scores' && (
          <ScoreboardManager teams={teams} scoreHistory={scoreHistory} />
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
    </div>
  )
}
