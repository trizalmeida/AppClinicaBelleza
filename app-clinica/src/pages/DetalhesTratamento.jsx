import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { useTratamentos } from '../context/TratamentoContext';

export default function DetalhesTratamento() {
  const { id } = useParams();
  const { tratamentos, loading, erro } = useTratamentos();

  if (loading) {
    return <div className="detalhes-container"><p>Carregando detalhes do tratamento...</p></div>;
  }

  if (erro) {
    return (
      <div className="detalhes-container">
        <h2>Não foi possível carregar os tratamentos</h2>
        <p>{erro}</p>
        <Link to="/tratamentos" className="btn-primary">Voltar aos tratamentos</Link>
      </div>
    );
  }

  const tratamento = tratamentos.find((item) => String(item.id) === String(id));

  if (!tratamento) {
    return (
      <div className="detalhes-container">
        <h2>Tratamento não encontrado</h2>
        <p>Esse tratamento pode ter sido removido ou o endereço está incorreto.</p>
        <Link to="/tratamentos" className="btn-primary">Ver todos os tratamentos</Link>
      </div>
    );
  }

  return (
    <article className="detalhes-container">
      <Link to="/tratamentos" className="detalhes-voltar">← Voltar aos tratamentos</Link>
      <div className="detalhes-card">
        <img
          className="detalhes-imagem"
          src={tratamento.imagem}
          alt={tratamento.nome}
          onError={(event) => { event.currentTarget.style.display = 'none'; }}
        />
        <div className="detalhes-conteudo">
          <span className="badge-categoria">{tratamento.categoria}</span>
          <h1>{tratamento.nome}</h1>
          <p>{tratamento.descricao}</p>
          <div className="detalhes-informacoes">
            <p><strong>Valor:</strong> R$ {Number(tratamento.preco).toFixed(2).replace('.', ',')}</p>
            <p><strong>Duração:</strong> {tratamento.duracao} minutos</p>
          </div>
          <Link to="/contato" className="btn-primary">Agendar avaliação</Link>
        </div>
      </div>
    </article>
  );
}
