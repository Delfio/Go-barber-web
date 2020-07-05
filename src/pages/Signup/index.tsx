import React, { useCallback } from 'react';
import {
  FiArrowLeft, FiUser, FiLock, FiMail,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import LogoImg from '../../asssets/logo.svg';

import Button from '../../components/button';
import Input from '../../components/input';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  const handleSubmit = useCallback(async (data: object) => {
    try {
      const schemaValidation = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('Email obrigatório').email('E-mail inválido'),
        password: Yup.string().min(6, 'Minímo de 6 caractéres'),
        confirmPassword: Yup.string().required('Senha obrigatória').min(6, 'Minímo de 6 caractéres'),
      });

      await schemaValidation.validate(data, {
        abortEarly: false,
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={LogoImg} alt="logo go barber" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu Cadastro</h1>
          <Input icon={FiUser} name="name" placeholder="seu nome" type="text" />
          <Input icon={FiMail} name="email" placeholder="seu e-mail" type="email" />
          <Input icon={FiLock} type="password" placeholder="senha" name="password" />
          <Input icon={FiLock} type="password" placeholder="confirme sua senha" name="confirmPassword" />
          <Button type="submit">Cadastrar</Button>

        </Form>

        <a href="createaccont">
          <FiArrowLeft size={24} color="white" />
          Já tenho cadastro
        </a>
      </Content>
    </Container>

  );
};

export default SignUp;
