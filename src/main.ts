import './assets/main.css'
import Buefy from 'buefy';
import 'buefy/dist/buefy.css';

import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);
app.use(Buefy);
app.mount('#app');