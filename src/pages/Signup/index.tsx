import React, { useEffect } from 'react';
import { FiArrowLeft, FiUser, FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';

import LogoImg from '../../asssets/logo.svg';

import Button from '../../components/button';
import Input from '../../components/input';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => {
  function handleSubmit(data: object): void {
    console.log(data);
  }
  return (
    <Container>
      <Background />
      <Content>
        <img src={LogoImg} alt="logo go barber" />

        <Form onSubmit={handleSubmit}>
          <h1>Faça seu Cadastro</h1>
          <Input icon={FiUser} name="name" placeholder="seu nome" type="text" />
          <Input icon={FiUser} name="email" placeholder="seu e-mail" type="email" />
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
