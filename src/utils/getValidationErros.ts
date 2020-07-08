import { ValidationError } from 'yup';

interface Errors {
    [key: string]: string;
}

export default function getValidationErros(err: ValidationError): Errors {
  const validationErrros: Errors = {};

  err.inner.forEach((erros) => {
    validationErrros[erros.path] = erros.message;
  });

  return validationErrros;
}
