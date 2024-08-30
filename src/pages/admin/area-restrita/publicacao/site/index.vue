<template>
    <v-card class="ma-2">
        <v-card-title>Pesquisar Publicação</v-card-title>
        
        <v-card-subtitle>Pesquise por uma Publicação</v-card-subtitle>
        
        <v-divider class="ma-2"></v-divider>
        
        <v-card-text>
            <v-form>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field
                        label="Categoria"
                        variant="outlined"
                        density="compact"/>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                        label="Título"
                        variant="outlined"
                        density="compact"/>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                        label="Data de publicação"
                        variant="outlined"
                        density="compact"/>
                    </v-col>
                </v-row>

                <v-card-actions>
                    <v-btn
                    variant="elevated"
                    color="primary">
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
        :items="item">
            <template v-slot:top>
                <v-toolbar flat>
                    <v-toolbar-title>Listagem de publicações para o Site</v-toolbar-title>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn variant="elevated" color="primary" to="/admin/area-restrita/publicacao/site/nova-publicacao">
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
            </template>
        </v-data-table>
    </v-card>
</template>

<script setup>
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


</script>