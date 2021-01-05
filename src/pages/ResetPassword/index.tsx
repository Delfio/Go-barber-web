/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useEffect, useRef } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { useHistory } from 'react-router-dom';
import getValidationErros from '../../utils/getValidationErros';

import { useToast } from '../../hooks/Toast';

import LogoImg from '../../asssets/logo.svg';

import Button from '../../components/button';
import Input from '../../components/input';

import {
  Container, Content, Background, AnimationContainer,
} from './styles';
import api from '../../services/apiClient';

interface ResetPasswordFormData {
    password: string;
    password_confirmation: string;
}

const ResetPassword: React.FC = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('tks');

  const { addToast } = useToast();

  const history = useHistory();

  useEffect(() => {
    if (!token) {
      addToast({
        message: {
          title: 'Rota inválida!',
          description: 'Não é possível acessar essa rota!',
          type: 'info',
        },
      });

      history.push('/');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(async (data: ResetPasswordFormData): Promise<void> => {
    try {
        formRef.current?.setErrors({});

        const schemaValidation = Yup.object().shape({
          password: Yup.string()
            .required('Senha obrigatória'),
          password_confirmation: Yup.string()
            .oneOf(
              [Yup.ref('password')],
              'Senhas não condizem',
            ),
        });

        await schemaValidation.validate(data, {
          abortEarly: false,
        });

        await api.post('/users/password/reset', {
          password: data.password,
          password_confirmation: data.password_confirmation,
          token,
        });

        history.push('/dashboard');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);
        return;
      }
      addToast({
        message: {
          title: 'Erro ao resetar senha',
          type: 'error',
          description: 'Ocorreu um erro ao resetar a senha, favor confira suas informações !',
        },
      });
    }
  }, [addToast, history, token]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="logo go barber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Resetar senha</h1>
            <Input icon={FiLock} type="password" placeholder="nova senha" name="password" id="" />
            <Input icon={FiLock} type="password" placeholder="confirmação da senha" name="password_confirmation" id="" />
            <Button type="submit">Alterar senha</Button>

          </Form>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ResetPassword;
