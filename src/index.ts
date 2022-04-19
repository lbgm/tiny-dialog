/*!
 * NCOM Dialog Box
 * Author: NOUD, Inc. Developers
 *         Balthazar DOSSOU {dosanel@outlook.fr}
 *         Rodolphe SOUNLIN {rodolphe.sounlin@yahoo.fr}
 *
 * Copyright NOUD, Inc. Software & Network Engineering
 * Licensed Free
 */

const resizeDecorator=(target?:Object,propertyKey?:string,descriptor?:PropertyDescriptor)=>{
  const original= Object(descriptor).value;
  Object(descriptor).value=function(...args:any){
    let result=original.apply(this,args);
    window.addEventListener('resize',(e)=>{
      result=original.apply(this,args);
    });
    return result;
  }

  return descriptor;
}

interface ncomButton {
  hide?: boolean;
  class?: string;
  text?: string | HTMLElement | Node | Object | any;
  action: (...args:any[]) => {};
}

interface ncomArg  {
  closeIcon?: boolean;
  ctrlOpen?: boolean;
  timer?: string;
  title?: string;
  content?: string | HTMLElement | Node | Object | any;
  icon?: string;
  buttons?: Record<string|any,ncomButton>;
  onContentReady?: (...args:any[]) => {};
  onOpenBefore?: (...args:any[]) => {};
  onOpen?: (...args:any[]) => {};
  onAction?: (...args:any[]) => {};
  onClose?: (...args:any[]) => {};
  onDestroy?: (...args:any[]) => {};
}

class ncom {
  #cross?: any;
  #closer?: any;
  #icon?: any;
  #wrp?: any;
  #bw?: any;
  #head?: any;
  #title?: any;
  #content?: any;
  #buttons?: any;
  #state?: number;
  #$cd?: any;
  #id?: number;
  #detached?: any ;
  #timerInterval?: any;

   constructor(public arg: ncomArg) {

    if (typeof this.arg !== 'object') return this;
    this.arg.title = this.arg.title || '';
    this.arg.content = this.arg.content || '';

    this.arg = arg;

    this.#cross = this.#createSVG(
      ['16', '16', '0 0 16 16', 'button', 'ncomcross'],
      [
        'M21.181,19.289,26.9,13.573A1.339,1.339,0,1,0,25,11.678l-5.715,5.716-5.715-5.716a1.339,1.339,0,1,0-1.894,1.894l5.715,5.716L11.679,25A1.339,1.339,0,0,0,13.573,26.9l5.715-5.716L25,26.9A1.339,1.339,0,0,0,26.9,25Z',
        'translate(-11.285 -11.289)',
        'ncomcrosspath',
      ]
    );
    this.#closer = this.#query('div', {class: 'ncomcloser', html: this.#cross});
    this.#icon = this.#query('div', {
      class: 'nicon',
      html: this.#query('i', {class: this.arg.icon || ''}),
    });

    this.#wrp = this.#query('div', {class: 'ncomwrp'});
    this.#bw = this.#query('div', {class: 'ncombw'});

    this.#head = this.#query('div', {class: 'ncomhead'});
    this.#title = this.#query('div', {class: 'ncomtitle', html: this.arg.title});
    this.#content = this.#query('div', {
      class: 'ncomcontent',
      html: this.arg.content,
    });
    this.#buttons = this.#query('div', {class: 'ncombtns'});

    this.#putContent();

    if (typeof this.arg.onOpenBefore === 'function') this.arg.onOpenBefore.apply(this);

    if (this.#lazyOpen() === 1) void 0;
    else this.open();
  }

  #query(element: string, params: { class?: string; id?: string; html?: string | HTMLElement | Node | Object | any ;}): HTMLElement {
    const el = document.createElement(element);
    if(params.id) el.id = params.id;
    if(params.class) el.className = params.class;
    if(typeof params.html === 'string')
      el.innerHTML = params.html;
    else if(params.html) {
     el.append(params.html[0]||params.html);
    }

    return el;
  }

  #el(element: string): any {
    return document.querySelector(element);
  }

  #createButtons(): any /**/ {
    let res: any;
    if (typeof this.arg.buttons !== 'object') return 0;
    this.#buttons.innerHTML = '';
    Object.entries(this.arg.buttons).forEach( (value: [string,ncomButton]) => {
      const a = value[0];
      const b = value[1];
      Object(this)[`$$${a}`] = this.#query('button', {
        id: a,
        class: b.class || '',
        html: b.text || a,
      });
      this.#buttons.append(Object(this)[`$$${a}`]);
      Object(this)[`$$${a}`].addEventListener('click', (e: any) => {
          e.preventDefault();
          if (typeof this.arg.onAction === 'function')
            this.arg.onAction.apply(this, [Object(this)[`$$${a}`]]);
          if (typeof b.action !== 'undefined')
            res = b.action.apply(this, [e, Object(this)[`$$${a}`]]);
          this.#stopTimer();
          if (typeof res === 'undefined' || res) this.close();
        });
      if (typeof b.hide === 'boolean' && b.hide) Object(this)[`$$${a}`].style.display = 'none';
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
    this.#$cd = this.#query('span', { html: `&nbsp(${seconds})`});
    Object(this)[`$$${button_key}`].append(this.#$cd);

    this.#timerInterval = setInterval(() => {
      this.#$cd.innerHTML = `&nbsp;(${(seconds -= 1)})` ;
      if (seconds <= 0) {
        Object(this)[`$$${button_key}`].dispatchEvent(new Event('click'));
        this.#stopTimer();
      }
    }, 1e3);
  }

  #rgnrt(): void {
    this.#id = new Date().getTime();
    this.#wrp.setAttribute('id', `ncom-wrp-${this.#id}`);
    this.#bw.setAttribute('id', `ncom-bw-${this.#id}`);
  }

  /**
   * Build dialog content
   */
  #putContent(): void {
    this.#bw.innerHTML = '';
    //head
    this.#bw.prepend(this.#head);
    //icon
    if (typeof this.arg.icon !== 'undefined') this.#head.prepend(this.#icon);
    else this.#head.classList.add('ncomhead-flend');
    //closer icon
    if (this.#closerIcon())
    this.#head.append(this.#closer);
    this.#closer.addEventListener('click', (e: any) => {
        e.preventDefault();
        if (typeof this.arg.onAction === 'function')
          this.arg.onAction.apply(this, [this.#closer]);
        this.close();
      });
    //box title
    this.#bw.append(this.#title);
    //box content
    this.#bw.append(this.#content);
    //box buttons
    this.#bw.append(this.#buttons);
    this.#createButtons();

    Object(this).$$content = this.#content;
    Object(this).$$title = this.#title;
    Object(this).$$buttons = this.#buttons;
    Object(this).$$icon = this.#icon;

    this.#rgnrt();

    this.#wrp.appendChild(this.#bw);

    this.#wrp.style.zIndex = new Date().getTime();

    //check window innerSize
    this.domResized();

    if (typeof this.arg.onContentReady === 'function')
      this.arg.onContentReady.apply(this);
  }

  #stopTimer(): void {
    clearInterval(this.#timerInterval);
    if (this.#$cd) this.#$cd.remove();
  }

  #createSVG(...r: any): any {
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
      this.#wrp.remove();
      if (typeof this.arg.onDestroy === 'function')
        this.arg.onDestroy.apply(this);
      return !0;
    } catch (e) {
      void e;
      return !1;
    }
  }

  close(): any {
    let res: any;
    if (this.#state === 300) {
      console.warn('ncom was closed');
      return void 0;
    }
    if (typeof this.arg.onClose === 'function')
      res = this.arg.onClose.apply(this);
    if (typeof res !== 'undefined' && !res) return !0;
    this.#stopTimer();
    this.#detached = this.#wrp.remove();
    this.#state = 300;
    this.#el('body').removeAttribute('data-ncom-is-under');
    return !0;
  }

  open(): any {
    if (this.#state === 200) {
      console.warn('ncom was opened');
      return void 0;
    } else if (this.#state === 300) this.#el('body').appendChild(this.#detached);
    else this.#el('body').appendChild(this.#wrp);

    this.#state = 200;

    //trigger onOpen argument and #startTimer if is defined
    if (typeof this.arg.onOpen === 'function') this.arg.onOpen.apply(this);
    if (typeof this.arg.timer !== 'undefined') this.#startTimer.apply(this);
    this.#el('body').setAttribute('data-ncom-is-under', 'RDSTATE');

    return !0;
  }

  isOpen(): any {
    try {
      if (this.#state === 200) return !0;
      else return !1;
    } catch (e) {
      void e;
      return !1;
    }
  }

  @resizeDecorator
  domResized():void{
    this.#wrp.style.height=`${Object(window).innerHeight}px`;
  }
}