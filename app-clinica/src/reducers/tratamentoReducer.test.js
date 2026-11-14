import { describe, expect, it } from 'vitest';
import { initialState, tratamentoReducer } from './tratamentoReducer';

describe('tratamentoReducer', () => {
  it('carrega a lista inicial de tratamentos', () => {
    const tratamentos = [{ id: 1, nome: 'Limpeza de pele' }];
    const state = tratamentoReducer(initialState, { type: 'LOAD_INITIAL', payload: tratamentos });
    expect(state.tratamentos).toEqual(tratamentos);
    expect(state.loading).toBe(false);
    expect(state.erro).toBeNull();
  });

  it('adiciona um tratamento', () => {
    const state = { ...initialState, tratamentos: [{ id: 1, nome: 'Limpeza' }] };
    const novo = { id: 2, nome: 'Peeling' };
    const result = tratamentoReducer(state, { type: 'ADD', payload: novo });
    expect(result.tratamentos).toEqual([novo, state.tratamentos[0]]);
  });

  it('atualiza um tratamento pelo id', () => {
    const state = { ...initialState, tratamentos: [{ id: 1, nome: 'Limpeza' }] };
    const result = tratamentoReducer(state, { type: 'UPDATE', payload: { id: 1, nome: 'Limpeza facial' } });
    expect(result.tratamentos[0].nome).toBe('Limpeza facial');
  });

  it('remove um tratamento pelo id', () => {
    const state = { ...initialState, tratamentos: [{ id: 1 }, { id: 2 }] };
    const result = tratamentoReducer(state, { type: 'REMOVE', payload: 1 });
    expect(result.tratamentos).toEqual([{ id: 2 }]);
  });

  it('atualiza filtro e ordenação', () => {
    const filtered = tratamentoReducer(initialState, { type: 'SET_FILTER', payload: 'Facial' });
    const sorted = tratamentoReducer(filtered, { type: 'SET_SORT', payload: 'preco' });
    expect(sorted.filtroCategoria).toBe('Facial');
    expect(sorted.ordenacao).toBe('preco');
  });
});
