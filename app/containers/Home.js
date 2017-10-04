import React from 'react';
import { connect } from 'react-redux';
import whenDomReady from 'when-dom-ready';

import { boostrapSeqStart } from './../actions';

export class HomeContaier extends React.Component {
  static propTypes = {
    dispatch: React.PropTypes.func.isRequired,
  };

  componentDidMount() {
    whenDomReady().then(() => this.props.dispatch( boostrapSeqStart()));
  }

  render() {
    return (
      <div>HOME</div>
    );
  }
}

export default connect()( HomeContaier );
