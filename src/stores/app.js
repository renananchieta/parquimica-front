// Utilities
import { defineStore } from 'pinia'

export const useAppStore = defineStore('app', {
  state: () => ({
    usuario: {
      id: 0,
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
