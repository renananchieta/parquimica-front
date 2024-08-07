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
            <v-form>

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
    console.log(form.value.produto);
}

</script>