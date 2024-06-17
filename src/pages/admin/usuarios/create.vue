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
                              color="blue"
                              :loading="carregando"
                              type="submit"
                            >
                                Salvar
                            </v-btn>

                            <v-btn
                              type="reset"
                              variant="elevated"
                              color="deep-orange lighten-1"
                              to="/usuario"
                            >
                                <v-icon>mdi-arrow-left</v-icon>
                                Voltar
                            </v-btn>
                    </v-card-actions>
                </v-form>
            </v-card-text>
        </v-card>
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

/**
 * Methods
 */
const salvar = () => {
    carregando.value = true;
    if(form.value.senha != form.value.senha_confirmation){
        alert('Os campos de senha não estão iguais.');
        carregando.value = false;
    } else {
        const perfilArray = form.value.perfil.map(id => ({ id: id }));
        const payload = { ...form.value, perfil: perfilArray };
        api.post('/admin/usuario', payload)
        .then((response) => {
            mensagem.value = response.data.mensagem;
            nomeUsuarioCadastrado.value = response.data.usuario;
        })
        .catch((error) => {
            console.log(error);
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