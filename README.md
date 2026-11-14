# Clínica Belleza — aplicação web em React

Aplicação de uma clínica estética desenvolvida com React 18 e React Router 7. O projeto apresenta informações institucionais, catálogo de tratamentos, detalhes por procedimento, formulário de contato e gerenciamento local do catálogo.

## Funcionalidades

- Navegação entre Home, Tratamentos, Sobre e Contato, com página 404.
- Listagem de tratamentos com filtro por categoria e ordenação por nome, preço ou duração.
- Visualização de detalhes de um tratamento.
- Cadastro, edição e remoção de tratamentos.
- Validação dos campos dos formulários.
- Persistência das alterações do catálogo no `localStorage` do navegador.
- Layout responsivo e menu de navegação adaptado para telas menores.

## Tecnologias

- React 18
- React Router DOM 7
- React Icons
- CSS responsivo
- Vitest e React Testing Library para testes automatizados

## Requisitos

- Node.js 18 ou superior (recomendado)
- npm

## Instalação e execução

```bash
npm install
npm run dev
```

Abra no navegador o endereço local exibido pelo Vite.

## Testes

Executar todos os testes uma vez:

```bash
npm test
```

Executar em modo de observação durante o desenvolvimento:

```bash
npm run test:watch
```

Gerar a versão de produção:

```bash
npm run build
```

## Dados e persistência

Os dados iniciais estão em `src/data/tratamentos.json` e são importados pelo `TratamentoContext`. Essa estratégia evita depender de uma URL pública de arquivos estáticos no ambiente Programiz/Sandpack utilizado durante o desenvolvimento.

Após a carga inicial, alterações realizadas na interface são salvas no `localStorage`, usando a chave `tratamentos_belleza_v3`. Para limpar os dados de teste e retornar à lista original, remova essa chave no armazenamento local do navegador.

O arquivo `public/tratamentos.json` é uma cópia de referência. A fonte importada pelo código é `src/data/tratamentos.json`; mantenha as duas cópias sincronizadas se editar os dados manualmente.

## Contato e limitações atuais

O formulário de contato realiza uma simulação de envio no front-end. Ele não envia mensagens para um servidor nem armazena contatos em banco de dados.

O catálogo utiliza um arquivo JSON local e persistência no navegador. Isso **não representa integração com uma API pública**. Se a rubrica exigir consumo de API externa, será necessário selecionar e integrar um serviço compatível com os requisitos da disciplina.

## Documentação do processo

O planejamento do Product Backlog, sprints, papéis, revisão e retrospectiva está em [`docs/SCRUM.md`](docs/SCRUM.md). Campos de nomes, datas e resultados das cerimônias devem ser preenchidos com informações reais do grupo/aluno.
