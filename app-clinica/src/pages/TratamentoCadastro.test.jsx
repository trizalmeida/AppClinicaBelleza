import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { TratamentoContext } from '../context/TratamentoContext';
import Tratamentos from './Tratamentos';

describe('Cadastro de tratamento', () => {
  it('permite preencher e cadastrar um novo tratamento', () => {
    const dispatch = vi.fn();

    render(
      <MemoryRouter>
        <TratamentoContext.Provider
          value={{
            state: {
              tratamentos: [],
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

    fireEvent.change(
      screen.getByLabelText('Nome do tratamento'),
      {
        target: { value: 'Botox Facial' },
      }
    );

    fireEvent.change(
      screen.getByLabelText('Descrição'),
      {
        target: { value: 'Procedimento estético facial.' },
      }
    );

    fireEvent.change(
      screen.getByLabelText('Preço (R$)'),
      {
        target: { value: '350' },
      }
    );

    fireEvent.change(
      screen.getByLabelText('Duração (minutos)'),
      {
        target: { value: '60' },
      }
    );

    fireEvent.change(
      screen.getByLabelText('URL da imagem'),
      {
        target: { value: 'https://exemplo.com/imagem.jpg' },
      }
    );

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Adicionar tratamento',
      })
    );

    expect(dispatch).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'ADD',
        payload: expect.objectContaining({
          nome: 'Botox Facial',
          descricao: 'Procedimento estético facial.',
          preco: 350,
          duracao: 60,
          categoria: 'Facial',
          imagem: 'https://exemplo.com/imagem.jpg',
        }),
      })
    );
  });

  it('não cadastra um tratamento com campos obrigatórios vazios', () => {
    const dispatch = vi.fn();

    render(
      <MemoryRouter>
        <TratamentoContext.Provider
          value={{
            state: {
              tratamentos: [],
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

    fireEvent.click(
      screen.getByRole('button', {
        name: 'Adicionar tratamento',
      })
    );

    expect(screen.getByText('O nome é obrigatório.')).toBeInTheDocument();
    expect(screen.getByText('A descrição é obrigatória.')).toBeInTheDocument();
    expect(dispatch).not.toHaveBeenCalled();
  });
});
