# ncom
Tiny Javascript dialog box made with Jquery
(https://docs.noud-incorporate.com/ncom/)

## Description
nCom.js is a tiny, flexible and featured javascript dialog box using jQuery. Wrote in TypeScript and compiled to es2015.
You can add it to any Web Project such as Project like with Angular Front-End Framework.
Fully compatible with FontAwesome Icons.

## Using Example
```
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

## StyleSheet
You can modify elements styles as you needed
(https://contents.noud-incorporate.com/ncom/ncom.css)
