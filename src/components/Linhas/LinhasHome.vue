<template>
    <v-container>
        <Pesquisa
        :carregando="carregando"
        subtitulo="Pesquisar Linhas"
        titulo="Linhas"
        @pesquisar="pesquisar">
            <v-row>
                <v-col cols="12" md="12">
                    <v-text-field
                    v-model="descricao"
                    append-inner-icon="mdi-file-search-outline"
                    label="Descrição"
                    variant="outlined"
                    density="compact"/>
                </v-col>
            </v-row>
        </Pesquisa>
        <br>
        <v-data-table
        :headers="headers"
        :items="dados"
        hover
        items-per-page-text="Itens por página"/>
    </v-container>
</template>

<script setup>
import api from '@/plugins/api';
import { onMounted, ref } from 'vue';


/**
 * Data
 */
 const carregando = ref(false);
 const dados = ref([]);
 const headers = ref([
    {title: "id", key:"ID"},
    {title: "Descrição", key:"DESCRICAO"},
 ])
 const descricao = ref('');
 

 /**
  * Methods
  */
const pesquisar = () => {
  carregando.value = true;
  api.get('/firebird/linhas', {
    params: {
        descricao: descricao.value,
    }
  }).then((response) => {
    dados.value = response.data;
  })
    .catch((error) => {
      alert(error);
    })
    .finally(() => {
      carregando.value = false;
    })
}

/**
 * Hooks
 */
onMounted(() =>{
    pesquisar();
})
</script>