<template>
   <v-container>
     <v-form @submit.prevent="pesquisar">
       <v-card class="mb-4">
         <v-card-title>Pesquisa de Usuários</v-card-title>
         <v-divider />
           <v-row class="mt-n5 mb-n11 mr-1">
             <v-col cols="8"> 
               <v-card-text><p color="grey-lighten-1">Buscar usuários</p></v-card-text>
             </v-col>
 
             <v-col cols="4">
               <span class="float-right">
                 <div class="switch-container">
 
                   <v-switch
                     v-model="situacao"
                     color="green lighten-3"
                   >
                     <template v-slot:prepend>Incluir usuários inativos</template>
                   </v-switch>
                 </div>
               </span>
             </v-col>
           </v-row>
 
           <v-card-text>
               <v-row >
                 <v-col cols="12" md="6">
                   <v-text-field
                     v-model="form.nome"
                     label="Nome"
                     variant="outlined"
                     density="compact"
                   />
                 </v-col>
                 <v-col cols="12" md="6">
                   <v-text-field
                     v-model="form.email"
                     label="Email"
                     variant="outlined"
                     density="compact"
                   />
                 </v-col>
               </v-row>
           </v-card-text>
 
           <v-divider/>
 
           <v-card-actions>
             <v-spacer />
             <v-btn
               class="ma-1"
               :loading="carregando"
               type="submit"
               variant="elevated"
               color="botao"
             >Pesquisar
             </v-btn>
             <v-btn
               class="ma-1"
               variant="elevated"
               color="botao"
               @click="limparFiltros"
             >Limpar Filtros
             </v-btn>
           </v-card-actions>
       </v-card>
     </v-form>
 
     <v-data-table
       :headers="(headers as ReadonlyHeaders)"
       :items="dados"
       class="elevation-1"
       :loading="carregando"
       hover
     >
       <template #top>
         <v-toolbar flat>
           <v-toolbar-title>Usuários</v-toolbar-title>
           <v-spacer />
           <v-btn
             density="compact"
             icon="mdi-plus"
             size="x-large"
             class="botao-novo bg-success"
             color="white"
             to="/admin/usuarios/create"
           />
         </v-toolbar>
       </template>
 
       <!-- NECESSÁRIO TRATAR A MODIFICAÇÃO DA SITUAÇÃO DO USUÁRIO -->
       <!-- <template v-slot:item.ativo="{ item }">
         <v-switch
           v-model="item.ativo"
           :value="item.ativo"
           color="green lighten-1">
           <template v-slot:label>
             <span :class="item.ativo ? 'green--text' : 'red--text'">
               {{ item.ativo ? "Ativo&nbsp;&nbsp;&nbsp;" : "Inativo" }}</span
             >
           </template>
         </v-switch>
       </template> -->
 
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
               <v-list-item-title>
                 <v-icon>{{ opt.icone }}</v-icon>
                 {{ opt.title }}</v-list-item-title
               >
             </v-list-item>
           </v-list>
         </v-menu>     
       </template>
     </v-data-table>
   </v-container>
 </template>
 
 <script lang="ts" setup>
 import { ref } from 'vue';
 import router from "@/router";
 import api from '@/plugins/api';
 import { onMounted } from 'vue';
 import { VDataTable} from 'vuetify/components/VDataTable';
 
 /**
  * Data
  */
 const carregando = ref(false);
 const headers = ref([
   { title: "ID", key: "id" },
   { title: "Nome", key: "nome" },
   { title: "E-mail", key: "email" },
   { title: "Perfil(s)", key: "perfisUsuarioDesc" },
   // { title: "Situação",  key: "ativo" },
   { title: "Ações", align:"end", key: "actions"}
 ]);
 const dados = ref([]);
 const form =ref({
   nome: '',
   email: '',
   situacao: '',
 });
 const situacao = ref(false);
 
 type ReadonlyHeaders = InstanceType<typeof VDataTable>['headers'];
 
 /**
  * Methods
  */
 type Item = {
   title: string;
   action: (item: object, id: bigint) => void;
 };
 
 const abrirRotaMenu = (item: Item, id: bigint) => {
   if (!item) return alert("Item não identificado");
   if (!id) return alert("ID não identificado");
   if (item.title === "Editar")
    return router.push(`/admin/usuarios/${id}`);
  //  if (item.title === "Visualizar")
  //    return router.push(`/usuario/${id}/view`);
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
   situacao.value == false ? form.value.situacao = "ativo" : form.value.situacao = "todas"
 
   carregando.value = true;
   api.get("/admin/usuarios", {
     params: form.value
   })
   .then((response) => {
     dados.value = response.data
   })
   .catch((error) => {
     console.log(error.data);
   })
   .finally(() => {
     carregando.value = false;
   });
 };
 
 const ajaxExcluir = (id: bigint) => {
   if(!confirm(`Deseja realmente excluir este usuário?`)){
     return ;
   }
   carregando.value = true;
   api.delete(`/admin/usuario/${id}`)
   .then((response) => {
     alert(response.data.message);
     // dados.value.splice(dados.value.indexOf(id), 1);
     pesquisar();
   })
   .catch((error) => {
     alert(error.message)
   })
   .finally(() => {
     carregando.value = false;
   }) 
 };

 const limparFiltros = () => {
   form.value.nome = "";
   pesquisar();
};
 
 /**
  * Hooks
  */
 onMounted(() => {
   pesquisar();
 })
 </script>