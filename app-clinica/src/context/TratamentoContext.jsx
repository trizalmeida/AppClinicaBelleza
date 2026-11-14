import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
} from 'react';

import {
  initialState,
  tratamentoReducer,
} from '../reducers/tratamentoReducer';

import tratamentosJson from '../data/tratamentos.json';

export const TratamentoContext = createContext(null);

const STORAGE_KEY = 'tratamentos_belleza_v3';

function tratamentoValido(item) {
  return Boolean(
    item &&
    (typeof item.id === 'string' || typeof item.id === 'number') &&
    typeof item.nome === 'string' && item.nome.trim() &&
    typeof item.descricao === 'string' && item.descricao.trim() &&
    Number.isFinite(Number(item.preco)) && Number(item.preco) > 0 &&
    Number.isFinite(Number(item.duracao)) && Number(item.duracao) > 0 &&
    typeof item.categoria === 'string' && item.categoria.trim() &&
    typeof item.imagem === 'string' && item.imagem.trim()
  );
}

function normalizarLista(lista) {
  if (!Array.isArray(lista) || !lista.every(tratamentoValido)) {
    throw new Error(
      'A lista de tratamentos precisa ser um array com todos os campos obrigatórios preenchidos.'
    );
  }

  const ids = lista.map((item) => String(item.id));

  if (new Set(ids).size !== ids.length) {
    throw new Error(
      'Existem IDs duplicados no tratamentos.json. Cada tratamento precisa ter um ID único.'
    );
  }

  return lista.map((item) => ({
    ...item,
    id: String(item.id),
    preco: Number(item.preco),
    duracao: Number(item.duracao),
  }));
}

export function TratamentoProvider({ children }) {
  const [state, dispatch] = useReducer(
    tratamentoReducer,
    initialState
  );

  useEffect(() => {
    try {
      let listaInicial = normalizarLista(tratamentosJson);

      try {
        const salvo = window.localStorage.getItem(STORAGE_KEY);

        if (salvo) {
          listaInicial = normalizarLista(JSON.parse(salvo));
        }
      } catch (storageError) {
        console.warn(
          'Cache local inválido; usando os dados do tratamentos.json:',
          storageError
        );
      }

      dispatch({
        type: 'LOAD_INITIAL',
        payload: listaInicial,
      });

    } catch (error) {
      console.error('Erro ao carregar tratamentos.json:', error);

      dispatch({
        type: 'LOAD_ERROR',
        payload: error.message,
      });
    }
  }, []);

  useEffect(() => {
    if (!state.loading && !state.erro) {
      try {
        window.localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(state.tratamentos)
        );
      } catch (error) {
        console.warn(
          'Não foi possível salvar os tratamentos no navegador:',
          error
        );
      }
    }
  }, [state.tratamentos, state.loading, state.erro]);

  const adicionarTratamento = (novo) => {
    dispatch({
      type: 'ADD',
      payload: {
        ...novo,
        id: String(novo.id ?? Date.now()),
      },
    });
  };

  const atualizarTratamento = (tratamentoAtualizado) => {
    dispatch({
      type: 'UPDATE',
      payload: {
        ...tratamentoAtualizado,
        id: String(tratamentoAtualizado.id),
        preco: Number(tratamentoAtualizado.preco),
        duracao: Number(tratamentoAtualizado.duracao),
      },
    });
  };

  const removerTratamento = (id) => {
    dispatch({
      type: 'REMOVE',
      payload: id,
    });
  };

  return (
    <TratamentoContext.Provider
      value={{
        state,
        dispatch,
        tratamentos: state.tratamentos,
        loading: state.loading,
        erro: state.erro,
        adicionarTratamento,
        atualizarTratamento,
        removerTratamento,
      }}
    >
      {children}
    </TratamentoContext.Provider>
  );
}

// hook de acesso ao context
export function useTratamentos() {
  const context = useContext(TratamentoContext);

  if (!context) {
    throw new Error(
      'useTratamentos deve ser usado dentro de um TratamentoProvider'
    );
  }

  return context;
}
