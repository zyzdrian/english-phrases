import React from 'react';
import { Button, IButton } from '..';
import leftArrow from './left-arrow.svg';
import styled from 'styled-components';

const StyledIconButton = styled(Button)`
max-width: 56px;
display: flex;
justify-content: center;
`;

export const IconButton: React.FC<IButton> = (props) => (
    <StyledIconButton {...props}>
        <img src={leftArrow} alt='<-' />
    </StyledIconButton>
);
