<template>
    <v-container>
        <v-card>
            <v-card-text>
                <v-row>
                    <v-card-title>ÁREA RESTRITA / CONFIGURAÇÃO GERAL</v-card-title>
                    <v-spacer></v-spacer>

                    <v-dialog
                    width="650px">
                        <template v-slot:activator="{ props: activatorProps }">
                            <v-btn 
                            v-bind="activatorProps"
                            variant="elevated" 
                            color="primary"
                            class="ma-2">
                                <v-icon>mdi mdi-cog-play-outline</v-icon> 
                                Adicionar Configuração
                            </v-btn>
                        </template>
                        <template v-slot:default="{ isActive }">
                            <v-card>
                            <v-toolbar title="Adicionar uma nova configuração"></v-toolbar>

                            <v-card-text class="text-h2">
                                <v-form @submit.prevent="">
                                    <v-row>
                                        <v-col cols="12" md="12">
                                            <v-text-field
                                            label="Variável"
                                            density="compact"
                                            variant="outlined"/>
                                        </v-col>
                                        <v-col cols="12" md="12">
                                            <v-textarea
                                            label="Valor"
                                            density="compact"
                                            variant="outlined"/>
                                        </v-col>
                                    </v-row>
                                </v-form>
                            </v-card-text>

                            <v-card-actions class="justify-start">
                                <v-btn
                                variant="elevated"
                                color="primary"
                                @click="isActive.value = false">
                                    <v-icon>mdi mdi-content-save</v-icon> Salvar
                                </v-btn>

                                <v-btn
                                text="Cancelar"
                                color="red"
                                variant="tonal"
                                @click="isActive.value = false"
                                ></v-btn>
                            </v-card-actions>
                            </v-card>
                        </template>
                    </v-dialog>
                </v-row>
            </v-card-text>

            <v-form @submit.prevent="">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                            label="Nome da empresa"
                            variant="outlined"
                            density="compact"
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                            label="Número de contato"
                            variant="outlined"
                            density="compact"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                            label="Número de contato 2"
                            variant="outlined"
                            density="compact"
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                            label="Link do WhatsApp"
                            variant="outlined"
                            density="compact"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                            label="Link do Facebook"
                            variant="outlined"
                            density="compact"
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                            label="Link do Instagram"
                            variant="outlined"
                            density="compact"
                            />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                            label="Horário de Segunda a Sexta"
                            variant="outlined"
                            density="compact"
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                            label="Horário no Sábado"
                            variant="outlined"
                            density="compact"
                            />
                        </v-col>
                    </v-row>
                    <v-card-action>
                        <v-btn
                        variant="elevated"
                        color="primary"
                        @click="isActive.value = false">
                            <v-icon>mdi mdi-content-save</v-icon> Salvar
                        </v-btn>
                    </v-card-action>
                </v-container>
            </v-form>

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
const adicionarConfiguracao = () => {

}

const navegarPara = ($caminho) => {
    router.push($caminho);
}
</script>