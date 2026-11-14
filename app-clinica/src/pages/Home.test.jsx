import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TratamentoContext } from '../context/TratamentoContext';
import Home from './Home';

const tratamentosTeste = [
  {
    id: '1',
    nome: 'Limpeza de Pele',
    descricao: 'Tratamento para renovação da pele.',
    preco: 150,
    duracao: 60,
    categoria: 'Facial',
    imagem: 'imagem1.jpg',
  },
  {
    id: '2',
    nome: 'Drenagem Linfática',
    descricao: 'Tratamento corporal.',
    preco: 180,
    duracao: 50,
    categoria: 'Corporal',
    imagem: 'imagem2.jpg',
  },
  {
    id: '3',
    nome: 'Peeling Facial',
    descricao: 'Tratamento para renovação celular.',
    preco: 200,
    duracao: 45,
    categoria: 'Facial',
    imagem: 'imagem3.jpg',
  },
];

function renderizarHome(tratamentos = tratamentosTeste, loading = false) {
  return render(
    <MemoryRouter>
      <TratamentoContext.Provider
        value={{
          tratamentos,
          loading,
        }}
      >
        <Home />
      </TratamentoContext.Provider>
    </MemoryRouter>
  );
}

describe('Página Home', () => {
  it('exibe o título principal da clínica', () => {
    renderizarHome();

    expect(
      screen.getByRole('heading', {
        name: /realce sua beleza natural com sofisticação/i,
      })
    ).toBeInTheDocument();
  });

  it('exibe os tratamentos em destaque', () => {
    renderizarHome();

    expect(screen.getByText('Limpeza de Pele')).toBeInTheDocument();
    expect(screen.getByText('Drenagem Linfática')).toBeInTheDocument();
    expect(screen.getByText('Peeling Facial')).toBeInTheDocument();
  });

  it('exibe a mensagem de carregamento quando necessário', () => {
    renderizarHome([], true);

    expect(
      screen.getByText('Carregando destaques...')
    ).toBeInTheDocument();
  });
});
