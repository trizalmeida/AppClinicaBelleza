import React, { useState } from 'react';
import { NavLink, Outlet, Link } from 'react-router-dom';

export default function Layout() {
  const [menuAberto, setMenuAberto] = useState(false);

  const fecharMenu = () => setMenuAberto(false);

  return (
    <div className="layout-wrapper">
      {/* Cabeçalho Fixo com Logotipo e Navegação */}
      <header className="main-header">
        <div className="header-container">
          <Link to="/" className="brand-logo">
            Clínica <span>Belleza</span>
          </Link>

          <button
            type="button"
            className="hamburger-btn"
            aria-label={menuAberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
            aria-expanded={menuAberto}
            aria-controls="menu-principal"
            onClick={() => setMenuAberto((aberto) => !aberto)}
          >
            <span className={`hamburger-icon ${menuAberto ? 'aberto' : ''}`} aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>

          <nav id="menu-principal" className={`main-nav ${menuAberto ? 'menu-aberto' : ''}`}>

            <NavLink
              to="/"
              end
              onClick={fecharMenu}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/tratamentos"
              onClick={fecharMenu}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Tratamentos
            </NavLink>

            <NavLink
              to="/sobre"
              onClick={fecharMenu}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Sobre
            </NavLink>

            <NavLink
              to="/contato"
              onClick={fecharMenu}
              className={({ isActive }) =>
                `nav-link ${isActive ? 'active' : ''}`
              }
            >
              Contato
            </NavLink>

            <NavLink 
              to="/em-breve" 
              className="nav-link-em-breve">
              Em breve
            </NavLink>
          </nav>
        </div>
      </header>

      {/* Área onde as páginas filhas (Home, Tratamentos, etc.) são renderizadas */}
      <main className="main-content">
        <Outlet />
      </main>

      {/* Rodapé da Aplicação */}
      <footer className="main-footer">
        <div className="footer-container">
          <div className="footer-info">
            <span className="footer-brand">Clínica Belleza</span>
            <span className="footer-copy">
              © {new Date().getFullYear()} Clínica Belleza. Todos os direitos reservados.
            </span>
          </div>

          <div className="footer-links">
            <Link to="/sobre" className="footer-link">
              Sobre Nós
            </Link>
            <Link to="/tratamentos" className="footer-link">
              Procedimentos
            </Link>
            <Link to="/contato" className="footer-link">
              Atendimento
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
