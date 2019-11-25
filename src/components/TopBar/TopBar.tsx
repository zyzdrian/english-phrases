import React, { useState } from 'react';
import { Link } from '@reach/router';
import styled from 'styled-components';
import hamburger from './menu.svg';
import { FadeAnimation, Portal } from '..';

export enum TOP_BAR_TEST_IDS {
    title = 'title',
    sideBar = 'side-bar',
    hamburger = 'hamburger',
    backdrop = 'backdrop'
}

const StyledProgressBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: sticky;
  width: 100%;
  top: 0;
  padding: 0 24px;
  margin-bottom: 24px;
  height: 56px;
  background-color: ${props => props.theme.primary};
  transition: background-color ease 0.3s;
`;

const StyledHamburger = styled.img`
  cursor: pointer;
`;

const StyledText = styled.div`
font-size: 1.2rem;
`;

interface IStyledSideBar {
    isOpen: boolean;
}

const SIDE_BAR_POSITION = {
    open: 0,
    close: -200
};

const StyledSideBar = styled.div<IStyledSideBar>`
position: absolute;
width: 200px;
left: ${props => props.isOpen ? SIDE_BAR_POSITION.open : SIDE_BAR_POSITION.close}px;
top: 56px;
height: calc(100vh - 56px);
background-color: ${props => props.theme.primary};
display: flex;
flex-direction: column;
transition: left 0.3s ease-in-out;
z-index: 1;

& a {
  background-color: ${props => props.theme.primary};
  text-decoration: none;
  color: ${props => props.theme.fontColorLight};
  padding: 16px;
  transition: background-color 0.3s ease;
  
  &:first-child {
  margin-top: 16px;
  }
  
  &:hover {
    background-color: ${props => props.theme.secondary};
  }
}
`;

const StyledBackdrop = styled.div`
  background-color: rgba(0, 0, 0, 0.3);
  height: calc(100vh - 56px);
  width: 100vw;
  position: absolute;
  top: 56px;
  left: 0;
`;

export const TopBar = ({ title }: IProgressBarProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    return (
        <StyledProgressBar>
            <StyledHamburger
                src={hamburger}
                alt='menu'
                onClick={() => setIsOpen(prevState => !prevState)}
                data-testid={TOP_BAR_TEST_IDS.hamburger}
            />
            <StyledText data-testid={TOP_BAR_TEST_IDS.title}>{title}</StyledText>
            <span style={{ width: '24px' }}/>
            <Portal id='side-bar'>
                <StyledSideBar isOpen={isOpen} data-testid={TOP_BAR_TEST_IDS.sideBar}>
                    <Link to='/'>Flashcards</Link>
                    <Link to='/free-learning'>Free learning</Link>
                </StyledSideBar>
                <FadeAnimation isOpen={isOpen}>
                    <StyledBackdrop onClick={() => setIsOpen(false)} data-testid={TOP_BAR_TEST_IDS.backdrop} />
                </FadeAnimation>
            </Portal>
        </StyledProgressBar>
    );
};

export interface IProgressBarProps {
    title?: string;
}
