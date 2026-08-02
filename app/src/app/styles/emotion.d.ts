import '@emotion/react';
import { Colors, Fonts } from '@app/styles/theme';

declare module '@emotion/react' {
  export interface Theme {
    colors: Colors;
    fonts: Fonts;
  }
}
