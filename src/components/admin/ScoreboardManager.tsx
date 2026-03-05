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
  const [customPoints, setCustomPoints] = useState<Record<string, string>>({})

  const addPoints = async (team: Team, delta: number) => {
    await pb.collection('teams').update(team.id, { score: team.score + delta })
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

  return (
    <Card>
      <h3 className="font-bold text-dark-slate mb-4">{t('admin.scores')}</h3>
      <div className="space-y-3 mb-6">
        {sorted.map((team, i) => (
          <div key={team.id} className="bg-surface rounded-lg px-4 py-3">
            <div className="flex items-center gap-3 mb-2">
              <span className="w-6 text-center font-bold text-prussian text-sm">#{i + 1}</span>
              <span className="text-lg">{team.emoji}</span>
              <span className="font-semibold text-dark-slate flex-1 truncate">{team.name}</span>
              <span className="font-mono font-bold text-prussian text-lg tabular-nums">{team.score}</span>
              <span className="text-xs text-slate-gray">{t('score.points')}</span>
            </div>
            <div className="flex items-center gap-1.5 ml-9">
              {[1, 3, 5].map((n) => (
                <Button key={n} size="sm" onClick={() => addPoints(team, n)}>+{n}</Button>
              ))}
              <Button size="sm" variant="danger" onClick={() => addPoints(team, -1)}>-1</Button>
              <div className="flex ml-1">
                <Input
                  type="number"
                  value={customPoints[team.id] ?? ''}
                  onChange={(e) => setCustomPoints({ ...customPoints, [team.id]: e.target.value })}
                  className="w-16 rounded-r-none"
                  placeholder="+/-"
                />
                <Button
                  variant="secondary"
                  size="sm"
                  className="rounded-l-none"
                  onClick={() => {
                    const v = parseInt(customPoints[team.id] ?? '0')
                    if (!isNaN(v)) addPoints(team, v)
                    setCustomPoints({ ...customPoints, [team.id]: '' })
                  }}
                >
                  OK
                </Button>
              </div>
              <button onClick={() => removeTeam(team.id)} className="text-card-red text-xs hover:underline ml-auto transition">
                {t('score.removeTeam')}
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex gap-2 bg-surface rounded-lg p-3">
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
