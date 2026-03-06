import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import type { Team, ScoreHistory } from '../../types'
import { updateTeamScore, createTeam, deleteTeam, deleteAllTeams, updateTeamMembers, updateTeamInfo } from '../../services/teamService'
import { addScoreEntry, deleteAllScoreHistory } from '../../services/scoreHistoryService'
import Card from '../shared/Card'
import Button from '../shared/Button'
import Input from '../shared/Input'
import { useToast } from '../shared/Toast'

interface Props {
  teams: Team[]
  scoreHistory: ScoreHistory[]
}

export default function ScoreboardManager({ teams, scoreHistory }: Props) {
  const { t } = useTranslation()
  const toast = useToast()
  const sorted = [...teams].sort((a, b) => b.score - a.score)
  const [newName, setNewName] = useState('')
  const [newEmoji, setNewEmoji] = useState('')
  const [pointInputs, setPointInputs] = useState<Record<string, string>>({})
  const [labelInputs, setLabelInputs] = useState<Record<string, string>>({})
  const [expandedTeam, setExpandedTeam] = useState<string | null>(null)
  const [memberInput, setMemberInput] = useState<Record<string, string>>({})
  const [editingTeam, setEditingTeam] = useState<string | null>(null)
  const [editName, setEditName] = useState('')
  const [editEmoji, setEditEmoji] = useState('')
  const [editingMember, setEditingMember] = useState<{ teamId: string; index: number } | null>(null)
  const [editMemberName, setEditMemberName] = useState('')

  const addPoints = async (team: Team, delta: number) => {
    if (delta === 0 || isNaN(delta)) return
    try {
      const label = labelInputs[team.id]?.trim() || ''
      await updateTeamScore(team, delta)
      await addScoreEntry(team.id, delta, label)
      setPointInputs((prev) => ({ ...prev, [team.id]: '' }))
      setLabelInputs((prev) => ({ ...prev, [team.id]: '' }))
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : String(e))
    }
  }

  const handleAddTeam = async () => {
    if (!newName.trim()) return
    try {
      await createTeam(newName.trim(), newEmoji)
      setNewName('')
      setNewEmoji('')
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : String(e))
    }
  }

  const handleResetAll = async () => {
    if (!confirm(t('score.confirmReset'))) return
    try {
      await deleteAllScoreHistory()
      await deleteAllTeams()
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : String(e))
    }
  }

  const startEditTeam = (team: Team) => {
    setEditingTeam(team.id)
    setEditName(team.name)
    setEditEmoji(team.emoji)
  }

  const saveEditTeam = async (team: Team) => {
    const name = editName.trim()
    const emoji = editEmoji.trim()
    if (name && (name !== team.name || emoji !== team.emoji)) {
      await updateTeamInfo(team.id, { name, emoji })
    }
    setEditingTeam(null)
  }

  const startEditMember = (teamId: string, index: number, name: string) => {
    setEditingMember({ teamId, index })
    setEditMemberName(name)
  }

  const saveEditMember = async (team: Team) => {
    if (!editingMember) return
    const name = editMemberName.trim()
    if (!name) return
    const members = [...(team.members || [])]
    members[editingMember.index] = name
    await updateTeamMembers(team.id, members)
    setEditingMember(null)
  }

  const handleAddMember = async (team: Team) => {
    const name = memberInput[team.id]?.trim()
    if (!name) return
    const members = [...(team.members || []), name]
    await updateTeamMembers(team.id, members)
    setMemberInput((prev) => ({ ...prev, [team.id]: '' }))
  }

  const handleRemoveMember = async (team: Team, index: number) => {
    const members = (team.members || []).filter((_, i) => i !== index)
    await updateTeamMembers(team.id, members)
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
        <Button variant="ghost" size="sm" onClick={handleResetAll} className="text-card-red/70 hover:text-card-red hover:bg-card-red/5">
          {t('score.resetAll')}
        </Button>
      </div>
      <div className="space-y-2 mb-6">
        {sorted.map((team, i) => {
          const inputVal = getInputValue(team.id)
          const numVal = getNumericValue(team.id)
          const entries = teamEntries(team.id)
          const isExpanded = expandedTeam === team.id
          const members = team.members || []
          const isEditingThis = editingTeam === team.id

          return (
            <div key={team.id} className="bg-surface rounded-xl border border-surface-dark/30">
              <div className="flex items-center gap-2 px-3 py-2.5">
                <span className="w-6 h-6 rounded-md bg-white flex items-center justify-center font-bold text-prussian text-[10px] shadow-sm shrink-0">#{i + 1}</span>

                {isEditingThis ? (
                  <>
                    <Input
                      value={editEmoji}
                      onChange={(e) => setEditEmoji(e.target.value)}
                      className="w-8 h-7 text-center text-base !px-0 !py-0 !rounded-md border-sushi/50"
                    />
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && saveEditTeam(team)}
                      className="w-32 h-7 !py-0 !rounded-md border-sushi/50"
                    />
                    <Button variant="primary" size="sm" onClick={() => saveEditTeam(team)} className="h-7 px-2 text-[11px]">OK</Button>
                    <Button variant="ghost" size="sm" onClick={() => setEditingTeam(null)} className="h-7 px-1.5 text-[11px]">&times;</Button>
                  </>
                ) : (
                  <>
                    <span className="text-base shrink-0">{team.emoji}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setExpandedTeam(isExpanded ? null : team.id)}
                      className="font-semibold text-dark-slate text-sm !bg-transparent !px-0 hover:text-prussian"
                    >
                      {team.name}
                      <span className="text-[10px] text-slate-gray ml-1">({members.length})</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => startEditTeam(team)}
                      className="text-slate-gray/50 hover:text-prussian !bg-transparent !px-0 text-[11px]"
                      title="Edit"
                    >
                      &#9998;
                    </Button>
                  </>
                )}

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
                    <Button
                      key={n}
                      variant="ghost"
                      size="sm"
                      onClick={() => setPointInputs((prev) => ({ ...prev, [team.id]: String(n) }))}
                      className={`!w-7 !h-7 !px-0 !rounded-md text-[11px] font-bold ${
                        numVal === n
                          ? n > 0 ? '!bg-card-green !text-white' : '!bg-card-red !text-white'
                          : n > 0 ? '!bg-card-green/10 !text-card-green hover:!bg-card-green/20' : '!bg-card-red/10 !text-card-red hover:!bg-card-red/20'
                      }`}
                    >
                      {n > 0 ? '+' : ''}{n}
                    </Button>
                  ))}
                  <Input
                    type="number"
                    value={inputVal}
                    onChange={(e) => setPointInputs((prev) => ({ ...prev, [team.id]: e.target.value }))}
                    className="w-12 h-7 text-center !py-0 !px-1 !rounded-md"
                    placeholder="+/-"
                  />
                  <Input
                    type="text"
                    value={labelInputs[team.id] ?? ''}
                    onChange={(e) => setLabelInputs((prev) => ({ ...prev, [team.id]: e.target.value }))}
                    className="w-24 h-7 !py-0 !px-1.5 !rounded-md"
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
                <Button variant="ghost" size="sm" onClick={() => deleteTeam(team.id)} className="text-card-red/60 hover:text-card-red !bg-transparent !px-0 !w-5 !h-5">&times;</Button>
              </div>

              {isExpanded && (
                <div className="px-3 pb-3 pt-1 border-t border-surface-dark/20 ml-8">
                  <p className="text-[11px] font-semibold text-slate-gray mb-2">{t('score.members')}</p>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {members.map((m, idx) => {
                      const isEditingThisMember = editingMember?.teamId === team.id && editingMember?.index === idx
                      return isEditingThisMember ? (
                        <span key={idx} className="inline-flex items-center gap-1 bg-white border border-sushi/50 rounded-lg px-1 py-0.5">
                          <Input
                            value={editMemberName}
                            onChange={(e) => setEditMemberName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && saveEditMember(team)}
                            onBlur={() => saveEditMember(team)}
                            autoFocus
                            className="w-24 h-5 !py-0 !px-1 !rounded-md !text-xs !border-0 !ring-0 !bg-transparent"
                          />
                        </span>
                      ) : (
                        <span key={idx} className="inline-flex items-center gap-1 bg-white border border-surface-dark/30 rounded-lg px-2 py-1 text-xs text-dark-slate">
                          <Button variant="ghost" size="sm" onClick={() => startEditMember(team.id, idx, m)} className="!bg-transparent !px-0 !py-0 text-xs hover:text-prussian">{m}</Button>
                          <Button variant="ghost" size="sm" onClick={() => handleRemoveMember(team, idx)} className="text-card-red/50 hover:text-card-red !bg-transparent !px-0 !py-0 text-sm leading-none">&times;</Button>
                        </span>
                      )
                    })}
                    {members.length === 0 && (
                      <span className="text-[11px] text-slate-gray/60 italic">{t('score.addMember')}</span>
                    )}
                  </div>
                  <div className="flex gap-1.5">
                    <Input
                      type="text"
                      value={memberInput[team.id] ?? ''}
                      onChange={(e) => setMemberInput((prev) => ({ ...prev, [team.id]: e.target.value }))}
                      onKeyDown={(e) => e.key === 'Enter' && handleAddMember(team)}
                      className="h-7 !py-0 !px-2 !rounded-md flex-1"
                      placeholder={t('score.memberName')}
                    />
                    <Button size="sm" onClick={() => handleAddMember(team)} className="h-7 px-2 text-[11px]">+</Button>
                  </div>
                </div>
              )}
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
