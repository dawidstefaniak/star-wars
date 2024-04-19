<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePlanetStore } from '../store/planet'
import { getLastURLSegment } from '../utils/utils'

const route = useRoute()
const id = route.params.id
const planetStore = usePlanetStore()
const films = ref([])
const residents = ref([])

const errorMessage = ref('')

const planet = ref()
onMounted(async () => {
    planet.value = await planetStore.fetchPlanet(Number(id))
    const filmPromises = []
    const residentPromises = []
    for (const film of planet.value.films) {
        filmPromises.push(planetStore.fetchFilm(getLastURLSegment(film)))
    }
    for (const resident of planet.value.residents) {
        residentPromises.push(
            planetStore.fetchResident(getLastURLSegment(resident)),
        )
    }

    let res
    try {
        res = await Promise.all([
            Promise.all(filmPromises),
            Promise.all(residentPromises),
        ])
    } catch (error) {
        console.error(error)
        errorMessage.value = 'Failed to fetch data'
        return
    }
    films.value = res[0]
    residents.value = res[1]
})
</script>

<template>
    <div>
        <router-link to="/"
            ><button class="button">Go Back</button></router-link
        >
        <div v-if="errorMessage" class="text-center text-red-500 text-3xl">
            {{ errorMessage }}
        </div>
        <div v-else-if="!planet && !errorMessage">
            <p class="text-center text-3xl text-gray-200">Loading...</p>
        </div>
        <div
            v-else-if="planet && !errorMessage"
            class="fields text-center my-12 text-gray-200"
        >
            <p v-if="planet" class="text-5xl mb-8">{{ planet?.name }}</p>
            <div class="field">
                <label class="text-red-300">Rotation period</label>
                <span>{{ planet.rotation_period }}</span>
            </div>
            <div class="field">
                <label>Orbital period</label>
                <span>{{ planet.orbital_period }}</span>
            </div>
            <div class="field">
                <label>Diameter</label>
                <span>{{ planet.diameter }}</span>
            </div>
            <div class="field">
                <label>Climate</label>
                <span>{{ planet.climate }}</span>
            </div>
            <div class="field">
                <label>Gravity</label>
                <span>{{ planet.gravity }}</span>
            </div>
            <div class="field">
                <label>Terrain</label>
                <span>{{ planet.terrain }}</span>
            </div>
            <div class="field">
                <label>Surface water</label>
                <span>{{ planet.surface_water }}</span>
            </div>
            <div class="field">
                <label>Population</label>
                <span>{{ planet.population }}</span>
            </div>
            <div
                class="field"
                v-if="residents.length === planet.residents.length"
            >
                <label>Residents</label>
                <span
                    v-for="resident in residents"
                    :key="resident.name"
                    class="block"
                    >{{ resident.name }}</span
                >
            </div>
            <div v-else class="text-center text-gray-200 text-3xl mt-12">
                Loading residents...
            </div>
            <div v-if="films.length === planet.films.length" class="field">
                <label>Films</label>
                <span class="block" v-for="film in films" :key="film.title">{{
                    film.title
                }}</span>
            </div>
            <div v-else class="text-center text-gray-200 text-3xl mt-12">
                Loading films...
            </div>
        </div>
    </div>
</template>

<style scoped>
.field {
    label {
        @apply text-3xl block text-gray-400 mb-2 mt-4;
    }
    span {
        @apply text-xl text-gray-200;
    }
}
</style>
