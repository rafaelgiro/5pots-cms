export const usernameValidation = {
  minLength: {
    value: 3,
    message: "O nome de usuário precisa ter no mínimo 3 caracteres.",
  },
  required: "O nome de usuário é obrigatório.",
};

export const passwordValidation = {
  minLength: {
    value: 3,
    message: "A senha precisa ter no mínimo 3 caracteres.",
  },
  required: "A senha é obrigatória.",
};

export const emailValidation = {
  pattern: {
    value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    message: "O email informado não é válido.",
  },
};
