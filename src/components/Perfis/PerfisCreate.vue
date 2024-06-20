<template>
    <v-container>
        <v-form @submit.prevent="ajaxNovo" ref="form" lazy-validation>
            <v-card :loading="carregando">
                <v-card-title>Cadastro de Perfil</v-card-title>
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
                                        :color="corChip(subItem)"
                                        fab
                                        x-small
                                        :to="link(subItem)"
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
                    color="botao"
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

        <v-dialog
        v-model="dialog"
        max-width="450"
        persistent
        >
            <v-list
                class="py-2"
                color="primary"
                elevation="12"
                rounded="lg"
            >
                <v-list-item class="text-center" :title="mensagem">
                <template v-slot:append>
                    <v-progress-circular
                    v-show="carregando"
                    color="primary"
                    indeterminate="disable-shrink"
                    size="16"
                    width="2"
                    ></v-progress-circular>
                </template>
                </v-list-item>
            </v-list>
        </v-dialog>
    </v-container>
</template>

<script setup>
import api from '@/plugins/api';
import { onMounted } from 'vue';
import { ref } from 'vue';
import { isUsuarioAdmin } from "@/utils/helpers"
// import { VForm } from "vuetify/components";
// import { required } from "@/utils/Validacoes";

/**
 * Data
 */
const carregando = ref(false);
const grupos = ref([]);
const grupo = ref("");
const dados = ref([]);
// const form = ref<VForm>();
const formPerfil = ref({
    id:0,
    perfil:"",
    permissoes: []
});
const dialog = ref(false);
const mensagemApi = ref("");
const mensagem = ref('');
/**
 * Methods
 */
const create = () => {
    carregando.value = true;
    api.get('/perfil/create')
    .then((response) => {
        grupos.value = response.data.grupos;
        dados.value = response.data.destaque;
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

// const estilo = (index: any) => {
//     const estilo = index % 2 === 0 ? '#EEEEEE' : '#FFFFFF'
//     return `background-color: ${estilo}`;
// };

const corChip = (subItem) => {
    if (subItem.totla_dependencia == 0 && subItem.nome !== '') return 'red-lighten-2';
};

const link = (subItem) => {
    return `/acao/${subItem.id}/edit`;
};

// const salvar = async() => {
//     const validacao = await form.value?.validate();

//     return validacao;
// }

const ajaxNovo = () => {
    carregando.value = true;
    mensagem.value = 'Aguarde...';
    dialog.value = true;
    api.post('/perfil', formPerfil.value)
    .then((response) =>{
        mensagem.value = response.data.message;
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
    create();
})

</script>

<style scoped>
/* Estilos para garantir que o botão seja fixo no canto inferior direito */
.v-btn--floating {
  position: fixed;
  bottom: 16px;
  right: 16px;
}
</style>