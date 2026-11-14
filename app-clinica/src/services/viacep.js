export async function consultarCep(cepInformado) {
  const cep = String(cepInformado).replace(/\D/g, '');

  if (cep.length !== 8) {
    throw new Error('Informe um CEP com 8 números.');
  }

  let resposta;
  try {
    resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  } catch {
    throw new Error('Não foi possível conectar ao ViaCEP. Verifique sua internet.');
  }

  if (!resposta.ok) {
    throw new Error('Não foi possível consultar o CEP agora. Tente novamente.');
  }

  const dados = await resposta.json();
  if (dados.erro) {
    throw new Error('CEP não encontrado. Confira o número informado.');
  }

  return dados;
}
