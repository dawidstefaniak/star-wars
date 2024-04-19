import axios from "axios";
import { defineStore } from "pinia";
import { ref } from "vue";


export const usePlanetStore = defineStore('planetStore', () => {
  const planets = ref()
  const films = ref()

  const fetchPlanet = async (id: number | string) => (await axios.get(`https://swapi.dev/api/planets/${id}`).then(res => res.data))
  const fetchFilm = async (id: number | string) => (await axios.get(`https://swapi.dev/api/films/${id}`).then(res => res.data))
  const fetchResident = async (id: number | string) => (await axios.get(`https://swapi.dev/api/people/${id}`).then(res => res.data))

  const fetchPlanets = async (page: number) => (planets.value = await axios
    .get('https://swapi.dev/api/planets', { params: { page } })
    .then(res => res.data))

  const fetchFilms = async () => (films.value = await axios
    .get('https://swapi.dev/api/films')
    .then(res => res.data))

  return { planets, films, fetchPlanets, fetchFilms, fetchPlanet, fetchFilm, fetchResident }
})

