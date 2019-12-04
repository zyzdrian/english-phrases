import React, { useState } from 'react';
import { Router } from '@reach/router';
import styled, { ThemeProvider } from 'styled-components';
import { FlashcardsPage, FreeLearningPage } from './pages';
import { lightTheme, GlobalStyle } from './styledComponents';
import { PhrasesContext } from './contexts';
import { IPhrase } from './models';

const StyledApp = styled.div`
  background-image: linear-gradient(${props => props.theme.backgroundColorStart}, ${props => props.theme.backgroundColorStop});
  display: flex;
  color: ${props => props.theme.fontColorLight}
  transition: background-color ease 0.3s;
`;

const App: React.FC = () => {
    const [phrases, setPhrases] = useState<IPhrase[]>([]);
    return (
        <ThemeProvider theme={lightTheme}>
            <PhrasesContext.Provider value={{ phrases, setPhrases: setPhrases }}>
                <StyledApp>
                    <GlobalStyle />
                    <Router style={{ display: 'flex', width: '100%' }}>
                        <FlashcardsPage path='/' />
                        <FreeLearningPage path='/free-learning' />
                    </Router>
                </StyledApp>
            </PhrasesContext.Provider>
        </ThemeProvider>
    );
};

export default App;
