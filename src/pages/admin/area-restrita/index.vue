<template>
    <v-container>
        <v-card>
            <v-card-title> <v-icon>mdi mdi-security</v-icon> ÁREA RESTRITA</v-card-title>
            <v-card-subtitle>Alteração de informações de produtos e informações de contato em geral</v-card-subtitle>

                <v-row class="ma-2">
                    <v-col cols="12" md="3" align-self="align">
                        <v-card 
                        elevation="3" 
                        @click="navegarPara('/admin/area-restrita/produtos')">
                            <v-card-title> <v-icon>mdi mdi-list-box-outline</v-icon> Produtos</v-card-title>
                            <v-card-subtitle class="mb-2">Editar informações de produtos</v-card-subtitle>
                            <v-card-actions>
                                <v-btn color="primary" variant="elevated" @click="navegarPara('/admin/area-restrita/produtos')">Acessar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>
                    
                    <v-col cols="12" md="3" align-self="align">
                        <v-card 
                        elevation="3" 
                        @click="navegarPara('/admin/area-restrita/configuracao-geral')">
                            <v-card-title> <v-icon>mdi mdi-cog</v-icon> Configurações</v-card-title>
                            <v-card-subtitle class="mb-2">Editar informações gerais</v-card-subtitle>
                            <v-card-actions>
                                <v-btn color="primary" variant="elevated" @click="navegarPara('/admin/area-restrita/configuracao-geral')">Acessar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="3" align-self="align">
                        <v-card 
                        elevation="3" 
                        @click="navegarPara('/admin/area-restrita/publicacao/site')">
                            <v-card-title> <v-icon>mdi mdi-web</v-icon> Site</v-card-title>
                            <v-card-subtitle class="mb-2">Criar postagem para o site</v-card-subtitle>
                            <v-card-actions>
                                <v-btn color="primary" variant="elevated" @click="navegarPara('/admin/area-restrita/publicacao/site')">Acessar</v-btn>
                            </v-card-actions>
                        </v-card>
                    </v-col>

                    <v-col cols="12" md="3" align-self="align">
                        <v-card 
                        elevation="3" 
                        @click="navegarPara('/admin/area-restrita/publicacao/blog')">
                            <v-card-title> <v-icon>mdi mdi-post</v-icon> Blog</v-card-title>
                            <v-card-subtitle class="mb-2">Criar postagem para o Blog</v-card-subtitle>
                            <v-card-actions>
                                <v-btn color="primary" variant="elevated" @click="navegarPara('/admin/area-restrita/publicacao/blog')">Acessar</v-btn>
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

/**
 * Methods
 */
const navegarPara = ($caminho) => {
    router.push($caminho);
}
</script>