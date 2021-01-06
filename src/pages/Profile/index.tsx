/* eslint-disable @typescript-eslint/ban-types */
import React, {
  ChangeEvent, FormEvent, useCallback, useRef,
} from 'react';
import {
  FiUser, FiLock, FiMail, FiCamera, FiArrowLeft,
} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import { useToast } from '../../hooks/Toast';

import api from '../../services/apiClient';

import getValidationErros from '../../utils/getValidationErros';

import Button from '../../components/button';
import Input from '../../components/input';

import {
  Container, Content, AvatarInput,
} from './styles';
import { IUser, useAuth } from '../../hooks/Auth';

interface ProfileFormData {
    name: string;
    email: string;
    old_password: string;
    password: string;
    password_confirmation: string;
}

const Profile: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const { user, updateUser } = useAuth();

  const handleSubmit = useCallback(async (data: ProfileFormData) => {
    try {
      formRef.current?.setErrors({});

      const schemaValidation = Yup.object().shape({
        name: Yup.string().required('Nome obrigatório'),
        email: Yup.string().required('Email obrigatório').email('E-mail inválido'),
        password: Yup.string(),
        old_password: Yup.string().when('password', {
          is: (val) => !!val.length,
          then: Yup.string().required('Favor informe a senha atual'),
        }),
        password_confirmation: Yup.string().oneOf([Yup.ref('password'), 'null'], 'Senhas não condizem'),
      });

      await schemaValidation.validate(data, {
        abortEarly: false,
      });

      const newData = () => {
        const passModify = !!data.password;
        if (passModify) {
          return data;
        }
        return {
          name: data.name,
          email: data.email,
        };
      };
      const response = await api.put<IUser>('/users/profile/update', newData());

      updateUser(response.data);

      addToast({
        message: {
          type: 'success',
          title: 'Perfil Atualizado!',
          description: 'Suas informações foram atualizadas!',
        },
      });

      history.push('/dashboard');
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErros(err);

            formRef.current?.setErrors(errors);
            return;
      }
      addToast({
        message: {
          title: 'Erro no cadastro',
          type: 'error',
          description: 'Ocorreu um erro ao fazer um cadastro, tente novamente!',
        },
      });
    }
  }, [addToast, history, updateUser]);

  const handleAvatarChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const data = new FormData();

    if (files) {
      data.append('avatar', files[0]);

      api.patch('/users/avatar', data)
        .then((response) => {
          addToast({
            message: {
              title: 'Sucesso!',
              type: 'success',
              description: 'Avatar atualizado!',
            },
          });

          updateUser(response.data);
        }).catch(() => {
          addToast({
            message: {
              type: 'error',
              title: 'Erro!',
              description: 'Ocorreu um erro ao processar sua imagem, tente novamente com uma imagem menor !',
            },
          });
        });
    }
  }, [addToast, updateUser]);

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form
          ref={formRef}
          onSubmit={handleSubmit}
          initialData={{
            name: user.name,
            email: user.email,
          }}
        >
          <AvatarInput>
            <img src={user.avatar_url} alt={user.name} />
            <label htmlFor="avatar">
              <FiCamera />
              <input type="file" id="avatar" onChange={handleAvatarChange} />
            </label>
          </AvatarInput>

          <h1>Meu Perfil</h1>

          <Input
            icon={FiUser}
            name="name"
            placeholder="Seu nome"
            type="text"
          />
          <Input
            icon={FiMail}
            name="email"
            placeholder="Seu E-mail"
            type="email"
          />
          <Input
            containerStyle={{ marginTop: 24 }}
            icon={FiLock}
            type="password"
            placeholder="Senha"
            name="old_password"
          />
          <Input
            icon={FiLock}
            type="password"
            placeholder="Nova Senha"
            name="password"
          />
          <Input
            icon={FiLock}
            type="password"
            placeholder="Confirmar senha"
            name="password_confirmation"
          />
          <Button type="submit">Confirmar Mudanças</Button>

        </Form>
      </Content>
    </Container>

  );
};

export default Profile;
