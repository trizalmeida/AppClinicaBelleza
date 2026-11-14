export const initialState = {
  tratamentos: [],
  filtroCategoria: 'Todos',
  ordenacao: 'nome',
  loading: true,
  erro: null,
};

export function tratamentoReducer(state, action) {
  switch (action.type) {
    case 'LOAD_INITIAL':
      return { ...state, tratamentos: action.payload, loading: false, erro: null };

    case 'LOAD_ERROR':
      return { ...state, tratamentos: [], loading: false, erro: action.payload };

    case 'ADD':
      return { ...state, tratamentos: [action.payload, ...state.tratamentos] };

    case 'UPDATE':
      return {
        ...state,
        tratamentos: state.tratamentos.map((item) =>
          String(item.id) === String(action.payload.id)
            ? { ...item, ...action.payload }
            : item
        ),
      };

    case 'REMOVE':
      return {
        ...state,
        tratamentos: state.tratamentos.filter(
          (item) => String(item.id) !== String(action.payload)
        ),
      };

    case 'SET_FILTER':
      return { ...state, filtroCategoria: action.payload };

    case 'SET_SORT':
      return { ...state, ordenacao: action.payload };

    default:
      return state;
  }
}
