<template>
    <h1>EDIT</h1>        
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
 
/**
 * Data
 */
 const route = useRoute('/admin/usuarios/[id]');
 const router = useRouter();
 console.log(route.params.id);

</script>