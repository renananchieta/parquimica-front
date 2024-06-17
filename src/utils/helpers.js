import {useAppStore} from "@/stores/app";
import Router from '../router';



/**
 * Verifica se o usuário possui permissão para acessar determinada rota.
 * As rotas que vêm do navegador (/usuario/123) e as rotas que vêm do banco (/usuario/:id) são tratadas aqui
 * para ficarem iguais.
 * Ex:
 * /usuario/123/456/002 fica /usuario/#/#/#
 * /usuario/:id/:cpf/:cidade fica /usuario/#/#/#
 *
 * @param url
 * @returns {boolean|*}
 */

// const router = useRouter()
export const possuiPermissao = (url) => {
  const {usuario} = useAppStore();
    const urlTratada = url.replaceAll(/\d+/g, '#')
    if (usuario?.obrigatorio?.find(element => element === url))
        return true
    else return usuario?.rotas?.find(element => {
        return element.replaceAll(/:id/g, '#') === urlTratada || element === '*'
    })
}

/**
 * Abre o endereço salvo na sessão
 * ou a url enviada como parâmetro
 * @param url
 */

// export declare type Url = string;
export const abrirSessaoOuUrl = (url) => {//usado na tela de login
    if (typeof window.sessionStorage.url !== 'undefined') {
        const endereco = window.sessionStorage.url
        window.sessionStorage.removeItem('url')
        Router.push(endereco)
    } else {
        Router.push(url)
    }
}

export const isUsuarioAutenticado = () => {
  const {usuario} = useAppStore();
  return usuario.nome ? true : false;
}


// function isUsuarioAdmin() {
//     return store.state.usuario.rotas[0] === '*'
// }

export const isUsuarioAdmin = () => {
  const {usuario} = useAppStore();
  return usuario.rotas[0] === '*'
}

/**
 * Esta função deixa o autocomplete case insensitive e ignora acentos
 * @param item
 * @param queryText
 * @returns {*|boolean}
 */
export const filtroAutoComplete = (item, queryText) => {
  let a = item.toLowerCase().normalize('NFD').replace(/[\u0300-\u036F]/g, '')
  let b = queryText.toLowerCase().normalize('NFD').replace(/[\u0300-\u036F]/g, '')

  return (a.indexOf(b) > -1);
}

