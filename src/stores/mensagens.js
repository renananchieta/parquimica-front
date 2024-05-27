// Utilities
import { defineStore } from 'pinia'

export const useMensagemStore = defineStore('mensagem', {
  state: () => ({
    mensagem: '',
  }),
})
