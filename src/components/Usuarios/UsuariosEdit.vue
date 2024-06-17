<template>
    <h1>EDIT</h1>        
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';

 
// import { useRoute } from "vue-router";
// import { onMounted } from 'vue';
 
/**
 * Data
 */
 const router = useRouter();
 const carregando = ref(false);


/**
 * Methods
 */
const getUsuario = () => {
    console.log(router.params);
//   carregando.value = true;
//   api.get(`/admin/usuario/${route.params.id}/edit`)
//   .then((response) => {
//     comboPerfil.value = response.data.perfis;
//     comboDiretorias.value = response.data.diretorias;

//     form.value.id = response.data.usuario.id;
//     form.value.nome = response.data.usuario.nome;
//     form.value.email = response.data.usuario.email;
//     form.value.nascimento = response.data.usuario.nascimento;
//     form.value.cpf = response.data.usuario.cpf;
//     form.value.perfil = response.data.perfis_usuario;
//     form.value.diretoria = response.data.usuario_diretoria.diretoria_id;
//     console.log(response.data);
//   })
//   .catch((error) => {
//     console.log(error.data);
//   })
//   .finally(() => {
//     carregando.value = false;
//   });
};

/**
 * Hooks
 */
 onMounted(() => {
    getUsuario();

 })
// onMounted(() => {
// }),

</script>