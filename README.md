# ncom
Tiny Javascript dialog box made with TypeScript

<img width="473" alt="image" src="https://user-images.githubusercontent.com/92580505/206837730-44fe4c07-0089-473f-aabd-22d7508d929b.png">

<!-- <img width="372" alt="image" src="https://user-images.githubusercontent.com/92580505/206837838-917b2d5b-ae1c-4506-9261-a51b72894e1c.png"> -->



## Description
nCom.js is a tiny, flexible and featured javascript dialog box wrote in TypeScript.
You can add it to any web project with Angular, Vue, React, and others Front-End Framework.
Fully compatible with FontAwesome Icons.

## Using on Node Js
```sh
npm install @lbgm/ncom
```

```ts
// import style
import "@lbgm/ncom/style"

// anywhere
import { ncom } from "@lbgm/ncom";

const mydialog = new ncom({
  closeIcon: true,
  ctrlOpen: false,
  timer: "ok|36000",
  title: "",
  content: "Are you confirming your participation for the Friday event?",
  buttons: {
    ok: {
      class: "as-button btn-accept",
      text: '<i class="fa fa-check-circle"></i>&nbsp;Confirm',
      action: function () {
        // do something
      }
    },
    cancel: {
      hide: false,
      class: "as-button btn-cancel",
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


## Using Example with HTML

import [the script module from CDN](#cdn) first

```js
<script type="text/javascript">

const mydialog = new ncom({
  closeIcon: true,
  ctrlOpen: false,
  timer: "ok|36000",
  title: "",
  content: "Are you confirming your participation for the Friday event?",
  buttons: {
    ok: {
      class: "as-button btn-accept",
      text: '<i class="fa fa-check-circle"></i>&nbsp;Confirm',
      action: function () {
        // do something
      }
    },
    cancel: {
      hide: false,
      class: "as-button btn-cancel",
      text: '<i class="fa fa-times"></i>&nbsp;Refuse',
      action: function () {
        // do something
      }
    }
  },
});
</script>
```

## CDN

Versionning is not enforced. Hash the file yourself to load realtime change if needed

```html
<script type="module" src="https://contents.noud-incorporate.com/ncom/v9/c.js?your_hash"></script>
```

## Docs

(https://docs.noud-incorporate.com/ncom/)

**Few details**:
`timer:"ok|3600000"` : this parameter takes one ncom button `id` and a `time in milliseconds` to automatically click on button.
