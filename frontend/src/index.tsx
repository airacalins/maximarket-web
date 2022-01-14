import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './app/layouts/styles/styles.css'
import './app/layouts/styles/styles.scss'
import App from './app/layouts/components/App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Router } from 'react-router-dom';
import { store } from './app/store/configureStore';
import history from './app/utils/history';
import { Provider } from 'react-redux';

ReactDOM.render(

  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();