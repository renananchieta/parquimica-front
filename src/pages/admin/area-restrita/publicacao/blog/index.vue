<template>
    <v-card class="ma-2">
        <v-card-title>Pesquisar Publicação - Blog</v-card-title>
        
        <v-card-subtitle>Pesquise por uma Publicação - Blog</v-card-subtitle>
        
        <v-divider class="ma-2"></v-divider>
        
        <v-card-text>
            <v-form @submit.prevent="getPostagensSite()">
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field
                        v-model="form.categoria"
                        label="Categoria"
                        variant="outlined"
                        density="compact"/>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                        v-model="form.titulo"
                        label="Título"
                        variant="outlined"
                        density="compact"/>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                        v-model="form.data_publicacao"
                        label="Data de publicação"
                        variant="outlined"
                        type="date"
                        density="compact"/>
                    </v-col>
                </v-row>

                <v-card-actions>
                    <v-btn
                    variant="elevated"
                    color="primary"
                    @click="getPostagensSite()">
                        <v-icon class="mr-1">mdi mdi-search-web</v-icon>
                        Pesquisar
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>

    <v-card class="ma-2">
        <v-data-table
        :headers="headers"
        :items="items">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Listagem de publicações para o Site</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn variant="elevated" color="primary" to="/admin/area-restrita/publicacao/blog/nova-publicacao">
                        <v-icon class="mr-2">mdi mdi-plus</v-icon>
                        Nova Publicação
                    </v-btn>
                </v-toolbar>

                
            </template>

            <template v-slot:item.actions="{ item }">
                <v-icon
                class="me-2"
                size="small"
                @click="editItem(item)">
                    mdi-pencil
                </v-icon>
                <v-icon
                size="small"
                @click="deleteItem(item)">
                    mdi-delete
                </v-icon>

                <v-dialog v-model="dialogConfirm">
                    <v-card width="auto" class="pa-4 text-center mx-auto">
                        <v-card-text class="text-h6">Deseja mesmo remover esta publicação?</v-card-text>
                        <v-card-actions class="pa-4 text-center mx-auto">
                            <v-btn
                            class="mr-2"
                            :loading="loading"
                            variant="elevated"
                            color="red"
                            @click="confirmarRemoverPublicacao(item)">
                                Remover
                            </v-btn>
                            <v-btn
                            class="mr-2"
                            :loading="loading"
                            variant="elevated"
                            color="primary"
                            @click="dialogConfirm = false">
                                Cancelar
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </template>
        </v-data-table>
    </v-card>

    <v-dialog v-model="dialogAlert" max-width="600px">
      <v-sheet
      class="pa-4 text-center mx-auto"
      elevation="12"
      max-width="600"
      rounded="lg"
      width="100%">
        <v-icon
        class="mb-5"
        :color="color"
        :icon="icon"
        size="112"></v-icon>
        <h2 class="text-h5 mb-6">{{ mensagemTitle }}</h2>
        <!-- <p class="mb-4 text-medium-emphasis text-body-2">{{ mensagemBody }}</p> -->
    
        <v-divider class="mb-4"></v-divider>
        <div class="text-end">
          <v-btn
          class="text-none"
          color="primary"
          variant="flat"
          width="90"
          rounded
          @click="fecharTudo()">
            Fechar
          </v-btn>
        </div>
      </v-sheet>
    </v-dialog>

</template>

<script setup>
import api from '@/plugins/api';
import router from '@/router';
import { onMounted } from 'vue';
import { ref } from 'vue';

/**
 * Data
 */
const headers = ref([
    {title: "Título", key: "titulo"},
    {title: "Categoria", key: "categoria"},
    {title: "Data de Publicação", key: "data_publicacao"},
    {title: "Status da publicação", key: "status_publicacao"},
    {title: "Ações", align: "end", key: "actions"},
]);
const items = ref([]);
const loading = ref(false);
const form = ref({
    categoria: "",
    titulo: "",
    data_publicacao: ""
});
const dialogConfirm = ref(false);
const dialogAlert = ref(false);
const icon = ref('');
const color = ref('');
const mensagemTitle = ref('');

/**
 * Methods
 */
const getPostagensSite = () => {
    loading.value = true;

    api.get('/area-restrita/blog/postagem/grid', {params: form.value})
    .then((response) => {
        console.log(response.data);

        items.value = response.data;
    }).catch((error) => {
        console.log(error);
    })
    .finally(() => {
        loading.value = false;
    })
} 

const editItem = (item) => {
    router.push(`/admin/area-restrita/publicacao/blog/${item.id}`)    
}

const deleteItem = (item) => {
    dialogConfirm.value = true;
}

const confirmarRemoverPublicacao = (item) => {
    loading.value = true;

    api.delete(`/area-restrita/blog/postagem/${item.id}`)
    .then((response) => {
        icon.value = 'mdi-check-circle';
        color.value = 'success';
        mensagemTitle.value = response.data.message;
        dialogAlert.value = true;
    })
    .catch((error) => {
        console.log(error);
        icon.value = 'mdi mdi-clock-alert';
        color.value = 'red-darken-3';
        mensagemTitle.value = 'Tivemos um problema, tente novamente.';
        dialogAlert.value = true;
    })
    .finally(() => {
        loading.value = false;
        getPostagensSite();
    })
}

const fecharTudo = () => {
    dialogAlert.value = false;
    dialogConfirm.value = false;
}

const teste = () => {
    console.log('CLICOU');
}
    
onMounted(() => {
    getPostagensSite();
})

</script>