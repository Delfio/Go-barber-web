import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import getValidationErros from '../../utils/getValidationErros';

import LogoImg from '../../asssets/logo.svg';

import Button from '../../components/button';
import Input from '../../components/input';

import { Container, Content, Background } from './styles';

const Signin: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: object) => {
    try {
        formRef.current?.setErrors({});

        const schemaValidation = Yup.object().shape({
          email: Yup.string().required('Email obrigatório').email('E-mail inválido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schemaValidation.validate(data, {
          abortEarly: false,
        });
    } catch (err) {
      const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);
    }
  }, []);

  return (
    <Container>
      <Content>
        <img src={LogoImg} alt="logo go barber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu Login</h1>
          <Input icon={FiMail} name="email" placeholder="e-mail" type="text" />
          <Input icon={FiLock} type="password" placeholder="senha" name="password" id="" />
          <Button type="submit">Entrar</Button>

          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="createaccont">
          <FiLogIn size={24} color="white" />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  );
};

export default Signin;
