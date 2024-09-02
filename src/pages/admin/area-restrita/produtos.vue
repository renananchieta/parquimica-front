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
                        <v-col cols="12" md="6">
                            <v-text-field
                            label="Nome do Produto"
                            v-model="formProduto.nomeProduto"
                            variant="outlined"
                            density="compact"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                            label="Código do Produto"
                            v-model="formProduto.codigoProduto"
                            variant="outlined"
                            density="compact"/>
                        </v-col>
                        <v-col cols="12" md="12">
                            <v-autocomplete
                            :items="produtos"
                            v-model="formProduto.variantes"
                            variant="outlined"
                            density="compact"
                            item-title="nome_produto"
                            item-value="codigo_produto"
                            chips
                            single-line
                            closable-chips
                            multiple
                            color="primary"
                            :loading="loading"
                            label="Variantes">
                            </v-autocomplete>
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
                        <v-col cols="12" md="12">
                            <v-textarea
                            label="Recomendacao"
                            v-model="formProduto.recomendacao"
                            variant="outlined"
                            density="compact"/>
                        </v-col>
                    </v-row>
                    
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-autocomplete
                            :items="comboLinha"
                            v-model="formProduto.linha"
                            variant="outlined"
                            density="compact"
                            item-title="descricao_linha"
                            item-value="codigo_linha"
                            chips
                            single-line
                            closable-chips
                            multiple
                            color="primary"
                            :loading="loading"
                            label="Linha">
                            </v-autocomplete>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-autocomplete
                            :items="comboFuncao"
                            v-model="formProduto.funcao"
                            variant="outlined"
                            density="compact"
                            item-title="descricao_funcao"
                            item-value="codigo_funcao"
                            chips
                            single-line
                            closable-chips
                            multiple
                            color="primary"
                            :loading="loading"
                            label="Função">
                            </v-autocomplete>
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
                            @update:modelValue="onFileChange()"
                            />
                            <!-- append-inner-icon="mdi mdi-eye" -->
                            <!-- @click:append="verArquivo()" -->
                        </v-col>
                        <!-- <v-col cols="12" md="6">
                            <v-text-field
                            label="Slug"
                            v-model="formProduto.slug"
                            variant="outlined"
                            density="compact"/>
                        </v-col> -->
                    </v-row>
                    <v-card-actions>
                        <v-btn 
                        v-if="formProduto.id == 0"
                        color="primary" 
                        variant="elevated" 
                        @click="salvarProdutoBaseLocal()">
                            <v-icon>mdi mdi-mdi mdi-content-save-outline</v-icon>Salvar novo produto
                        </v-btn>
                        <v-btn 
                        v-else
                        color="primary" 
                        variant="elevated" 
                        @click="alterarProdutoBaseLocal()">
                            <v-icon>mdi mdi-pencil</v-icon>Alterar produto
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
import { ref } from "vue";
import AutoCompleteRemoto from "@/components/AutoCompleteRemoto.vue";
import api from "@/plugins/api";
import { onMounted } from "vue";

/**
 * Data
 */
const loading = ref(false);
const produtos = ref([]);
const comboLinha = ref([]);
const comboFuncao = ref([]);
const codigoProduto = ref(0);
const form = ref({
    produto: ""
});
const formProduto = ref({
    id: 0,
    nomeProduto: "",
    codigoProduto: null,
    subtituloProduto: "",
    recomendacao: "",
    modoAcao: "",
    variantes: [],
    ativo_site: 1,
    slug: "",
    linha: [],
    funcao: [],
    arquivo: []
});
const dialog = ref(false);
const mensagem = ref("");

/**
 * Methods
 */
const onFileChange = () => {
    console.log(formProduto.value.arquivo);
    
}

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
        formProduto.value.codigoProduto = response.data[0].codigo_produto;
        formProduto.value.subtituloProduto = response.data[0].subtitulo;
        formProduto.value.modoAcao = response.data[0].modo_acao;
        formProduto.value.variantes = response.data[0].variantes;
        formProduto.value.recomendacao = response.data[0].recomendacao;
        formProduto.value.slug = response.data[0].slug;
        formProduto.value.linha = response.data[0].linhas;
        formProduto.value.funcao = response.data[0].funcoes;
        codigoProduto.value = response.data[0].codigo_produto;
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

    const payload = {
        nomeProduto: formProduto.value.nomeProduto,
        codigoProduto: formProduto.value.codigoProduto,
        subtituloProduto: formProduto.value.subtituloProduto,
        modoAcao: formProduto.value.modoAcao,
        variantes: formProduto.value.variantes.map(v => ({ codigo_produto: v })),
        slug: formProduto.value.nomeProduto,
        ativo_site: formProduto.value.ativo_site,
        recomendacao: formProduto.value.recomendacao,
        linha: formProduto.value.linha.map(l => ({ codigo_linha: l })),
        funcao: formProduto.value.funcao.map(f => ({ codigo_funcao: f }))
    };

    api.post('/area-restrita/produtos', payload)
        .then((response) => {
            loading.value = false;
            mensagem.value = response.data.message;

            setTimeout(() => {
                dialog.value = false;
            }, 2500);
        })
        .catch((error) => {
            mensagem.value = error.response?.data?.message || "Não foi possível salvar o produto. Tente novamente.";
            loading.value = false;
            setTimeout(() => {
                dialog.value = false;
            }, 2500);
        })
        .finally(() => {
            loading.value = false;
        });
}

const alterarProdutoBaseLocal = () => {
    mensagem.value = "Aguarde. Estamos processando";
    loading.value = true;
    dialog.value = true;

    const payload = {
        nomeProduto: formProduto.value.nomeProduto,
        codigoProduto: formProduto.value.codigoProduto,
        subtituloProduto: formProduto.value.subtituloProduto,
        modoAcao: formProduto.value.modoAcao,
        variantes: formProduto.value.variantes.map(v => ({ codigo_produto: v.codigo_produto })),
        slug: formProduto.value.nomeProduto,
        ativo_site: formProduto.value.ativo_site,
        recomendacao: formProduto.value.recomendacao,
        linha: formProduto.value.linha.map(l => ({ codigo_linha: l.codigo_linha })),
        funcao: formProduto.value.funcao.map(f => ({ codigo_funcao: f.codigo_funcao }))
    };

    api.put(`/area-restrita/produto/${codigoProduto.value}/update`, payload)
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
    })
    .finally(() => {
        loading.value = false;
    })
}

const salvarProdutoBaseLocal2 = () => {
    mensagem.value = "Aguarde. Estamos processando";
    loading.value = true;
    dialog.value = true;

    const formData = new FormData();
    formData.append("nomeProduto", formProduto.value.nomeProduto);
    formData.append("codigoProduto", formProduto.value.codigoProduto);
    formData.append("subtituloProduto", formProduto.value.subtituloProduto);
    formData.append("variantes", formProduto.value.variantes);
    formData.append("modoAcao", formProduto.value.modoAcao);
    formProduto.value.linha.forEach((item, index) => {
        formData.append(`linha[${index}][codigo_linha]`);
    });
    formProduto.value.funcao.forEach((item, index) => {
        formData.append(`funcao[${index}][codigo_funcao]`);
    });
    formData.append("slug", formProduto.value.slug);
    formData.append("recomendacao", formProduto.value.recomendacao);
    formData.append("arquivo", formProduto.value.arquivo[0]); // Supondo que o arquivo PDF esteja em `formProduto.value.arquivo`

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
    .catch(() => {
        mensagem.value = "Não foi possível salvar o produto. Tente novamente.";
        loading.value = false;
        setTimeout(() => {
            dialog.value = false;
        }, 2500);
    })
    .finally(() => {
        loading.value = false;
    })
}

const combos = () => {
    loading.value = true;

    api.get('/area-restrita/combos/linhas-funcoes')
    .then((response) => {
        console.log(response.data);
        comboFuncao.value = response.data.funcoes;
        comboLinha.value = response.data.linhas;
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        loading.value = false;
    })
}

const alterarProdutoBaseLocal2 = () => {
    mensagem.value = "Aguarde. Estamos processando";
    loading.value = true;
    dialog.value = true;

    const formData = new FormData();
    formData.append("nomeProduto", formProduto.value.nomeProduto);
    formData.append("codigoProduto", formProduto.value.codigoProduto);
    formData.append("subtituloProduto", formProduto.value.subtituloProduto);
    formData.append("variantes", formProduto.value.variantes);
    formData.append("modoAcao", formProduto.value.modoAcao);
    formProduto.value.linha.forEach((item, index) => {
        formData.append(`linha[${index}][codigo_linha]`, parseInt(item.codigo_linha));
    });
    formProduto.value.funcao.forEach((item, index) => {
        formData.append(`funcao[${index}][codigo_funcao]`, parseInt(item.codigo_funcao));
    });
    formData.append("slug", formProduto.value.slug);
    formData.append("recomendacao", formProduto.value.recomendacao);
    formData.append("arquivo", formProduto.value.arquivo[0]); // Supondo que o arquivo PDF esteja em `formProduto.value.arquivo`

    api.put(`/area-restrita/produto/${codigoProduto.value}/update`, formData, {
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

/**
 * Hooks
 */
onMounted(() => {
    combos();
    getProdutos();
})

</script>