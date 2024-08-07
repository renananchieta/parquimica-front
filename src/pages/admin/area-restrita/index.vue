<template>
    <v-container>
        <!-- <div>
            <v-breadcrumbs :items="items">
                <template v-slot:item="{ item }">
                    <v-breadcrumbs-item
                    @click="navegarPara(item.to)"
                    :disabled="item.disabled">
                        {{ item.text }}
                    </v-breadcrumbs-item>
                </template>
            </v-breadcrumbs>
        </div> -->
        <v-card>
            <v-card-title>ÁREA RESTRITA</v-card-title>
            <v-card-subtitle>Alteração de informações de produtos e informações de contato em geral</v-card-subtitle>

                <v-row class="ma-2">
                    <v-col cols="12" md="3" align-self="align">
                        <v-card elevation="3" @click="navegarPara('/admin/area-restrita/produtos')">
                            <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                            ></v-img>
                            <v-card-title>Produtos</v-card-title>
                            <v-card-subtitle class="mb-2">Editar informações de produtos</v-card-subtitle>
                            <v-card-actions>
                                <v-btn color="primary" variant="elevated" @click="navegarPara('/admin/area-restrita/produtos')">Acessar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    
                    <v-col cols="12" md="3" align-self="align">
                        <v-card elevation="3" @click="navegarPara('/admin/area-restrita/informacoes-contato')">
                            <v-img
                            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
                            ></v-img>
                            <v-card-title>Informações de Contato</v-card-title>
                            <v-card-subtitle class="mb-2">Editar informações de contato </v-card-subtitle>
                            <v-card-actions>
                                <v-btn color="primary" variant="elevated" @click="navegarPara('/admin/area-restrita/informacoes-contato')">Acessar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                </v-row>
        </v-card>
    </v-container>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";

/**
 * Data
 */
const items = ref([
    {
        text: 'Administrador',
        disabled: false,
        to: '/admin',
    },
    {
        text: 'Área Restrita',
        disabled: false,
        to: '/admin/area-restrita',
    },
]);

/**
 * Methods
 */
const navegarPara = ($caminho) => {
    router.push($caminho);
}
</script>