import * as yup from "yup";

export const schemaLogin = yup.object().shape({
  email: yup
    .string()
    .required("Insira o e-mail")
    .email("Insira um e-mail válido"),
  senha: yup.string().required("Insira a senha"),
});
