import ReactDOM from 'react-dom/client';
import App from '@src/App.tsx';
import { RecoilRoot } from 'recoil';
import { theme } from '@common/styles/theme.ts';
import { ThemeProvider } from '@emotion/react';
import GlobalStyle from '@common/styles/globalStyle';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <GlobalStyle />
      <App />
    </RecoilRoot>
  </ThemeProvider>
);
