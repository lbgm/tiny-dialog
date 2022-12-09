# ncom
Tiny Javascript dialog box made with TypeScript
(https://docs.noud-incorporate.com/ncom/)

<img width="750" alt="ncom-v9-c" src="https://user-images.githubusercontent.com/92580505/187641454-cf009469-e5c3-4f49-8319-f32f61d6b21a.png">



## Description
nCom.js is a tiny, flexible and featured javascript dialog box wrote in TypeScript.
You can add it to any Web Project such as Project like with Angular Front-End Framework.
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
       closeIcon:true,
       ctrlOpen:false,
       timer:"ok|3600000",
       icon:"far fa-grin-beam",
       title:"Dialog Title",
       content:'Put html content inside',
       buttons:{
        ok:{
            class:"as-button btn-accept",
            text:'Confirm',
            action:function(){alert("clicked")}
        },
        cancel:{
            hide:false,
            class:"as-effect-button btn-cancel",
            text:'Refuse',
            action:function(){alert("refused")}
        }
       },
    onContentReady: function() {console.log(1)},
    onOpenBefore: function() {console.log(2)},
    onOpen: function() {console.log(3)},
    onAction: function() {console.log(4)},
    onClose: function() {console.log(5)},
    onDestroy: function() {console.log(6)},
});
```

## Using Example with HTML
```js
<script type="text/javascript">
var myDialog = new ncom({
       closeIcon:true,
       ctrlOpen:false,
       timer:"ok|3600000",
       icon:"far fa-grin-beam",
       title:"Dialog Title",
       content:'Put html content inside',
       buttons:{
        ok:{
            class:"as-button btn-accept",
            text:'<i class="fa fa-check-circle"></i>&nbsp;Confirm',
            action:function(){alert("clicked")}
        },
        cancel:{
            hide:false,
            class:"as-effect-button btn-cancel",
            text:'<i class="fa fa-times"></i>&nbsp;Refuse',
            action:function(){alert("refused")}
        }
       },
    onContentReady: function() {console.log(1)},
    onOpenBefore: function() {console.log(2)},
    onOpen: function() {console.log(3)},
    onAction: function() {console.log(4)},
    onClose: function() {console.log(5)},
    onDestroy: function() {console.log(6)},
});
</script>
```

## Few Details

`timer:"ok|3600000"` : this parameter takes one ncom button id and a  time in milliseconds to automatically click on target'button.

## CDN

Versionning is not enforced. Hash the file yourself to load realtime change if needed

```html
<script type="module" src="https://noud-incorporate.com/cdn/ncom/v9/c.js?your_hash"></script>
```
