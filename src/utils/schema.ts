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
  senha: yup.string().required("Insira a senha"),
});
