import React from 'react';

import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from 'app/App';
import { rootStore, StoreProvider } from 'stores/rootStore';

ReactDOM.render(
  <StoreProvider value={rootStore}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StoreProvider>,
  document.getElementById('root'),
);
