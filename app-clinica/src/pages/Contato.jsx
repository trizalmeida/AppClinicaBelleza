import React, { useState } from 'react';
import { consultarCep } from '../services/viacep';

export default function Contato() {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    cep: '',
    logradouro: '',
    bairro: '',
    cidade: '',
    uf: '',
    mensagem: '',
  });

  const [erros, setErros] = useState({});
  const [touched, setTouched] = useState({
    nome: false,
    email: false,
    mensagem: false,
  });

  const [statusEnvio, setStatusEnvio] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [consultandoCep, setConsultandoCep] = useState(false);
  const [erroCep, setErroCep] = useState('');

  const validarCampo = (campo, valor) => {
    let erro = '';

    if (campo === 'nome') {
      if (!valor.trim()) {
        erro = 'O nome é obrigatório.';
      } else if (valor.trim().length < 3) {
        erro = 'O nome deve ter pelo menos 3 caracteres.';
      }
    }

    if (campo === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!valor.trim()) {
        erro = 'O e-mail é obrigatório.';
      } else if (!emailRegex.test(valor)) {
        erro = 'Digite um e-mail válido (ex: usuario@dominio.com).';
      }
    }

    if (campo === 'mensagem') {
      if (!valor.trim()) {
        erro = 'A mensagem é obrigatória.';
      } else if (valor.trim().length < 10) {
        erro = 'A mensagem deve ter pelo menos 10 caracteres.';
      }
    }

    return erro;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setTouched((prev) => ({ ...prev, [name]: true }));
    const erro = validarCampo(name, value);
    setErros((prev) => ({ ...prev, [name]: erro }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const erro = validarCampo(name, value);
    setErros((prev) => ({ ...prev, [name]: erro }));
  };

  const formValido =
    formData.nome.trim().length >= 3 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.mensagem.trim().length >= 10 &&
    !erros.nome &&
    !erros.email &&
    !erros.mensagem;

  const handleBuscarCep = async () => {
    setErroCep('');
    setFormData((prev) => ({ ...prev, logradouro: '', bairro: '', cidade: '', uf: '' }));

    try {
      setConsultandoCep(true);
      const endereco = await consultarCep(formData.cep);
      setFormData((prev) => ({
        ...prev,
        cep: endereco.cep,
        logradouro: endereco.logradouro,
        bairro: endereco.bairro,
        cidade: endereco.localidade,
        uf: endereco.uf,
      }));
    } catch (erro) {
      setErroCep(erro.message);
    } finally {
      setConsultandoCep(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formValido) return;

    setEnviando(true);
    setStatusEnvio(null);

    setTimeout(() => {
      setEnviando(false);
      setStatusEnvio('sucesso');

      setFormData({ nome: '', email: '', cep: '', logradouro: '', bairro: '', cidade: '', uf: '', mensagem: '' });
      setTouched({ nome: false, email: false, mensagem: false });
      setErros({});

      setTimeout(() => {
        setStatusEnvio(null);
      }, 4000);
    }, 1200);
  };

  return (
    <div className="contato-container">
      <h2 className="contato-titulo">Fale Conosco</h2>
      <p className="contato-descricao">
        Tire suas dúvidas ou agende uma avaliação exclusiva com nossa equipe de estética.
      </p>

      {statusEnvio === 'sucesso' && (
        <div className="alert-box alert-sucesso">
          <span>✅</span> Mensagem enviada com sucesso! Entraremos em contato em breve.
        </div>
      )}

      {statusEnvio === 'erro' && (
        <div className="alert-box alert-erro">
          <span>❌</span> Ocorreu um erro ao enviar a mensagem. Tente novamente.
        </div>
      )}

      <form onSubmit={handleSubmit} className="contato-form">
        <div className="form-group">
          <label htmlFor="nome">Nome:</label>
          <input
            id="nome"
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Seu nome completo"
            className={`form-input ${touched.nome && erros.nome ? 'input-erro' : ''}`}
          />
          {touched.nome && erros.nome && (
            <span className="erro-texto">{erros.nome}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="seu@email.com"
            className={`form-input ${touched.email && erros.email ? 'input-erro' : ''}`}
          />
          {touched.email && erros.email && (
            <span className="erro-texto">{erros.email}</span>
          )}
        </div>

        {/* ViaCEP */}
        <div className="form-group">
          <label htmlFor="cep">CEP:</label>
          <div className="cep-consulta-linha">
            <input
              id="cep"
              type="text"
              name="cep"
              value={formData.cep}
              onChange={(e) => {
                const cep = e.target.value.replace(/\D/g, '').slice(0, 8);
                setFormData((prev) => ({ ...prev, cep }));
                setErroCep('');
              }}
              placeholder="Digite os 8 números do CEP"
              className="form-input"
              inputMode="numeric"
              maxLength="8"
            />
            <button
              type="button"
              className="btn-submit cep-consulta-btn"
              onClick={handleBuscarCep}
              disabled={consultandoCep || formData.cep.replace(/\D/g, '').length !== 8}
            >
              {consultandoCep ? 'Consultando...' : 'Buscar CEP'}
            </button>
          </div>
          {erroCep && <span className="erro-texto" role="alert">{erroCep}</span>}
          <small className="cep-ajuda">A consulta utiliza ViaCEP.</small>
        </div>

        {formData.logradouro && (
          <div className="endereco-consultado" aria-live="polite">
            <strong>Endereço encontrado:</strong>
            <span>{formData.logradouro}{formData.bairro ? `, ${formData.bairro}` : ''}</span>
            <span>{formData.cidade} - {formData.uf}</span>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="mensagem">Mensagem:</label>
          <textarea
            id="mensagem"
            name="mensagem"
            rows="5"
            value={formData.mensagem}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Escreva sua mensagem aqui..."
            className={`form-textarea ${touched.mensagem && erros.mensagem ? 'input-erro' : ''}`}
          />
          {touched.mensagem && erros.mensagem && (
            <span className="erro-texto">{erros.mensagem}</span>
          )}
        </div>

        <button
          type="submit"
          disabled={!formValido || enviando}
          className="btn-submit"
        >
          {enviando ? 'Enviando...' : 'Enviar Mensagem'}
        </button>
      </form>
    </div>
  );
}
