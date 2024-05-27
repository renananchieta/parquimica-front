/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router/auto'
import { setupLayouts } from 'virtual:generated-layouts'
import { useAppStore } from '@/stores/app';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  extendRoutes: setupLayouts,
})


const isUsuarioAutenticado = () => {
  const store = useAppStore();
  return store.usuario.nome ? true : false;
  // return localStorage.getItem('Authorization') ? true : false;
}

router.beforeEach((to, from, next) => {
  if (
    !isUsuarioAutenticado() &&
    to.path !== "/login"
  ) {
    next({ path: "/login" });
  } else if (!isUsuarioAutenticado() && to.path === "/login") {
    next();
  } else if (possuiPermissao()) {
    next();
  } else {
    alert("Sem permissão de acesso!");
  }
});

const possuiPermissao = () => {
  const store = useAppStore();
  if (store.usuario.nome) return true;
  else return false;

  // return localStorage.getItem('Authorization') ? true : false;
}

export default router
