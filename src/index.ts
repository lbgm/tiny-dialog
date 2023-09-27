/*!
 * TinyDialog Box
 * Author: Balthazar DOSSOU {https://github.com/lbgm}
 *         Rodolphe SOUNLIN {https://github.com/BigD95}
 * Licensed under MIT
 */

const resizeDecorator = (target?: Object, propertyKey?: string, descriptor?: PropertyDescriptor): PropertyDescriptor | undefined => {
  const original = (descriptor as PropertyDescriptor).value as () => void;
  (descriptor as PropertyDescriptor).value = function (...args: any) {
    let result = original.apply(this, args);
    window.addEventListener('resize', (e) => {
      result = original.apply(this, args);
    });
    return result;
  }

  return descriptor;
}

type TinyDialogContent = string | HTMLElement | Node | Node[];

export type TinyDialogButton = {
  hide?: boolean;
  className?: string;
  text?: TinyDialogContent;
  action: (...args: any[]) => any;
};

export type TinyDialogButtons = {
  [id_button: string]: TinyDialogButton
};

export interface TinyDialogArg {
  closeIcon?: boolean;
  ctrlOpen?: boolean;
  timer?: string;
  title?: string;
  content?: TinyDialogContent;
  icon?: string;
  buttons?: TinyDialogButtons;
  onContentReady?: (...args: any[]) => any;
  onOpenBefore?: (...args: any[]) => any;
  onOpen?: (...args: any[]) => any;
  onAction?: (...args: any[]) => any;
  onClose?: (...args: any[]) => any;
  onDestroy?: (...args: any[]) => any;
}

export class TinyDialog {
  #cross?: SVGSVGElement;
  #closer?: HTMLDivElement;
  #icon?: HTMLDivElement;
  #wrp?: HTMLDivElement;
  #bw?: HTMLDivElement;
  #head?: HTMLDivElement;
  #title?: HTMLDivElement;
  #content?: HTMLDivElement;
  #buttons?: HTMLDivElement;
  #state?: number;
  #$cd?: HTMLSpanElement;
  #id?: number;
  #detached?: HTMLDivElement;
  #timerInterval?: NodeJS.Timeout;

  $$content!: HTMLDivElement;
  $$title!: HTMLDivElement;
  $$buttons!: HTMLDivElement;
  $$icon!: HTMLDivElement;

  constructor(public arg: TinyDialogArg) {

    if (typeof arg !== 'object') return this;
    arg.title = arg.title || '';
    arg.content = arg.content || '';

    this.arg = arg;

    this.#cross = this.#createSVG(
      ['16', '16', '0 0 16 16', 'button', 'tiny-dialog-cross'],
      [
        'M21.181,19.289,26.9,13.573A1.339,1.339,0,1,0,25,11.678l-5.715,5.716-5.715-5.716a1.339,1.339,0,1,0-1.894,1.894l5.715,5.716L11.679,25A1.339,1.339,0,0,0,13.573,26.9l5.715-5.716L25,26.9A1.339,1.339,0,0,0,26.9,25Z',
        'translate(-11.285 -11.289)',
        'tiny-dialog-cross-path',
      ]
    );
    this.#closer = this.#query('div', { className: 'tiny-dialog-closer', html: this.#cross }) as HTMLDivElement;
    this.#icon = this.#query('div', {
      className: 'tiny-dialog-icon',
      html: this.#query('i', { className: this.arg.icon || '' }),
    }) as HTMLDivElement;

    this.#wrp = this.#query('div', { className: 'tiny-dialog-wrp' }) as HTMLDivElement;
    this.#bw = this.#query('div', { className: 'tiny-dialog-bw' }) as HTMLDivElement;

    this.#head = this.#query('div', { className: 'tiny-dialog-head' }) as HTMLDivElement;
    this.#title = this.#query('div', { className: 'tiny-dialog-title', html: this.arg.title }) as HTMLDivElement;
    this.#content = this.#query('div', {
      className: 'tiny-dialog-content',
      html: this.arg.content,
    }) as HTMLDivElement;
    this.#buttons = this.#query('div', { className: 'tiny-dialog-btns' }) as HTMLDivElement;

    this.#putContent();

    if (typeof this.arg.onOpenBefore === 'function') this.arg.onOpenBefore.apply(this);

    if (this.#lazyOpen() === 1) void 0;
    else this.open();
  }

  #query(element: string, params: { className?: string; id?: string; html?: TinyDialogContent; }): HTMLElement {
    const el = document.createElement(element);
    if (params.id) el.id = params.id;
    if (params.className) el.className = params.className;
    if (typeof params.html === 'string')
      el.innerHTML = params.html;
    else if (params.html) {
      // readme: (params.html as Node[])[0] if Jquery $(...) is passed
      el.append((params.html as Node[])[0] || params.html);
    }

    return el;
  }

  #el(element: string): HTMLElement | null {
    return document.querySelector(element);
  }

  #createButtons(): number | void {
    let res: any;
    if (typeof this.arg.buttons !== 'object') return 0;
    this.#buttons!.innerHTML = '';
    Object.entries(this.arg.buttons).forEach((value: [string, TinyDialogButton]) => {
      const a = value[0];
      const b = value[1];
      Object(this)[`$$${a}`] = this.#query('button', {
        id: a,
        className: b.className || '',
        html: b.text || a,
      }) as HTMLButtonElement;
      this.#buttons!.append(Object(this)[`$$${a}`]);
      Object(this)[`$$${a}`].addEventListener('click', (e: Event) => {
        e.preventDefault();
        if (typeof this.arg.onAction === 'function')
          this.arg.onAction.apply(this, [Object(this)[`$$${a}`]]);
        if (typeof b.action !== 'undefined')
          res = b.action.apply(this, [e, Object(this)[`$$${a}`]]);
        this.#stopTimer();
        if (typeof res === 'undefined' || res) this.close();
      });
      if (typeof b.hide === 'boolean' && b.hide) (Object(this)[`$$${a}`] as HTMLButtonElement).style.display = 'none';
    });
  }

  #closerIcon(): boolean {
    if (typeof this.arg.closeIcon === 'boolean' && this.arg.closeIcon)
      return !0;
    else return !1;
  }

  #lazyOpen(): number {
    if (typeof this.arg.ctrlOpen === 'boolean' && this.arg.ctrlOpen) return 1;
    else if (typeof this.arg.ctrlOpen === 'boolean' && !this.arg.ctrlOpen)
      return 0;
    else return 0;
  }

  /**
   * start timer
   * @returns {boolean | void}
   */
  #startTimer(): boolean | void {
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
    this.#$cd = this.#query('span', { html: `&nbsp(${seconds})` });
    Object(this)[`$$${button_key}`].append(this.#$cd);

    this.#timerInterval = setInterval(() => {
      this.#$cd!.innerHTML = `&nbsp;(${(seconds -= 1)})`;
      if (seconds <= 0) {
        Object(this)[`$$${button_key}`].dispatchEvent(new Event('click'));
        this.#stopTimer();
      }
    }, 1e3);
  }

  #rgnrt(): void {
    this.#id = new Date().getTime();
    this.#wrp!.setAttribute('id', `tiny-dialog-wrp-${this.#id}`);
    this.#bw!.setAttribute('id', `tiny-dialog-bw-${this.#id}`);
  }

  /**
   * Build dialog content
   */
  #putContent(): void {
    this.#bw!.innerHTML = '';
    //head
    this.#bw!.prepend(this.#head as HTMLDivElement);
    //icon
    if (typeof this.arg.icon !== 'undefined') this.#head!.prepend(this.#icon as HTMLDivElement);
    else this.#head!.classList.add('tiny-dialog-head-flend');
    //closer icon
    if (this.#closerIcon()) this.#head!.append(this.#closer as HTMLDivElement);
    this.#closer!.addEventListener('click', (e: Event) => {
      e.preventDefault();
      if (typeof this.arg.onAction === 'function')
        this.arg.onAction.apply(this, [this.#closer]);
      this.close();
    });
    //box title
    this.#bw!.append(this.#title as HTMLDivElement);
    //box content
    this.#bw!.append(this.#content as HTMLDivElement);
    //box buttons
    this.#bw!.append(this.#buttons as HTMLDivElement);
    this.#createButtons();

    this.$$content = this.#content as HTMLDivElement;
    this.$$title = this.#title as HTMLDivElement;
    this.$$buttons = this.#buttons as HTMLDivElement;
    this.$$icon = this.#icon as HTMLDivElement;

    this.#rgnrt();

    this.#wrp!.appendChild(this.#bw as HTMLDivElement);

    this.#wrp!.style.zIndex = `${new Date().getTime()}`;

    //check window innerSize
    this.domResized();

    if (typeof this.arg.onContentReady === 'function')
      this.arg.onContentReady.apply(this);
  }

  #stopTimer(): void {
    clearInterval(this.#timerInterval);
    if (this.#$cd) this.#$cd.remove();
  }

  #createSVG(...r: any): SVGSVGElement {
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
  }

  destroy(): boolean {
    try {
      this.#stopTimer();
      this.#wrp!.remove();
      if (typeof this.arg.onDestroy === 'function')
        this.arg.onDestroy.apply(this);
      return !0;
    } catch (e) {
      void e;
      return !1;
    }
  }

  close(): boolean | void {
    let res: any;
    if (this.#state === 300) {
      console.warn('tinydialog was closed');
      return void 0;
    }
    if (typeof this.arg.onClose === 'function')
      res = this.arg.onClose.apply(this);
    if (typeof res !== 'undefined' && !res) return !0;
    this.#stopTimer();
    this.#detached = this.#wrp;
    this.#wrp!.remove();
    this.#state = 300;
    document.body.removeAttribute('data-tinydialog-is-under');
    return !0;
  }

  open(): boolean | void {
    if (this.#state === 200) {
      console.warn('tinydialog was opened');
      return void 0;
    } else if (this.#state === 300) document.body.appendChild(this.#detached as HTMLDivElement);
    else document.body.appendChild(this.#wrp as HTMLDivElement);

    this.#state = 200;

    //trigger onOpen argument and #startTimer if is defined
    if (typeof this.arg.onOpen === 'function') this.arg.onOpen.apply(this);
    if (typeof this.arg.timer !== 'undefined') this.#startTimer.apply(this);
    document.body.setAttribute('data-tinydialog-is-under', 'RDSTATE');

    return !0;
  }

  isOpen(): boolean {
    try {
      if (this.#state === 200) return !0;
      else return !1;
    } catch (e) {
      void e;
      return !1;
    }
  }

  @resizeDecorator
  domResized(): void {
    this.#wrp!.style.height = `${window.innerHeight}px`;
  }
}