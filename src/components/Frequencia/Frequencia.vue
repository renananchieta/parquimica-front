<template>
  <v-container>
      <Pesquisa
      :carregando="carregando"
      subtitulo="Pesquisar lotes de frequência"
      titulo="Lotes de Frequência"
      @pesquisar="pesquisar">
          <v-row>
            <v-col cols="12" md="8">
                <v-text-field
                v-model="lote"
                label="Identificação do Lote"
                variant="outlined"
                density="compact"/>
             </v-col>
             <v-col cols="12" md="4">
                <v-text-field
                v-model="dt_envio"
                label="Data de envio"
                type="date"
                variant="outlined"
                density="compact"/>
             </v-col>
       </v-row>
    </Pesquisa>
    <br>
    <LoteFrequenciaTable
    :headers="headers"
    :items="items"
    :mensagem="store.mensagens"
    :erros="store.erros"
    :carregamento="carregando"
    :cor="store.color"
    @visualizar="visualizarDados" />
  </v-container>
</template>

<script setup>
import api from '@/plugins/api';
import { useAppStore } from '@/stores/app';
import { ref } from 'vue';
import LoteFrequenciaTable from '../layouts/Tabelas/LoteFrequenciaTable.vue';

const store = useAppStore();
const dt_envio = ref(null);
const lote = ref('');
const carregando = ref(false);
const items = ref([]);
const headers = ref([
 {title: "Lote ID", key: "lote"},
 {title: "Envio", key: "dt_envio"},
 {title: "Consultar", align: 'end', key: "actions"},
]);
/**
* Methods
*/
const pesquisar = () => {
carregando.value = true;

 let params = {
    params: {
      dt_envio: dt_envio.value,
      lote: lote.value
    }
 };

 api.get('/frequencias/lotes/grid', params)
 .then((response) => {
    items.value = response.data;
 })
 .catch((error) => {
    console.log(error);
 })
 .finally(() => {
    carregando.value = false;
 })
};

const visualizarDados = async (item) => {
let params = {
  params: {
    lote: item.lote
  }
}

carregando.value = true;

await api.get(`/frequencias/lotes/status`, params)
 .then((response) => {
   console.log(response.data.status_processamento);
   store.mensagens = response.data.status_processamento;
   if(response.data.erros.original) {
      store.erros = response.data.erros.original.error;
      store.color = '#4CAF50';
   }
   
   if(response.data.erros.erros) {
      store.erros = response.data.erros.erros;
      store.color = '#F44336';
   } 
      

 })
 .catch((error) => {
    console.log(error);
 })
 .finally(() => {
    carregando.value = false;
 })
}

onMounted(() => {
 pesquisar();
})
</script>