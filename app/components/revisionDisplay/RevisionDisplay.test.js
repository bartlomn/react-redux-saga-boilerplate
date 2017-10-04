import test from 'ava';
import React from 'react';
import { configure, shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

import RevisionDisplay from './';

configure({ adapter: new Adapter() });

test( 'It should not blow up', ( t ) => {
  const wrapper = mount( <RevisionDisplay/> );
  t.true( wrapper.find( RevisionDisplay ).exists());
});

test( 'It should be a div', ( t ) => {
  const wrapper = mount( <RevisionDisplay/> );
  t.true( wrapper.find( RevisionDisplay ).exists());
});

test( 'It should display some default text', ( t ) => {
  const wrapper = shallow( <RevisionDisplay/> );
  t.true( wrapper.text().includes( 'Current revision:' ));
});

test( 'It should display passed revision', ( t ) => {
  const revision = 'dfshdfghgf';
  const wrapper = shallow( <RevisionDisplay strRev={ revision }/> );
  t.is( wrapper.type(), 'div' );
});
