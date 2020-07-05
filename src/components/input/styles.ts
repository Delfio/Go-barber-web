import styled, { css } from 'styled-components';

interface ContainerProps {
    isFocused: boolean;
    isFiled: boolean;
}

export const Container = styled.div<ContainerProps>`
    background: #232129;
    border-radius: 10px;
    padding: 16px;
    width: 100%;

    border: 2px solid #232129;
    color: #666360;

    display: flex;
    align-items: center;

    & + div {
        margin-top: 8px;
    }

    ${(props) => props.isFocused && css`
        color: #ff9000;
        border-color: #ff9000;
    `}

    ${(props) => props.isFiled && css`
        color: #ff9000;
    `}

    input {
        flex: 1;
        border: 0;
        background: transparent;
        color: #F4EDE8;

        &::placeholder {
            color: #666360;
        }

    }

    > svg {
        margin-right: 16px;
    }
`;
