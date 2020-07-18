import React, {
  createContext, useCallback, useState, useContext,
} from 'react';

import ToastContainer from '../components/ToastCointainer';

interface IToastContext {
    addToast(): void;
    removeToast(): void;
}

const ToastContext = createContext<IToastContext>({} as IToastContext);

const ToastProvider: React.FC = ({ children }) => {
  const addToast = useCallback(() => {
    console.log('====================================');
    console.log('sdf');
    console.log('====================================');
  }, []);
  const removeToast = useCallback(() => {
    console.log('====================================');
    console.log('sdf');
    console.log('====================================');
  }, []);
  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}
      <ToastContainer />
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
