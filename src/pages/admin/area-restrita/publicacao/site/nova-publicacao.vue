<template>
    <v-card class="ma-2">
        <v-card-title>Criar uma nova publicação - Site</v-card-title>
        
        <v-card-subtitle>Crie o texto para uma nova publicação, defina a data a ser postada e até se a publicação está disponível ou não.</v-card-subtitle>
        
        <v-divider class="ma-2"></v-divider>
        
        <v-card-text>
            <v-form>
                <v-row>
                    <v-col cols="12" md="4">
                        <v-text-field
                        v-model="form.categoria"
                        label="Categoria"
                        variant="outlined"
                        density="compact"
                        :loading="loading"
                        append-inner-icon="mdi mdi-format-list-bulleted-type"/>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                        v-model="form.data_publicacao"
                        label="Data de publicação"
                        variant="outlined"
                        type="date"
                        density="compact"
                        :loading="loading"
                        append-inner-icon="mdi mdi-calendar-range"/>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-select
                        v-model="form.status_publicacao"
                        :items="items"
                        item-title="descricao"
                        item-value="status"
                        label="Status da publicação"
                        variant="outlined"
                        density="compact"
                        :loading="loading"
                        append-inner-icon="mdi mdi-list-status"/>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="12">
                        <v-text-field
                        v-model="form.titulo"
                        label="Título"
                        variant="outlined"
                        density="compact"
                        :loading="loading"
                        append-inner-icon="mdi mdi-format-title"/>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="12">
                        <div id="editor-container" style="height: 50vh;"></div>
                    </v-col>
                </v-row>

                <v-card-actions>
                    <v-btn
                    variant="elevated"
                    color="primary"
                    :loading="loading"
                    @click="ajaxSalvarPostagemSite()">
                        <v-icon class="mr-1">mdi mdi-content-save</v-icon>
                        Criar publicação
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>

    <v-dialog v-model="dialog" max-width="600px">
      <v-sheet
      class="pa-4 text-center mx-auto"
      elevation="12"
      max-width="600"
      rounded="lg"
      width="100%">
        <v-icon
        class="mb-5"
        :color="color"
        :icon="icon"
        size="112"></v-icon>
        <h2 class="text-h5 mb-6">{{ mensagemTitle }}</h2>
    
        <v-divider class="mb-4"></v-divider>
        <div class="text-end">
          <v-btn
          class="text-none"
          color="primary"
          variant="flat"
          width="90"
          rounded
          @click="dialog = false">
            Fechar
          </v-btn>
        </div>
      </v-sheet>
    </v-dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import api from '@/plugins/api';

const loading = ref(false);
const form = ref({
    titulo: "",
    categoria: "",
    texto: "",
    data_publicacao: "",
    status_publicacao: "",
});
const items = ref([
    {descricao: "PUBLICADO", status: true},
    {descricao: "A PUBLICAR", status: false},
]);
const dialog = ref(false);
const color = ref('');
const icon = ref('');
const mensagemTitle = ref('');

// Reactive state
const content = ref('');

/**
 * Methods
 */
const ajaxSalvarPostagemSite = () => {
    loading.value = true;

    form.value.texto = content.value;

    api.post('/area-restrita/site/postagem/store', form.value)
    .then((response) => {
        icon.value = 'mdi-check-circle';
        color.value = 'success';
        mensagemTitle.value = response.data.message;
        dialog.value = true;
    })
    .catch((error) => {
        console.log(error);
        icon.value = 'mdi mdi-clock-alert';
        color.value = 'red-darken-3';
        mensagemTitle.value = error.response.data.message;
        dialog.value = true;
    })
    .finally(() => {
        loading.value = false;
    })
}

onMounted(() => {
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

    const quill = new Quill('#editor-container', {
        theme: 'snow',
        modules: {
            toolbar: toolbarOptions
        }
    });

    quill.on('editor-change', () => {
        const html = quill.root.innerHTML;
        content.value = html;
    });
});

</script>
