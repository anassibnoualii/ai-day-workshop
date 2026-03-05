import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Team } from '../../types'
import pb from '../../lib/pocketbase'
import Card from '../shared/Card'
import Button from '../shared/Button'
import Input from '../shared/Input'

interface Props {
  teams: Team[]
}

export default function ScoreboardManager({ teams }: Props) {
  const { t } = useTranslation()
  const sorted = [...teams].sort((a, b) => b.score - a.score)
  const [newName, setNewName] = useState('')
  const [newEmoji, setNewEmoji] = useState('')
  const [pointInputs, setPointInputs] = useState<Record<string, string>>({})

  const addPoints = async (team: Team, delta: number) => {
    if (delta === 0 || isNaN(delta)) return
    await pb.collection('teams').update(team.id, { score: team.score + delta })
    setPointInputs((prev) => ({ ...prev, [team.id]: '' }))
  }

  const addTeam = async () => {
    if (!newName.trim()) return
    await pb.collection('teams').create({
      name: newName.trim(),
      emoji: newEmoji || '\u{2B50}',
      slogan: '',
      score: 0,
    })
    setNewName('')
    setNewEmoji('')
  }

  const removeTeam = async (id: string) => {
    await pb.collection('teams').delete(id)
  }

  const getInputValue = (teamId: string) => pointInputs[teamId] ?? ''
  const getNumericValue = (teamId: string) => parseInt(pointInputs[teamId] || '0')

  return (
    <Card>
      <h3 className="font-display font-bold text-prussian mb-5">{t('admin.scores')}</h3>
      <div className="space-y-3 mb-6">
        {sorted.map((team, i) => {
          const inputVal = getInputValue(team.id)
          const numVal = getNumericValue(team.id)
          const preview = !isNaN(numVal) && numVal !== 0 ? team.score + numVal : null

          return (
            <div key={team.id} className="bg-surface rounded-xl px-4 py-3 border border-surface-dark/30">
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-white flex items-center justify-center font-bold text-prussian text-xs shadow-sm">#{i + 1}</span>
                <span className="text-lg">{team.emoji}</span>
                <span className="font-semibold text-dark-slate flex-1 truncate">{team.name}</span>

                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    value={inputVal}
                    onChange={(e) => setPointInputs((prev) => ({ ...prev, [team.id]: e.target.value }))}
                    className="w-20 text-center bg-white"
                    placeholder="+/-"
                  />
                  <Button
                    size="sm"
                    onClick={() => addPoints(team, numVal)}
                    disabled={!inputVal || isNaN(numVal) || numVal === 0}
                  >
                    {t('score.addPoints')}
                  </Button>
                </div>

                <div className="flex items-center gap-2 ml-2 min-w-[100px] justify-end">
                  {inputVal && !isNaN(numVal) && numVal !== 0 && (
                    <span className={`text-sm font-bold ${numVal > 0 ? 'text-card-green' : 'text-card-red'}`}>
                      {numVal > 0 ? '+' : ''}{numVal}
                    </span>
                  )}
                  <span className="font-mono font-bold text-prussian text-xl tabular-nums">
                    {preview !== null ? preview : team.score}
                  </span>
                  <span className="text-[10px] text-slate-gray uppercase">{t('score.points')}</span>
                </div>
              </div>

              <div className="flex items-center justify-between mt-2 ml-10">
                <div className="flex gap-1.5">
                  {[5, 3, 1, -1].map((n) => (
                    <button
                      key={n}
                      onClick={() => setPointInputs((prev) => ({ ...prev, [team.id]: String(n) }))}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                        numVal === n
                          ? n > 0 ? 'bg-card-green text-white' : 'bg-card-red text-white'
                          : n > 0 ? 'bg-card-green/10 text-card-green hover:bg-card-green/20' : 'bg-card-red/10 text-card-red hover:bg-card-red/20'
                      }`}
                    >
                      {n > 0 ? '+' : ''}{n}
                    </button>
                  ))}
                </div>
                <button onClick={() => removeTeam(team.id)} className="text-card-red text-xs hover:underline transition">
                  {t('score.removeTeam')}
                </button>
              </div>
            </div>
          )
        })}
      </div>
      <div className="flex gap-2 bg-surface rounded-xl p-3 border border-surface-dark/30">
        <Input
          type="text"
          value={newEmoji}
          onChange={(e) => setNewEmoji(e.target.value)}
          placeholder="Emoji"
          className="w-16 bg-white"
        />
        <Input
          type="text"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          placeholder={t('score.addTeam')}
          className="flex-1 bg-white"
        />
        <Button onClick={addTeam}>+</Button>
      </div>
    </Card>
  )
}
