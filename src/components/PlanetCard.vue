<script lang="ts" setup>
import { usePlanetStore } from '../store/planet'
import { getLastURLSegment } from '../utils/utils'

const props = defineProps({
    planet: Object,
})

const getFilmTitle = (id: number) => {
    if (!planetStore.films?.results) return ''
    return planetStore.films.results.find((film: any) => film.episode_id === id)
        .title
}

const planetStore = usePlanetStore()
</script>
<template>
    <div
        :key="props.planet.name"
        class="planet-card w-80 flex flex-col hover:bg-gray-800 transition-colors duration-300 ease-in-out p-2 rounded-xl"
    >
        <router-link :to="`/planet/${getLastURLSegment(props.planet.url)}`">
            <h2 class="text-gray-400 text-4xl mb-3">
                {{ props.planet.name }}
            </h2>
            <h2 class="text-gray-500 text-xl mb-1">Seen in:</h2>
            <div v-for="film in props.planet.films" :key="film + props.planet.name">
                <span class="text-gray-200">{{
                    getFilmTitle(+getLastURLSegment(film))
                }}</span>
            </div>
        </router-link>
    </div>
</template>
