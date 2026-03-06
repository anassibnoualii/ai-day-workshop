import { useTranslation } from 'react-i18next'
import Button from '../shared/Button'

export default function LanguageToggle() {
  const { i18n } = useTranslation()
  const current = i18n.language?.startsWith('fr') ? 'fr' : 'en'

  return (
    <div className="flex gap-1">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => i18n.changeLanguage('fr')}
        className={current === 'fr'
          ? '!text-sushi !border !border-sushi/30 !bg-sushi/10'
          : '!text-white/50 !border !border-white/10 !bg-white/5 hover:!text-white/80 hover:!border-white/20'
        }
      >
        FR
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => i18n.changeLanguage('en')}
        className={current === 'en'
          ? '!text-sushi !border !border-sushi/30 !bg-sushi/10'
          : '!text-white/50 !border !border-white/10 !bg-white/5 hover:!text-white/80 hover:!border-white/20'
        }
      >
        EN
      </Button>
    </div>
  )
}
