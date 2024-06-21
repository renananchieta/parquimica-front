// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    usuario: {
      id: 0,
      nome: '',
      perfil: [],
      token: '',
    },
    mensagens: '',
    erros: [],
    color: '',
  }),
})
