<template>
    <v-container>
        <v-card>
            <v-card-title>Catálogo</v-card-title>
            <v-card-subtitle>Catálogo de produtos</v-card-subtitle>
            <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="dados"
                  hover
                />
            </v-card-text>
        </v-card>    
    </v-container>
</template>

<script setup>
import api from '@/plugins/api';
import { onMounted } from 'vue';

/**
 * Data
 */
const headers = ref([
    {title: "id", key:"id"},
    {title: "Produto", key:"nome"},
    {title: "Abreviação", key:"emb_abreviada"},
    {title: "Valor (R$)", key:"preco"},
]);
const dados = ref([]);

/**
 * Methods
 */
const getFireBird = () => {
    api.get('catalogo-inicial') 
    .then((response) => {
        console.log(response.data);
        dados.value = response.data;
    })   
    .catch((error) => {
        console.log(error);
    })
}

/**
 * Hooks
 */
onMounted(() => {
    getFireBird();
})

</script>