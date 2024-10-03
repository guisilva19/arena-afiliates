import * as yup from "yup";

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .required("Insira o e-mail")
    .email("Insira um e-mail válido"),
  senha: yup.string().required("Insira a senha"),
});

export const schemaRegister = yup.object().shape({
  nome: yup.string().required("Insira o nome completo"),
  telefone: yup.string().required("Insira o telefone"),
  onde_vai_promover: yup.string(),
  url_ou_canal: yup.string().required("Insira a url ou canal"),
  email: yup
    .string()
    .required("Insira o e-mail")
    .email("Insira um e-mail válido"),
  senha: yup
    .string()
    .required("Insira a senha")
    .min(8, "Requer no minimo 8 caracteres"),
});

export const schemaCampanha = yup.object().shape({
  nome: yup.string().required("Insira o nome"),
  condicao: yup.string().required("Insira a condição"),
  comissao: yup.string().required("Insira a comissão"),
});

export const schemaDados = yup.object().shape({
  cliques: yup.string(),
  registros: yup.string(),
  contagem_ftd: yup.string(),
  contas_ativas: yup.string(),
  novos_depositantes: yup.string(),
  contas_depositantes: yup.string(),
  contas_de_aposta: yup.string(),
  net_player: yup.string(),
  depositos: yup.string(),
  stakes: yup.string(),
  chargebacks: yup.string(),
  receita_liquida: yup.string(),
  comissao_revshare: yup.string(),
  comissao_cpa: yup.string(),
  comissao_total: yup.string(),
  contagem_cpa: yup.string(),
});
