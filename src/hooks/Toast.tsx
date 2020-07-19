import React, {
  createContext, useCallback, useState, useContext,
} from 'react';

import { uuid } from 'uuidv4';

import ToastContainer from '../components/ToastCointainer';

interface IToastContext {
    addToast({ message }:{
        message: Omit<ToastMessage, 'id'>
    }): void;
    removeToast(id: string): void;
}

export interface ToastMessage {
    id: string;
    type?: 'success'| 'error' | 'info';
    title: string;
    description?: string;
}

const ToastContext = createContext<IToastContext>({} as IToastContext);

const ToastProvider: React.FC = ({ children }) => {
  const [messages, setMessages] = useState<ToastMessage[]>([]);

  const addToast = useCallback(({ message }: {
      message: Omit<ToastMessage, 'id'>
  }) => {
    const id = uuid();
    const { title, description, type } = message;

    const toast = {
      id,
      title,
      type,
      description,
    };

    setMessages((oldMessages) => [...oldMessages, toast]);
  }, []);

  const removeToast = useCallback((id: string) => {
    setMessages((state) => state.filter((message) => message.id !== id));
  }, []);
  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer messages={messages} />
    </ToastContext.Provider>
  );
};
const useToast = (): IToastContext => {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error('useToast só pode ser utilizado no contexto do ToastProvider');
  }

  return context;
};

export { ToastProvider, useToast };
