import RecoilNexus from 'recoil-nexus';
import { StrictMode } from 'react';
import { RecoilRoot } from 'recoil';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
    <RecoilRoot>
      <RecoilNexus/>
      <App />
    </RecoilRoot>
  </StrictMode>,
);
