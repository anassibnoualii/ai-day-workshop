import { useTranslation } from 'react-i18next'
import type { Config, Workshop } from '../../types'
import SectionHeading from '../shared/SectionHeading'

interface Props {
  config: Config | null
  activeWorkshop: Workshop | undefined
}

export default function ResourceLinks({ config, activeWorkshop }: Props) {
  const { t } = useTranslation()

  return (
    <div>
      <SectionHeading>{t('live.resources')}</SectionHeading>
      <div className="space-y-2">
        {activeWorkshop?.doc_url && (
          <a
            href={activeWorkshop.doc_url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-sushi/10 border border-sushi/30 rounded-lg px-4 py-2.5 text-sm font-semibold text-prussian hover:bg-sushi/20 transition"
          >
            {t('live.workshopDoc')} &rarr;
          </a>
        )}
        {config?.global_docs?.map((doc, i) => (
          <a
            key={i}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block bg-white rounded-lg px-4 py-2.5 text-sm text-dark-slate hover:bg-surface transition"
          >
            {doc.label} &rarr;
          </a>
        ))}
      </div>
    </div>
  )
}
