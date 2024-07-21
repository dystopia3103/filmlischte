<script setup async lang="js">
import movieService from './services/MovieService.js'
import {onMounted, ref} from "vue";

const newMovie = ref("");
const movies = ref([]);
const inputType = ref("");

const getAll = function () {
  movies.value = [];
  movieService.getAll().then(data => {
    data.forEach(e => movies.value.push(e))
  })
}

const addMovie = function () {
  newMovie.value = newMovie.value.trim();
  if (newMovie.value.length < 1) {
    return;
  }
  movieService.create(newMovie.value).then(() => {
    getAll();
    inputType.value = "is-success";
  }).catch(() => {
    inputType.value = "is-danger";
  });
  newMovie.value = "";
}

const removeMovie = function (movie) {
  movieService.delete(movie).then(() => {
    getAll();
  })
}

onMounted(() => {
  getAll();
})
</script>

<template>
  <section class="hero is-light is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <p class="title">Film lischte</p>
        <div class="card">
          <div class="card-content">
            <div v-for="movie in movies" :key="movie">
              <b-tag icon="movie" class="is-primary is-large" closable @close="removeMovie(movie)">
                {{ movie.get("name") }}
              </b-tag>
              <br class="mb-3"/>
            </div>
          </div>
        </div>
        <div class="card mt-5">
          <div class="card-content has-text-left">
            <div class="container">
              <b-field :type="inputType" label="Name" label-position="on-border">
                <b-input expanded icon="movie" placeholder="Film do ine schribe brudi..." v-model="newMovie"></b-input>
                <p class="control">
                  <b-button class="button is-primary" @click="addMovie">Mach mal ine</b-button>
                </p>
              </b-field>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
</style>
