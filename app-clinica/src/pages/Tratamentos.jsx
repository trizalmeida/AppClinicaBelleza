import React, { useState, useEffect, useRef, useMemo, useLayoutEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { TratamentoContext } from '../context/TratamentoContext';

export default function Tratamentos() {
  const { state, dispatch, atualizarTratamento } = useContext(TratamentoContext);
  const { tratamentos, filtroCategoria, ordenacao } = state;

  const [formData, setFormData] = useState({
    nome: '',
    descricao: '',
    preco: '',
    duracao: '',
    categoria: 'Facial',
    imagem: '',
  });

  const [erros, setErros] = useState({});
  const [mensagemSucesso, setMensagemSucesso] = useState(false);
  const [editandoId, setEditandoId] = useState(null);
  const inputNomeRef = useRef(null);

  useEffect(() => {
    if (inputNomeRef.current) inputNomeRef.current.focus();
  }, []);

  const prevCountRef = useRef(tratamentos.length);
  const jaCarregouRef = useRef(false);
  useLayoutEffect(() => {
    if (state.loading) return;

    if (jaCarregouRef.current && tratamentos.length > prevCountRef.current) {
      setMensagemSucesso(true);
      const timer = setTimeout(() => setMensagemSucesso(false), 3000);
      prevCountRef.current = tratamentos.length;
      return () => clearTimeout(timer);
    }

    prevCountRef.current = tratamentos.length;
    jaCarregouRef.current = true;
  }, [tratamentos.length, state.loading]);

  const validarFormulario = () => {
    const novosErros = {};

    if (!formData.nome.trim()) novosErros.nome = 'O nome é obrigatório.';
    if (!formData.descricao.trim()) novosErros.descricao = 'A descrição é obrigatória.';
    if (!formData.imagem.trim()) novosErros.imagem = 'A URL da imagem é obrigatória.';

    const precoNum = Number(formData.preco);
    if (!formData.preco || isNaN(precoNum) || precoNum <= 0) {
      novosErros.preco = 'O preço deve ser maior que 0.';
    }

    const duracaoNum = Number(formData.duracao);
    if (!formData.duracao || isNaN(duracaoNum) || duracaoNum < 15 || duracaoNum > 480) {
      novosErros.duracao = 'A duração deve ser entre 15 e 480 minutos.';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarFormulario()) return;

    const dadosTratamento = {
      id: editandoId || Date.now().toString(),
      nome: formData.nome,
      descricao: formData.descricao,
      preco: Number(formData.preco),
      duracao: Number(formData.duracao),
      categoria: formData.categoria,
      imagem: formData.imagem,
    };

    if (editandoId) {
      atualizarTratamento(dadosTratamento);
      setMensagemSucesso(true);
      setTimeout(() => setMensagemSucesso(false), 3000);
      setEditandoId(null);
    } else {
      dispatch({ type: 'ADD', payload: dadosTratamento });
    }

    setFormData({
      nome: '',
      descricao: '',
      preco: '',
      duracao: '',
      categoria: 'Facial',
      imagem: '',
    });
    setErros({});
    if (inputNomeRef.current) inputNomeRef.current.focus();
  };

  const iniciarEdicao = (item) => {
    setEditandoId(String(item.id));
    setFormData({
      nome: item.nome,
      descricao: item.descricao,
      preco: String(item.preco),
      duracao: String(item.duracao),
      categoria: item.categoria,
      imagem: item.imagem,
    });
    setErros({});
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => inputNomeRef.current?.focus(), 0);
  };

  const cancelarEdicao = () => {
    setEditandoId(null);
    setFormData({
      nome: '',
      descricao: '',
      preco: '',
      duracao: '',
      categoria: 'Facial',
      imagem: '',
    });
    setErros({});
  };

  const tratamentosFiltradosEOrdenados = useMemo(() => {
    let lista = [...tratamentos];

    if (filtroCategoria && filtroCategoria !== 'Todos') {
      lista = lista.filter((item) => item.categoria === filtroCategoria);
    }

    lista.sort((a, b) => {
      if (ordenacao === 'preco') return a.preco - b.preco;
      if (ordenacao === 'duracao') return a.duracao - b.duracao;
      return a.nome.localeCompare(b.nome);
    });

    return lista;
  }, [tratamentos, filtroCategoria, ordenacao]);

  return (
    <div className="tratamentos-container">
      <header className="tratamentos-header">
        <span className="hero-tag">Cuidado personalizado</span>
        <h1 className="tratamentos-titulo">Nossos Tratamentos</h1>
        <p className="tratamentos-subtitulo">
          Conheça nossos protocolos de beleza e bem-estar, desenvolvidos para valorizar sua beleza natural.
        </p>
      </header>

      {mensagemSucesso && (
        <div className="alert-box alert-sucesso" role="status">
          <span aria-hidden="true">✓</span> Tratamento adicionado com sucesso!
        </div>
      )}

      <section className="form-cadastro-card">
        <div className="form-cadastro-header">
          <h2 className="form-cadastro-titulo">{editandoId ? "Editar tratamento" : "Cadastrar novo tratamento"}</h2>
          <p className="form-cadastro-subtitulo">Preencha as informações para adicionar um procedimento à clínica.</p>
        </div>

        <form onSubmit={handleSubmit} className="form-cadastro-body">
          <div className="form-grid-2">
            <div className="form-group">
              <label htmlFor="tratamento-nome">Nome do tratamento</label>
              <input id="tratamento-nome" ref={inputNomeRef} className="form-input" type="text" name="nome" value={formData.nome} onChange={handleChange} placeholder="Ex.: Limpeza de pele" />
              {erros.nome && <span className="erro-texto">{erros.nome}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="tratamento-categoria">Categoria</label>
              <select id="tratamento-categoria" className="form-select" name="categoria" value={formData.categoria} onChange={handleChange}>
                <option value="Facial">Facial</option>
                <option value="Corporal">Corporal</option>
                <option value="Estético">Estético</option>
                <option value="Outros">Outros</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="tratamento-descricao">Descrição</label>
            <textarea id="tratamento-descricao" className="form-textarea" name="descricao" rows="3" value={formData.descricao} onChange={handleChange} placeholder="Descreva os benefícios e características do procedimento..." />
            {erros.descricao && <span className="erro-texto">{erros.descricao}</span>}
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label htmlFor="tratamento-preco">Preço (R$)</label>
              <input id="tratamento-preco" className="form-input" type="number" name="preco" min="0.01" step="0.01" value={formData.preco} onChange={handleChange} placeholder="0,00" />
              {erros.preco && <span className="erro-texto">{erros.preco}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="tratamento-duracao">Duração (minutos)</label>
              <input id="tratamento-duracao" className="form-input" type="number" name="duracao" min="15" max="480" value={formData.duracao} onChange={handleChange} placeholder="Ex.: 60" />
              {erros.duracao && <span className="erro-texto">{erros.duracao}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="tratamento-imagem">URL da imagem</label>
              <input id="tratamento-imagem" className="form-input" type="text" name="imagem" value={formData.imagem} onChange={handleChange} placeholder="https://..." />
              {erros.imagem && <span className="erro-texto">{erros.imagem}</span>}
            </div>
          </div>

          <div className="form-cadastro-acoes">
            <button type="submit" className="btn-primary">
              {editandoId ? 'Salvar alterações' : 'Adicionar tratamento'}
            </button>
            {editandoId && (
              <button type="button" className="btn-detalhes" onClick={cancelarEdicao}>
                Cancelar edição
              </button>
            )}
          </div>
        </form>
      </section>

      {state.loading ? (
        <div className="empty-state"><h4>Carregando tratamentos...</h4></div>
      ) : state.erro ? (
        <div className="alert-box alert-erro" role="alert">Erro ao carregar o JSON: {state.erro}</div>
      ) : (
        <>
          <section className="filtros-bar">
            <div>
              <h2 className="lista-tratamentos-titulo">Nossos procedimentos</h2>
              <span className="contador-badge">{tratamentosFiltradosEOrdenados.length} tratamento(s)</span>
            </div>

            <div className="filtros-controles">
              <div className="filtro-campo">
                <label htmlFor="filtro-categoria">Categoria</label>
                <select id="filtro-categoria" className="form-select" value={filtroCategoria} onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value })}>
                  <option value="Todos">Todas as categorias</option>
                  <option value="Facial">Facial</option>
                  <option value="Corporal">Corporal</option>
                  <option value="Estético">Estético</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div className="filtro-campo">
                <label htmlFor="filtro-ordenacao">Ordenar por</label>
                <select id="filtro-ordenacao" className="form-select" value={ordenacao} onChange={(e) => dispatch({ type: 'SET_SORT', payload: e.target.value })}>
                  <option value="nome">Nome</option>
                  <option value="preco">Menor preço</option>
                  <option value="duracao">Menor duração</option>
                </select>
              </div>
            </div>
          </section>

          {tratamentosFiltradosEOrdenados.length === 0 ? (
            <div className="empty-state">
              <h4>Nenhum tratamento encontrado</h4>
              <p>Experimente selecionar outra categoria ou cadastrar um novo procedimento.</p>
            </div>
          ) : (
            <div className="grid-tratamentos">
              {tratamentosFiltradosEOrdenados.map((item) => (
                <article key={item.id} className="card-tratamento">
                  <img src={item.imagem} alt={item.nome} className="card-tratamento-img" />
                  <div className="card-tratamento-body">
                    <span className="badge-categoria">{item.categoria}</span>
                    <h3 className="card-tratamento-titulo">{item.nome}</h3>
                    <p className="card-tratamento-desc">{item.descricao}</p>
                    <div className="card-tratamento-meta">
                      <span>⏱ {item.duracao} min</span>
                      <strong className="card-tratamento-preco">R$ {Number(item.preco).toFixed(2).replace('.', ',')}</strong>
                    </div>
                    <div className="card-tratamento-acoes">
                      <Link to={`/tratamentos/${item.id}`} className="btn-detalhes">Ver detalhe</Link>
                      <button type="button" onClick={() => iniciarEdicao(item)} className="btn-detalhes">
                        Editar
                      </button>
                      <button type="button" onClick={() => dispatch({ type: 'REMOVE', payload: item.id })} className="btn-danger">Remover</button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
