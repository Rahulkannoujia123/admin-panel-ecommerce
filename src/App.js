import React from 'react';
import './styles/global.css';
import AppRoutes from './routes';
import { Provider } from 'react-redux'; // Import Provider
import store from './store/store'; // Import your Redux store

const App = () => {
  return (
    <Provider store={store}>  {/* Wrap your routes with Provider */}
      <div>
        <AppRoutes />
      </div>
    </Provider>
  );
};

export default App;
