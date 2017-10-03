import { configure } from '@storybook/react';

import 'purecss';
import './../app/main.scss';

const req = require.context( './../app', true, /.stories.js$/ );

configure(() => {
  req.keys().forEach( filename => req( filename ));
}, module );
