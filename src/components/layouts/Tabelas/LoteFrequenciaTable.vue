<template>
<v-data-table
    :headers="headers"
    :items="items"
    :loading="props.carregamento"
    density="comfortable"
    hover
    color="#F4511E"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Listagem</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="1024px"
        >
          <template v-slot:activator="{ props }">
              <!-- <v-btn
                class="mb-2"
                color="primary"
                dark
                v-bind="props"
                variant="elevated"
              >
                Cadastrar
              </v-btn> -->
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">Lote: {{ formTitle }}</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-container>
                <!--  CONTEÚDO DO V-CARD -->
                <v-row >
                  <v-col v-if="props.carregamento == true">
                    <p class="text-center">
                      Aguarde
                    </p>
                    <v-progress-linear
                      color="primary"
                      height="6"
                      indeterminate
                      rounded
                    ></v-progress-linear>
                  </v-col>
                </v-row>
                <v-row v-if="props.carregamento == false">
                  <v-col>
                    Status de processamento: 
                    <v-chip 
                    class="float-right" 
                    variant="outlined" 
                    :color="props.cor">
                      {{ props.mensagem }}
                    </v-chip>
                  </v-col>
                </v-row>
                <v-row v-if="props.carregamento == false">
                  <v-col>
                    Erros: 
                    {{ props.erros}}
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="red"
                variant="elevated"
                @click="close"
              >
                SAIR
              </v-btn>
              <v-btn
                class="ma-2"
                color="primary"
                variant="elevated"
                type="submit"
              >
                {{buttonTitle}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="me-2"
        size="small"
        @click="viewItem(item)"
      >
        mdi-eye
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script setup>
import { useAppStore } from "@/stores/app";
import { computed, nextTick, ref, watch } from "vue";

const props = defineProps({
  headers: {
    default: () => [],
    required: true,
  },
  items: {
    default: () => [],
    required: true,
  },
  items: {
    default: () => [],
    required: true,
  },
  mensagem: {
    required: false,
  },
  erros: {
      default: () => [],
      required: false,
  },
  carregamento:{
    required: false,
  },
  cor:{
    required:false,
  }
})

/**
 * Data
 */
const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);
const editedItem = ref({
  nome: "",
  cpf: "",
  nome_mae: "",
  cpf_mae: "",
  dt_nascimento: ""
});
const defaultItem = ref({
  nome: "",
  cpf: "",
  nome_mae: "",
  cpf_mae: "",
  dt_nascimento: ""
});
const formTitle = ref('');
const store = useAppStore();

/**
 * Computed
 */
// const formTitle = computed(() => editedIndex.value === -1 ? 'Novo' : 'Edição');
const buttonTitle = computed(() => editedIndex.value === -1 ? 'SALVAR' : 'ALTERAR');

/**
 * Watch
 */
watch(() => dialog,
  (value) => {
    return value || close();
});

watch(() => dialogDelete,
  (value) => {
    return value || closeDelete();
});

/**
 * Emits
 */
const emit = defineEmits(["salvar", "visualizar", "deletar"]);
const setSalvar = () => {
    emit("salvar", editedItem.value);
    close();
};

/**
 * Methods
 */
const viewItem = (item) => {
    emit("visualizar", item);
    formTitle.value = item.lote;
    dialog.value = true;
};

let itemASerDeletado = {};
const deleteItem = (item) => {
  itemASerDeletado = item;
  dialogDelete.value = true;
};

const close = () => {
  store.mensagens = '';
  store.erros = [];
  store.color = '',
  dialog.value = false;
  // nextTick(() => {
  //   editedItem.value = Object.assign({}, defaultItem.value);
  //   editedIndex.value = -1;
  // });
};

const closeDelete = () => {
  dialogDelete.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
};

const deleteItemConfirm = () => {
  emit("deletar", itemASerDeletado);
  closeDelete();
};

</script>