<template>
    <v-container>
      <InfoCards 
      :contadores="contadores"
      :carregamento="carregando"/>

      <br>

      <Pesquisa
      :carregando="carregando"
      subtitulo="Pesquisa de estudantes"
      titulo="Estudantes"
      @pesquisar="pesquisar">
         <v-row>
            <v-col cols="12" md="3">
               <v-text-field
               v-model="dre"
               append-inner-icon="mdi-file-search-outline"
               label="DRE"
               variant="outlined"
               density="compact"/>
            </v-col>
            <v-col cols="12" md="3">
               <v-text-field
               v-model="nome_municipio"
               append-inner-icon="mdi-file-search-outline"
               label="Município"
               variant="outlined"
               density="compact"/>
            </v-col>
            <v-col cols="12" md="3">
               <v-text-field
               v-model="nome_escola"
               append-inner-icon="mdi-file-search-outline"
               label="nome_escola"
               variant="outlined"
               density="compact"/>
            </v-col>
            <v-col cols="12" md="3">
               <v-text-field
               v-model="etapa_ensino"
               append-inner-icon="mdi-file-search-outline"
               label="Etapa de ensino do aluno"
               variant="outlined"
               density="compact"/>
            </v-col>
            
         </v-row>
         <v-row>
            <v-col cols="12" md="3">
               <v-select
               v-model="status_elegibilidade"
               :items="status"
               append-inner-icon="mdi-file-search-outline"
               label="Elegibilidade"
               variant="outlined"
               density="compact"/>
            </v-col>
            <v-col cols="12" md="3">
               <v-text-field
               v-model="nome_aluno"
               append-inner-icon="mdi-file-search-outline"
               label="Nome aluno"
               variant="outlined"
               density="compact"/>
            </v-col>
            <v-col cols="12" md="3">
               <v-text-field
               v-model="nome_mae"
               append-inner-icon="mdi-file-search-outline"
               label="Nome da mãe"
               variant="outlined"
               density="compact"/>
            </v-col>
            <v-col cols="12" md="3">
               <v-text-field
               v-model="cpf"
               append-inner-icon="mdi-file-search-outline"
               label="cpf do aluno"
               variant="outlined"
               density="compact"/>
            </v-col> 
         </v-row>
      </Pesquisa>

      <br>

      <EstudantesTable
      :headers="headers"
      :items="items"
      :carregamento="carregando"
      @visualizar="visualizarDados" />
    </v-container>
 </template>
 
 <script setup>
import api from '@/plugins/api';
import { useAppStore } from '@/stores/app';
import { ref } from 'vue';

const store = useAppStore();
const perfil = ref(store.usuario.perfil);
const nome_aluno = ref('');
const nome_mae = ref('');
const cpf = ref('');
const nome_escola = ref('');
const dre = ref('');
const nome_municipio = ref('');
const etapa_ensino = ref('');
const status_elegibilidade = ref('');
const carregando = ref(false);
const items = ref([]);
const status = ref(['', 'Elegível', 'Não elegível', 'Elegibilidade indefinida', 'NÃO ENVIADO', 'Elegível com pendência']);
const headers = ref([
   {title: "Aluno", key: "nome_aluno"},
   {title: "CPF aluno", key: "cpf"},
   {title: "NIS ", key: "numero_nis"},
   {title: "Nascimento", key: "data_nascimento"},
   {title: "Mãe", key: "nome_mae"},
   {title: "DRE", key: "dre"},
   {title: "Escola", key: "nome_escola"},
   {title: "Município", key: "nome_municipio"},
   {title: "Ações", align: "end", key: "actions"},
]);
const contadores = ref([]);

/**
 * Methods
 */
 const pesquisar = () => {
  carregando.value = true;

   let params = {
      // headers: {
      //    Authorization: `Bearer ${localStorage.getItem('Authorization')}`
      // },
      params: {
         nome_aluno: nome_aluno.value,
         nome_mae: nome_mae.value,
         cpf: cpf.value,
         nome_escola: nome_escola.value,
         dre: dre.value,
         nome_municipio:  nome_municipio.value,
         etapa_ensino: etapa_ensino.value,
         status_elegibilidade:  status_elegibilidade.value,
      }
   };

   api.get('/estudantes', params)
   .then((response) => {
      items.value = response.data.data;
      contadores.value = response.data.contadores;
   })
   .catch((error) => {
      console.log(error);
   })
   .finally(() => {
      carregando.value = false;
   })
};

const visualizarDados = (item) => {
  let params = {
    headers: {
        Authorization: `Bearer ${localStorage.getItem('Authorization')}`
    },
  }

  console.log(item);
}

onMounted(() => {
   pesquisar();
})
 </script>