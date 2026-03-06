export interface EventState {
  id: string
  session_name: string
  active_workshop_id: string
  timer_duration_seconds: number
  timer_started_at: number | null
  timer_running: boolean
  timer_paused_remaining: number | null
}

export interface Workshop {
  id: string
  title_fr: string
  title_en: string
  status: 'done' | 'active' | 'pending'
  duration: number
  doc_url: string
  guides: GuideEntry[]
  order: number
}

export interface GuideEntry {
  fr: string
  en: string
}

export interface Team {
  id: string
  name: string
  emoji: string
  slogan: string
  score: number
  members: string[]
}

export interface ChallengeCard {
  id: string
  team_id: string
  card_id: string
  color: 'red' | 'orange' | 'green' | 'purple'
  points: number
  title_fr: string
  title_en: string
  mission_fr: string
  mission_en: string
  status: 'active' | 'completed'
  revealed_at: string
}

export interface GlobalDoc {
  label: string
  url: string
}

export interface Config {
  id: string
  feedback_url: string
  feedback_enabled: boolean
  global_docs: GlobalDoc[]
}

export interface ScoreHistory {
  id: string
  team_id: string
  delta: number
  label: string
  created: string
}

export interface CardDefinition {
  id: string
  color: 'red' | 'orange' | 'green' | 'purple'
  points: number
  title_fr: string
  title_en: string
  mission_fr: string
  mission_en: string
}
