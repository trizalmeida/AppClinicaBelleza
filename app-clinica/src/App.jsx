import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { TratamentoProvider } from './context/TratamentoContext';

import Layout from './components/Layout';
import Home from './pages/Home';
import Tratamentos from './pages/Tratamentos';
import DetalhesTratamento from './pages/DetalhesTratamento';
import Contato from './pages/Contato';
import Sobre from './pages/Sobre'; 
import NotFound from './pages/NotFound';
import './App.css';

export default function App() {
  return (
    <BrowserRouter>
      <TratamentoProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="tratamentos" element={<Tratamentos />} />
            <Route path="tratamentos/:id" element={<DetalhesTratamento />} />
            <Route path="contato" element={<Contato />} />
            <Route path="sobre" element={<Sobre />} />
            
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </TratamentoProvider>
    </BrowserRouter>
  );
}
