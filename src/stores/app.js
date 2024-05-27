// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    usuario: {
      nome: '',
      perfil: [],
      codigo_usuario: '',
      codigo_pessoa: '',
      token: '',
    },
    mensagens: '',
    erros: [],
    color: '',
  }),
})
