export function createRootElement(id: string): HTMLElement {
    const rootContainer = document.createElement('div');
    rootContainer.setAttribute('id', id);
    return rootContainer;
}

export function addRootElement(rootElem: HTMLElement) {
    const lastElementChild = document.body.lastElementChild;
    document.body.insertBefore(
        rootElem,
        lastElementChild && lastElementChild.nextElementSibling,
    );
}
