<template>
    <v-container>
        <v-form @submit.prevent="ajaxEdicao" ref="form" lazy-validation>
            <v-card :loading="carregando">
                <v-card-title>Alteração de Perfil</v-card-title>
                <v-divider/>

                <v-card-text>
                        <v-row>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-text-field
                                label="Nome do Perfil"
                                v-model="formPerfil.perfil"
                                variant="outlined"
                                density="compact"
                                />
                            </v-col>
                        </v-row>
                    
                </v-card-text>

                <v-table density="compact" hover>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th>
                                    <v-autocomplete 
                                    label="Grupo"
                                    v-model="grupo"
                                    :items="grupos"
                                    variant="outlined"
                                    density="compact"/>
                                </th>
                                <th v-if="isUsuarioAdmin">Dependências</th>
                                <th>Permissão</th>
                                <th>Descrição</th>
                            </tr>
                        </thead>

                        <tbody>
                            <template v-for="(item, indicePai) in dados">
                                <tr v-for="(subItem, index) in item.filhos"
                                :key="subItem.id"
                                v-show="filtrar(indicePai)">
                                    <td v-if="index === 0" :rowspan="item.filhos.length">
                                        {{ item.nome }}
                                    </td>
                                    <td v-if="isUsuarioAdmin">
                                        <v-chip
                                        fab
                                        x-small
                                        class="elevation-0"
                                        >
                                            {{ subItem.total_dependencia }}
                                        </v-chip>
                                    </td>
                                    <td>
                                        <label style="cursor: pointer">
                                            <input 
                                            type="checkbox"
                                            style="cursor: pointer"
                                            :value="subItem.id"
                                            v-model="formPerfil.permissoes"> {{ subItem.nome_amigavel }}
                                        </label>
                                    </td>
                                    <td>{{ subItem.descricao }}</td>
                                </tr>
                            </template>
                        </tbody>
                    </template>
                </v-table>

                <v-card-text>
                    <v-btn
                    color="blue"
                    type="buttom"
                    position="fixed"
                    icon="mdi-content-save"
                    fab
                    location="bottom right"
                    class="ma-6"
                    size="large"
                    />
                </v-card-text>
            </v-card>
        </v-form>
    </v-container>
</template>

<script setup>
import api from "@/plugins/api";
import { isUsuarioAdmin } from "@/utils/helpers"
import { onMounted } from "vue";
import { useRoute } from "vue-router";

/**
 * Data
 */
 const route = useRoute();
 const carregando = ref(false);
 const grupos = ref([]);
 const grupo = ref("");
 const dados = ref([]);
 const formPerfil = ref({
    id:0,
    perfil:"",
    permissoes: []
});
const dialog = ref(false);
const mensagemApi = ref("");

/**
 * Methods
 */

const link = (subItem) => {
    return `/acao/${subItem.id}/edit`;
};

 const edit = () => {
    carregando.value = true;
    api.get(`/perfil/${route.params.id}/edit`)
    .then((response) => {
        grupos.value = response.data.grupos;
        grupos.value.unshift('Todos');
        dados.value = response.data.destaque;
        formPerfil.value.id = response.data.registro.id;
        formPerfil.value.perfil = response.data.registro.perfil;
        formPerfil.value.permissoes = response.data.permissoes_concedidas;
    })
    .finally(() => {
        carregando.value = false;
    }) 
};

const filtrar = (indicePai) => {
    if(grupo.value === 'Todos') {
        return true;
    } else if (grupo.value !== '') {
        return dados.value[indicePai].nome === grupo.value;
    } else return true;
};

 const ajaxEdicao = () => {
    carregando.value = true;
    mensagemApi.value = 'Aguarde...'
    dialog.value = true;
    api.patch(`/perfil/${route.params.id}`, formPerfil.value)
    .then((response) =>{
        mensagemApi.value = response.data.message
        setTimeout(() => {
            (dialog.value = false);
        }, 3000);
    })
    .catch((error) => {
        console.log(error)
    })
    .finally(() => {
        carregando.value = false;
    })
};

/**
 * Hooks
 */
onMounted(() => {
    edit();
})
</script>