import { useState, useEffect } from 'react'
import { useEventState } from '../hooks/useEventState'
import { useWorkshops } from '../hooks/useWorkshops'
import { useTeams } from '../hooks/useTeams'
import { useChallengeCards } from '../hooks/useChallengeCards'
import { useConfig } from '../hooks/useConfig'
import ActiveWorkshopHero from '../components/live/ActiveWorkshopHero'
import DayProgressTimeline from '../components/live/DayProgressTimeline'
import TeamSelector from '../components/shared/TeamSelector'
import MyChallengeCard from '../components/live/MyChallengeCard'
import WorkshopGuide from '../components/live/WorkshopGuide'
import ResourceLinks from '../components/live/ResourceLinks'
import FeedbackBanner from '../components/live/FeedbackBanner'

export default function LivePage() {
  const eventState = useEventState()
  const workshops = useWorkshops()
  const teams = useTeams()
  const challengeCards = useChallengeCards()
  const config = useConfig()

  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(() =>
    localStorage.getItem('selectedTeamId')
  )

  useEffect(() => {
    if (selectedTeamId) localStorage.setItem('selectedTeamId', selectedTeamId)
    else localStorage.removeItem('selectedTeamId')
  }, [selectedTeamId])

  const activeWorkshop = workshops.find((w) => w.id === eventState?.active_workshop_id)
  const myCard = challengeCards.find(
    (c) => c.team_id === selectedTeamId && c.status === 'active'
  )

  return (
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <ActiveWorkshopHero workshop={activeWorkshop} />
      <DayProgressTimeline workshops={workshops} />

      <div className="space-y-8">
        <TeamSelector
          teams={teams}
          selectedTeamId={selectedTeamId}
          onChange={setSelectedTeamId}
        />
        <MyChallengeCard card={myCard} />
        <WorkshopGuide workshop={activeWorkshop} />
        <ResourceLinks config={config} activeWorkshop={activeWorkshop} />
        <FeedbackBanner config={config} />
      </div>
    </div>
  )
}
