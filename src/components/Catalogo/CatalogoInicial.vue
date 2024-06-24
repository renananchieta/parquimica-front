<template>
    <v-container>
        <v-card class="mb-4">
            <v-card-title>Pesquisar Produtos</v-card-title>
            <v-divider class="ml-4 mr-4 mb-2"/>
            <v-card-text>
                <v-form @submit.prevent="catalogoGrid()">
                   <v-row>
                       <v-col>
                           <v-text-field
                           label="Nome"
                           v-model="form.nome"
                           density="compact"
                           variant="outlined"/>
                       </v-col>
                   </v-row>
                   <v-divider class="mb-2"/>
                   <v-card-actions>
                       <v-spacer/>
                       <v-btn 
                         variant="elevated"
                         color="botao"
                         :loading="carregando"
                         type="submit">Pesquisar</v-btn>
                       <v-btn
                           variant="elevated"
                           color="botao"
                           type="buttom"
                           @click="limparFiltros">Limpar filtros</v-btn>
                   </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
        <v-card>
            <v-card-title>Catálogo</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                variant="elevated"
                class="mt-n14 mr-4"
                color="botao"
                :loading="carregando"
                @click="exportarCSV()">Exportar CSV</v-btn>
            </v-card-actions>
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
import { onMounted, ref } from 'vue';

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
const carregando = ref(false);
const form = ref({
   nome: ""
});

/**
 * Methods
 */

const catalogoGrid = () => {
    let params = {
        params:{
            nome: form.value.nome
        }
    }
    api.get('/catalogo/grid', params) 
    .then((response) => {
        dados.value = response.data;
    })   
    .catch((error) => {
        console.log(error);
    })
}

const limparFiltros = () => {
   form.value.nome = "";
//    pesquisar();
};

const exportarCSV = () => {
    carregando.value = true;
    api.get('/catalogo/grid/exportar-csv', { responseType: 'blob' }) 
    .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'produtos.csv');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        carregando.value = false;
    });
}

/**
 * Hooks
 */
onMounted(() => {
    catalogoGrid();
})

</script>