"use strict";
/*!
 * NCOM Dialog Box
 * Author: NOUD, Inc. Developers
 *         Balthazar DOSSOU {dosanel@outlook.fr}
 *         Rodolphe SOUNLIN {rodolphe.sounlin@yahoo.fr}
 *
 * Copyright NOUD, Inc. Software & Network Engineering
 * Licensed Free
 */
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
var _ncom_instances, _ncom_cross, _ncom_closer, _ncom_icon, _ncom_wrp, _ncom_bw, _ncom_head, _ncom_title, _ncom_content, _ncom_buttons, _ncom_state, _ncom_$cd, _ncom_id, _ncom_detached, _ncom_timerInterval, _ncom_query, _ncom_el, _ncom_createButtons, _ncom_closerIcon, _ncom_lazyOpen, _ncom_startTimer, _ncom_rgnrt, _ncom_putContent, _ncom_stopTimer, _ncom_createSVG;
const resizeDecorator = (target, propertyKey, descriptor) => {
    const original = Object(descriptor).value;
    Object(descriptor).value = function (...args) {
        let result = original.apply(this, args);
        window.addEventListener('resize', (e) => {
            result = original.apply(this, args);
        });
        return result;
    };
    return descriptor;
};
class ncom {
    constructor(arg) {
        this.arg = arg;
        _ncom_instances.add(this);
        _ncom_cross.set(this, void 0);
        _ncom_closer.set(this, void 0);
        _ncom_icon.set(this, void 0);
        _ncom_wrp.set(this, void 0);
        _ncom_bw.set(this, void 0);
        _ncom_head.set(this, void 0);
        _ncom_title.set(this, void 0);
        _ncom_content.set(this, void 0);
        _ncom_buttons.set(this, void 0);
        _ncom_state.set(this, void 0);
        _ncom_$cd.set(this, void 0);
        _ncom_id.set(this, void 0);
        _ncom_detached.set(this, void 0);
        _ncom_timerInterval.set(this, void 0);
        if (typeof this.arg !== 'object')
            return this;
        this.arg.title = this.arg.title || '';
        this.arg.content = this.arg.content || '';
        this.arg = arg;
        __classPrivateFieldSet(this, _ncom_cross, __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_createSVG).call(this, ['16', '16', '0 0 16 16', 'button', 'ncomcross'], [
            'M21.181,19.289,26.9,13.573A1.339,1.339,0,1,0,25,11.678l-5.715,5.716-5.715-5.716a1.339,1.339,0,1,0-1.894,1.894l5.715,5.716L11.679,25A1.339,1.339,0,0,0,13.573,26.9l5.715-5.716L25,26.9A1.339,1.339,0,0,0,26.9,25Z',
            'translate(-11.285 -11.289)',
            'ncomcrosspath',
        ]), "f");
        __classPrivateFieldSet(this, _ncom_closer, __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_query).call(this, 'div', { class: 'ncomcloser', html: __classPrivateFieldGet(this, _ncom_cross, "f") }), "f");
        __classPrivateFieldSet(this, _ncom_icon, __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_query).call(this, 'div', {
            class: 'nicon',
            html: __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_query).call(this, 'i', { class: this.arg.icon || '' }),
        }), "f");
        __classPrivateFieldSet(this, _ncom_wrp, __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_query).call(this, 'div', { class: 'ncomwrp' }), "f");
        __classPrivateFieldSet(this, _ncom_bw, __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_query).call(this, 'div', { class: 'ncombw' }), "f");
        __classPrivateFieldSet(this, _ncom_head, __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_query).call(this, 'div', { class: 'ncomhead' }), "f");
        __classPrivateFieldSet(this, _ncom_title, __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_query).call(this, 'div', { class: 'ncomtitle', html: this.arg.title }), "f");
        __classPrivateFieldSet(this, _ncom_content, __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_query).call(this, 'div', {
            class: 'ncomcontent',
            html: this.arg.content,
        }), "f");
        __classPrivateFieldSet(this, _ncom_buttons, __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_query).call(this, 'div', { class: 'ncombtns' }), "f");
        __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_putContent).call(this);
        if (typeof this.arg.onOpenBefore === 'function')
            this.arg.onOpenBefore.apply(this);
        if (__classPrivateFieldGet(this, _ncom_instances, "m", _ncom_lazyOpen).call(this) === 1)
            void 0;
        else
            this.open();
    }
    destroy() {
        try {
            __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_stopTimer).call(this);
            __classPrivateFieldGet(this, _ncom_wrp, "f").remove();
            if (typeof this.arg.onDestroy === 'function')
                this.arg.onDestroy.apply(this);
            return !0;
        }
        catch (e) {
            void e;
            return !1;
        }
    }
    close() {
        let res;
        if (__classPrivateFieldGet(this, _ncom_state, "f") === 300) {
            console.warn('ncom was closed');
            return void 0;
        }
        if (typeof this.arg.onClose === 'function')
            res = this.arg.onClose.apply(this);
        if (typeof res !== 'undefined' && !res)
            return !0;
        __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_stopTimer).call(this);
        __classPrivateFieldSet(this, _ncom_detached, __classPrivateFieldGet(this, _ncom_wrp, "f"), "f");
        __classPrivateFieldGet(this, _ncom_wrp, "f").remove();
        __classPrivateFieldSet(this, _ncom_state, 300, "f");
        __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_el).call(this, 'body').removeAttribute('data-ncom-is-under');
        return !0;
    }
    open() {
        if (__classPrivateFieldGet(this, _ncom_state, "f") === 200) {
            console.warn('ncom was opened');
            return void 0;
        }
        else if (__classPrivateFieldGet(this, _ncom_state, "f") === 300)
            __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_el).call(this, 'body').appendChild(__classPrivateFieldGet(this, _ncom_detached, "f"));
        else
            __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_el).call(this, 'body').appendChild(__classPrivateFieldGet(this, _ncom_wrp, "f"));
        __classPrivateFieldSet(this, _ncom_state, 200, "f");
        //trigger onOpen argument and #startTimer if is defined
        if (typeof this.arg.onOpen === 'function')
            this.arg.onOpen.apply(this);
        if (typeof this.arg.timer !== 'undefined')
            __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_startTimer).apply(this);
        __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_el).call(this, 'body').setAttribute('data-ncom-is-under', 'RDSTATE');
        return !0;
    }
    isOpen() {
        try {
            if (__classPrivateFieldGet(this, _ncom_state, "f") === 200)
                return !0;
            else
                return !1;
        }
        catch (e) {
            void e;
            return !1;
        }
    }
    domResized() {
        __classPrivateFieldGet(this, _ncom_wrp, "f").style.height = `${Object(window).innerHeight}px`;
    }
}
_ncom_cross = new WeakMap(), _ncom_closer = new WeakMap(), _ncom_icon = new WeakMap(), _ncom_wrp = new WeakMap(), _ncom_bw = new WeakMap(), _ncom_head = new WeakMap(), _ncom_title = new WeakMap(), _ncom_content = new WeakMap(), _ncom_buttons = new WeakMap(), _ncom_state = new WeakMap(), _ncom_$cd = new WeakMap(), _ncom_id = new WeakMap(), _ncom_detached = new WeakMap(), _ncom_timerInterval = new WeakMap(), _ncom_instances = new WeakSet(), _ncom_query = function _ncom_query(element, params) {
    const el = document.createElement(element);
    if (params.id)
        el.id = params.id;
    if (params.class)
        el.className = params.class;
    if (typeof params.html === 'string')
        el.innerHTML = params.html;
    else if (params.html) {
        el.append(params.html[0] || params.html);
    }
    return el;
}, _ncom_el = function _ncom_el(element) {
    return document.querySelector(element);
}, _ncom_createButtons = function _ncom_createButtons() {
    let res;
    if (typeof this.arg.buttons !== 'object')
        return 0;
    __classPrivateFieldGet(this, _ncom_buttons, "f").innerHTML = '';
    Object.entries(this.arg.buttons).forEach((value) => {
        const a = value[0];
        const b = value[1];
        Object(this)[`$$${a}`] = __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_query).call(this, 'button', {
            id: a,
            class: b.class || '',
            html: b.text || a,
        });
        __classPrivateFieldGet(this, _ncom_buttons, "f").append(Object(this)[`$$${a}`]);
        Object(this)[`$$${a}`].addEventListener('click', (e) => {
            e.preventDefault();
            if (typeof this.arg.onAction === 'function')
                this.arg.onAction.apply(this, [Object(this)[`$$${a}`]]);
            if (typeof b.action !== 'undefined')
                res = b.action.apply(this, [e, Object(this)[`$$${a}`]]);
            __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_stopTimer).call(this);
            if (typeof res === 'undefined' || res)
                this.close();
        });
        if (typeof b.hide === 'boolean' && b.hide)
            Object(this)[`$$${a}`].style.display = 'none';
    });
}, _ncom_closerIcon = function _ncom_closerIcon() {
    if (typeof this.arg.closeIcon === 'boolean' && this.arg.closeIcon)
        return !0;
    else
        return !1;
}, _ncom_lazyOpen = function _ncom_lazyOpen() {
    if (typeof this.arg.ctrlOpen === 'boolean' && this.arg.ctrlOpen)
        return 1;
    else if (typeof this.arg.ctrlOpen === 'boolean' && !this.arg.ctrlOpen)
        return 0;
    else
        return 0;
}, _ncom_startTimer = function _ncom_startTimer() {
    const opt = String(this.arg.timer).split('|');
    if (opt.length !== 2) {
        console.error("Invalid. example 'close|10000'");
        return !1;
    }
    const button_key = opt[0];
    const time = parseInt(opt[1]);
    if (typeof Object(this)[`$$${button_key}`] === 'undefined') {
        console.error(`button key ${button_key} not found`);
        return !1;
    }
    let seconds = Math.ceil(time / 1e3);
    __classPrivateFieldSet(this, _ncom_$cd, __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_query).call(this, 'span', { html: `&nbsp(${seconds})` }), "f");
    Object(this)[`$$${button_key}`].append(__classPrivateFieldGet(this, _ncom_$cd, "f"));
    __classPrivateFieldSet(this, _ncom_timerInterval, setInterval(() => {
        __classPrivateFieldGet(this, _ncom_$cd, "f").innerHTML = `&nbsp;(${(seconds -= 1)})`;
        if (seconds <= 0) {
            Object(this)[`$$${button_key}`].dispatchEvent(new Event('click'));
            __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_stopTimer).call(this);
        }
    }, 1e3), "f");
}, _ncom_rgnrt = function _ncom_rgnrt() {
    __classPrivateFieldSet(this, _ncom_id, new Date().getTime(), "f");
    __classPrivateFieldGet(this, _ncom_wrp, "f").setAttribute('id', `ncom-wrp-${__classPrivateFieldGet(this, _ncom_id, "f")}`);
    __classPrivateFieldGet(this, _ncom_bw, "f").setAttribute('id', `ncom-bw-${__classPrivateFieldGet(this, _ncom_id, "f")}`);
}, _ncom_putContent = function _ncom_putContent() {
    __classPrivateFieldGet(this, _ncom_bw, "f").innerHTML = '';
    //head
    __classPrivateFieldGet(this, _ncom_bw, "f").prepend(__classPrivateFieldGet(this, _ncom_head, "f"));
    //icon
    if (typeof this.arg.icon !== 'undefined')
        __classPrivateFieldGet(this, _ncom_head, "f").prepend(__classPrivateFieldGet(this, _ncom_icon, "f"));
    else
        __classPrivateFieldGet(this, _ncom_head, "f").classList.add('ncomhead-flend');
    //closer icon
    if (__classPrivateFieldGet(this, _ncom_instances, "m", _ncom_closerIcon).call(this))
        __classPrivateFieldGet(this, _ncom_head, "f").append(__classPrivateFieldGet(this, _ncom_closer, "f"));
    __classPrivateFieldGet(this, _ncom_closer, "f").addEventListener('click', (e) => {
        e.preventDefault();
        if (typeof this.arg.onAction === 'function')
            this.arg.onAction.apply(this, [__classPrivateFieldGet(this, _ncom_closer, "f")]);
        this.close();
    });
    //box title
    __classPrivateFieldGet(this, _ncom_bw, "f").append(__classPrivateFieldGet(this, _ncom_title, "f"));
    //box content
    __classPrivateFieldGet(this, _ncom_bw, "f").append(__classPrivateFieldGet(this, _ncom_content, "f"));
    //box buttons
    __classPrivateFieldGet(this, _ncom_bw, "f").append(__classPrivateFieldGet(this, _ncom_buttons, "f"));
    __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_createButtons).call(this);
    Object(this).$$content = __classPrivateFieldGet(this, _ncom_content, "f");
    Object(this).$$title = __classPrivateFieldGet(this, _ncom_title, "f");
    Object(this).$$buttons = __classPrivateFieldGet(this, _ncom_buttons, "f");
    Object(this).$$icon = __classPrivateFieldGet(this, _ncom_icon, "f");
    __classPrivateFieldGet(this, _ncom_instances, "m", _ncom_rgnrt).call(this);
    __classPrivateFieldGet(this, _ncom_wrp, "f").appendChild(__classPrivateFieldGet(this, _ncom_bw, "f"));
    __classPrivateFieldGet(this, _ncom_wrp, "f").style.zIndex = new Date().getTime();
    //check window innerSize
    this.domResized();
    if (typeof this.arg.onContentReady === 'function')
        this.arg.onContentReady.apply(this);
}, _ncom_stopTimer = function _ncom_stopTimer() {
    clearInterval(__classPrivateFieldGet(this, _ncom_timerInterval, "f"));
    if (__classPrivateFieldGet(this, _ncom_$cd, "f"))
        __classPrivateFieldGet(this, _ncom_$cd, "f").remove();
}, _ncom_createSVG = function _ncom_createSVG(...r) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', r[0][0]);
    svg.setAttribute('height', r[0][1]);
    svg.setAttribute('viewBox', r[0][2]);
    svg.setAttribute('role', r[0][3] || '');
    svg.setAttribute('class', r[0][4] || '');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', r[1][0]);
    path.setAttribute('transform', r[1][1]);
    path.setAttribute('class', r[1][2]);
    svg.appendChild(path);
    return svg;
};
__decorate([
    resizeDecorator
], ncom.prototype, "domResized", null);
//# sourceMappingURL=index.js.map