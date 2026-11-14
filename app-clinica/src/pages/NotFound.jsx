import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="notfound-container">
      <div className="notfound-card">
        <h1 className="notfound-code">404</h1>
        <h2 className="notfound-titulo">Página Não Encontrada</h2>
        <p className="notfound-texto">
          Ops! O endereço que você tentou acessar não existe ou foi movido.
        </p>

        <div className="notfound-acoes">
          <Link to="/" className="btn-primary">
            Ir para a Home
          </Link>
        </div>
      </div>
    </div>
  );
}
