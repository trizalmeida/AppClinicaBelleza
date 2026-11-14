import React from 'react';
import { Link } from 'react-router-dom';
import { useTratamentos } from '../context/TratamentoContext';

export default function Home() {
  const { tratamentos, loading } = useTratamentos();

  const tratamentosPopulares = tratamentos.slice(0, 3);

  return (
    <div className="home-container">
      <section className="hero-banner">
        <span className="hero-tag">Estética de Alta Performance</span>
        <h1 className="hero-titulo">Realce sua beleza natural com sofisticação</h1>
        <p className="hero-descricao">
          Na Clínica Belleza, unimos tecnologia avançada, protocolos personalizados
          e um ambiente exclusivo focado no seu bem-estar e autoestima.
        </p>

        <div className="hero-botoes">
          <Link to="/tratamentos" className="btn-primary">
            Conhecer Tratamentos
          </Link>
          <Link to="/contato" className="btn-secondary">
            Agendar Avaliação
          </Link>
        </div>
      </section>

      <section style={{ marginBottom: '50px' }}>
        <h2 className="home-secao-titulo">Tratamentos em Destaque</h2>
        <p className="home-secao-subtitulo">
          Conheça os procedimentos mais procurados por nossos clientes exclusivos.
        </p>

        {loading ? (
          <div className="empty-state">
            <h4>Carregando destaques...</h4>
          </div>
        ) : tratamentosPopulares.length === 0 ? (
          <div className="empty-state">
            <h4>Nenhum tratamento disponível no momento.</h4>
          </div>
        ) : (
          <div className="grid-destaques">
            {tratamentosPopulares.map((item) => (
              <div key={item.id} className="card-destaque">
                <img
                  src={
                    item.imagem ||
                    '/images/harmonizacao.avif'
                  }
                  alt={item.nome}
                  className="card-destaque-img"
                />
                <div className="card-destaque-body">
                  <span className="badge-categoria">{item.categoria}</span>
                  <h3 className="card-destaque-titulo">{item.nome}</h3>
                  <p className="card-destaque-desc">{item.descricao}</p>

                  <div className="card-destaque-footer">
                    <div>
                      <span style={{ fontSize: '12px', color: '#8c7f76', display: 'block' }}>
                        ⏱️ {item.duracao} min
                      </span>
                      <span className="card-destaque-preco">
                        R$ {Number(item.preco).toFixed(2)}
                      </span>
                    </div>
                    <Link to={`/tratamentos/${item.id}`} className="btn-detalhes">
                      Ver Detalhes
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <section style={{ marginBottom: '50px' }}>
        <h2 className="home-secao-titulo">Por que escolher a Belleza?</h2>
        <p className="home-secao-subtitulo">
          Nossos compromissos com a sua saúde estética e conforto absoluto.
        </p>

        <div className="grid-diferenciais">
          <div className="card-diferencial">
            <span className="diferencial-icone">✨</span>
            <h3 className="diferencial-titulo">Atendimento Exclusivo</h3>
            <p className="diferencial-desc">
              Avaliações individuais minuciosas para criar o plano de tratamento ideal para sua pele.
            </p>
          </div>

          <div className="card-diferencial">
            <span className="diferencial-icone">🔬</span>
            <h3 className="diferencial-titulo">Tecnologia de Ponta</h3>
            <p className="diferencial-desc">
              Equipamentos modernos e produtos certificados de alta eficácia comprovada cientificamente.
            </p>
          </div>

          <div className="card-diferencial">
            <span className="diferencial-icone">🌿</span>
            <h3 className="diferencial-titulo">Ambiente Quiet Luxury</h3>
            <p className="diferencial-desc">
              Espaços projetados para proporcionar calma, privacidade e um momento único de relaxamento.
            </p>
          </div>
        </div>
      </section>

      <section className="home-cta-card">
        <h2 className="home-cta-titulo">Pronta para transformar seu autocuidado?</h2>
        <p className="home-cta-texto">
          Entre em contato com nossa equipe e agende sua primeira consulta personalizada.
        </p>
        <Link to="/contato" className="btn-primary">
          Falar com um Especialista
        </Link>
      </section>
    </div>
  );
}
