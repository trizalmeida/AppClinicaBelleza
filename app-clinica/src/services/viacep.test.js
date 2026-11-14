import { afterEach, describe, expect, it, vi } from 'vitest';
import { consultarCep } from './viacep';

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe('consultarCep', () => {
  it('consulta a API e retorna os dados do endereço', async () => {
    const endereco = { cep: '01001-000', logradouro: 'Praça da Sé', bairro: 'Sé', localidade: 'São Paulo', uf: 'SP' };
    const fetchMock = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => endereco,
    });

    await expect(consultarCep('01001-000')).resolves.toEqual(endereco);
    expect(fetchMock).toHaveBeenCalledWith('https://viacep.com.br/ws/01001000/json/');
  });

  it('rejeita CEP com quantidade de números inválida', async () => {
    const fetchMock = vi.fn();
    vi.stubGlobal('fetch', fetchMock);
    await expect(consultarCep('123')).rejects.toThrow('Informe um CEP com 8 números.');
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it('informa quando o CEP não existe', async () => {
    vi.spyOn(globalThis, 'fetch').mockResolvedValue({ ok: true, json: async () => ({ erro: true }) });
    await expect(consultarCep('00000000')).rejects.toThrow('CEP não encontrado.');
  });

  it('trata falha de conexão', async () => {
    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('offline'));
    await expect(consultarCep('01001000')).rejects.toThrow('Não foi possível conectar ao ViaCEP.');
  });
});
