<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { usePlanetStore } from '../store/planet'
import PlanetCard from '../components/PlanetCard.vue'
import { getQueryParamsByKey } from '../utils/utils'
import { useRoute, useRouter } from 'vue-router'

const planetStore = usePlanetStore()
const route = useRoute()
const router = useRouter()

const errorMessage = ref('')

onMounted(async () => {
    try {
        await Promise.all([
            planetStore.fetchPlanets(Number(route.query.page) || 1),
            planetStore.fetchFilms(),
        ])
    } catch (error) {
        console.error(error)
        errorMessage.value = 'Failed to fetch data'
    }
})

const go = async (page: string) => {
    await router.push({ path: '/', query: { page } })
    router.go(0)
}
</script>

<template>
    <div class="w-4/5 mx-auto">
        <h1 class="text-red-300 text-5xl mb-24 mt-12">Planets</h1>

        <div v-if="errorMessage" class="text-center text-red-500 text-3xl">
            {{ errorMessage }}
        </div>

        <div v-else-if="!planetStore.planets && !errorMessage">
            <p class="text-center text-3xl text-gray-200">Loading...</p>
        </div>

        <div
            v-else-if="planetStore.planets && !errorMessage"
            class="planet-wrapper grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 place-content-around gap-8 gap-y-12 cursor-pointer"
        >
            <PlanetCard
                v-for="planet in planetStore.planets.results"
                :planet="planet"
                :key="planet.name"
            >
            </PlanetCard>
        </div>
        >

        <button
            @click="
                go(getQueryParamsByKey(planetStore.planets?.previous, 'page'))
            "
            v-if="planetStore.planets?.previous"
            class="button"
        >
            Previous
        </button>
        <button
            @click="go(getQueryParamsByKey(planetStore.planets?.next, 'page'))"
            v-if="planetStore.planets?.next"
            class="button"
        >
            Next
        </button>
    </div>
</template>

<style scoped></style>
