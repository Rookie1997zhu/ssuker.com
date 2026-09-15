<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { assetUrl } from '@/utils/assets'

const VIDEO_SRC = '/videos/ssuker-showreel.mp4'
/** Cleanroom segment only — outdoor start and empty end cut out. */
const LOOP_START = 33
const LOOP_END = 62
const LOOP_DURATION = LOOP_END - LOOP_START

const poster = assetUrl('showreelPoster')

const stageRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const progressTrackRef = ref<HTMLElement | null>(null)

const isInView = ref(false)
const isPlaying = ref(false)
const isMuted = ref(true)
const prefersReducedMotion = ref(false)
const userPaused = ref(false)
const progress = ref(0)
const hasEntered = ref(false)

const showCenterPlay = computed(() => !isPlaying.value)

function clampLoopTime(time: number) {
  return Math.min(LOOP_END, Math.max(LOOP_START, time))
}

function updateProgress() {
  const video = videoRef.value
  if (!video) return
  progress.value = Math.min(1, Math.max(0, (video.currentTime - LOOP_START) / LOOP_DURATION))
}

function syncPlayingState() {
  const video = videoRef.value
  if (!video) return
  isPlaying.value = !video.paused
}

function onLoadedMetadata() {
  const video = videoRef.value
  if (!video) return
  video.currentTime = LOOP_START
  updateProgress()
}

function onTimeUpdate() {
  const video = videoRef.value
  if (!video) return

  if (video.currentTime >= LOOP_END) {
    video.currentTime = LOOP_START
  } else if (video.currentTime < LOOP_START) {
    video.currentTime = LOOP_START
  }

  updateProgress()
}

async function tryPlay(options?: { force?: boolean }) {
  const video = videoRef.value
  if (!video || userPaused.value) return
  if (!options?.force) {
    if (prefersReducedMotion.value) return
    if (!isInView.value) return
  }

  if (video.currentTime < LOOP_START || video.currentTime >= LOOP_END) {
    video.currentTime = LOOP_START
  }

  video.muted = isMuted.value
  try {
    await video.play()
    isPlaying.value = true
  } catch {
    isPlaying.value = false
  }
}

function pauseVideo() {
  const video = videoRef.value
  if (!video) return
  video.pause()
  isPlaying.value = false
}

function togglePlay() {
  const video = videoRef.value
  if (!video) return

  if (!video.paused) {
    userPaused.value = true
    pauseVideo()
    return
  }

  userPaused.value = false
  void tryPlay({ force: true })
}

function toggleMute() {
  const video = videoRef.value
  isMuted.value = !isMuted.value
  if (video) video.muted = isMuted.value
}

function seekFromEvent(event: MouseEvent) {
  const track = progressTrackRef.value
  const video = videoRef.value
  if (!track || !video) return

  const rect = track.getBoundingClientRect()
  if (rect.width <= 0) return

  const ratio = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
  video.currentTime = clampLoopTime(LOOP_START + ratio * LOOP_DURATION)
  updateProgress()
}

let observer: IntersectionObserver | null = null
let motionQuery: MediaQueryList | null = null

function onMotionChange(event: MediaQueryListEvent) {
  prefersReducedMotion.value = event.matches
  if (event.matches) {
    pauseVideo()
  } else if (isInView.value && !userPaused.value) {
    void tryPlay()
  }
}

onMounted(() => {
  motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
  prefersReducedMotion.value = motionQuery.matches
  motionQuery.addEventListener('change', onMotionChange)

  observer = new IntersectionObserver(
    (entries) => {
      const entry = entries[0]
      isInView.value = Boolean(entry?.isIntersecting)
    },
    { threshold: 0.4 },
  )

  if (stageRef.value) observer.observe(stageRef.value)
})

onUnmounted(() => {
  observer?.disconnect()
  motionQuery?.removeEventListener('change', onMotionChange)
})

watch(isInView, (visible) => {
  if (visible) {
    hasEntered.value = true
    void tryPlay()
  } else {
    pauseVideo()
  }
})
</script>

<template>
  <section class="showreel section" aria-label="SSUKER showreel">
    <div class="container">
      <SectionHeading
        class="showreel__heading"
        eyebrow="SHOWREEL"
        title="현장에서 움직이는 SSUKER"
        description="제품이 실제 현장에서 움직이는 모습을 확인하세요."
      />
    </div>

    <figure
      ref="stageRef"
      class="showreel__stage"
      :class="{ 'is-entered': hasEntered && !prefersReducedMotion }"
      v-reveal
    >
      <video
        ref="videoRef"
        class="showreel__video"
        :src="VIDEO_SRC"
        :poster="poster"
        muted
        loop
        playsinline
        preload="metadata"
        @loadedmetadata="onLoadedMetadata"
        @timeupdate="onTimeUpdate"
        @play="syncPlayingState"
        @pause="syncPlayingState"
      />

      <div class="showreel__veil showreel__veil--top" aria-hidden="true" />
      <div class="showreel__veil showreel__veil--bottom" aria-hidden="true" />

      <button
        v-if="showCenterPlay"
        type="button"
        class="showreel__center-play"
        aria-label="동영상 재생"
        @click="togglePlay"
      >
        <span class="showreel__center-play-ring" aria-hidden="true" />
        <svg class="showreel__icon showreel__icon--center" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
        </svg>
      </button>

      <div class="showreel__chrome">
        <div
          ref="progressTrackRef"
          class="showreel__progress"
          role="slider"
          tabindex="0"
          :aria-valuemin="0"
          :aria-valuemax="100"
          :aria-valuenow="Math.round(progress * 100)"
          aria-label="재생 위치"
          @click="seekFromEvent"
        >
          <div class="showreel__progress-fill" :style="{ width: `${progress * 100}%` }" />
        </div>

        <div class="showreel__controls">
          <button
            type="button"
            class="showreel__control"
            :aria-label="isPlaying ? '일시정지' : '재생'"
            @click="togglePlay"
          >
            <svg v-if="isPlaying" class="showreel__icon" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1" fill="currentColor" />
              <rect x="14" y="5" width="4" height="14" rx="1" fill="currentColor" />
            </svg>
            <svg v-else class="showreel__icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
            </svg>
          </button>
          <button
            type="button"
            class="showreel__control"
            :aria-label="isMuted ? '소리 켜기' : '음소거'"
            @click="toggleMute"
          >
            <svg v-if="isMuted" class="showreel__icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 10v4h3.2L12 18.5V5.5L7.2 10H4zm12.3.7 1.4-1.4 1.4 1.4 1.4-1.4 1.4 1.4-1.4 1.4 1.4 1.4-1.4 1.4-1.4-1.4-1.4 1.4-1.4-1.4 1.4-1.4-1.4-1.4z"
                fill="currentColor"
              />
            </svg>
            <svg v-else class="showreel__icon" viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M4 10v4h3.2L12 18.5V5.5L7.2 10H4zm10.2-2.1a5.2 5.2 0 0 1 0 8.2l-1.2-1.5a3.2 3.2 0 0 0 0-5.2l1.2-1.5zm2.1-2.4a8.4 8.4 0 0 1 0 13l-1.3-1.5a6.4 6.4 0 0 0 0-10l1.3-1.5z"
                fill="currentColor"
              />
            </svg>
          </button>
        </div>
      </div>
    </figure>
  </section>
</template>

<style scoped>
.showreel {
  background: var(--color-navy-deep);
  color: var(--color-white);
  overflow-x: clip;
}

.showreel__heading :deep(.eyebrow) {
  color: var(--color-cyan-bright);
}

.showreel__heading :deep(.title) {
  color: var(--color-white);
}

.showreel__heading :deep(.description) {
  color: rgba(255, 255, 255, 0.72);
}

.showreel__stage {
  position: relative;
  margin: 0;
  width: 100vw;
  margin-inline: calc(50% - 50vw);
  max-height: min(78vh, calc(100vh - 22.5rem));
  overflow: hidden;
  background: #000;
}

.showreel__video {
  display: block;
  width: 100%;
  height: 100%;
  max-height: min(78vh, calc(100vh - 22.5rem));
  aspect-ratio: 16 / 9;
  object-fit: cover;
  transform: scale(1.06);
  transition: transform 2400ms var(--ease-out);
}

.showreel__stage.is-entered .showreel__video {
  transform: scale(1);
}

.showreel__veil {
  position: absolute;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: 1;
}

.showreel__veil--top {
  top: 0;
  height: 14%;
  background: linear-gradient(to bottom, var(--color-navy-deep), transparent);
}

.showreel__veil--bottom {
  bottom: 0;
  height: 22%;
  background: linear-gradient(to top, var(--color-navy-deep), transparent);
}

.showreel__center-play {
  position: absolute;
  inset: 50% auto auto 50%;
  translate: -50% -50%;
  z-index: 2;
  width: 4.75rem;
  height: 4.75rem;
  border-radius: 50%;
  background: rgba(2, 56, 122, 0.88);
  border: none;
  color: var(--color-white);
  display: grid;
  place-items: center;
  transition:
    transform var(--duration-fast) var(--ease-out),
    background var(--duration-fast) var(--ease-out);
}

.showreel__center-play-ring {
  position: absolute;
  inset: -0.35rem;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.3);
  transition: transform var(--duration) var(--ease-out);
}

.showreel__center-play:hover {
  background: rgba(0, 131, 167, 0.92);
  transform: scale(1.04);
}

.showreel__center-play:hover .showreel__center-play-ring {
  transform: scale(1.12);
}

.showreel__chrome {
  position: absolute;
  left: var(--space-4);
  right: var(--space-4);
  bottom: var(--space-4);
  z-index: 2;
  display: grid;
  gap: var(--space-3);
}

.showreel__progress {
  position: relative;
  height: 2px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.22);
  cursor: pointer;
  overflow: hidden;
}

.showreel__progress:hover,
.showreel__progress:focus-visible {
  height: 4px;
  outline: none;
}

.showreel__progress-fill {
  height: 100%;
  width: 0;
  border-radius: inherit;
  background: linear-gradient(90deg, var(--color-navy), var(--color-cyan));
  pointer-events: none;
}

.showreel__controls {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-2);
}

.showreel__control {
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: var(--color-white);
  background: rgba(1, 36, 79, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.25);
  backdrop-filter: blur(10px);
  transition:
    background var(--duration-fast) var(--ease-out),
    transform var(--duration-fast) var(--ease-out);
}

.showreel__control:hover {
  background: rgba(0, 131, 167, 0.75);
  transform: translateY(-2px);
}

.showreel__icon {
  width: 1.1rem;
  height: 1.1rem;
  display: block;
}

.showreel__icon--center {
  width: 1.35rem;
  height: 1.35rem;
  margin-left: 0.15rem;
}

@media (max-width: 760px) {
  .showreel__veil--top {
    height: 10%;
  }

  .showreel__veil--bottom {
    height: 18%;
  }

  .showreel__chrome {
    left: var(--space-3);
    right: var(--space-3);
    bottom: var(--space-3);
  }

  .showreel__center-play {
    width: 4rem;
    height: 4rem;
  }

  .showreel__control {
    width: 2.5rem;
    height: 2.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .showreel__video {
    transform: none;
    transition: none;
  }

  .showreel__stage.is-entered .showreel__video {
    transform: none;
  }
}
</style>
