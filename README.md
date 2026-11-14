# Clínica Belleza — Aplicação web em React

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

## Documentação do processo

O planejamento do Product Backlog, sprints, papéis, revisão e retrospectiva está em [`docs/SCRUM.md`](docs/SCRUM.md).
