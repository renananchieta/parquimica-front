<template>
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
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Total de estudantes</v-card-title>
          <v-chip 
          class="ma-2 text-h6"
          variant="tonal"
          color="default"> 
            {{ props.contadores.total_registros}}
          </v-chip>
        </v-card>
      </v-col> 

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Elegíveis</v-card-title>
          <v-chip 
          class="ma-2 text-h6"
          variant="tonal"
          color="success"> 
            {{ props.contadores.total_elegivel}}
          </v-chip>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Elegibilidade Indefinida</v-card-title>
          <v-chip 
          class="ma-2 text-h6"
          variant="tonal"
          color="orange"> 
            {{ props.contadores.total_elegibilidade_indefinida}}
          </v-chip>
        </v-card>
      </v-col>
    </v-row>
    <v-row v-if="props.carregamento == false">
      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Elegíveis com pendência</v-card-title>
          <v-chip 
          class="ma-2 text-h6"
          variant="tonal"
          color="deep-orange"> 
            {{ props.contadores.total_com_Pendencia}}
          </v-chip>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Inelegíveis</v-card-title>
          <v-chip 
          class="ma-2 text-h6"
          variant="tonal"
          color="red"> 
            {{ props.contadores.total_nao_elegiveis}}
          </v-chip>
        </v-card>
      </v-col>

      <v-col cols="12" md="4">
        <v-card>
          <v-card-title>Não enviados</v-card-title>
          <v-chip 
          class="ma-2 text-h6"
          variant="tonal"
          color="blue-grey"> 
            {{ props.contadores.total_nao_enviados}}
          </v-chip>
        </v-card>
      </v-col>
    </v-row>
</template>

<script setup>

/**
 * Props
 */
 const props = defineProps({
    contadores: {
      default: () => [],
      required: false,
    },
    carregamento: {
      required: false,
    }
})


</script>
