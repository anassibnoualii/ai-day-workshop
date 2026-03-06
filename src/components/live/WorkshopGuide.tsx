import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { Workshop } from '../../types'
import { getGuideUrls } from '../../lib/guides'
import SectionHeading from '../shared/SectionHeading'

interface Props {
  workshop: Workshop | undefined
}

function renderMarkdown(md: string): string {
  const lines = md.split('\n')
  const result: string[] = []
  let inList = false
  let listType: 'ul' | 'ol' = 'ul'
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('```')) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false }
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i].replace(/</g, '&lt;').replace(/>/g, '&gt;'))
        i++
      }
      result.push(`<pre class="bg-prussian-dark text-sushi/90 rounded-xl p-4 my-4 overflow-x-auto text-sm font-mono leading-relaxed"><code>${codeLines.join('\n')}</code></pre>`)
      i++
      continue
    }

    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false }
      const tableRows: string[][] = []
      let sepIdx = -1
      while (i < lines.length && lines[i].trim().startsWith('|') && lines[i].trim().endsWith('|')) {
        const raw = lines[i].trim()
        const cells = raw.slice(1, -1).split('|').map(c => c.trim())
        if (cells.every(c => /^[-:]+$/.test(c))) {
          sepIdx = tableRows.length
        } else {
          tableRows.push(cells)
        }
        i++
      }
      const hasHeader = sepIdx === 1 || (sepIdx === -1 && tableRows.length > 1)
      let tableHtml = '<div class="overflow-x-auto my-6"><table class="w-full bg-white rounded-xl border border-surface-dark/30 border-separate" style="border-spacing:0">'
      tableRows.forEach((cells, ri) => {
        if (ri === 0 && hasHeader) {
          tableHtml += '<thead><tr class="bg-surface">'
          cells.forEach(c => {
            tableHtml += `<th class="py-3 px-4 text-left text-xs font-bold uppercase tracking-wide text-slate-gray border-b-2 border-surface-dark/40 first:rounded-tl-xl last:rounded-tr-xl">${inlineFormat(c)}</th>`
          })
          tableHtml += '</tr></thead><tbody>'
        } else {
          tableHtml += `<tr class="${ri % 2 === 0 ? '' : 'bg-surface/40'} hover:bg-sushi/5 transition-colors">`
          cells.forEach(c => {
            tableHtml += `<td class="py-2.5 px-4 text-sm text-dark-slate/80 border-b border-surface-dark/20">${inlineFormat(c)}</td>`
          })
          tableHtml += '</tr>'
        }
      })
      if (hasHeader) tableHtml += '</tbody>'
      tableHtml += '</table></div>'
      result.push(tableHtml)
      continue
    }

    if (/^---$/.test(lines[i])) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false }
      result.push('<hr class="my-8 border-surface-dark/30" />')
      i++
      continue
    }

    const h3 = lines[i].match(/^### (.+)$/)
    if (h3) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false }
      result.push(`<h3 class="font-display font-bold text-prussian text-lg mt-8 mb-3">${inlineFormat(h3[1])}</h3>`)
      i++
      continue
    }

    const h2 = lines[i].match(/^## (.+)$/)
    if (h2) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false }
      result.push(`<h2 class="font-display font-bold text-prussian text-xl mt-10 mb-4 pb-2 border-b border-surface-dark/50">${inlineFormat(h2[1])}</h2>`)
      i++
      continue
    }

    const h1 = lines[i].match(/^# (.+)$/)
    if (h1) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false }
      result.push(`<h1 class="font-display font-bold text-prussian text-2xl mb-6">${inlineFormat(h1[1])}</h1>`)
      i++
      continue
    }

    const bq = lines[i].match(/^> (.+)$/)
    if (bq) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false }
      result.push(`<blockquote class="border-l-4 border-sushi/40 bg-sushi/5 rounded-r-xl px-4 py-3 my-4 text-sm text-dark-slate/80 italic">${inlineFormat(bq[1])}</blockquote>`)
      i++
      continue
    }

    const imgOnly = lines[i].match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (imgOnly) {
      if (inList) { result.push(listType === 'ul' ? '</ul>' : '</ol>'); inList = false }
      const alt = imgOnly[1]
      const src = imgOnly[2]
      result.push(`<figure class="my-6"><img src="${src}" alt="${alt}" class="rounded-xl border border-surface-dark/30 shadow-sm w-full" />${alt ? `<figcaption class="text-xs text-slate-gray mt-2 text-center">${alt}</figcaption>` : ''}</figure>`)
      i++
      continue
    }

    const ol = lines[i].match(/^(\d+)\. (.+)$/)
    if (ol) {
      if (!inList || listType !== 'ol') {
        if (inList) result.push(listType === 'ul' ? '</ul>' : '</ol>')
        result.push('<ol class="my-3 list-decimal">')
        inList = true
        listType = 'ol'
      }
      result.push(`<li class="ml-6 mb-2 text-sm text-dark-slate/80"><span>${inlineFormat(ol[2])}</span></li>`)
      i++
      continue
    }

    const ul = lines[i].match(/^- (.+)$/)
    if (ul) {
      if (!inList || listType !== 'ul') {
        if (inList) result.push(listType === 'ul' ? '</ul>' : '</ol>')
        result.push('<ul class="my-3 list-disc">')
        inList = true
        listType = 'ul'
      }
      result.push(`<li class="ml-6 mb-1.5 text-sm text-dark-slate/80">${inlineFormat(ul[1])}</li>`)
      i++
      continue
    }

    if (inList && lines[i].match(/^\s{2,}/)) {
      const indented = lines[i].trim()
      result.push(`<li class="ml-10 mb-1.5 text-sm text-dark-slate/60 list-[circle]">${inlineFormat(indented.replace(/^- /, ''))}</li>`)
      i++
      continue
    }

    if (inList) {
      result.push(listType === 'ul' ? '</ul>' : '</ol>')
      inList = false
    }

    if (lines[i].trim()) {
      result.push(`<p class="text-sm text-dark-slate/80 leading-relaxed mb-3">${inlineFormat(lines[i])}</p>`)
    }

    i++
  }

  if (inList) result.push(listType === 'ul' ? '</ul>' : '</ol>')

  return result.join('\n')
}

function inlineFormat(text: string): string {
  return text
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="inline-block rounded-lg border border-surface-dark/30 shadow-sm max-w-full my-2" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-sushi hover:underline font-medium">$1</a>')
    .replace(/`([^`]+)`/g, '<code class="bg-surface-dark/60 text-prussian px-1.5 py-0.5 rounded text-xs font-mono">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-semibold text-dark-slate">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
}

export default function WorkshopGuide({ workshop }: Props) {
  const { t, i18n } = useTranslation()
  const lang = i18n.language?.startsWith('fr') ? 'fr' : 'en'
  const [contents, setContents] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const [expanded, setExpanded] = useState(true)

  const guideUrls = workshop ? getGuideUrls(workshop, lang) : []
  const urlsKey = guideUrls.join(',')

  useEffect(() => {
    if (guideUrls.length === 0) {
      setContents([])
      return
    }
    setLoading(true)
    Promise.all(
      guideUrls.map((url) =>
        fetch(url)
          .then((r) => {
            if (!r.ok) throw new Error('Not found')
            return r.text()
          })
          .catch(() => null)
      )
    ).then((results) => {
      setContents(results.filter((r): r is string => r !== null))
      setLoading(false)
    })
  }, [urlsKey])

  if (guideUrls.length === 0 || (contents.length === 0 && !loading)) return null

  return (
    <div>
      <SectionHeading>{t('live.workshopGuide')}</SectionHeading>
      <div className="bg-white rounded-2xl shadow-sm shadow-prussian/5 border border-surface-dark/50 overflow-hidden">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full flex items-center gap-3 px-6 py-4 text-left hover:bg-surface/50 transition-colors"
        >
          <span className="w-8 h-8 rounded-lg bg-sushi/15 flex items-center justify-center text-sushi shrink-0">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" /></svg>
          </span>
          <span className="flex-1 font-semibold text-prussian text-sm">
            {t('live.guideTitle')}
          </span>
          <svg className={`w-5 h-5 text-slate-gray transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </button>

        {expanded && (
          <div className="px-6 pb-6 border-t border-surface-dark/30">
            {loading ? (
              <div className="py-8 text-center text-slate-gray text-sm">{t('live.loading')}</div>
            ) : contents.length > 0 ? (
              <div className="mt-4 space-y-8">
                {contents.map((md, idx) => (
                  <div
                    key={idx}
                    className="prose-custom"
                    dangerouslySetInnerHTML={{ __html: renderMarkdown(md) }}
                  />
                ))}
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}
