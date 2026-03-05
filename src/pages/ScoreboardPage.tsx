import { useTeams } from '../hooks/useTeams'
import Scoreboard from '../components/shared/Scoreboard'

export default function ScoreboardPage() {
  const teams = useTeams()

  return (
    <div className="max-w-screen-md mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Scoreboard teams={teams} />
    </div>
  )
}
