/**
 * plugins/vuetify.js
 *
 * Framework documentation: https://vuetifyjs.com`
 */

// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

// Composables
import { createVuetify} from 'vuetify'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides

const temaPadraoEscuro = {
  dark: true,
  colors: {
      background: '#565454',
      primary: '#2196F3',
      botao: '#FFEA00',
      //     surface: '#FFFFFF',
      // secondary: '#03DAC6',
      //     'secondary-darken-1': '#018786',
      // error: '#B00020',
      // info: '#2196F3',
      // success: '#4CAF50',
      // warning: '#FB8C00',
      //       'cor-menu-background': '#424242',
      //       'cor-card-background': '#424242',

  }
}

const temaPadraoClaro = {
  dark: false,
  colors: {
      background: '#CFD8DC',
      primary: '#01579B',
      botao: '#3700B3',
      selectedColor: '#03A9F4',
      // surface: '#EFEBE9',
      //     'primary-darken-1': '#3700B3',
      //     secondary: '#03DAC6',
      //     'secondary-darken-1': '#018786',
      //     error: '#B00020',
      //     info: '#2196F3',
      //     success: '#4CAF50',
      //     warning: '#FB8C00',
      //       'cor-menu-background': '#EFEBE9',
      //       'cor-card-background': '#EFEBE9',
  }
}

export default createVuetify({
  theme: {
    defaultTheme: 'temaPadraoClaro',
    themes: {
        temaPadraoEscuro,
        temaPadraoClaro,
    },
  },
})
