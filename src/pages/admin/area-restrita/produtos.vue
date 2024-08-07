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
                            @pesquisa-autocomplete="getProdutos"
                            variant="outlined"
                            density="compact"
                            append-inner-icon="mdi mdi-list-box-outline"
                        />
                    </v-col>
                </v-row>
                <v-card-actions class="ma-2"> 
                    <v-btn color="primary" variant="elevated" type="submit">
                        <v-icon>mdi mdi-magnify</v-icon>Buscar
                    </v-btn>
                </v-card-actions>
            </v-form>

            <v-divider></v-divider>

            <v-card-title>Dados do Produto:</v-card-title>

            <v-form @submit.prevent="alterarInformacoesProduto()">
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
                            label="Subtítulo do Produto"
                            v-model="formProduto.subtituloProduto"
                            variant="outlined"
                            density="compact"/>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                            label="Modo de ação"
                            v-model="formProduto.modoAcao"
                            variant="outlined"
                            density="compact"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                            label="Variantes do produto"
                            v-model="formProduto.variantes"
                            variant="outlined"
                            density="compact"/>
                        </v-col>
                    </v-row>
                    <v-card-actions>
                        <v-btn color="primary" variant="elevated" type="submit">
                            <v-icon>mdi mdi-pencil</v-icon>Alterar
                        </v-btn>
                    </v-card-actions>
                </v-container>
            </v-form>
        </v-card>
    </v-container>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";
import AutoCompleteRemoto from "@/components/AutoCompleteRemoto.vue";
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
    subtituloProduto: "",
    modoAcao: "",
    variantes: "",
});

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

</script>