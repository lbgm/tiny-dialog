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

  constructor(public arg?: any) {
    if (typeof this.arg !== 'object') return this;
    this.arg.title = this.arg.title || '';
    this.arg.content = this.arg.content || '';

    this.arg = arg;

    this.#cross = this.#createSVG(
      ['16', '16', '0 0 16 16', 'button', 'ncomcross'],
      [
        'M11.033,13.625l4.549-4.549a1.43,1.43,0,0,0,0-2.022L14.57,6.044a1.43,1.43,0,0,0-2.022,0L8,10.592,3.451,6.044a1.43,1.43,0,0,0-2.022,0L.419,7.055a1.43,1.43,0,0,0,0,2.022l4.549,4.549L.419,18.174a1.43,1.43,0,0,0,0,2.022L1.43,21.206a1.43,1.43,0,0,0,2.022,0L8,16.658l4.549,4.549a1.43,1.43,0,0,0,2.022,0L15.581,20.2a1.43,1.43,0,0,0,0-2.022Z',
        'translate(0 -5.625)',
        'ncomcrosspath',
      ]
    );
    this.#closer = jQuery('<div/>', {class: 'ncomcloser', html: this.#cross});
    this.#icon = jQuery('<div/>', {
      class: 'nicon',
      html: jQuery('<i/>', {class: this.arg.icon || ''}),
    });

    this.#wrp = jQuery('<div/>', {class: 'ncomwrp'});
    this.#bw = jQuery('<div/>', {class: 'ncombw'});

    this.#head = jQuery('<div/>', {class: 'ncomhead'});
    this.#title = jQuery('<div/>', {class: 'ncomtitle', html: this.arg.title});
    this.#content = jQuery('<div/>', {
      class: 'ncomcontent',
      html: this.arg.content,
    });
    this.#buttons = jQuery('<div/>', {class: 'ncombtns'});

    this.#putContent();

    if (typeof this.arg.onOpenBefore === 'function') this.arg.onOpenBefore.apply(this);

    if (this.#lazyOpen() === 1) void 0;
    else this.open();
  }

  #createButtons(): any /**/ {
    let res: any;
    if (typeof this.arg.buttons !== 'object') return 0;
    this.#buttons[0].innerHTML = '';
    jQuery.each(this.arg.buttons, (a: string, b: any) => {
      Object(this)[`$$${a}`] = jQuery('<button/>', {
        id: a,
        class: b.class || '',
        html: b.text || a,
      })
        .appendTo(this.#buttons)
        .on('click', (e: any) => {
          e.preventDefault();
          if (typeof this.arg.onAction === 'function')
            this.arg.onAction.apply(this, [Object(this)[`$$${a}`]]);
          if (typeof b.action !== 'undefined')
            res = b.action.apply(this, [e, Object(this)[`$$${a}`]]);
          this.#stopTimer();
          if (typeof res === 'undefined' || res) this.close();
        });
      if (typeof b.hide === 'boolean' && b.hide) Object(this)[`$$${a}`].hide();
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

  #startTimer(): any /**/ {
    const opt = this.arg.timer.split('|');
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
    this.#$cd = jQuery(`<span>&nbsp(${seconds})</span>`).appendTo(
      Object(this)[`$$${button_key}`]
    );
    this.#timerInterval = setInterval(() => {
      this.#$cd.html(`&nbsp;(${(seconds -= 1)})`);
      if (seconds <= 0) {
        Object(this)[`$$${button_key}`].trigger('click');
        this.#stopTimer();
      }
    }, 1e3);
  }

  #rgnrt(): void {
    this.#id = new Date().getTime();
    this.#wrp.attr('id', `ncom-wrp-${this.#id}`);
    this.#bw.attr('id', `ncom-bw-${this.#id}`);
  }

  #putContent(): void /**/ {
    this.#bw[0].innerHTML = '';
    //head
    this.#head.prependTo(this.#bw);
    //icon
    if (typeof this.arg.icon !== 'undefined') this.#icon.prependTo(this.#head);
    else this.#head.addClass('ncomhead-flend');
    //closer icon
    if (this.#closerIcon())
      this.#closer.appendTo(this.#head).on('click', (e: any) => {
        e.preventDefault();
        if (typeof this.arg.onAction === 'function')
          this.arg.onAction.apply(this, [this.#closer]);
        this.close();
      });
    //box title
    this.#title.appendTo(this.#bw);
    //box content
    this.#content.appendTo(this.#bw);
    //box buttons
    this.#buttons.appendTo(this.#bw);
    this.#createButtons();

    Object(this).$$content = this.#content;
    Object(this).$$title = this.#title;
    Object(this).$$buttons = this.#buttons;
    Object(this).$$icon = this.#icon;

    this.#rgnrt();

    this.#wrp.html(this.#bw);

    this.#wrp.css({'z-index': new Date().getTime()});

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
    this.#detached = this.#wrp.detach();
    this.#state = 300;
    jQuery('body').removeAttr('data-ncom-is-under');
    return !0;
  }

  open(): any {
    if (this.#state === 200) {
      console.warn('ncom was opened');
      return void 0;
    } else if (this.#state === 300) this.#detached.appendTo('body');
    else this.#wrp.appendTo('body');

    this.#state = 200;

    //trigger onOpen argument and #startTimer if is defined
    if (typeof this.arg.onOpen === 'function') this.arg.onOpen.apply(this);
    if (typeof this.arg.timer !== 'undefined') this.#startTimer.apply(this);
    jQuery('body').attr('data-ncom-is-under', 'RDSTATE');

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
    this.#wrp[0].style.height=`${Object(window).innerHeight}px`;
  }
}
