import { acceptHMRUpdate, defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { tracks as coreTracks, resources as coreResources } from '@/data/curriculum'
import { tracksKm as coreTracksKm, resourcesKm as coreResourcesKm } from '@/data/curriculumKm'
import { languageTracks, languageResources } from '@/data/languagesCurriculum'
import { languageTracksKm, languageResourcesKm } from '@/data/languagesCurriculumKm'
import { lessonLevels, trackLessonAdditions } from '@/data/zeroToProLessons'
import { zeroToProLessonsKm } from '@/data/zeroToProLessonsKm'
import { webDeep } from '@/data/lessons/webDeep'
import { languagesDeep } from '@/data/lessons/languagesDeep'
import { enterpriseDeep } from '@/data/lessons/enterpriseDeep'
import { useLocaleStore } from '@/stores/locale'

const STORAGE_KEY = 'codehub-completed-lessons'

const webTracks = coreTracks.filter((t) => t.group === 'web')
const engineeringTracks = coreTracks.filter((t) => t.group === 'engineering')
const rawTracks = [...webTracks, ...languageTracks, ...engineeringTracks]

const allDeep = {
  ...webDeep,
  ...languagesDeep,
  ...enterpriseDeep,
}

const baseTracks = rawTracks.map((track) => {
  const additions = trackLessonAdditions[track.id] || {}
  const prepended = additions.prepend || []
  const afterFirst = additions.insertAfterFirst || []
  const appended = additions.append || []

  let combinedLessons
  if (afterFirst.length && track.lessons.length > 0) {
    combinedLessons = [
      ...prepended,
      track.lessons[0],
      ...afterFirst,
      ...track.lessons.slice(1),
      ...appended,
    ]
  } else {
    combinedLessons = [...prepended, ...track.lessons, ...appended]
  }

  const totalSteps = combinedLessons.length
  return {
    ...track,
    lessons: combinedLessons.map((lesson, idx) => {
      const key = `${track.id}/${lesson.slug}`
      const deepEn = allDeep[key]?.en
      return {
        ...lesson,
        step: idx + 1,
        totalSteps,
        level: lesson.level || lessonLevels[key] || 'beginner',
        duration: deepEn?.duration ?? lesson.duration,
        objectives: deepEn?.objectives ?? [],
        sections: [...lesson.sections, ...(deepEn?.extraSections || [])],
        challenge: deepEn?.challenge ?? null,
        quiz: deepEn?.quiz ?? [],
      }
    }),
  }
})

const baseResources = [...coreResources, ...languageResources]

function mergeKmTracks() {
  const merged = { ...coreTracksKm, ...languageTracksKm }
  const out = {}
  for (const track of baseTracks) {
    const existing = merged[track.id] || {}
    out[track.id] = {
      ...existing,
      lessons: {
        ...existing.lessons,
        ...zeroToProLessonsKm[track.id],
      },
    }
  }
  return out
}

const allTracksKm = mergeKmTracks()
const allResourcesKm = { ...coreResourcesKm, ...languageResourcesKm }

function localizeTracks(locale) {
  if (locale !== 'km') return baseTracks
  return baseTracks.map((track) => {
    const tKm = allTracksKm[track.id] || {}
    return {
      ...track,
      name: tKm.name ?? track.name,
      fullName: tKm.fullName ?? track.fullName,
      tagline: tKm.tagline ?? track.tagline,
      badge: tKm.badge ?? track.badge,
      lessons: track.lessons.map((lesson) => {
        const key = `${track.id}/${lesson.slug}`
        const lKm = tKm.lessons?.[lesson.slug] || {}
        const deepKm = allDeep[key]?.km || {}
        const deepSectionsById = new Map(
          (deepKm.extraSections || []).map((sec) => [sec.id, sec]),
        )

        return {
          ...lesson,
          title: lKm.title ?? lesson.title,
          duration: deepKm.duration ?? lKm.duration ?? lesson.duration,
          summary: lKm.summary ?? lesson.summary,
          objectives: deepKm.objectives ?? lesson.objectives,
          sections: lesson.sections.map((section) => {
            const sKm = lKm.sections?.[section.id] || deepSectionsById.get(section.id) || {}
            return {
              ...section,
              heading: sKm.heading ?? section.heading,
              body: sKm.body ?? section.body,
              points: sKm.points ?? section.points,
              table: sKm.table ?? section.table,
              warning: sKm.warning ?? section.warning,
              tip: sKm.tip ?? section.tip,
              example: section.example
                ? {
                    ...section.example,
                    title: sKm.exampleTitle ?? section.example.title,
                  }
                : undefined,
            }
          }),
          challenge: lesson.challenge
            ? {
                ...lesson.challenge,
                ...deepKm.challenge,
              }
            : null,
          quiz: deepKm.quiz ?? lesson.quiz,
        }
      }),
    }
  })
}

function localizeResources(locale) {
  if (locale !== 'km') return baseResources
  return baseResources.map((res) => {
    const rKm = allResourcesKm[res.id] || {}
    return {
      ...res,
      title: rKm.title ?? res.title,
      type: rKm.type ?? res.type,
      description: rKm.description ?? res.description,
    }
  })
}

export const useCurriculumStore = defineStore('curriculum', () => {
  const localeStore = useLocaleStore()

  const tracks = computed(() => localizeTracks(localeStore.locale))
  const resources = computed(() => localizeResources(localeStore.locale))

  const loadCompleted = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  }

  const completedIds = ref(loadCompleted())

  const lessonKey = (trackId, slug) => `${trackId}/${slug}`

  const isCompleted = (trackId, slug) => completedIds.value.includes(lessonKey(trackId, slug))

  function toggleComplete(trackId, slug) {
    const key = lessonKey(trackId, slug)
    if (completedIds.value.includes(key)) {
      completedIds.value = completedIds.value.filter((k) => k !== key)
    } else {
      completedIds.value = [...completedIds.value, key]
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(completedIds.value))
  }

  const totalLessons = computed(() =>
    tracks.value.reduce((sum, track) => sum + track.lessons.length, 0),
  )

  const completedCount = computed(() => completedIds.value.length)

  function getTrack(trackId) {
    return tracks.value.find((t) => t.id === trackId) || null
  }

  function getCategoryLabel(categoryId) {
    const track = getTrack(categoryId)
    if (track) return track.name
    return categoryId.toUpperCase()
  }

  function getLevelLabel(level) {
    return localeStore.t(`levels.${level}`)
  }

  function getLesson(trackId, slug) {
    const track = getTrack(trackId)
    if (!track) return null
    if (!slug) return track.lessons[0] || null
    return track.lessons.find((l) => l.slug === slug) || track.lessons[0] || null
  }

  function getAdjacentLessons(trackId, slug) {
    const track = getTrack(trackId)
    if (!track) return { prev: null, next: null }
    const idx = track.lessons.findIndex((l) => l.slug === slug)
    if (idx === -1) return { prev: null, next: null }
    return {
      prev: idx > 0 ? { trackId, ...track.lessons[idx - 1] } : null,
      next: idx < track.lessons.length - 1 ? { trackId, ...track.lessons[idx + 1] } : null,
    }
  }

  function getTrackProgress(trackId) {
    const track = getTrack(trackId)
    if (!track) return { done: 0, total: 0 }
    const done = track.lessons.filter((l) => isCompleted(trackId, l.slug)).length
    return { done, total: track.lessons.length }
  }

  const searchIndex = computed(() => {
    const items = []
    for (let tIdx = 0; tIdx < tracks.value.length; tIdx += 1) {
      const track = tracks.value[tIdx]
      const enTrack = baseTracks[tIdx]
      const kmTrack = allTracksKm[track.id] || {}

      for (let lIdx = 0; lIdx < track.lessons.length; lIdx += 1) {
        const lesson = track.lessons[lIdx]
        const enLesson = enTrack.lessons[lIdx]
        const kmLesson = kmTrack.lessons?.[lesson.slug] || {}
        const deepKm = allDeep[`${track.id}/${lesson.slug}`]?.km || {}
        const levelLabel = getLevelLabel(lesson.level)

        items.push({
          type: 'lesson',
          id: `${track.id}/${lesson.slug}`,
          title: lesson.title,
          subtitle: `${track.name} · ${levelLabel}`,
          description: lesson.summary,
          trackId: track.id,
          to: `/learn/${track.id}/${lesson.slug}`,
          keywords: [
            enTrack.id,
            enTrack.name,
            enTrack.fullName,
            kmTrack.name || '',
            kmTrack.fullName || '',
            lesson.level,
            levelLabel,
            enLesson.title,
            enLesson.summary,
            ...enLesson.sections.map((s) => s.heading),
            kmLesson.title || '',
            kmLesson.summary || '',
            ...Object.values(kmLesson.sections || {}).map((s) => s.heading || ''),
            ...(deepKm.extraSections || []).map((s) => s.heading || ''),
          ]
            .join(' ')
            .toLowerCase(),
        })
      }
    }

    for (let rIdx = 0; rIdx < resources.value.length; rIdx += 1) {
      const res = resources.value[rIdx]
      const enRes = baseResources[rIdx]
      const kmRes = allResourcesKm[res.id] || {}
      const catLabel = getCategoryLabel(res.category)

      items.push({
        type: 'resource',
        id: res.id,
        title: res.title,
        subtitle: `${catLabel} · ${res.type}`,
        description: res.description,
        trackId: res.category,
        url: res.url,
        keywords: [
          enRes.title,
          enRes.category,
          catLabel,
          enRes.type,
          enRes.description,
          kmRes.title || '',
          kmRes.type || '',
          kmRes.description || '',
        ]
          .join(' ')
          .toLowerCase(),
      })
    }
    return items
  })

  function search(query) {
    const q = query.trim().toLowerCase()
    if (!q) return searchIndex.value.slice(0, 8)
    return searchIndex.value.filter((item) => item.keywords.includes(q))
  }

  return {
    tracks,
    resources,
    completedIds,
    totalLessons,
    completedCount,
    isCompleted,
    toggleComplete,
    getTrack,
    getCategoryLabel,
    getLevelLabel,
    getLesson,
    getAdjacentLessons,
    getTrackProgress,
    search,
  }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCurriculumStore, import.meta.hot))
}
