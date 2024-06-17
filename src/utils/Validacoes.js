/*
 * Regras de Validação
 * */
const required = (value: string) => {
  return !!value || "Campo Obrigatório";
};

const tamanho = (value: string, caracters: number) => {
  return (
    (value && value.length >= caracters) ||
    `Campo deve ter ${caracters} caracteres ou mais`
  );
};

const requiredFile = (value) => {
  return !value || !value.length || value[0].size > 5120 || 'Arquivo deve ser menor que 5120 kB'
};

// const tamanho: (value: string) => boolean | string = (value: string) => (value && value.length >= 5) || 'Nome deve ter 05 caracteres ou mais';

export { required, tamanho, requiredFile };
