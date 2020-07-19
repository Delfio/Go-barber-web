import React from 'react';
import { useTransition } from 'react-spring';

import Toast from './Toast';
import { Container } from './styles';
import { ToastMessage } from '../../hooks/Toast';

interface ToastCointainerProps {
    messages: ToastMessage[]
}

const ToastCointainer: React.FC<ToastCointainerProps> = ({ messages }) => {
  const messagesWithTransitions = useTransition(
    messages,
    (message) => message.id,
    {
      from: { right: '-120%' },
      enter: { right: '0%' },
      leave: { right: '-120%' },
    },
  );
  return (
    <Container>
      {messagesWithTransitions.map(({ item, key, props }) => (
        <Toast
          key={key}
          style={props}
          toast={item}
        />
      ))}
    </Container>
  );
};

export default ToastCointainer;
