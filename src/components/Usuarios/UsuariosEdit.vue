<template>
    <v-container>
        <v-card :loading="carregando">
            <v-card-title>Cadastro de Usuário</v-card-title>
            <v-divider class="mx-4"/>

            <v-card-text>
                <v-form @submit.prevent="verificaSePrecisaAtualizarSenhaDoUsuario()">
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
                              v-model="form.nomeSocial"
                              label="Nome social"
                              variant="outlined"
                              density="compact"
                              />
                        </v-col>
                    </v-row>
                    
                    <v-row>
                        <v-col cols="12" md="6">
                            <v-text-field
                              v-model="form.cpf"
                              label="CPF *"
                              variant="outlined"
                              density="compact"
                              />
                        </v-col>

                        <v-col cols="12" md="6">
                            <v-text-field
                              v-model="form.dtNascimento"
                              label="Data de nascimento *"
                              type="date"
                              variant="outlined"
                              density="compact"/>
                        </v-col>
                    </v-row>

                    <v-row>
                        <v-col cols="12" md="3">
                            <v-text-field 
                              v-model="form.contato"
                              label="Contado"
                              variant="outlined"
                              density="compact"
                              />
                        </v-col>

                        <v-col cols="12" md="3">
                            <v-text-field 
                              v-model="form.contatoWpp"
                              label="Contato Wpp *"
                              variant="outlined"
                              density="compact"
                              />
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
                              variant="outlined"
                              density="compact"
                              />
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
                                ALTERAR
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
import { onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

/**
 * Data
 */
const route = useRoute(); //Captura os parâmetros passados na rota
const carregando = ref(false);
const comboPerfil = ref([]);
const form = ref({
    id: 0,
    nome: '',
    nomeSocial: '',
    email: '',
    dtNascimento: '',
    senha: null,
    senha_confirmation: null,
    cpf: '',
    contato: '',
    contatoWpp: '',
    perfil: null,
});
const mensagem = ref('');
const dialog = ref(false);
const isEdit = ref(false);
const telaTitulo = ref("")


/**
 * Methods
 */
const getUsuario = () => {
  console.log(route.params.id);
  carregando.value = true;
  api.get(`/admin/usuario/${route.params.id}`)
  .then((response) => {
    comboPerfil.value = response.data.perfis;

    form.value.id = response.data.usuario.id;
    form.value.nome = response.data.usuario.nome;
    form.value.email = response.data.usuario.email;
    form.value.dtNascimento= response.data.usuario.dt_nascimento;
    form.value.cpf = response.data.usuario.cpf;
    form.value.perfil = response.data.perfis_usuario;
    form.value.contatoWpp = response.data.usuario.contato_wpp;
    console.log(response.data);
  })
  .catch((error) => {
    console.log(error.data);
  })
  .finally(() => {
    carregando.value = false;
  });
};

const ajaxEditar = (formComOuSemSenha) => {
    mensagem.value = 'Aguarde...';
    dialog.value = true;
    const perfilArray = formComOuSemSenha.perfil.map(id => ({ id: id }));
    const payload = { ...formComOuSemSenha, perfil: perfilArray };
    api.put(`/admin/usuario/${route.params.id}`, payload)
    .then((response) => {
        mensagem.value = response.data.message;
        setTimeout(() => {
            (dialog.value = false);
        }, 3000);
    })
    .catch((error) => {
        console.log(error.response.data.errors);
        alert(error);
    })
    .finally(() => {
            (carregando.value = false);
    })
}

const verificaSePrecisaAtualizarSenhaDoUsuario = () => {
    carregando.value = true;

    if(!form.value.senha) {
        const formularioSemAtualizarSenha = ref({
            id: 0,
            nome: '',
            nomeSocial: '',
            email: '',
            dtNascimento: '',
            senha: null,
            senha_confirmation: null,
            cpf: '',
            contato: '',
            contatoWpp: '',
            perfil: null,
        });
        formularioSemAtualizarSenha.value.id = form.value.id;
        formularioSemAtualizarSenha.value.nome = form.value.nome;
        formularioSemAtualizarSenha.value.email = form.value.email;
        formularioSemAtualizarSenha.value.dtNascimento = form.value.dtNascimento;
        formularioSemAtualizarSenha.value.cpf = form.value.cpf;
        formularioSemAtualizarSenha.value.perfil = form.value.perfil;
        formularioSemAtualizarSenha.value.contato = form.value.contato;
        formularioSemAtualizarSenha.value.contatoWpp = form.value.contatoWpp;

        ajaxEditar(formularioSemAtualizarSenha.value);
    } else {
        if(form.value.senha === form.value.senha_confirmation){
            ajaxEditar(form.value);
        } else {
            carregando.value = false;
            return alert("Os campos de senha estão diferentes!");
        }
    }
};

/**
 * Hooks
 */
 onMounted(() => {
    getUsuario();

 });
</script>