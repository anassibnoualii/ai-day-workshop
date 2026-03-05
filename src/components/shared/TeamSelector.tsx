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
    <div className="bg-white rounded-2xl p-5 shadow-sm shadow-prussian/5 border border-surface-dark/50">
      <div className="flex items-center gap-3">
        <div className="w-1 h-5 rounded-full bg-prussian" />
        <label className="text-sm font-bold text-prussian uppercase tracking-wide">{t('live.selectTeam')}</label>
        <Select value={selectedTeamId ?? ''} onChange={(e) => onChange(e.target.value)} className="flex-1 py-2.5">
          <option value="">--</option>
          {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.emoji} {team.name}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}
