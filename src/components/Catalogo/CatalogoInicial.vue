<template>
    <v-container>
        <v-card class="mb-4">
            <v-card-title>Pesquisar Produtos</v-card-title>
            <v-divider class="ml-4 mr-4 mb-2"/>
            <v-card-text>
                <v-form @submit.prevent="catalogoGrid()">
                   <v-row>
                       <v-col cols="12" md="4">
                           <v-text-field
                           label="Nome do produto"
                           v-model="form.nome"
                           density="compact"
                           variant="outlined"/>
                       </v-col>
                       <v-col cols="12" md="4">
                           <v-autocomplete
                           label="Linha do produto"
                           v-model="form.linhaId"
                           :items="comboLinhas"
                           item-title="DESCRICAO"
                           item-value="ID"
                           density="compact"
                           variant="outlined"
                           :loading="carregando"/>
                       </v-col>
                       <v-col cols="12" md="4">
                           <v-autocomplete
                           label="Função do produto"
                           v-model="form.funcaoId"
                           :items="comboFuncoes"
                           item-title="DESCRICAO"
                           item-value="ID"
                           density="compact"
                           variant="outlined"
                           :loading="carregando"/>
                       </v-col>
                   </v-row>
                   <v-divider class="mb-2"/>
                   <v-card-actions>
                       <v-spacer/>
                       <v-btn 
                         variant="elevated"
                         color="botao"
                         :loading="carregando"
                         type="submit">Pesquisar</v-btn>
                       <v-btn
                           variant="elevated"
                           color="botao"
                           type="buttom"
                           @click="limparFiltros">Limpar filtros</v-btn>
                   </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
        <v-card>
            <v-card-title>Catálogo</v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                variant="elevated"
                class="mt-n14 mr-4"
                color="botao"
                :loading="carregando"
                @click="exportData('csv')">Exportar CSV</v-btn>
            </v-card-actions>
            <v-card-text>
                <v-data-table
                  :group-by="groupBy"
                  :headers="headers"
                  :items="dados"
                  hover
                  items-per-page-text="Itens por página"
                  :loading="carregando"
                />
            </v-card-text>
        </v-card>    
    </v-container>
</template>

<script setup>
import api from '@/plugins/api';
import axios from 'axios';
import { onMounted, ref } from 'vue';

/**
 * Data
 */
const groupBy = ([{key:"nome", order: "asc"}]);
const headers = ref([
    // {title: "id", key:"id"},
    // {title: "Produto", key:"nome"},
    {title: "Embalagem", align:"start", key:"embalagem"},
    {title: "Embalagem Abreviada", align:"start", key:"emb_abreviada"},
    {title: "Valor (R$)", align:"left", key:"preco"},
]);
const dados = ref([]);
const carregando = ref(false);
const form = ref({
  nome: '',
  linhaId: '',
  funcaoId: '',
});
const comboLinhas = ref([]);
const comboFuncoes = ref([]);

/**
 * Methods
 */

const catalogoGrid = () => {
  carregando.value = true;
    let params = {
        params:{
          nomeProduto: form.value.nome,
          linhaId: form.value.linhaId,
          funcaoId: form.value.funcaoId
        }
    }
    // api.get('/catalogo/grid', params) 
    api.get('/catalogo/grid', params)
    .then((response) => {
        dados.value = response.data;
    })   
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
      carregando.value = false;
    })
}

const getLinhaProdutos = () => {
  carregando.value = true;
  api.get('/firebird/linhas')
  .then((response) => {
    comboLinhas.value = response.data;
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() =>{
    carregando.value = false;
  })
}

const getFuncaoProdutos = () => {
  carregando.value = true;
  api.get('/firebird/funcoes')
  .then((response) => {
    comboFuncoes.value = response.data;
  })
  .catch((error) => {
    console.log(error);
  })
  .finally(() =>{
    carregando.value = false;
  })
}

const limparFiltros = () => {
   form.value.nome = "";
//    pesquisar();
};

function jsonToCsv(json) {
  if (json.length === 0) return '';
  const keys = Object.keys(json[0]);
  const csvRows = [];
  csvRows.push(keys.join(','));
  json.forEach(item => {
    const values = keys.map(key => `"${item[key]}"`);
    csvRows.push(values.join(','));
  });
  return csvRows.join('\n');
}

function exportData(format) {
  const filteredData = dados.value; // Assume que filteredProducts.value contém os dados filtrados dos produtos

  if (format === 'csv') {
    const productsCsv = jsonToCsv(filteredData);
    const bom = '\uFEFF';  // Adiciona o BOM para garantir a codificação UTF-8
    const blob = new Blob([bom + productsCsv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'products_data.csv';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else if (format === 'pdf') {
    const doc = new jsPDF();
    doc.autoTable({
      styles: { overflow: 'linebreak' },
      bodyStyles: { valign: 'middle', fontSize: 10 },
      columnStyles: {
        0: { cellWidth: 'auto' },
        1: { cellWidth: 'auto' },
        2: { cellWidth: 'auto' },
        3: { cellWidth: 'auto' }
      },
      head: [['ID', 'Nome', 'Embalagem Abreviada', 'Preço']],
      body: filteredData.map(product => [
        product.id,
        product.nome,
        product.emb_abreviada,
        product.preco
      ]),
      startY: 20
    });
    doc.save('products_data.pdf');
  }
}

/**
 * Hooks
 */
onMounted(() => {
    catalogoGrid();
    getLinhaProdutos();
    getFuncaoProdutos();
})

</script>