/* eslint-env browser */
/* eslint-disable import/newline-after-import */
const jsdom = require( 'jsdom' );
const { JSDOM } = jsdom;

const { document } = ( new JSDOM( '' )).window;
global.document = document;
global.window = document.defaultView;
global.navigator = window.navigator;
/* eslint-enable import/newline-after-import */
