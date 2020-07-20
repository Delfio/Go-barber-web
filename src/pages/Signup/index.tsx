/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useRef } from 'react';
import {
  FiArrowLeft, FiUser, FiLock, FiMail,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/Toast';

import api from '../../services/apiClient';

import getValidationErros from '../../utils/getValidationErros';

import LogoImg from '../../asssets/logo.svg';

import Button from '../../components/button';
import Input from '../../components/input';

import {
  Container, Content, Background, AnimationContainer,
} from './styles';

interface SignUpFormData {
    name: string;
    email: string;
    password: string;
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(async (data: SignUpFormData) => {
    try {
      formRef.current?.setErrors({});

      const schemaValidation = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('Email obrigatório').email('E-mail inválido'),
        password: Yup.string().min(6, 'Minímo de 6 caractéres'),
        confirmPassword: Yup.string().oneOf([Yup.ref('password'), 'null'], 'Senhas não condizem'),
      });

      await schemaValidation.validate(data, {
        abortEarly: false,
      });

      await api.post('/users', data);

      addToast({
        message: {
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu Logon no GoBarber!',
        },
      });

      history.push('/');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

            formRef.current?.setErrors(errors);
            return;
      }
      addToast({
        message: {
          title: 'Erro no cadastro',
          type: 'error',
          description: 'Ocorreu um erro ao fazer um cadastro, tente novamente!',
        },
      });
    }
  }, [addToast, history]);

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="logo go barber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Faça seu Cadastro</h1>
            <Input icon={FiUser} name="name" placeholder="seu nome" type="text" />
            <Input icon={FiMail} name="email" placeholder="seu e-mail" type="email" />
            <Input icon={FiLock} type="password" placeholder="senha" name="password" />
            <Input icon={FiLock} type="password" placeholder="confirme sua senha" name="confirmPassword" />
            <Button type="submit">Cadastrar</Button>

          </Form>

          <Link to="/">
            <FiArrowLeft size={24} color="white" />
            Já tenho cadastro
          </Link>
        </AnimationContainer>
      </Content>
    </Container>

  );
};

export default SignUp;
