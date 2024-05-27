<template>
<v-data-table
    :headers="headers"
    :items="items"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>Listagem de usuários</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="620px"
        >
          <template v-slot:activator="{ props }">
            <v-btn
              class="mb-2"
              color="primary"
              dark
              v-bind="props"
              variant="elevated"
            >
              Cadastrar
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-form @submit.prevent="setSalvar()">
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                      v-model="defaultItem.nome"
                      label="Nome completo"
                      variant="outlined"
                      density="compact"
                      required/>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                      v-model="defaultItem.email"
                      label="email"
                      variant="outlined"
                      density="compact"
                      type="email"
                      required/>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" md="6">
                      <v-text-field
                      v-model="defaultItem.senha"
                      label="Senha"
                      variant="outlined"
                      density="compact"
                      type="password"
                      required/>
                    </v-col>
                  </v-row>
                </v-form>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="error"
                variant="elevated"
                @click="close"
              >
                Cancel
              </v-btn>
              <v-btn
                class="ma-2"
                color="blue-darken-1"
                variant="elevated"
                type="submit"
              >
                {{buttonTitle}}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">Are you sure you want to delete this item?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue-darken-1" variant="text" @click="closeDelete">Cancel</v-btn>
              <v-btn color="blue-darken-1" variant="text" @click="deleteItemConfirm">OK</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        class="me-2"
        size="small"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        size="small"
        @click="deleteItem(item)"
      >
        mdi-delete
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
})

/**
 * Data
 */
const dialog = ref(false);
const dialogDelete = ref(false);
const editedIndex = ref(-1);
const editedItem = ref({
  nome: "",
  email: "",
  senha: ""
});
const defaultItem = ref({
  nome: "",
  email: "",
  senha: ""
});

/**
 * Computed
 */
const formTitle = computed(() => editedIndex.value === -1 ? 'Novo' : 'Edição');
const buttonTitle = computed(() => editedIndex.value === -1 ? 'Salvar' : 'Alterar');

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
const emit = defineEmits(["salvar", "editar", "deletar"]);
const setSalvar = () => {
    emit("salvar", editedItem.value);
    close();
};

/**
 * Methods
 */
const editItem = (item) => {
    emit("editar", item);
    editedIndex.value = 1;
    editedItem.value = Object.assing({}, item);
    dialog.value = true;
};

let itemASerDeletado = {};
const deleteItem = (item) => {
  itemASerDeletado = item;
  dialogDelete.value = true;
};

const close = () => {
  dialog.value = false;
  nextTick(() => {
    editedItem.value = Object.assign({}, defaultItem.value);
    editedIndex.value = -1;
  });
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