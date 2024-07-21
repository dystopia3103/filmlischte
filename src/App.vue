<script setup async lang="js">
import movieService from './services/MovieService.js'
import {onMounted, ref} from "vue";

const newMovie = ref("");
const streamingInfo = ref("");
const movies = ref([]);
const inputType = ref("");
const modalOpen = ref(false);
const modalMovie = ref(null);
const modalLoading = ref(false);

const openModal = function (movie) {
  modalMovie.value = movie;
  streamingInfo.value = movie.get("stream") === undefined ? "" : movie.get("stream");
  modalOpen.value = true;
}

const saveModal = function () {
  modalLoading.value = true;
  movieService.updateStream(modalMovie.value, streamingInfo.value.trim()).then(() => {
    closeModal();
    getAll();
  });
}

const closeModal = function () {
  modalOpen.value = false;
  modalMovie.value = null;
  streamingInfo.value = "";
}

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
        <div class="box is-flex is-justify-content-center">
          <b-icon icon="movie" size="is-large" type="is-primary" class="mr-1"/>
          <h1 class="title is-2">Film Lischte</h1>
        </div>
        <b-modal v-model="modalOpen" @close="closeModal">
          <div v-if="modalMovie !== null" class="box">
            <p class="title">Infos "{{ modalMovie.get("name") }}"</p>
            <b-field label="Wie streame?" label-position="on-border">
              <b-input type="textarea" expanded placeholder="Netflix, Disney+ oder Piraterie Arrr... 🏴‍☠️"
                       v-model="streamingInfo"/>
            </b-field>
            <b-button class="button is-primary" @click="saveModal" icon-left="check">Jä</b-button>
          </div>
        </b-modal>
        <div class="box">
          <b-taglist>
            <b-tag v-for="movie in movies" :key="movie" class="is-light is-large" closable @close="removeMovie(movie)"
                   @click="openModal(movie)">
              {{ movie.get("name") }}
              <b-tooltip label="No kein stream :("
                         v-if="movie.get('stream') === undefined || movie.get('stream').length < 1">
                <b-icon icon="help" size="is-small" type="is-primary" class="ml-1 mr-1"/>
              </b-tooltip>
              <b-tooltip v-else :label="movie.get('stream')">
                <b-icon icon="check-circle" size="is-small" type="is-success" class="ml-1 mr-1"/>
              </b-tooltip>
            </b-tag>
          </b-taglist>
        </div>
        <div class="card mt-5">
          <div class="container has-text-left">
            <b-field :type="inputType" label="Name" label-position="on-border">
              <b-input expanded icon="movie" placeholder="Film do ine schribe brudi..." v-model="newMovie"/>
              <p class="control">
                <b-button class="button is-primary" @click="addMovie" icon-right="plus"/>
              </p>
            </b-field>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
</style>
