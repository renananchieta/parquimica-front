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
          <v-card>
            <v-card-title>
              <span class="text-h5">Informações do estudante</span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-container>
                <!-- CONTEÚDO DO DIALOG -->
                {{ estudante }}
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
  carregamento:{
    required: false,
  },
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

/**
 * Computed
 */
const formTitle = computed(() => editedIndex.value === -1 ? 'Novo' : 'Edição');
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
const emit = defineEmits(["visualizar"]);

/**
 * Methods
 */
const estudante = ref({});
const viewItem = (item) => {
    // emit("visualizar", item);
    console.log(item);
    estudante.value = item;
    dialog.value = true;
};

const close = () => {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
};

</script>