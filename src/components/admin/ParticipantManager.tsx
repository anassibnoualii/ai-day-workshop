import { useTranslation } from 'react-i18next'
import type { Participant } from '../../types'
import { validateParticipant, deleteParticipant } from '../../services/participantService'
import Card from '../shared/Card'
import Button from '../shared/Button'

interface Props {
  participants: Participant[]
}

export default function ParticipantManager({ participants }: Props) {
  const { t } = useTranslation()

  const pending = participants.filter((p) => !p.validated)
  const approved = participants.filter((p) => p.validated)

  return (
    <Card>
      <h3 className="font-display font-bold text-prussian mb-5">{t('admin.participants')}</h3>

      {pending.length > 0 && (
        <div className="mb-6">
          <p className="text-xs font-bold text-slate-gray uppercase tracking-wide mb-3">
            {t('admin.pendingParticipants')} ({pending.length})
          </p>
          <div className="space-y-2">
            {pending.map((p) => (
              <div key={p.id} className="flex items-center gap-3 bg-card-orange/5 border border-card-orange/20 rounded-xl px-4 py-3">
                <span className="w-2 h-2 rounded-full bg-card-orange shrink-0" />
                <span className="flex-1 text-sm font-medium text-dark-slate">{p.username}</span>
                <Button variant="primary" size="sm" onClick={() => validateParticipant(p.id, true)}>
                  {t('admin.approve')}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deleteParticipant(p.id)} className="text-card-red hover:!bg-card-red/10">
                  {t('score.removeTeam')}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {approved.length > 0 && (
        <div>
          <p className="text-xs font-bold text-slate-gray uppercase tracking-wide mb-3">
            {t('admin.approvedParticipants')} ({approved.length})
          </p>
          <div className="space-y-2">
            {approved.map((p) => (
              <div key={p.id} className="flex items-center gap-3 bg-sushi/5 border border-sushi/20 rounded-xl px-4 py-3">
                <span className="w-2 h-2 rounded-full bg-sushi shrink-0" />
                <span className="flex-1 text-sm font-medium text-dark-slate">{p.username}</span>
                <Button variant="ghost" size="sm" onClick={() => validateParticipant(p.id, false)} className="text-slate-gray">
                  {t('admin.revoke')}
                </Button>
                <Button variant="ghost" size="sm" onClick={() => deleteParticipant(p.id)} className="text-card-red hover:!bg-card-red/10">
                  {t('score.removeTeam')}
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {participants.length === 0 && (
        <p className="text-sm text-slate-gray text-center py-6">{t('admin.noParticipants')}</p>
      )}
    </Card>
  )
}
