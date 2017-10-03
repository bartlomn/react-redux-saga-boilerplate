import React from 'react';
import { storiesOf } from '@storybook/react';

import RevisionDisplay from './RevisionDisplay';

storiesOf( 'RevisionDisplay', module )
  .add( 'Default (no props)', () => (
    <RevisionDisplay/>
  ))
  .add( 'With some revision', () => (
    <RevisionDisplay strRev="123.4.56"/>
  ));
