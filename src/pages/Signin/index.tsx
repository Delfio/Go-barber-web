/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import getValidationErros from '../../utils/getValidationErros';

import { useAuth } from '../../hooks/Auth';
import { useToast } from '../../hooks/Toast';

import LogoImg from '../../asssets/logo.svg';

import Button from '../../components/button';
import Input from '../../components/input';

import {
  Container, Content, Background, AnimationContainer,
} from './styles';

interface SignInFormData {
    email: string;
    password: string;
}

const Signin: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { signIn, user } = useAuth();
  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: SignInFormData): Promise<void> => {
    try {
        formRef.current?.setErrors({});

        const schemaValidation = Yup.object().shape({
          email: Yup.string().required('Email obrigatório').email('E-mail inválido'),
          password: Yup.string().required('Senha obrigatória'),
        });

        await schemaValidation.validate(data, {
          abortEarly: false,
        });

        await signIn({
          email: data.email,
          password: data.password,
        });
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);
        return;
      }
      addToast({
        message: {
          title: 'Erro',
          type: 'error',
          description: 'Ocorreu um erro ao fazer login, cheque suas credênciais!',
        },
      });
    }
  }, [signIn, addToast]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="logo go barber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Login</h1>
            <Input icon={FiMail} name="email" placeholder="e-mail" type="text" />
            <Input icon={FiLock} type="password" placeholder="senha" name="password" id="" />
            <Button type="submit">Entrar</Button>

            <a href="forgot">Esqueci minha senha</a>
          </Form>

          <Link to="/signup">
            <FiLogIn size={24} color="white" />
            Criar conta
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default Signin;
