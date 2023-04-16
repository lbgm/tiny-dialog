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
declare class ncom {
    #private;
    arg?: any;
    constructor(arg?: any);
    destroy(): boolean;
    close(): any;
    open(): any;
    isOpen(): any;
    domResized(): void;
}
