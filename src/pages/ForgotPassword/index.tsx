/* eslint-disable @typescript-eslint/ban-types */
import React, { useCallback, useRef, useState } from 'react';
import { FiLogIn, FiMail } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import getValidationErros from '../../utils/getValidationErros';

import { useToast } from '../../hooks/Toast';

import LogoImg from '../../asssets/logo.svg';

import Button from '../../components/button';
import Input from '../../components/input';

import {
  Container, Content, Background, AnimationContainer,
} from './styles';
import api from '../../services/apiClient';

interface ForgotRequestData {
    email: string;
}

const ForgotPassword: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const handleSubmit = useCallback(async (data: ForgotRequestData): Promise<void> => {
    try {
        formRef.current?.setErrors({});
        setLoading(true);

        const schemaValidation = Yup.object().shape({
          email: Yup.string().required('Email obrigatório').email('E-mail inválido'),
        });

        await schemaValidation.validate(data, {
          abortEarly: false,
        });

        await api.post('/users/password/forgot', {
          email: data.email,
        });

        addToast({
          message: {
            title: 'E-mail de recuperação de senha enviado',
            description: 'Foi enviado um email para reset de senha, favor confira sua caixa de entrada !',
            type: 'success',
          },
        });

      // history.push('/dashboard');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

        formRef.current?.setErrors(errors);
        return;
      }
      addToast({
        message: {
          title: 'Erro na recuperação de senha',
          type: 'error',
          description: 'Ocorreu um erro ao tentar realizar a recuperação de senha. Tente novamente em alguns instantes!',
        },
      });
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  return (
    <Container>
      <Content>
        <AnimationContainer>
          <img src={LogoImg} alt="logo go barber" />

          <Form ref={formRef} onSubmit={handleSubmit}>
            <h1>Recuperar Senha</h1>
            <Input icon={FiMail} name="email" placeholder="e-mail" type="text" />

            <Button loading={loading} type="submit">Recuperar</Button>

          </Form>

          <Link to="/">
            <FiLogIn size={24} color="white" />
            Voltar ao login
          </Link>
        </AnimationContainer>
      </Content>
      <Background />
    </Container>
  );
};

export default ForgotPassword;
