<template>
  <v-autocomplete
    v-model="select"
    v-model:search="search"
    :item-title="itemTitle"
    :item-value="itemValue"
    :items="variaveis.items"
    :label="label"
    :loading="carregando"
    clearable
    :custom-filter="filtroAutoComplete"
    hide-details
    hide-no-data
    chips
    multiple
    :required="required"
  />
</template>

<script lang="ts" setup>

import {reactive, ref, watch} from "vue";
import {filtroAutoComplete} from "@/utils/helpers";

const select = ref(null);
const search = ref('');
const variaveis = reactive({
  timerId: 0 as any,
  select: null,
  search: null,
  items: [] as Array<any>
});

const props = defineProps(
  {
    valor: {
      type: Array,
      default: () => [],
      required: true
    },
    required:{
      type:Boolean,
      default:false,
    },
    label: {
      type: String,
      default: 'Digite algo para pesquisar',
      required: false
    },
    itemTitle: {
      type: String,
      default: 'nome',
      required: false
    },
    itemValue: {
      type: String,
      default: 'id',
      required: false
    },
    carregando: {
      type: Boolean,
      default: false,
      required: false
    }
  }
)

watch(search, (val) => {
  if (!val) {
    return;
  }
  if (val.length < 2) {
    return;
  }
  if (val && val !== select.value){
    querySelections(val);
  }

});

watch(() => props.valor, (items) => {
  variaveis.items = items;
});


const emit = defineEmits(['pesquisaAutocomplete']);

const querySelections = (v: string) => {
  clearTimeout(variaveis.timerId);
  variaveis.timerId = setTimeout(() => {
    emit('pesquisaAutocomplete', v)
  }, 500);
};

</script>
