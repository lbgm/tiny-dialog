- [TinyDialog](#tinydialog)
  - [Description](#description)
  - [Using on Node Js](#using-on-node-js)
  - [Example with HTML](#example-with-html)
- [Docs](#docs)
  - [Types \& Interfaces](#types--interfaces)
  - [Options](#options)
  - [Prototype public functions](#prototype-public-functions)
  - [ClassName](#classname)


# TinyDialog
Tiny Javascript dialog box made with TypeScript

<img width="473" alt="image" src="https://user-images.githubusercontent.com/92580505/206837730-44fe4c07-0089-473f-aabd-22d7508d929b.png">

<!-- <img width="372" alt="image" src="https://user-images.githubusercontent.com/92580505/206837838-917b2d5b-ae1c-4506-9261-a51b72894e1c.png"> -->



## Description
Tiny, flexible and featured javascript dialog box wrote in TypeScript.
You can add it to any web project with Angular, Vue, React, and others Front-End Framework.
Fully compatible with FontAwesome Icons.

## Using on Node Js
```sh
npm install @lbgm/tiny-dialog
```

```ts
// import style only once
import "@lbgm/tiny-dialog/style"

import { TinyDialog } from "@lbgm/tiny-dialog";

const mydialog = new TinyDialog({
  closeIcon: true,
  ctrlOpen: false,
  timer: "ok|36000",
  icon: "far fa-grin-beam",
  title: "",
  content: "Are you confirming your participation for the Friday event?",
  buttons: {
    ok: {
      className: "as-button btn-accept",
      text: '<i class="fa fa-check-circle"></i>&nbsp;Confirm',
      action: function () {
        // do something
      }
    },
    cancel: {
      hide: false,
      className: "as-button btn-cancel",
      text: '<i class="fa fa-times"></i>&nbsp;Refuse',
      action: function () {
        // do something
      }
    }
  },
  onContentReady: function () {
    // do something
  },
  onOpenBefore: function () {
    // do something
  },
  onOpen: function () {
    // do something
  },
  onAction: function () {
    // do something
  },
  onClose: function () {
    // do something
  },
  onDestroy: function () {
    // do something
  }
});
```


## Example with HTML

- clone and build by running `npm run compile`;
- Copy `build/src`(`c.js|js.map`, `index.js|js.map`) into your destination.

```html
<script type="module" src="https://domain.com/previous-destination/c.js?your_hash"></script>

<script type="text/javascript">

const mydialog = new TinyDialog({
  closeIcon: true,
  ctrlOpen: false,
  timer: "ok|36000",
  title: "",
  content: "Are you confirming your participation for the Friday event?",
  buttons: {
    ok: {
      className: "as-button btn-accept",
      text: '<i class="fa fa-check-circle"></i>&nbsp;Confirm',
      action: function () {
        // do something
      }
    },
    cancel: {
      hide: false,
      className: "as-button btn-cancel",
      text: '<i class="fa fa-times"></i>&nbsp;Refuse',
      action: function () {
        // do something
      }
    }
  },
});

</script>
```

# Docs

## Types & Interfaces

```ts
type TinyDialogContent = string | HTMLElement | Node | Node[];
export type TinyDialogButton = {
    hide?: boolean;
    className?: string;
    text?: TinyDialogContent;
    action: (...args: any[]) => any;
};
export type TinyDialogButtons = {
    [id_button: string]: TinyDialogButton;
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
export declare class TinyDialog {
    #private;
    arg: TinyDialogArg;
    $$content: HTMLDivElement;
    $$title: HTMLDivElement;
    $$buttons: HTMLDivElement;
    $$icon: HTMLDivElement;
    constructor(arg: TinyDialogArg);
    destroy(): boolean;
    close(): boolean | void;
    open(): boolean | void;
    isOpen(): boolean;
    domResized(): void;
}
```

## Options

| Option  | Type | Description |
| :--- | :--- | :--- |
| closeIcon | `boolean` | This option displays an icon to close the box. the widget is directly linked to the close and action functions `onClose`, `onAction`. Code inside these functions will be executed. |
| ctrlOpen  | `boolean`  | This option controls the automatic opening of the box. it is linked to the pre-opening and opening functions `onOpenBefore`, `onOpen`. Code inside these functions will be executed. When the option is `true` you must call `.open()` to open the box. If it is `false`, the box will open automatically.  |
| timer  | `string` | `id_button\|delay_time`<br>This option automatically executes a `click` on a button `id_button` located on the box after a given time in milliseconds `delay_time`. This function is linked to the `onAction` function, and the action function linked to the targeted button. Code found inside these functions will be executed. |
| icon  | `string` | This option displays a main icon. use a [fontAwesome](https://fontawesome.com/) className or a className displaying a personal icon. The displayed content is accessible via `this.$$icon` |
| title  | `string`  | `text or html`<br>This option displays a main title. The displayed content is accessible via `this.$$title` . |
| content  | `string`  | `text or html`<br>This option displays html or text content in the main container. The displayed content is accessible via `this.$$content` . |
| buttons  | `TinyDialogButtons`  | This option creates buttons.<br><ul><li>`id_button`: button identifier equal to `id_button` for the timer option.</li><li>`hide`: to hide the button.< /li><li>`className`: One or more to style the button.</li><li>`text`: text or html content to be displayed on the button.</li><li>` action`: javascript function which will be executed when the button is clicked. the function passes the event and the button as parameters. The dialog box accessible with `this`. </li></ul>The buttons are accessible via their parent `this.$$buttons`. A button is accessible via `this.$$id_button`. |
| onContentReady  | `Function`  | This function runs when the box instance is created and ready for use. Code inside this function will be executed. within the function, `this` refers to the box instance. Thus its elements like `this.$$title`, `this.$$icon`, `this.$$buttons`, `this.$$content` are accessible (the same for the functions below). |
| onOpenBefore  | `Function`  | This function runs before opening the box. Code inside this function will be executed.  |
| onOpen  | `Function`  | This function runs when the box is opened. Code inside this function will be executed.  |
| onAction  | `Function`  | This function is executed when an action is triggered on the box. Code inside this function will be executed.  |
| onClose  | `Function`  | This function runs when the box is closed. Code inside this function will be executed.  |
| onDestroy  | `Function`  | This function is executed when the box is destroyed. Code inside this function will be executed.  |

## Prototype public functions

| Function    | Description   |
| :---        | :---          |
| .open()     | This function opens the box. It returns true on success or void on failure. |
| .close()    | This function closes the box. It returns true on success or void on failure. Note that closing does not destroy the box on DOM. We can reopen the box by calling .open() |
| .destroy()  | This function closes and destroys the box on DOM. It returns true on success or false on failure. |
| .isOpen()   | This function checks if the box is open or closed. It returns true or false. |

## ClassName

| Name      | Description     |
| :---      | :---          |
| tiny-dialog-cross  | svg icon className of closeIcon option. If you need to change the color of the icon, use the `tiny-dialog-cross-path` className then define some css. <br> ex: `fill: #fff;`. |
| tiny-dialog-closer | container className of the button to close the box. |
| tiny-dialog-icon | container className of box icon. |
| tiny-dialog-wrp | box overlay className. |
| tiny-dialog-bw | className of the box container. Flexible, centered and no selection of content possible. |
| tiny-dialog-head | header container className. It extends over the available width. |
| tiny-dialog-title | box title container className. It extends over the available width. |
| tiny-dialog-content | className of the container of the content you are displaying. It extends over the available width. |
| tiny-dialog-btns | Dialog button container className. Flexible, it extends over the available width. |

> All containers are `HTMLDivElement`
