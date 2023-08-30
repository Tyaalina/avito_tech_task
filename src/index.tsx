import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { ConfigProvider } from 'antd';
import App from './App';
import store from './store/configureStore';
import './index.css'; // Add any custom global styles
import { createRoot } from 'react-dom/client';



createRoot(document.getElementById('root')!).render(<React.StrictMode>
  <Provider store={store}>
    <ConfigProvider>
      <App />
    </ConfigProvider>
  </Provider>
</React.StrictMode>);

