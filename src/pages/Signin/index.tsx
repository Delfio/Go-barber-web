import React from 'react';
import { FiLogIn } from 'react-icons/fi';
import LogoImg from '../../asssets/logo.svg';

import { Container, Content, Background } from './styles';

const Signin: React.FC = () => (
  <Container>
    <Content>
      <img src={LogoImg} alt="logo go barber" />

      <form>
        <h1>Faça seu Login</h1>
        <input placeholder="e-mail" type="text" />
        <input type="password" placeholder="senha" name="" id="" />
        <button type="submit">Entrar</button>

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
