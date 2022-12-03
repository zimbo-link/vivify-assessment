import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

import { createApp } from "vue";
import router from '@/router/index.js'
import ToDosIndex from '@/components/todos/ToDosIndex.vue'

createApp({
    components: {
        ToDosIndex
    }
}).use(router).mount('#app')
