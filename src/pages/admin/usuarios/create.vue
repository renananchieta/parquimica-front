<template>
    <v-container>
        <v-card :loading="carregando">
            <v-card-title>Cadastro de Usuário</v-card-title>
            <v-divider class="mx-4"/>

            <v-card-text>
                <v-form @submit.prevent="salvar">
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                              v-model="form.nome"
                              label="Nome *"
                              variant="outlined"
                              density="compact"
                              />
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-text-field
                              v-model="form.cpf"
                              label="CPF *"
                              placeholder="000.000.000-00"
                              variant="outlined"
                              density="compact"
                              v-mask="'###.###.###-##'"/>
                        </v-col>
                    </v-row>
                    
                    <v-row>
                        <v-col cols="12" md="2">
                            <v-text-field
                              v-model="form.dtNascimento"
                              label="Data de nascimento *"
                              type="date"
                              variant="outlined"
                              density="compact"
                              />
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-text-field 
                              v-model="form.contato"
                              label="Contado"
                              placeholder="(91) 99191-9191"
                              variant="outlined"
                              density="compact"
                              v-mask="'(##) #####-####'"
                              />
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-text-field 
                              v-model="form.contatoWpp"
                              label="Contato Wpp *"
                              placeholder="(91) 99191-9191"
                              variant="outlined"
                              density="compact"
                              v-mask="'(##) #####-####'"/>
                        </v-col>
                        <v-col cols="12" md="6">
                            <v-autocomplete
                              v-model="form.perfil"
                              label="Perfil *"
                              :items="comboPerfil"
                              item-title="text"
                              item-value="id"
                              chips
                              small-chips
                              multiple
                              variant="outlined"
                              density="compact"
                              />
                        </v-col>
                    </v-row>
                    
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                              v-model="form.email"
                              label="E-mail *"
                              placeholder="exemplo123@gmail.com"
                              variant="outlined"
                              density="compact"/>
                        </v-col>

                        <v-col cols="12" md="3">
                            <v-text-field 
                              v-model="form.senha"
                              label="Senha *"
                              type="password"
                              variant="outlined"
                              density="compact"
                              />
                        </v-col>

                        <v-col cols="12" md="3">
                            <v-text-field 
                              v-model="form.senha_confirmation"
                              label="Confirme sua senha *"
                              type="password"
                              variant="outlined"
                              density="compact"
                              />
                        </v-col>
                    </v-row>

                    <v-card-actions>
                        <v-spacer/>
                            <v-btn
                              variant="elevated"
                              color="botao"
                              :loading="carregando"
                              type="submit"
                            >
                                Salvar
                            </v-btn>

                            <v-btn
                              type="reset"
                              variant="elevated"
                              color="deep-orange lighten-1"
                              to="/admin/usuarios"
                            >
                                <v-icon>mdi-arrow-left</v-icon>
                                Voltar
                            </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>

        <v-dialog
        v-model="dialog"
        max-width="450"
        persistent
        >
            <v-list
                class="py-2"
                color="primary"
                elevation="12"
                rounded="lg"
            >
                <v-list-item class="text-center" :title="mensagem">
                <template v-slot:append>
                    <v-progress-circular
                    v-show="carregando"
                    color="primary"
                    indeterminate="disable-shrink"
                    size="16"
                    width="2"
                    ></v-progress-circular>
                </template>
                </v-list-item>
            </v-list>
        </v-dialog>
    </v-container>
</template>

<script setup>
import api from '@/plugins/api';
import { onMounted, ref } from 'vue';


/**
 * Data
 */
 const carregando = ref(false);
 const comboPerfil = ref([]);
 const form = ref({
    nome: '',
    nomeSocial: '',
    email: '',
    dtNascimento: '',
    senha: ref(''),
    senha_confirmation: ref(''),
    cpf: '',
    contato: '',
    contatoWpp: '',
    perfil: null,
});
const mensagem = ref('');
const nomeUsuarioCadastrado = ref('');
const dialog = ref(false);

/**
 * Methods
 */
const salvar = () => {
    carregando.value = true;
    if(form.value.senha != form.value.senha_confirmation){
        alert('Os campos de senha não estão iguais.');
        carregando.value = false;
    } else {
        mensagem.value = 'Aguarde...';
        dialog.value = true;
        const perfilArray = form.value.perfil.map(id => ({ id: id }));
        const payload = { ...form.value, perfil: perfilArray };
        api.post('/admin/usuario', payload)
        .then((response) => {
            mensagem.value = response.data.message;
            nomeUsuarioCadastrado.value = response.data.usuario;
            setTimeout(() => {
                (dialog.value = false);
            }, 3000);
        })
        .catch((error) => {
            console.log(error);
            mensagem.value = error.response.data.message;
            setTimeout(() => {
                (dialog.value = false);
            }, 3000);
        })
        .finally(() => {
            carregando.value = false;
        })
    }
};

const getCombos = () => {
    carregando.value = true;
    api.get('/admin/usuarios/create')
    .then((response) => {
        comboPerfil.value = response.data.perfis;
    })
    .catch((error) => {
        console.log(error);
    })
    .finally(() => {
        carregando.value = false;
    })
}

/**
 * Hooks
 */
onMounted(() => {
    getCombos();
})
</script>