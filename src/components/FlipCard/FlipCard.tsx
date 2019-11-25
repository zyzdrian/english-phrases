import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

export enum FLIP_CART_TEST_IDS {
    front = 'front',
    back = 'back'
}

const StyledFlip = styled.div`
perspective: 1000px;
z-index: auto;
`;

const StyledFlipper = styled.div`
position: relative;
width: 100%;
height: 100%;
`;

const FRONT_ANIMATION_START_ANGLE = 180;
const FRONT_ANIMATION_STOP_ANGLE = 0;

const StyledFront = styled.div<ISide>`
backface-visibility: hidden;
left: 0;
position: ${props => props.isFlipped ? 'absolute' : 'relative'};
top: 0;
transform: rotateY(${props => props.isFlipped ? FRONT_ANIMATION_START_ANGLE : FRONT_ANIMATION_STOP_ANGLE}deg);
transform-style: preserve-3d;
width: 100%;
height: 100%;
z-index: 2;
transition: all 0.6s ease 0s;
cursor: pointer;
`;

const BACK_ANIMATION_START_ANGLE = 0;
const BACK_ANIMATION_STOP_ANGLE = -180;

const StyledBack = styled.div<ISide>`
backface-visibility: hidden;
left: 0;
position: ${props => props.isFlipped ? 'relative' : 'absolute'};
transform: rotateY(${props => props.isFlipped ? BACK_ANIMATION_START_ANGLE : BACK_ANIMATION_STOP_ANGLE}deg);
transform-style: preserve-3d;
top: 0;
width: 100%;
height: 100%;
transition: all 0.6s ease 0s;
cursor: pointer;
`;

export const FlipCard: React.FC<IFlipCard> = ({ front, back, isOutsidedFlipped, onShow }) => {
    const [isFlipped, setFlipped] = useState(false);

    useEffect(() => {
        if (isOutsidedFlipped !== undefined) {
            setFlipped(isOutsidedFlipped);
        }
    }, [isOutsidedFlipped]);

    return (
        <StyledFlip>
            <StyledFlipper>
                <StyledFront
                    onClick={() => {
                        setFlipped(true);
                        onShow && onShow();
                    }}
                    isFlipped={isFlipped}
                    data-testid={FLIP_CART_TEST_IDS.front}
                >
                    {front}
                </StyledFront>
                <StyledBack
                    onClick={() => setFlipped(false)}
                    isFlipped={isFlipped}
                    data-testid={FLIP_CART_TEST_IDS.back}
                >
                    {back}
                </StyledBack>
            </StyledFlipper>
        </StyledFlip>
    );
};

export interface IFlipCard {
    front: React.ReactNode;
    back: React.ReactNode;
    isOutsidedFlipped?: boolean;
    onShow?: () => void;
}

interface ISide {
    isFlipped: boolean;
}
