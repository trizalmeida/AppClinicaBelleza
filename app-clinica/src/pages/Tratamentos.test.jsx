import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TratamentoContext } from '../context/TratamentoContext';
import Tratamentos from './Tratamentos';

const tratamentosTeste = [
  {
    id: '1',
    nome: 'Limpeza de Pele',
    descricao: 'Limpeza profunda e renovação da pele.',
    preco: 150,
    duracao: 60,
    categoria: 'Facial',
    imagem: 'imagem1.jpg',
  },
  {
    id: '2',
    nome: 'Drenagem Linfática',
    descricao: 'Tratamento para redução de inchaço.',
    preco: 180,
    duracao: 50,
    categoria: 'Corporal',
    imagem: 'imagem2.jpg',
  },
];

function renderizarTratamentos() {
  const dispatch = vi.fn();

  render(
    <MemoryRouter>
      <TratamentoContext.Provider
        value={{
          state: {
            tratamentos: tratamentosTeste,
            filtroCategoria: 'Todos',
            ordenacao: 'nome',
            loading: false,
            erro: null,
          },
          dispatch,
          atualizarTratamento: vi.fn(),
        }}
      >
        <Tratamentos />
      </TratamentoContext.Provider>
    </MemoryRouter>
  );

  return { dispatch };
}

describe('Página de Tratamentos', () => {
  it('exibe o título da página', () => {
    renderizarTratamentos();

    expect(
      screen.getByRole('heading', {
        name: 'Nossos Tratamentos',
      })
    ).toBeInTheDocument();

    console.log('✅ Teste passou: título da página exibido corretamente!');
  });

  it('exibe os tratamentos cadastrados', () => {
    renderizarTratamentos();

    expect(screen.getByText('Limpeza de Pele')).toBeInTheDocument();
    expect(screen.getByText('Drenagem Linfática')).toBeInTheDocument();

    console.log('✅ Teste passou: tratamentos cadastrados exibidos corretamente!');
  });

  it('exibe a quantidade de tratamentos disponíveis', () => {
    renderizarTratamentos();

    expect(screen.getByText('2 tratamento(s)')).toBeInTheDocument();

    console.log('✅ Teste passou: quantidade de tratamentos exibida corretamente!');
  });
});
