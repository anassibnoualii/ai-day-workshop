import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Team, ScoreHistory } from '../../types'
import { updateTeamScore, createTeam, deleteTeam, deleteAllTeams } from '../../services/teamService'
import { addScoreEntry, deleteAllScoreHistory } from '../../services/scoreHistoryService'
import Card from '../shared/Card'
import Button from '../shared/Button'
import Input from '../shared/Input'

interface Props {
  teams: Team[]
  scoreHistory: ScoreHistory[]
}

export default function ScoreboardManager({ teams, scoreHistory }: Props) {
  const { t } = useTranslation()
  const sorted = [...teams].sort((a, b) => b.score - a.score)
  const [newName, setNewName] = useState('')
  const [newEmoji, setNewEmoji] = useState('')
  const [pointInputs, setPointInputs] = useState<Record<string, string>>({})
  const [labelInputs, setLabelInputs] = useState<Record<string, string>>({})

  const addPoints = async (team: Team, delta: number) => {
    if (delta === 0 || isNaN(delta)) return
    const label = labelInputs[team.id]?.trim() || ''
    await updateTeamScore(team, delta)
    await addScoreEntry(team.id, delta, label)
    setPointInputs((prev) => ({ ...prev, [team.id]: '' }))
    setLabelInputs((prev) => ({ ...prev, [team.id]: '' }))
  }

  const handleAddTeam = async () => {
    if (!newName.trim()) return
    await createTeam(newName.trim(), newEmoji)
    setNewName('')
    setNewEmoji('')
  }

  const handleResetAll = async () => {
    if (!confirm(t('score.confirmReset'))) return
    await deleteAllScoreHistory()
    await deleteAllTeams()
  }

  const getInputValue = (teamId: string) => pointInputs[teamId] ?? ''
  const getNumericValue = (teamId: string) => parseInt(pointInputs[teamId] || '0')
  const teamEntries = (teamId: string) =>
    scoreHistory
      .filter((h) => h.team_id === teamId)
      .sort((a, b) => String(a.created || '').localeCompare(String(b.created || '')))

  return (
    <Card>
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display font-bold text-prussian">{t('admin.scores')}</h3>
        <button
          onClick={handleResetAll}
          className="text-xs text-card-red/70 hover:text-card-red transition px-3 py-1.5 rounded-lg hover:bg-card-red/5"
        >
          {t('score.resetAll')}
        </button>
      </div>
      <div className="space-y-2 mb-6">
        {sorted.map((team, i) => {
          const inputVal = getInputValue(team.id)
          const numVal = getNumericValue(team.id)
          const entries = teamEntries(team.id)

          return (
            <div key={team.id} className="bg-surface rounded-xl px-3 py-2.5 border border-surface-dark/30 flex items-center gap-2">
              <span className="w-6 h-6 rounded-md bg-white flex items-center justify-center font-bold text-prussian text-[10px] shadow-sm shrink-0">#{i + 1}</span>
              <span className="text-base shrink-0">{team.emoji}</span>
              <span className="font-semibold text-dark-slate text-sm shrink-0">{team.name}</span>

              {entries.length > 0 && (
                <div className="flex items-center gap-1 shrink min-w-0 flex-wrap">
                  {entries.map((e) => (
                    <span
                      key={e.id}
                      className={`group relative px-1.5 py-px rounded text-[10px] font-bold cursor-default shrink-0 ${
                        e.delta > 0
                          ? 'bg-card-green/10 text-card-green'
                          : 'bg-card-red/10 text-card-red'
                      }`}
                    >
                      {e.delta > 0 ? '+' : ''}{e.delta}
                      {e.label && (
                        <span className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-1 px-2 py-0.5 rounded-md bg-prussian text-white text-[10px] font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-lg z-10">
                          {e.label}
                        </span>
                      )}
                    </span>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-1 ml-auto shrink-0">
                {[1, 2, 3, 5, -1, -2, -3, -5].map((n) => (
                  <button
                    key={n}
                    onClick={() => setPointInputs((prev) => ({ ...prev, [team.id]: String(n) }))}
                    className={`w-7 h-7 rounded-md text-[11px] font-bold transition-all ${
                      numVal === n
                        ? n > 0 ? 'bg-card-green text-white' : 'bg-card-red text-white'
                        : n > 0 ? 'bg-card-green/10 text-card-green hover:bg-card-green/20' : 'bg-card-red/10 text-card-red hover:bg-card-red/20'
                    }`}
                  >
                    {n > 0 ? '+' : ''}{n}
                  </button>
                ))}
                <input
                  type="number"
                  value={inputVal}
                  onChange={(e) => setPointInputs((prev) => ({ ...prev, [team.id]: e.target.value }))}
                  className="w-12 h-7 text-center text-xs bg-white border border-surface-dark/50 rounded-md focus:outline-none focus:ring-1 focus:ring-sushi/50"
                  placeholder="+/-"
                />
                <input
                  type="text"
                  value={labelInputs[team.id] ?? ''}
                  onChange={(e) => setLabelInputs((prev) => ({ ...prev, [team.id]: e.target.value }))}
                  className="w-24 h-7 text-xs bg-white border border-surface-dark/50 rounded-md px-1.5 focus:outline-none focus:ring-1 focus:ring-sushi/50"
                  placeholder={t('score.label')}
                />
                <Button
                  size="sm"
                  onClick={() => addPoints(team, numVal)}
                  disabled={!inputVal || isNaN(numVal) || numVal === 0}
                  className="h-7 px-2 text-[11px]"
                >
                  OK
                </Button>
              </div>

              <span className="font-mono font-bold text-prussian text-lg tabular-nums shrink-0 w-10 text-right">{team.score}</span>
              <button onClick={() => deleteTeam(team.id)} className="text-card-red/60 hover:text-card-red text-sm shrink-0 transition w-5 h-5 flex items-center justify-center">&times;</button>
            </div>
          )
        })}
      </div>
      <div className="flex gap-2 bg-surface rounded-xl p-3 border border-surface-dark/30">
        <Input
          type="text"
          value={newEmoji}
          onChange={(e) => setNewEmoji(e.target.value)}
          placeholder={t('score.emoji')}
          className="w-16 bg-white"
        />
        <Input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder={t('score.addTeam')}
          className="flex-1 bg-white"
        />
        <Button onClick={handleAddTeam}>+</Button>
      </div>
    </Card>
  )
}
