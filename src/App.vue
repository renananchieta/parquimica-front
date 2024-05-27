<template>
  <v-app>
    <NavBar v-if="store.usuario.nome"/>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup>
import { onBeforeUnmount } from 'vue';
import { onBeforeMount } from 'vue';
import NavBar from './components/layouts/NavBar.vue';
import { useAppStore } from './stores/app';

const store = useAppStore();
/**
 * 
 * Capturar a página atual do usuário
 */
const memorizarPagina = (e) => {
  if (window.location.pathname !== '/login') {
    //evita loop infinito na tela de autenticacao
    window.sessionStorage.url = window.location.pathname
  }
  e.preventDefault()
}

onBeforeMount(() => {
  window.addEventListener('beforeunload', memorizarPagina);
});

onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', memorizarPagina)
});

</script>
