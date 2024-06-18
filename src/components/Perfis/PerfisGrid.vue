<template> 
   <v-container>
       <v-card class="mb-4" :loading="carregando">
           <v-card-title>Pesquisa de Perfil</v-card-title>
           <v-divider class="ml-4 mr-4 mb-2"/>
           <v-card-text>
               <v-form @submit.prevent="pesquisar">
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
                         variant="tonal"
                         :loading="carregando"
                         type="submit">Pesquisar</v-btn>
                       <v-btn
                           variant="tonal"
                           type="buttom"
                           @click="limparFiltros">Limpar filtros</v-btn>
                   </v-card-actions>
               </v-form>
           </v-card-text>
       </v-card>

       <v-data-table
           :headers="headers"
           :items="dados"
           class="elevation-1"
           :loading="carregando"
           hover
           items-per-page-text="Itens por página"
       >
           <template #top>
               <v-toolbar
                   flat
               >
                   <v-toolbar-title>Perfis</v-toolbar-title>
                   <v-spacer />
                   <v-btn
                   density="compact"
                   icon="mdi-plus"
                   size="x-large"
                   class="botao-novo bg-success"
                   color="white"
                   to="/admin/perfil/create"
                   />
               </v-toolbar>
               </template>
               <template v-slot:item.actions="{ item }">
               <v-menu>
                   <template #activator="{ props }">
                       <v-btn elevation="0" icon="mdi-dots-vertical" v-bind="props" />
                   </template>
                   <v-list>
                   <v-list-item
                       v-for="(opt, i) in itemsMenu"
                       :key="i"
                       @click="opt.action(opt, item.id)"
                   >
                       <v-list-item-title> <v-icon>{{ opt.icone }}</v-icon> {{ opt.title }}</v-list-item-title>
                   </v-list-item>
                   </v-list>
               </v-menu>
       </template>
       </v-data-table>
   </v-container>
</template>

<script setup>
import api from '@/plugins/api';
import { onMounted } from 'vue';
import router from "@/router";
import { ref } from 'vue';
import { VDataTable} from 'vuetify/components/VDataTable';

/**
* Types
*/
// type ReadonlyHeaders = InstanceType<typeof VDataTable>['headers']

/**
* Data
*/
const headers = ref([
   {title: "Nome", key: "perfil"},
   {title: "Total de usuários", key: "total_usuarios"},
   {title: "Ações", align:"end", key: "actions"}
]);
const dados = ref([]);
const carregando = ref(false);
const form = ref({
   nome: ""
});

/**
* Methods
*/
// type Item = {
//  title: string;
//  action: (item: object, id: bigint) => void;
// };

const abrirRotaMenu = (item, id) => {
 if (!item) return alert("Item não identificado");
 if (!id) return alert("ID não identificado");
 if (item.title === "Editar")
   return router.push(`/admin/perfil/${id}`);
//  if (item.title === "Visualizar")
//    return router.push(`/perfil/${id}/view`);
 if (item.title === "Excluir")
   return ajaxExcluir(id);
   // return router.push(`/usuario/${id}/view`);
};

const itemsMenu = [
 { title: "Editar", action: abrirRotaMenu, icone: "mdi mdi-pencil" },
 { title: "Visualizar", action: abrirRotaMenu, icone: "mdi mdi-eye-outline" },
 { title: "Excluir", action: abrirRotaMenu, icone: "mdi mdi-delete" },
];

const pesquisar = () => {
   carregando.value = true;

   api.get('/perfil/grid', {params: form.value})
   .then((response) => {
       dados.value = response.data;
   })
   .catch((error) => {
       console.log(error)
   })
   .finally(() => {
       carregando.value = false;
   })
};

const limparFiltros = () => {
   form.value.nome = "";
   pesquisar();
};

const ajaxExcluir = (id) => {
 if(!confirm(`Deseja realmente excluir este perfil?`)){
   return ;
 }
 carregando.value = true;
 api.delete(`/perfil/${id}`)
 .then((response) => {
   alert(response.data.message);
   pesquisar();
 })
 .catch((error) => {
   alert(error.message)
 })
 .finally(() => {
   carregando.value = false;
 }) 
};
/**
* Hooks
*/
onMounted(() => {
   pesquisar();
})

</script>