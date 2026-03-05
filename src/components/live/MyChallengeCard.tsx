import { useTranslation } from 'react-i18next'
import type { ChallengeCard as ChallengeCardType } from '../../types'
import ChallengeCard from '../shared/ChallengeCard'
import SectionHeading from '../shared/SectionHeading'

interface Props {
  card: ChallengeCardType | undefined
}

export default function MyChallengeCard({ card }: Props) {
  const { t } = useTranslation()

  if (!card) {
    return (
      <div className="bg-surface rounded-xl p-6 text-center text-slate-gray">
        {t('card.none')}
      </div>
    )
  }

  const def = {
    id: card.card_id,
    color: card.color,
    points: card.points,
    title_fr: card.title_fr,
    title_en: card.title_en,
    mission_fr: card.mission_fr,
    mission_en: card.mission_en,
  }

  return (
    <div>
      <SectionHeading>{t('card.myCard')}</SectionHeading>
      <ChallengeCard card={def} animated />
    </div>
  )
}
