import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { addRootElement, createRootElement } from '../../utils';

export const Portal: React.FC<IPortal> = ({ id, children }) => {
    const [el] = useState(document.createElement('div'));
    useEffect(() => {
        const existingParent = document.getElementById(id);
        const parentElem: HTMLElement = existingParent || createRootElement(id);
        parentElem.setAttribute('data-testid', `portal-${id}`);

        if (!existingParent) {
            addRootElement(parentElem);
        }

        parentElem.appendChild(el);
        return () => {
            el.remove();
            if (!parentElem.childNodes.length) {
                parentElem.remove();
            }
        };
    }, []);
    return ReactDOM.createPortal(children, el);
};

export interface IPortal {
    id: string;
}