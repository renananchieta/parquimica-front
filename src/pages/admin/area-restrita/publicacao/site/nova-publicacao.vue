<template>
    <v-card class="ma-2">
        <v-card-title>Criar uma nova publicação</v-card-title>
        
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
                        append-inner-icon="mdi mdi-format-list-bulleted-type"/>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                        v-model="form.data_publicacao"
                        label="Data de publicação"
                        variant="outlined"
                        type="date"
                        density="compact"
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
                        append-inner-icon="mdi mdi-list-status"/>
                    </v-col>
                </v-row>

                <v-row >
                    <v-col cols="12" md="12">
                        <v-text-field
                        v-model="form.titulo"
                        label="Título"
                        variant="outlined"
                        density="compact"
                        append-inner-icon="mdi mdi-format-title"/>
                    </v-col>

                    <!-- <v-col cols="12" md="12">
                        <v-text-field
                        v-model=""
                        label="Subtítulo"
                        variant="outlined"
                        density="compact"
                        append-inner-icon="mdi mdi-subtitles-outline"/>
                    </v-col> -->
                </v-row>

                <v-row>
                    <v-col cols="12" md="12">
                        <div id="editor-container" style="height: 200px;"></div>
                    </v-col>
                </v-row>

                <!-- <v-row>
                    <v-col cols="12" md="3">
                        <v-text-field
                        label="Slug"
                        variant="outlined"
                        density="compact"
                        append-inner-icon="mdi mdi-format-text"/>
                    </v-col>
                </v-row> -->

                <v-card-actions>
                    <v-btn
                    variant="elevated"
                    color="primary"
                    @click="exibirTextoNoConsole()">
                        <v-icon class="mr-1">mdi mdi-content-save</v-icon>
                        Criar publicação
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const form = ref({
    titulo: "",
    categoria: "",
    texto: "",
    tipo: "",
    data_publicacao: "",
    status_publicacao: "",
    slug: "",
});
const items = ref([
    {descricao: "PUBLICADO", status: "true"},
    {descricao: "A PUBLICAR", status: "false"},
])
// Reactive state
const content = ref('');

// Event handlers using Composition API
const onEditorBlur = (quill) => {
    console.log('editor blur!', quill);
};

const onEditorFocus = (quill) => {
    console.log('editor focus!', quill);
};

const onEditorReady = (quill) => {
    console.log('editor ready!', quill);
};

const onEditorChange = (quill, html, text) => {
    console.log('editor change!', quill, html, text);
    content.value = html;
};

const exibirTextoNoConsole = () => {
    form.value.texto = content.value;
    form.value.slug = form.value.titulo;
    form.value.tipo = 'site';
    console.log(form.value);
}

onMounted(() => {
    const quill = new Quill('#editor-container', {
        theme: 'snow'
    });

    quill.on('editor-change', () => {
        const html = quill.root.innerHTML;
        const text = quill.getText();
        onEditorChange(quill, html, text);
    });

    quill.on('selection-change', (range) => {
        if (range === null) {
            onEditorBlur(quill);
        } else {
            onEditorFocus(quill);
        }
    });

    onEditorReady(quill);
});

</script>
