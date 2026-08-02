import App from '@app/App.tsx';
import { theme } from '@app/styles/theme.ts';
import GlobalStyle from '@app/styles/globalStyle';
import ReactDOM from 'react-dom/client';
import { ThemeProvider } from '@emotion/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <GlobalStyle />
    <App />
  </ThemeProvider>
);
