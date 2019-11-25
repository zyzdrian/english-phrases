import React from 'react';
import { CSSTransition } from 'react-transition-group';
import styled from 'styled-components';

const transitionName = 'fade';

const Container = styled.div`
&.${transitionName}-appear {
  opacity: 0;
}

&.${transitionName}-appear-active {
  opacity: 1;
  transition: opacity 300ms ease-in;
}
&.${transitionName}-enter {
  opacity: 0;
}

&.${transitionName}-enter-active {
  opacity: 1;
  transition: opacity 300ms ease-in;
}
&.${transitionName}-exit {
  opacity: 1;
}

&.${transitionName}-exit-active {
  opacity: 0;
  transition: opacity 300ms ease-out;
}
`;

export const FadeAnimation: React.FC<IFadeAnimation> = ({ children, isOpen }) => (
    <CSSTransition timeout={300} in={isOpen} classNames={transitionName} unmountOnExit>
        <Container>
            {children}
        </Container>
    </CSSTransition>
);

interface IFadeAnimation {
    isOpen?: boolean;
}