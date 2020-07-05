import React from 'react';
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi';
import LogoImg from '../../asssets/logo.svg';

import Button from '../../components/button';
import Input from '../../components/input';

import { Container, Content, Background } from './styles';

const Signin: React.FC = () => (
  <Container>
    <Content>
      <img src={LogoImg} alt="logo go barber" />

      <form>
        <h1>Faça seu Login</h1>
        <Input icon={FiMail} name="email" placeholder="e-mail" type="text" />
        <Input icon={FiLock} type="password" placeholder="senha" name="password" id="" />
        <Button type="submit">Entrar</Button>

        <a href="forgot">Esqueci minha senha</a>
      </form>

      <a href="createaccont">
        <FiLogIn size={24} color="white" />
        Criar conta
      </a>
    </Content>
    <Background />
  </Container>
);

export default Signin;
