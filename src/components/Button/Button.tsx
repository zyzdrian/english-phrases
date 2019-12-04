import React from 'react';
import styled from 'styled-components';

interface IStyledButton {
    variant: 'primary' | 'secondary';
}

const StyledButton = styled.button<IStyledButton>`
flex-grow: 1;
flex-basis: 0;
background-color: ${props => props.theme[props.variant]};
box-shadow: ${props => props.theme.shadow};
border: none;
color: white;
border-radius: 16px;
cursor: pointer;
height: 56px;
font-weight: bold;
line-height: 1.36;
letter-spacing: 0.28px;

&:disabled {
  background-color: gray;
  color: white;
  cursor: default;
}

&:focus {
  outline: none;
}
`;

export const Button: React.FC<IButton> = ({ children, variant = 'primary', ...rest }) => (
    <StyledButton variant={variant} {...rest}>{children}</StyledButton>
);

export interface IButton {
    variant?: 'primary' | 'secondary';
    onClick?: () => void;
    disabled?: boolean;
}
