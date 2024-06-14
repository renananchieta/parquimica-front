<template>
    <div class="mx-auto my-12">
      <v-card
        class="mx-auto pa-12 pb-8"
        elevation="8"
        max-width="448"
        rounded="lg"
      >
        <div class="text-subtitle-1 text-medium-emphasis">Email</div>
  
        <v-text-field
          v-model="form.email"
          :readonly="carregando"
          density="compact"
          placeholder="Email address"
          prepend-inner-icon="mdi-email-outline"
          variant="outlined"
        ></v-text-field>
  
        <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
          Senha
  
          <a
            class="text-caption text-decoration-none text-blue"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Esqueci minha senha</a>
        </div>
  
        <v-text-field
          v-model="form.senha"
          :readonly="carregando"
          :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
          :type="visible ? 'text' : 'password'"
          density="compact"
          placeholder="Enter your password"
          prepend-inner-icon="mdi-lock-outline"
          variant="outlined"
          @click:append-inner="visible = !visible"
        ></v-text-field>
  
        <v-btn
          class="mb-8"
          color="blue"
          size="large"
          variant="tonal"
          block
          @click="autenticacao()"
          :disable="carregando"
        >
          Log In
        </v-btn>
  
        <v-card-text class="text-center">
          <a
            class="text-blue text-decoration-none"
            href="#"
            rel="noopener noreferrer"
            target="_blank"
          >
            Sign up now <v-icon icon="mdi-chevron-right"></v-icon>
          </a>
        </v-card-text>
      </v-card>
    </div>
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
    email: "admin.user@gmail.com",
    senha: "12345678",
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
      console.log(store.usuario);


      abrirSessaoOuUrl("/home");
    })
    .catch((error) => {
        carregando.value = false;
        alert(error.response.data.message);
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
    alert("Erro ao baixar cookie: Erro de comunicação com a rede");
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
    console.log(response.data);
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