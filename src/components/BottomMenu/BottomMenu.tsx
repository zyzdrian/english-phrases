import React from 'react';
import styled from 'styled-components';
import { Button, IconButton } from '..';

export enum BOTTOM_MENU_TEST_IDS {
    bottomMenu = 'bottom-menu',
    undoButton = 'undo-button',
    showMeaningButton = 'show-meaning-button',
    iKnowButton = 'i-know-button',
    iDontKnowButton = 'i-dont-know-button'
}

const StyledBottomMenu = styled.div`
display: flex;
padding: 24px;
max-width: 600px;
width: 100%;

& button {
  margin-right: 8px;
  
  &:last-child {
    margin-right: 0;
  }
}
`;

export const BottomMenu = ({ markAsKnown, markAsNotKnown, rollbackState, enableButtons, areButtonsDisabled, isRollbackDisabled }: IBottomMenuProps) => (
    <StyledBottomMenu data-testid={BOTTOM_MENU_TEST_IDS.bottomMenu}>
        {areButtonsDisabled ? (
            <>
                <IconButton variant='secondary' onClick={rollbackState} disabled={isRollbackDisabled} data-testid={BOTTOM_MENU_TEST_IDS.undoButton} />
                <Button onClick={enableButtons} data-testid={BOTTOM_MENU_TEST_IDS.showMeaningButton}>SHOW MEANING</Button>
            </>
        ): (
            <>
                <Button variant='secondary' onClick={markAsNotKnown} disabled={areButtonsDisabled} data-testid={BOTTOM_MENU_TEST_IDS.iDontKnowButton}>
                    {'I don\'t know'}
                </Button>
                <Button onClick={markAsKnown} disabled={areButtonsDisabled} data-testid={BOTTOM_MENU_TEST_IDS.iKnowButton}>I know</Button>
            </>
        )}
    </StyledBottomMenu>
);

export interface IBottomMenuProps {
    markAsKnown: () => void;
    markAsNotKnown: () => void;
    rollbackState: () => void;
    enableButtons: () => void;
    isRollbackDisabled: boolean;
    areButtonsDisabled: boolean;
}
