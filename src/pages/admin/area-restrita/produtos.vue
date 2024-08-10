<template>
    <v-container>
        <v-card>
            <v-card-title>ÁREA RESTRITA / PRODUTOS</v-card-title>
            <v-card-subtitle>Busque o produto desejado e altere suas informações</v-card-subtitle>

            <v-form @submit.prevent="buscarProduto()">
                <v-row class="ma-2">
                    <v-col cols="12" md="6">
                        <auto-complete-remoto
                            v-model="form.produto"
                            v-model:valor.sync="produtos"
                            :carregando="loading"
                            item-title="nome"
                            item-value="id"
                            label="Buscar Produto"
                            @pesquisa-autocomplete="getProdutos()"
                            variant="outlined"
                            density="compact"
                            append-inner-icon="mdi mdi-list-box-outline"
                        />
                        <!-- {{ form.produto }} -->
                    </v-col>
                    <v-col cols="12" md="6">
                        <v-btn color="primary" variant="elevated" type="submit">
                            <v-icon>mdi mdi-magnify</v-icon>Buscar
                        </v-btn>
                    </v-col>
                </v-row>
            </v-form>

            <v-divider></v-divider>

            <v-card-title>Dados do Produto:</v-card-title>

            <v-form @submit.prevent="salvarProdutoBaseLocal()">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                            label="Nome do Produto"
                            v-model="formProduto.nomeProduto"
                            variant="outlined"
                            density="compact"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <auto-complete-remoto-multiple
                            v-model="formProduto.variantes"
                            v-model:valor.sync="produtos"
                            :carregando="loading"
                            item-title="nome"
                            item-value="id"
                            label="Variantes do produto"
                            @pesquisa-autocomplete="getProdutos()"
                            variant="outlined"
                            density="compact"
                            append-inner-icon="mdi mdi-list-box-outline"
                        />
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field
                            label="Subtítulo do Produto"
                            v-model="formProduto.subtituloProduto"
                            variant="outlined"
                            density="compact"/>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-text-field
                            label="Modo de ação"
                            v-model="formProduto.modoAcao"
                            variant="outlined"
                            density="compact"/>
                        </v-col>
                    </v-row>
                    <!-- <v-row>
                        <v-col cols="12" md="6">
                            <v-file-input
                            label="Imagem"
                            v-model="formProduto.arquivo"
                            variant="outlined"
                            density="compact"
                            show-size
                            small-sheets
                            accept=".pdf"/> -->
                            <!-- append-inner-icon="mdi mdi-eye" -->
                            <!-- @click:append="verArquivo()" -->
                        <!-- </v-col>
                    </v-row> -->
                    <v-card-actions>
                        <v-btn color="primary" variant="elevated" type="submit">
                            <v-icon>mdi mdi-pencil</v-icon>Alterar
                        </v-btn>
                    </v-card-actions>
                </v-container>
            </v-form>

            <v-dialog
            v-model="dialog"
            max-width="450"
            persistent>
                <v-list
                class="py-2"
                color="primary"
                elevation="12"
                rounded="lg">
                    <v-list-item>
                        <v-list-item-title>{{ mensagem }}</v-list-item-title>

                        <template v-slot:prepend>
                            <div class="pe-4" v-show="mensagem == 'Registro salvo com sucesso!'">
                                <v-icon
                                class="mb-5"
                                color="success"
                                icon="mdi-check-circle"
                                size="112"
                                ></v-icon>
                            </div>
                        </template>

                        <template v-slot:append>
                            <v-progress-circular
                            v-show="loading == true"
                            color="primary"
                            :indeterminate="loading"
                            size="16"
                            width="2"
                            ></v-progress-circular>
                        </template>
                    </v-list-item>
                </v-list>
            </v-dialog>
        </v-card>
    </v-container>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import AutoCompleteRemoto from "@/components/AutoCompleteRemoto.vue";
import AutoCompleteRemotoMultiple from "@/components/AutoCompleteRemotoMultiple.vue";
import api from "@/plugins/api";

/**
 * Data
 */
const loading = ref(false);
const produtos = ref([]);
const form = ref({
    produto: ""
});
const formProduto = ref({
    nomeProduto: "",
    codigoProduto: null,
    subtituloProduto: "",
    modoAcao: "",
    variantes: [],
    // arquivo: []
});
const dialog = ref(false);
const mensagem = ref("");

/**
 * Methods
 */
const getProdutos = (pesquisa) => {
  if (form.value.produto) {
    return;
  }
  loading.value = true;
  api
    .get(`/combo/produtos`)
    .then((response) => {
        produtos.value = response.data;
        loading.value = false;
    })
    .catch((error) => {
      alert("Erro ao buscar Produto" + error);
    });
};

const buscarProduto = () => {
    loading.value = true;
    api
      .get(`/firebird/literatura/${form.value.produto}`)
      .then((response) => {
        console.log(response.data);
        console.log(response.data[0]);
        console.log(response.data[0]['detalhes'][0]['LID_DSC']);
        formProduto.value.nomeProduto = response.data[0]['PRD_NOME'];
        formProduto.value.subtituloProduto = response.data[0]['PRD_LIT_DSC'];
        formProduto.value.modoAcao = response.data[0]['detalhes'][0]['LID_DSC'];
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loading.value = false;
      })
}

const salvarProdutoBaseLocal = () => {
    mensagem.value = "Aguarde. Estamos processando";
    loading.value = true;
    dialog.value = true;

    formProduto.value.codigoProduto = form.value.produto;
    // formProduto.value.variantes = formProduto.value.variantes.map(id => ({ id }));
    let formTratado = {
        nomeProduto: formProduto.value.nomeProduto,
        codigoProduto: formProduto.value.codigoProduto,
        subtituloProduto: formProduto.value.subtituloProduto,
        modoAcao: formProduto.value.modoAcao,
        variantes: formProduto.value.variantes.map(id => ({ id }))
    }

    api.post('/area-restrita/produtos', formTratado)
    .then((response) => {
        console.log(response.data);
        loading.value = false;

        mensagem.value = response.data;
        setTimeout(() => {
            dialog.value = false;
        }, 2500);
    })
    .catch((error) => {
        console.log(error);

        loading.value = false;
        setTimeout(() => {
            dialog.value = false;
        }, 2500);
    })
}

</script>