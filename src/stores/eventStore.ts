import { create } from 'zustand'
import type { EventState, Workshop, Team, ChallengeCard, Config, ScoreHistory, Participant } from '../types'

interface EventStore {
  eventState: EventState | null
  workshops: Workshop[]
  teams: Team[]
  challengeCards: ChallengeCard[]
  config: Config | null
  scoreHistory: ScoreHistory[]
  participants: Participant[]
  setEventState: (s: EventState) => void
  setWorkshops: (w: Workshop[]) => void
  setTeams: (t: Team[]) => void
  setChallengeCards: (c: ChallengeCard[]) => void
  setConfig: (c: Config) => void
  setScoreHistory: (h: ScoreHistory[]) => void
  setParticipants: (p: Participant[]) => void
}

export const useEventStore = create<EventStore>((set) => ({
  eventState: null,
  workshops: [],
  teams: [],
  challengeCards: [],
  config: null,
  scoreHistory: [],
  participants: [],
  setEventState: (s) => set({ eventState: s }),
  setWorkshops: (w) => set({ workshops: w }),
  setTeams: (t) => set({ teams: t }),
  setChallengeCards: (c) => set({ challengeCards: c }),
  setConfig: (c) => set({ config: c }),
  setScoreHistory: (h) => set({ scoreHistory: h }),
  setParticipants: (p) => set({ participants: p }),
}))
