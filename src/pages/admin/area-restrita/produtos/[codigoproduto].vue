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

            <v-form>
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
                            <!-- <v-autocomplete
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
                            label="Variantes"
                            @update:model-value="monitoramento()">
                            </v-autocomplete> -->
                            <v-text-field
                            v-model="formProduto.variantes"
                            variant="outlined"
                            density="compact"
                            label="Variantes"
                            />
                        </v-col>
                    </v-row>
                    <!-- <v-row>
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
                    </v-row> -->

                    <v-row>
                        <v-col cols="12" md="12">
                            <v-label>Subtítulo do produto: </v-label>
                            <div id="editor-container-subtitulo" style="height: 25vh;"></div>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="12">
                            <v-label>Modo de Ação: </v-label>
                            <div id="editor-container-modo-acao" style="height: 25vh;"></div>
                        </v-col>
                    </v-row>

                    
                    <v-row>
                        <v-col cols="12" md="12">
                            <v-label>Recomendação: </v-label>
                            <div id="editor-container-recomendacao" style="height: 25vh;"></div>
                        </v-col>
                    </v-row>

                    <!-- <v-row>
                        <v-col cols="12" md="12">
                            <v-textarea
                            label="Recomendacao"
                            v-model="formProduto.recomendacao"
                            variant="outlined"
                            density="compact"/>
                        </v-col>
                    </v-row> -->
                    
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
                            @update:modelValue="onFileChange()"
                            />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-icon
                            v-if="formProduto.id !== 0"
                            class="my-auto"
                            size="x-large"
                            @click="viewImage()">mdi mdi-image</v-icon>
                        </v-col>
                    </v-row>
                    <v-img
                    v-if="imageSrc"
                    :aspect-ratio="1"
                    class="bg-white ma-auto"
                    :src="imageSrc"
                    width="300"
                    cover />
                    <v-card-actions>
                        <v-btn 
                        color="primary" 
                        variant="elevated" 
                        @click="salvarProdutoBaseLocal()">
                            <v-icon>mdi mdi-mdi mdi-content-save-outline</v-icon>Salvar
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
import { onUnmounted, ref } from "vue";
import AutoCompleteRemoto from "@/components/AutoCompleteRemoto.vue";
import api from "@/plugins/api";
import { onMounted } from "vue";
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import { useRoute } from "vue-router";
import { useRouter } from "vue-router";

/**
 * Data
 */
const router = useRouter(); // Redireciona para outra página
const route = useRoute();   // Carrega os parâmetros das rotas
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
    variantes: "",
    ativo_site: 1,
    slug: "",
    linha: [],
    funcao: [],
    arquivo: []
});
const dialog = ref(false);
const mensagem = ref("");
const imageSrc = ref('');
const contentSubtitulo = ref('');
const contentModoAcao = ref('');
const contentRecomendacao = ref('');

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

    router.push(`/admin/area-restrita/produtos/${form.value.produto}`).then(() => {
        window.location.reload();
    });
};

const ajaxGetProduto = async (codigo_produto) => {
    loading.value = true;
    await api.get(`/area-restrita/produto/${codigo_produto}`)
    .then((response) => {
        formProduto.value.id = response.data[0].id;
        formProduto.value.nomeProduto = response.data[0].nome_produto;
        formProduto.value.codigoProduto = response.data[0].codigo_produto;
        formProduto.value.variantes = response.data[0].variantes;
        formProduto.value.slug = response.data[0].slug;
        formProduto.value.linha = response.data[0].linhas;
        formProduto.value.funcao = response.data[0].funcoes;
        codigoProduto.value = response.data[0].codigo_produto;
        formProduto.value.recomendacao = response.data[0].recomendacao;
        formProduto.value.modoAcao = response.data[0].modo_acao;
        formProduto.value.subtituloProduto = response.data[0].subtitulo;
        
        contentModoAcao.value = formProduto.value.modoAcao;
        contentSubtitulo.value = formProduto.value.subtituloProduto;
        contentRecomendacao.value = formProduto.value.recomendacao;
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      loading.value = false;
    });
};

const salvarProdutoBaseLocal = () => {
    mensagem.value = "Aguarde. Estamos processando";
    loading.value = true;
    dialog.value = true;

    formProduto.value.subtituloProduto = contentSubtitulo.value;
    formProduto.value.recomendacao = contentRecomendacao.value;
    formProduto.value.modoAcao = contentModoAcao.value;

    const payload = {
        nomeProduto: formProduto.value.nomeProduto,
        codigoProduto: formProduto.value.codigoProduto,
        subtituloProduto: formProduto.value.subtituloProduto,
        modoAcao: formProduto.value.modoAcao,
        slug: formProduto.value.nomeProduto,
        ativo_site: formProduto.value.ativo_site,
        recomendacao: formProduto.value.recomendacao,

        variantes: formProduto.value.variantes,
        // Certifique-se de que variantes, linha e funcao sejam arrays válidos e evite undefined
        // variantes: Array.isArray(formProduto.value.variantes) 
        //     ? formProduto.value.variantes.map(v => v.codigo_produto ?? v) 
        //     : [],
        linha: Array.isArray(formProduto.value.linha) 
            ? formProduto.value.linha.map(l => l.codigo_linha ?? l) 
            : [],
        funcao: Array.isArray(formProduto.value.funcao) 
            ? formProduto.value.funcao.map(f => f.codigo_funcao ?? f) 
            : [],
        arquivo: formProduto.value.arquivo
    };

    const formData = new FormData();
    formData.append("nomeProduto", payload.nomeProduto);
    formData.append("codigoProduto", payload.codigoProduto);
    formData.append("subtituloProduto", payload.subtituloProduto);
    formData.append("modoAcao", payload.modoAcao);
    formData.append("slug", payload.slug);
    formData.append("ativo_site", payload.ativo_site);
    formData.append("recomendacao", payload.recomendacao);
    formData.append("variantes", payload.variantes);

    // Adicionar variantes de forma segura
    // payload.variantes.forEach((item, index) => {
    //     if (item !== undefined) {
    //         formData.append(`variantes[${index}][codigo_produto]`, item);
    //     }
    // });

    // Adicionar linha de forma segura
    payload.linha.forEach((item, index) => {
        if (item !== undefined) {
            formData.append(`linha[${index}][codigo_linha]`, item);
        }
    });

    // Adicionar funcao de forma segura
    payload.funcao.forEach((item, index) => {
        if (item !== undefined) {
            formData.append(`funcao[${index}][codigo_funcao]`, item);
        }
    });

    formData.append("arquivo", payload.arquivo);

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
            mensagem.value = error.response?.data?.message || "Não foi possível salvar o produto. Tente novamente.";
            loading.value = false;
            setTimeout(() => {
                dialog.value = false;
            }, 2500);
        })
        .finally(() => {
            loading.value = false;
        });
};

const combos = () => {
    loading.value = true;

    api.get('/area-restrita/combos/linhas-funcoes')
    .then((response) => {
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

const viewImage = () => {
    loading.value = true;
    api.get(`/area-restrita/produtos/exibir-imagem/${formProduto.value.id}`, { responseType: 'blob' })
    .then((response) => {
        let fileURL = URL.createObjectURL(response.data);
        imageSrc.value = fileURL;
        // window.open(fileURL, '_blank');
    })
    .finally(() => {
        loading.value = false;
    })
}

/**
 * Hooks
 */
onMounted(() => {
    combos();
    getProdutos();

    const toolbarOptions = [
        [{ 'font': [] }],                          // Font family dropdown
        [{ 'size': ['small', false, 'large', 'huge'] }], // Font size
        ['bold', 'italic', 'underline', 'strike'], // Formatting buttons
        [{ 'color': [] }, { 'background': [] }],   // Text color and background color
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],  // Ordered and bullet lists
        [{ 'align': [] }],                         // Text alignment
        [{ 'script': 'sub'}, { 'script': 'super' }],   // Subscript and superscript
        ['blockquote', 'code-block'],              // Blockquote and code block
        [{ 'indent': '-1'}, { 'indent': '+1' }],   // Indentation
        [{ 'direction': 'rtl' }],                  // Text direction
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }], // Header sizes
        ['link', 'image', 'video'],                // Insert link, image, and video
        ['clean']                                  // Remove formatting
    ];

    const quillSubtitulo = new Quill('#editor-container-subtitulo', {
        theme: 'snow',
        modules: {
            toolbar: toolbarOptions
        }
    });

    quillSubtitulo.on('editor-change', () => {
        const html = quillSubtitulo.root.innerHTML;
        contentSubtitulo.value = html;
        
    });

    const quillModoAcao = new Quill('#editor-container-modo-acao', {
        theme: 'snow',
        modules: {
            toolbar: toolbarOptions
        }
    });

    quillModoAcao.on('editor-change', () => {
        const html = quillModoAcao.root.innerHTML;
        contentModoAcao.value = html;
    });

    const quillRecomendacao = new Quill('#editor-container-recomendacao', {
        theme: 'snow',
        modules: {
            toolbar: toolbarOptions
        }
    });

    quillRecomendacao.on('editor-change', () => {
        const html = quillRecomendacao.root.innerHTML;
        contentRecomendacao.value = html;
    });

    ajaxGetProduto(route.params.codigoproduto).then(() => {
        quillSubtitulo.root.innerHTML = formProduto.value.subtituloProduto;
        quillRecomendacao.root.innerHTML = formProduto.value.recomendacao;
        quillModoAcao.root.innerHTML = formProduto.value.modoAcao;
    });
})

onUnmounted(() => {
    
})

</script>