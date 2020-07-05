import React from 'react';
import { FiArrowLeft, FiUser, FiLock } from 'react-icons/fi';
import LogoImg from '../../asssets/logo.svg';

import Button from '../../components/button';
import Input from '../../components/input';

import { Container, Content, Background } from './styles';

const SignUp: React.FC = () => (
  <Container>
    <Background />
    <Content>
      <img src={LogoImg} alt="logo go barber" />

      <form>
        <h1>Faça seu Cadastro</h1>
        <Input icon={FiUser} name="name" placeholder="seu nome" type="text" />
        <Input icon={FiUser} name="email" placeholder="seu e-mail" type="email" />
        <Input icon={FiLock} type="password" placeholder="senha" name="password" />
        <Input icon={FiLock} type="password" placeholder="confirme sua senha" name="confirmPassword" />
        <Button type="submit">Cadastrar</Button>

      </form>

      <a href="createaccont">
        <FiArrowLeft size={24} color="white" />
        Já tenho cadastro
      </a>
    </Content>
  </Container>
);

export default SignUp;
