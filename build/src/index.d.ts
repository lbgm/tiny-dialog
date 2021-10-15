/*!
 * NCOM Dialog Box
 * Author: NOUD, Inc. Developers
 *         Balthazar DOSSOU {dosanel@outlook.fr}
 *         Rodolphe SOUNLIN {rodolphe.sounlin@yahoo.fr}
 *
 * Copyright NOUD, Inc. Software & Network Engineering
 * Licensed Free
 */
declare class ncom {
    #private;
    arg?: any;
    constructor(arg?: any);
    destroy(): boolean;
    close(): any;
    open(): any;
    isOpen(): any;
}
