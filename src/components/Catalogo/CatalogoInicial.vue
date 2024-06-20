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
                  items-per-page-text="Itens por página"
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
    {title: "id", key:"ID"},
    {title: "Produto", key:"NOME"},
    {title: "Abreviação", key:"EMB_ABREVIADA"},
    {title: "Valor (R$)", key:"PRECO"},
]);
const dados = ref([]);

/**
 * Methods
 */
const getFireBird = () => {
    api.get('catalogo-inicial') 
    .then((response) => {
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