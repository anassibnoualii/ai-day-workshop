import { useTranslation } from 'react-i18next'
import type { Team } from '../../types'
import Select from './Select'

interface Props {
  teams: Team[]
  selectedTeamId: string | null
  onChange: (id: string) => void
}

export default function TeamSelector({ teams, selectedTeamId, onChange }: Props) {
  const { t } = useTranslation()

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm font-semibold text-dark-slate">{t('live.selectTeam')}</label>
      <Select value={selectedTeamId ?? ''} onChange={(e) => onChange(e.target.value)}>
        <option value="">--</option>
        {teams.map((team) => (
          <option key={team.id} value={team.id}>
            {team.emoji} {team.name}
          </option>
        ))}
      </Select>
    </div>
  )
}
