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
                              v-model="form.nome_social"
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
                              v-model="form.dt_nascimento"
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
                              type="password"
                              variant="outlined"
                              density="compact"
                              />
                        </v-col>

                        <v-col cols="12" md="3">
                            <v-text-field 
                              v-model="form.contato_wpp"
                              label="Contato Wpp *"
                              type="password"
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
                              item-value="value"
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

                    <v-row>
                        
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
    nome_social: '',
    email: '',
    dt_ascimento: '',
    senha: ref(''),
    senha_confirmation: ref(''),
    cpf: '',
    contato: '',
    contato_wpp: '',
    perfil: null,
});

/**
 * Methods
 */
const salvar = () => {
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