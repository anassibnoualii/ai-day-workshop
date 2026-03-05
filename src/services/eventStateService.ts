import pb from '../lib/pocketbase'
import type { EventState } from '../types'

export async function activateWorkshop(
  eventStateId: string,
  workshopId: string,
  workshopDuration: number
) {
  await pb.collection('event_state').update<EventState>(eventStateId, {
    active_workshop_id: workshopId,
    timer_duration_seconds: workshopDuration,
    timer_started_at: Math.floor(Date.now() / 1000),
    timer_running: true,
    timer_paused_remaining: null,
  })
}

export async function startTimer(eventStateId: string) {
  await pb.collection('event_state').update<EventState>(eventStateId, {
    timer_started_at: Math.floor(Date.now() / 1000),
    timer_running: true,
    timer_paused_remaining: null,
  })
}

export async function pauseTimer(eventState: EventState) {
  const now = Math.floor(Date.now() / 1000)
  const elapsed = eventState.timer_started_at ? now - eventState.timer_started_at : 0
  const remaining = Math.max(0, eventState.timer_duration_seconds - elapsed)
  await pb.collection('event_state').update<EventState>(eventState.id, {
    timer_running: false,
    timer_paused_remaining: remaining,
  })
}

export async function resumeTimer(eventState: EventState) {
  const remaining = eventState.timer_paused_remaining || eventState.timer_duration_seconds
  const now = Math.floor(Date.now() / 1000)
  const fakeStartedAt = now - (eventState.timer_duration_seconds - remaining)
  await pb.collection('event_state').update<EventState>(eventState.id, {
    timer_started_at: fakeStartedAt,
    timer_running: true,
    timer_paused_remaining: null,
  })
}

export async function resetTimer(eventStateId: string) {
  await pb.collection('event_state').update<EventState>(eventStateId, {
    timer_started_at: null,
    timer_running: false,
    timer_paused_remaining: null,
  })
}

export async function setTimerDuration(eventStateId: string, seconds: number) {
  await pb.collection('event_state').update<EventState>(eventStateId, {
    timer_duration_seconds: seconds,
    timer_started_at: null,
    timer_running: false,
    timer_paused_remaining: null,
  })
}
