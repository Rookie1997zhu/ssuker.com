<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import { assetUrl } from '@/utils/assets'

const VIDEO_SRC = '/videos/ssuker-showreel.mp4'
const poster = assetUrl('hero1')

const stageRef = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)

const isInView = ref(false)
const isPlaying = ref(false)
const isMuted = ref(true)
const prefersReducedMotion = ref(false)
const userPaused = ref(false)

const showCenterPlay = computed(
  () => prefersReducedMotion.value || userPaused.value || !isPlaying.value,
)

function syncPlayingState() {
  const video = videoRef.value
  if (!video) return
  isPlaying.value = !video.paused
}

async function tryPlay(options?: { force?: boolean }) {
  const video = videoRef.value
  if (!video || userPaused.value) return
  if (!options?.force) {
    if (prefersReducedMotion.value) return
    if (!isInView.value) return
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

    <figure ref="stageRef" class="showreel__stage" v-reveal>
      <video
        ref="videoRef"
        class="showreel__video"
        :src="VIDEO_SRC"
        :poster="poster"
        muted
        loop
        playsinline
        preload="metadata"
        @play="syncPlayingState"
        @pause="syncPlayingState"
      />

      <button
        v-if="showCenterPlay && !isPlaying"
        type="button"
        class="showreel__center-play"
        aria-label="동영상 재생"
        @click="togglePlay"
      >
        <span class="showreel__center-play-icon" aria-hidden="true" />
      </button>

      <div class="showreel__controls">
        <button
          type="button"
          class="showreel__control"
          :aria-label="isPlaying ? '일시정지' : '재생'"
          @click="togglePlay"
        >
          {{ isPlaying ? 'Pause' : 'Play' }}
        </button>
        <button
          type="button"
          class="showreel__control"
          :aria-label="isMuted ? '소리 켜기' : '음소거'"
          @click="toggleMute"
        >
          {{ isMuted ? 'Unmute' : 'Mute' }}
        </button>
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
  background: #000;
}

.showreel__video {
  display: block;
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.showreel__center-play {
  position: absolute;
  inset: 50% auto auto 50%;
  translate: -50% -50%;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  background: rgba(2, 56, 122, 0.88);
  border: 1px solid rgba(255, 255, 255, 0.35);
  display: grid;
  place-items: center;
  transition: transform var(--duration-fast) var(--ease-out);
}

.showreel__center-play:hover {
  transform: scale(1.05);
}

.showreel__center-play-icon {
  width: 0;
  height: 0;
  margin-left: 0.2rem;
  border-style: solid;
  border-width: 0.55rem 0 0.55rem 0.9rem;
  border-color: transparent transparent transparent var(--color-white);
}

.showreel__controls {
  position: absolute;
  right: var(--space-4);
  bottom: var(--space-4);
  display: flex;
  gap: var(--space-2);
}

.showreel__control {
  min-height: 2.25rem;
  padding: 0.4rem 0.85rem;
  border-radius: var(--radius-sm);
  background: rgba(1, 36, 79, 0.78);
  color: var(--color-white);
  border: 1px solid rgba(255, 255, 255, 0.28);
  font-family: var(--font-display);
  font-size: var(--text-xs);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  backdrop-filter: blur(6px);
}

.showreel__control:hover {
  background: rgba(0, 131, 167, 0.9);
}

@media (max-width: 760px) {
  .showreel__controls {
    right: var(--space-3);
    bottom: var(--space-3);
  }

  .showreel__center-play {
    width: 3.75rem;
    height: 3.75rem;
  }
}
</style>
