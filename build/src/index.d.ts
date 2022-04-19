/*!
 * NCOM Dialog Box
 * Author: NOUD, Inc. Developers
 *         Balthazar DOSSOU {dosanel@outlook.fr}
 *         Rodolphe SOUNLIN {rodolphe.sounlin@yahoo.fr}
 *
 * Copyright NOUD, Inc. Software & Network Engineering
 * Licensed Free
 */
declare const resizeDecorator: (target?: Object | undefined, propertyKey?: string | undefined, descriptor?: PropertyDescriptor | undefined) => PropertyDescriptor | undefined;
interface ncomButton {
    hide?: boolean;
    class?: string;
    text?: string | HTMLElement | Node;
    action: (...args: any[]) => {};
}
interface ncomArg {
    closeIcon?: boolean;
    ctrlOpen?: boolean;
    timer?: string;
    title?: string;
    content?: string | HTMLElement | Node;
    icon?: string;
    buttons?: Record<string | any, ncomButton>;
    onContentReady?: (...args: any[]) => {};
    onOpenBefore?: (...args: any[]) => {};
    onOpen?: (...args: any[]) => {};
    onAction?: (...args: any[]) => {};
    onClose?: (...args: any[]) => {};
    onDestroy?: (...args: any[]) => {};
}
declare class ncom {
    #private;
    arg: ncomArg;
    constructor(arg: ncomArg);
    destroy(): boolean;
    close(): any;
    open(): any;
    isOpen(): any;
    domResized(): void;
}
