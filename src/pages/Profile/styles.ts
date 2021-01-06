import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    height: 100vh;
    align-items: stretch;

    > header {
        height: 144px;
        background-color: #2B262E;

        display: flex;
        align-items: center;

        div {
            width: 100%;
            max-width: 1120px;
            margin: 0 auto;

            svg {
                color: #999591;
                height: 24px;
                width: 24px;
            }
        }
    }
`;
export const Content = styled.div`
    /* place-content: center; /* justify-content: center e align-itens: center */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    max-width: 700px;
    margin: -176px auto 0;

    form {
        margin: 50px 0;
        width: 340px;
        text-align: center;
        display: flex;
        flex-direction: column;

        h1 {
            margin-bottom: 24px;
            font-size: 20px;
            text-align: left;
        }

        a {
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

    }

`;

export const AvatarInput = styled.div`
    margin-bottom: 32px;
    position: relative;
    align-self: center;

    img {
        width: 186px;
        height: 186;
        border-radius: 50%;
    }

    label {
        position: absolute;
        width: 48px;
        height: 48px;
        background-color: #ff9000;
        border-radius: 50%;
        right: 0;
        bottom: 0;
        border: none;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: background-color 0.2s;

        input {
            display: none;
        }

        svg {
            width: 20px;
            height: 20px;
            color: #ffff;
        }

        &:hover {
            background-color: ${shade(0.2, '#ff9000')}
        }
    }
`;
