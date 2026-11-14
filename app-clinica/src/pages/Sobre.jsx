import React from 'react';

export default function Sobre() {
  return (
    <div className="sobre-container">
      <div className="sobre-card">
        <h2 className="sobre-titulo">Sobre a Clínica Belleza</h2>
        <p className="sobre-texto">
          A <strong>Clínica Belleza</strong> é referência em tratamentos estéticos faciais e corporais,
          combinando tecnologia de ponta com um atendimento humanizado e exclusivo.
        </p>

        <h3 className="sobre-subtitulo">Nossa Missão</h3>
        <p className="sobre-texto">
          Proporcionar experiências únicas de saúde, bem-estar e autoestima através de procedimentos
          seguros e comprovados cientificamente.
        </p>
      </div>

      <section>
        <h3 className="sobre-galeria-titulo">Conheça Nossos Espaços</h3>
        <div className="sobre-galeria">
          <div className="sobre-galeria-item">
            <img
              src="https://images.pexels.com/photos/16571736/pexels-photo-16571736.jpeg"
              alt="Recepção da Clínica Belleza"
              className="sobre-galeria-img"
            />
          </div>
          <div className="sobre-galeria-item">
            <img
            src="https://images.pexels.com/photos/16571741/pexels-photo-16571741.jpeg"
            alt="Ambiente de atendimento da clínica"
            className="sobre-galeria-img"
          />
          </div>
          <div className="sobre-galeria-item">
            <img
              src="https://images.pexels.com/photos/16571735/pexels-photo-16571735.jpeg"
              alt="Espaço de Bem-estar e Cuidados"
              className="sobre-galeria-img"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
