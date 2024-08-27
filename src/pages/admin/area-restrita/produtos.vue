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
                            item-title="nome_produto"
                            item-value="codigo_produto"
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

            <v-form @submit.prevent="alterarProdutoBaseLocal()">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-text-field
                            label="Nome do Produto"
                            v-model="formProduto.nomeProduto"
                            variant="outlined"
                            density="compact"/>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-textarea
                            v-model="formProduto.variantes"
                            :carregando="loading"
                            label="Variantes do produto"
                            variant="outlined"
                            density="compact"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-textarea
                            label="Subtítulo do Produto"
                            v-model="formProduto.subtituloProduto"
                            variant="outlined"
                            density="compact"/>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-textarea
                            label="Modo de ação"
                            v-model="formProduto.modoAcao"
                            variant="outlined"
                            density="compact"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-file-input
                            label="Imagem"
                            v-model="formProduto.arquivo"
                            variant="outlined"
                            density="compact"
                            show-size
                            small-sheets
                            accept=".pdf"/>
                            <!-- append-inner-icon="mdi mdi-eye" -->
                            <!-- @click:append="verArquivo()" -->
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-btn color="primary" variant="elevated" type="submit">
                            <v-icon>mdi mdi-mdi mdi-content-save-outline</v-icon>Alterar
                        </v-btn>
                    </v-card-actions>
                </v-container>
            </v-form>

            <v-dialog
            v-model="dialog"
            width="auto"
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

                            <div class="pe-4" v-show="mensagem == 'Não foi possível salvar o produto. Tente novamente.'">
                                <v-icon
                                class="mb-5"
                                color="red"
                                icon="mdi mdi-alert-circle"
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
    id: null,
    nomeProduto: "",
    codigoProduto: null,
    subtituloProduto: "",
    modoAcao: "",
    variantes: "",
    arquivo: []
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
      .get(`/area-restrita/produto/${form.value.produto}`)
      .then((response) => {
        formProduto.value.id = response.data[0].id;
        formProduto.value.nomeProduto = response.data[0].nome_produto;
        formProduto.value.subtituloProduto = response.data[0].subtitulo;
        formProduto.value.modoAcao = response.data[0].modo_acao;
        formProduto.value.variantes = response.data[0].variantes;
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        loading.value = false;
      })
}

const alterarProdutoBaseLocal = () => {
    mensagem.value = "Aguarde. Estamos processando";
    loading.value = true;
    dialog.value = true;

    formProduto.value.codigoProduto = form.value.produto;

    api.put(`/area-restrita/produto/${form.value.produto}/update`, formProduto.value)
    .then((response) => {
        loading.value = false;
        mensagem.value = "Alterado com sucesso";

        setTimeout(() => {
            dialog.value = false;
        }, 2500);
    })
    .catch(() => {
        mensagem.value = "Não foi possível salvar o produto. Tente novamente.";
        loading.value = false;
        setTimeout(() => {
            dialog.value = false;
        }, 2500);
    })
}

const salvarProdutoBaseLocal = () => {
    mensagem.value = "Aguarde. Estamos processando";
    loading.value = true;
    dialog.value = true;

    const formData = new FormData();
    formData.append("nomeProduto", formProduto.value.nomeProduto);
    formData.append("codigoProduto", form.value.produto);
    formData.append("subtituloProduto", formProduto.value.subtituloProduto);
    formData.append("modoAcao", formProduto.value.modoAcao);
    formData.append("arquivo", formProduto.value.arquivo[0]); // Supondo que o arquivo PDF esteja em `formProduto.value.arquivo`
    
    // Adiciona as variantes
    formProduto.value.variantes.forEach((id, index) => {
        formData.append(`variantes[${index}]`, id);
    });

    api.post('/area-restrita/produtos', formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
    .then((response) => {
        loading.value = false;
        mensagem.value = response.data.message;

        setTimeout(() => {
            dialog.value = false;
        }, 2500);
    })
    .catch((error) => {
        mensagem.value = "Não foi possível salvar o produto. Tente novamente.";
        loading.value = false;
        setTimeout(() => {
            dialog.value = false;
        }, 2500);
    });
}

</script>