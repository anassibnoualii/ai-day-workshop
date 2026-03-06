import { useTranslation } from 'react-i18next'
import type { Config, Workshop } from '../../types'
import SectionHeading from '../shared/SectionHeading'

interface Props {
  config: Config | null
  activeWorkshop: Workshop | undefined
}

export default function ResourceLinks({ config, activeWorkshop }: Props) {
  const { t } = useTranslation()

  const hasWorkshopDoc = !!activeWorkshop?.doc_url
  const hasGlobalDocs = (config?.global_docs?.length ?? 0) > 0

  if (!hasWorkshopDoc && !hasGlobalDocs) return null

  return (
    <div>
      <SectionHeading>{t('live.resources')}</SectionHeading>
      <div className="space-y-2">
        {activeWorkshop?.doc_url && (
          <a
            href={activeWorkshop.doc_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-sushi/10 border border-sushi/20 rounded-xl px-5 py-3 text-sm font-semibold text-prussian hover:bg-sushi/15 hover:border-sushi/30 transition-all group"
          >
            <span className="w-8 h-8 rounded-lg bg-sushi/20 flex items-center justify-center text-sushi group-hover:bg-sushi/30 transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </span>
            {t('live.workshopDoc')}
            <svg className="w-4 h-4 ml-auto opacity-40 group-hover:opacity-70 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </a>
        )}
        {config?.global_docs?.map((doc) => (
          <a
            key={`${doc.label}-${doc.url}`}
            href={doc.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-white rounded-xl border border-surface-dark/50 px-5 py-3 text-sm text-dark-slate hover:bg-surface hover:border-surface-dark transition-all group"
          >
            <span className="w-8 h-8 rounded-lg bg-surface flex items-center justify-center text-slate-gray group-hover:bg-surface-dark transition-all">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
            </span>
            {doc.label}
            <svg className="w-4 h-4 ml-auto opacity-30 group-hover:opacity-60 group-hover:translate-x-0.5 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
          </a>
        ))}
      </div>
    </div>
  )
}
