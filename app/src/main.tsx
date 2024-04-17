import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { RecoilRoot } from 'recoil';
import { theme } from '@common/styles/theme.ts';
import { ThemeProvider } from '@emotion/react';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ThemeProvider theme={theme}>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </ThemeProvider>
);
