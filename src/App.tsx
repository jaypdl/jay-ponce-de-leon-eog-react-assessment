import React from 'react';
import createStore from './store';
import { Provider } from 'react-redux';
import { Provider as UrqlProvider, createClient } from 'urql';
import { ToastContainer } from 'react-toastify';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Wrapper from './components/Wrapper';
import NowWhat from './components/NowWhat';

const store = createStore();
const theme = createMuiTheme({
  palette: {
    primary: {
      main: 'rgb(39,49,66)',
    },
    secondary: {
      main: 'rgb(197,208,222)',
    },
    background: {
      default: 'rgb(226,231,238)',
    },
  },
});
const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const App = () => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <Provider store={store}>
      <UrqlProvider value={client}>
        <Wrapper>
          <Header />
          <NowWhat />
          <ToastContainer />
        </Wrapper>
      </UrqlProvider>
    </Provider>
  </MuiThemeProvider>
);

export default App;
