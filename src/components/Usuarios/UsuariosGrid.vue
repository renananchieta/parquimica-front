<template>
   <v-container>
      <Pesquisa
      :carregando="carregando"
      subtitulo="Pesquisa de usuários do sistema"
      titulo="Usuários"
      @pesquisar="pesquisar">
         <v-row>
            <v-col
               cols="12"
               md="12"
            >
               <v-text-field
                  v-model="descricao"
                  append-inner-icon="mdi-file-search-outline"
                  label="Descrição"
                  variant="outlined"
                  density="compact"
               />
            </v-col>
         </v-row>
      </Pesquisa>
      <br>
      <Tabelas
      :headers="headers"
      :items="items"
      @deletar="deletarDados"
      @editar="editarDados"
      @salvar="salvarDados">
            
      </Tabelas>
   </v-container>
</template>

<script setup>
import api from '@/plugins/api';
import { onMounted, ref } from 'vue';
import Tabelas from '../layouts/Tabelas.vue';

/**
 * Data
 */
const descricao = ref('');
const carregando = ref(false);
const items = ref([]);
const headers = ref([
   {title: "Código usuario", key: "codigo_usuario"},
   {title: "Login", key: "login"},
   {title: "Código pessoa", key: "codigo_pessoa"},
   {title: "Ações", align: "end",key: "actions"},
]);

/**
 * Methods
 */
 const pesquisar = () => {
  carregando.value = true;

   let params = {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('Authorization')}`
      },
      params: {
         login: descricao.value,
      }
   };

   api.get('/admin/usuarios/grid', params)
   .then((response) => {
      console.log(response.data);
      items.value = response.data;
   })
   .catch((error) => {
      console.log(error);
   })
   .finally(() => {
      carregando.value = false;
   })
};

const salvarDados = (item) => {
   let params = {
      headers: {
         Authorization: `Bearer ${localStorage.getItem('Authorization')}`
      },
      params: {
         nome: descricao.value,
      }
   };

   carregando.value = true;
   
   if (item.id) {
      editarDados(item);
   } else {
      api.post('/admin/usuario/store', item, params)
      .then((response) => {
         items.value.push(response.data);
      })
      .catch((error) => {
         console.log(error);
      })
      .finally(() => {
         carregando.value = false;
      })
   }
}

const editarDados = (item) => {
  carregando.value = true;

  api.put(`/admin/usuario/${item.id}/update`, item)
   .then((response) => {
      items.value = items.value.map((dado) => {
         if (dado.id === response.data.id) {
            dado = response.data;
         }
         return dado
      })
   })
   .catch((error) => {
      console.log(error);
   })
   .finally(() => {
      carregando.value = false;
   })
}

const deletarDados = (item) => {
  carregando.value = true;

  api.delete(`/admin/usuario/${item.id}/delete`)
    .then((response) => {
      items.value.splice(items.value.indexOf(item), 1);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      carregando.value = false;
    });
}

onMounted(() => {
   pesquisar();
})
</script>