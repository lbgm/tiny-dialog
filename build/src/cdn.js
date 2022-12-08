"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pkg = require("./index");
const { ncom } = pkg;
const ncomStyle = `
/**!
 * nCom.js CSS
 *
 * @Build / NOUD Inc. Software Developers
 *
 *
 * http://w3.org/
 *
 * @fileoverview[us.website]
 */
body[data-ncom-is-under] {
    overflow: hidden
}

.ncomwrp {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: rgba(0, 0, 0, .7)
}

.ncomwrp *,
.ncomwrp {
    -user-select: none;
    -moz-user-select: none;
    -khtml-user-select: none;
    -ms-user-select: none;
    -webkit-user-select: none;
    -webkit-touch-callout: none;
    box-sizing: border-box;
    -webkit-tap-highlight-color: transparent;
    outline: none
}

.ncombw {
    width: 300px;
    max-width: 90%;
    max-height: 80%;
    position: relative;
    background: #dedede;
    padding: 15px;
    color: #444;
    border-radius: 6px;
    overflow-x: visible;
    overflow-y: auto;
    box-shadow: 0px 2px 4px 0px rgba(68, 68, 68, .3)
}

.ncombw>* {
    margin: 0;
    margin-bottom: 16px
}

.ncomhead {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    width: 100%
}

.ncomhead-flend {
    justify-content: flex-end
}

.ncomtitle {
    width: 100%;
    font-size: 18px;
    font-weight: bold;
    white-space: pre-line;
    word-break: break-word
}

.ncomcontent {
    width: 100%;
    white-space: pre-line;
    word-break: break-word
}

.ncombtns {
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0
}

.ncombtns button {
    margin: 5px
}

.nicon {
    display: inline-flex;
    align-items: center;
    width: 16px;
    height: 16px;
    pointer-events: none
}

.ncomcloser {
    width: 16px;
    height: 16px;
    cursor: pointer;
    display: inline-flex;
    align-items: center
}

.ncomcross {
    fill: rgba(68, 68, 68, .5)
}
`;
(() => {
    const styleElement = document.createElement('style');
    styleElement.setAttribute('type', 'text/css');
    styleElement.setAttribute('data-ncom', 'style');
    styleElement.innerHTML = ncomStyle;
    const head = document.head || document.getElementsByTagName('head')[0];
    if (head)
        head.appendChild(styleElement);
})();
//# sourceMappingURL=cdn.js.map