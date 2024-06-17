<template>
    <v-list density="compact"> 
            <v-list-item 
                v-for="(item, i) in items"
                :key="i"
                :value="item"
                color="selectedColor"
            >
                <template v-slot:prepend>
                <v-icon :icon="item.icon"></v-icon>
                </template>

                <v-list-item-title v-text="item.text" @click="router.push(item.to)"></v-list-item-title>
            </v-list-item>
        </v-list>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();
const items = ([
    { text: 'Home', icon: 'mdi-home', to: "/home"},
    { text: 'Usuários', icon: 'mdi-account', to: "/admin/usuarios"},
    { text: 'Perfis', icon: 'mdi-account', to: "/admin/perfil"},
    // { text: 'Lotes de Frequencia', icon: 'mdi-account', to: "/frequencia"},
    // { text: 'Frequencia de estudantes', icon: 'mdi-account', to: "/frequencia/frequencia-estudante"},
    // { text: 'Perfis', icon: 'mdi-flag', to: "/perfi"},
    // { text: 'Ações', icon: 'mdi-flag', to: "/acoes"},
    // { text: 'Query Builder', icon: 'mdi-flag', to: "/query-builder"},
    // { text: 'Dashboard', icon: 'mdi-flag', to: "/dashboard"},
    // { text: 'Mapas', icon: 'mdi-flag', to: "/mapas"},
]);
</script>

<style>

</style>