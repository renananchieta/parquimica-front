<template>
  <v-container 
  class="d-flex justify-center align-center" 
  fluid
  style="height: 85vh; width: 100vw">
      <div>
        <v-img
        class="mx-auto mb-2"
        width="350px" 
        src="@/assets/logo-parquimica_Prancheta-1.png"/>
  
        <v-card
          class="mx-auto pa-8 pb-5"
          elevation="8"
          max-width="448"
          rounded="lg"
        >
          <div class="text-subtitle-1 text-medium-emphasis">Email</div>
    
          <v-text-field
            v-model="form.email"
            :readonly="carregando"
            density="compact"
            placeholder="exemplo123@gmail.com"
            prepend-inner-icon="mdi-email-outline"
            variant="outlined"
          ></v-text-field>
    
          <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
            Senha
    
            <!-- <a
              class="text-caption text-decoration-none text-blue"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              Esqueci minha senha</a> -->
          </div>
    
          <v-text-field
            v-model="form.senha"
            :readonly="carregando"
            :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
            :type="visible ? 'text' : 'password'"
            density="compact"
            placeholder="Inserir senha"
            prepend-inner-icon="mdi-lock-outline"
            variant="outlined"
            @click:append-inner="visible = !visible"
          ></v-text-field>
    
          <v-btn
            class="mb-8"
            color="#0B2052"
            size="large"
            variant="elevated"
            block
            @click="autenticacao()"
            :disable="carregando"
          >
            Entrar
          </v-btn>
    
          <!-- <v-card-text class="text-center">
            <a
              class="text-blue text-decoration-none"
              href="#"
              rel="noopener noreferrer"
              target="_blank"
            >
              Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
            </a>
          </v-card-text> -->
        </v-card>
      </div>
  </v-container>
</template>

<script setup>
import api from '@/plugins/api';
import { useAppStore } from '@/stores/app';
import { onBeforeMount, ref } from 'vue';
import { useRouter } from 'vue-router';

/**
 * Data
 */
const visible = ref(false);
const carregando = ref(false);
const form = ref({
    email: "",
    senha: "",
    device_name: ""
});
const token = ref("");
const localStorageToken = ref("");

const router = useRouter();
const store = useAppStore();

/**
 * Methods
 */
const autenticacao = () => {
  baixarCookie().then(() => {
    ajaxLogin();
  });
}

const ajaxLogin = async() => {
    carregando.value = true;

    const userAgent = window.navigator.userAgent;
    const platform = window.navigator.platform;
    form.value.device_name = `${platform} - ${userAgent}`;

    await api.post('/login', form.value)
    .then((response) => {
      store.usuario = response.data;
      localStorage.setItem('Authorization', store.usuario.token);
      localStorage.setItem('user', response.data);
      
      // store.usuario.token = response.data.token;
      // store.usuario.nome = response.data.nome;
      // store.usuario.codigo_usuario = response.data.codigo_usuario;
      // store.usuario.perfil = response.data.perfil;

      abrirSessaoOuUrl("/home");
    })
    .catch((error) => {
        carregando.value = false;
        alert(error.response.data);
    })
    .finally(() => {
        carregando.value = false;
    })
}

const abrirSessaoOuUrl = (url) => {//usado na tela de login
  if (typeof window.sessionStorage.url !== 'undefined') {
    const endereco = window.sessionStorage.url
    window.sessionStorage.removeItem('url')
    router.push(endereco)
  } else {
    router.push(url)
  }
}

const baixarCookie = async () => {
  const url = import.meta.env.VITE_BASE_URL;
  return await api.get(`${url}/sanctum/csrf-cookie`).catch(() => {
    // alert("Erro ao baixar cookie: Erro de comunicação com a rede");
  });
};

/**
* Hooks 
*/
onBeforeMount(async() => {
  if(store.usuario?.nome) return;

  let params = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('Authorization')}`
    }
  };

  api.get("/usuario-info", params)
  .then((response) => {
    store.usuario.id = response.data.id;
    store.usuario.nome = response.data.nome;
    store.usuario.token = response.data.token;
    store.usuario.nome = response.data.nome;
    store.usuario.codigo_usuario = response.data.codigo_usuario;
    store.usuario.perfil = response.data.perfil;
    abrirSessaoOuUrl("/home")
  })
  .catch((erro) => {
    console.log(erro)
  })
})


</script>