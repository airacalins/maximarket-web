import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './app/layouts/styles/styles.css'
import './app/layouts/styles/styles.scss'
import App from './app/layouts/components/App';
import reportWebVitals from './reportWebVitals';
import { store } from './app/store/configureStore';
import history from './app/utils/history';
import { Provider } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import CustomRouter from './app/layouts/components/CustomRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


ReactDOM.render(

  <Provider store={store}>
    <CustomRouter history={history}>
      <ToastContainer />
      <App />
    </CustomRouter>
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
