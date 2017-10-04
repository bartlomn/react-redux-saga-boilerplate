import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import configureStore from './store';
import routes from './routes';


const initialState = {};
const store = configureStore( initialState, browserHistory );

ReactDOM.render(
  <Provider store={ store }>
    { routes }
  </Provider>, document.getElementById( 'root' ),
);
// import 'purecss';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { AppContainer } from 'react-hot-loader';
// import { syncHistoryWithStore } from 'react-router-redux';
// import { useRouterHistory } from 'react-router';
// import { createHistory } from 'history';

// import store from './store';
// import RootContainer from './containers/Root';

// import './main.scss';

// const history = useRouterHistory( createHistory )({
//   basename: '/',
// });


// function renderApp( RootComponent ) {
//   const target = document.getElementById( 'root' );
//   if ( target ) {
//     ReactDOM.render(
//       <AppContainer>
//         <RootComponent
//           store={ store }
//           history={ syncHistoryWithStore( history, store ) }
//         />
//       </AppContainer>,
//       target,
//     );
//   }
// }

// renderApp( RootContainer );

// if ( module.hot ) {
//   module.hot.accept(
//     'containers/Root',
//     // eslint-disable-next-line global-require
//     () => renderApp( require( './containers/Root' )),
//   );
// }
