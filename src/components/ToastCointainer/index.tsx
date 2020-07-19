import React from 'react';
import Toast from './Toast';

import { Container } from './styles';
import { ToastMessage } from '../../hooks/Toast';

interface ToastCointainerProps {
    messages: ToastMessage[]
}

const ToastCointainer: React.FC<ToastCointainerProps> = ({ messages }) => (
  <Container>
    {messages.map((elemento) => (
      <Toast
        key={elemento.id}
        toast={elemento}
      />
    ))}
  </Container>
);

export default ToastCointainer;
