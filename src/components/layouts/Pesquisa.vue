<template>
    <v-card 
      :subtitle="subtitulo" 
      :title="titulo">
        <v-card-text class="pa-3">
        <slot />
        </v-card-text>
        <v-card-actions class="pa-3">
            <v-spacer></v-spacer>
            <v-btn
            class="text-capitalize"
            density="default"
            variant="elevated"
            color="primary"
            @click="enviarDadosPequisa"
            :loading="carregando">
                <v-icon left> mdi-magnify </v-icon>
                PESQUISAR
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script lang="ts" setup>
    const props = defineProps({
    titulo: {
        type: String,
        required: true,
    },
    subtitulo: {
        type: String,
        required: false,
    },
    carregando: {
        type: Boolean,
        default: false,
        required: false,
    },
    });

    const emit = defineEmits(["pesquisar"]);
    const enviarDadosPequisa = () => emit("pesquisar");
</script>

<style scoped>
</style>
  