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
                        label="Categoria"
                        variant="outlined"
                        density="compact"
                        append-inner-icon="mdi mdi-format-list-bulleted-type"/>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                        label="Data de publicação"
                        variant="outlined"
                        density="compact"
                        append-inner-icon="mdi mdi-calendar-range"/>
                    </v-col>
                    <v-col cols="12" md="4">
                        <v-text-field
                        label="Status da publicação"
                        variant="outlined"
                        density="compact"
                        append-inner-icon="mdi mdi-list-status"/>
                    </v-col>
                </v-row>

                <v-row >
                    <v-col cols="12" md="12">
                        <v-text-field
                        label="Título"
                        variant="outlined"
                        density="compact"
                        append-inner-icon="mdi mdi-format-title"/>
                    </v-col>

                    <v-col cols="12" md="12">
                        <v-text-field
                        label="Subtítulo"
                        variant="outlined"
                        density="compact"
                        append-inner-icon="mdi mdi-subtitles-outline"/>
                    </v-col>
                </v-row>

                <v-row v-if="false">
                    <v-col cols="12" md="12">
                        <v-btn rounded="0" variant="flat" color="#E0E0E0" @click="applyTag('b')">
                            <v-icon>mdi-format-bold</v-icon>
                        </v-btn>
                        <v-btn rounded="0" variant="flat" color="#E0E0E0" @click="applyTag('i')">
                            <v-icon>mdi-format-italic</v-icon>
                        </v-btn>
                        <v-btn rounded="0" variant="flat" color="#E0E0E0" @click="applyTag('u')">
                            <v-icon>mdi-format-underline</v-icon>
                        </v-btn>
                        <v-btn rounded="0" variant="flat" color="#E0E0E0" @click="applyLink()">
                            <v-icon>mdi-link</v-icon>
                        </v-btn>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="12">
                        <v-textarea
                        ref="textarea"
                        v-model="text"
                        label="Texto"
                        placeholder="Escreva seu texto..."
                        variant="outlined"
                        density="compact"
                        counter
                        rows="15"
                        append-inner-icon="mdi mdi-format-text"/>
                    </v-col>
                </v-row>

                <v-row>
                    <v-col cols="12" md="3">
                        <v-text-field
                        label="Slug"
                        variant="outlined"
                        density="compact"
                        append-inner-icon="mdi mdi-format-text"/>
                    </v-col>
                </v-row>

                <v-card-actions>
                    <v-btn
                    variant="elevated"
                    color="primary">
                        <v-icon class="mr-1">mdi mdi-content-save</v-icon>
                        Criar publicação
                    </v-btn>
                </v-card-actions>
            </v-form>
        </v-card-text>
    </v-card>
</template>

<script setup>
import router from "@/router";
import { ref } from "vue";

// Data
const text = ref('');

// Refs
const textarea = ref(null);

// Methods
const applyTag = (tag) => {
    const textareaEl = textarea.value.$el.querySelector('textarea');
    const start = textareaEl.selectionStart;
    const end = textareaEl.selectionEnd;
    
    const before = text.value.substring(0, start);
    const after = text.value.substring(end);
    const inside = text.value.substring(start, end);

    text.value = `${before}<${tag}>${inside}</${tag}>${after}`;

    // Reposiciona o cursor dentro da tag inserida
    setTimeout(() => {
        const cursorPosition = start + tag.length + 2; // Posição do cursor dentro da tag
        textareaEl.setSelectionRange(cursorPosition, cursorPosition);
        textareaEl.focus();
    }, 0);
};

const applyLink = () => {
    const url = prompt('Digite a URL do link:');
    if (url) {
        applyTag(`a href="${url}"`);
    }
};

const applyBold = () => {
    console.log('bold');
};

const applyItalic = () => {
    console.log('bold');
};

const applyUnderline = () => {
    console.log('bold');
};

// const applyLink = () => {
//     console.log('bold');
// };

</script>