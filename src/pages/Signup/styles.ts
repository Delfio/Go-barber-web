import styled from 'styled-components';
import { shade } from 'polished';
import signupBackgroundImage from '../../asssets/sign-up-background.png';

export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-items: stretch;
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

    place-content: center; /* justify-content: center e align-itens: center */

    width: 100%;
    max-width: 700px;

    form {
        margin: 50px 0;
        width: 340px;
        text-align: center;

        h1 {
            margin-bottom: 24px;
        }

        a {
            color: #F4EDE8;
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2;

            &:hover {
                color: ${shade(0.2, '#F4EDE8')}
            }
        }
    }

    > a {
        color: #ff9000;
        display: block;
        text-decoration: none;
        transition: color 0.2;

        display: flex;
        align-items: center;

        &:hover {
            color: ${shade(0.2, '#ff9000')}
        }

        svg {
            margin-right: 16px;
        }
    }
`;

export const Background = styled.div`
    flex: 1;
    background: url(${signupBackgroundImage}) no-repeat center;

    background-size: cover;
`;
