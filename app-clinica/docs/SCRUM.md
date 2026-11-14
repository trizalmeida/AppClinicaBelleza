# Organização do projeto com Scrum — Clínica Belleza

## 1. Visão do produto

Desenvolver uma aplicação web e mobile para a Clínica Belleza, permitindo que os usuários conheçam a clínica, consultem os tratamentos disponíveis, visualizem detalhes dos procedimentos, realizem o cadastro, a edição e a remoção de tratamentos e enviem mensagens pelo formulário de contato.

## 2. Papéis do Scrum

| Papel | Responsabilidade | Responsável |
|---|---|---|
| Product Owner | Organizar e priorizar as funcionalidades do projeto. | Beatriz Silva |
| Scrum Master | Acompanhar o desenvolvimento, organizar as atividades e identificar dificuldades. | Beatriz Silva |
| Developers | Desenvolver a aplicação, implementar funcionalidades, realizar testes e preparar a documentação. | Beatriz Silva |


## 3. Product Backlog

| ID | História de usuário | Prioridade |
|---|---|---|
| PB01 | Como usuário, quero conhecer a clínica na página Home para entender os serviços oferecidos. | Alta |
| PB02 | Como usuário, quero navegar entre as páginas para encontrar as informações disponíveis no site. | Alta |
| PB03 | Como usuário, quero consultar a lista e os detalhes dos tratamentos disponíveis. | Alta |
| PB04 | Como usuário, quero cadastrar tratamentos para manter o catálogo atualizado. | Alta |
| PB05 | Como usuário, quero editar tratamentos existentes para atualizar suas informações. | Alta |
| PB06 | Como usuário, quero remover tratamentos para manter o catálogo organizado. | Média |
| PB07 | Como usuário, quero filtrar e ordenar os tratamentos para localizar as opções desejadas. | Média |
| PB08 | Como usuário, quero enviar uma mensagem pelo formulário de contato para me comunicar com a clínica. | Alta |
| PB09 | Como usuário, quero utilizar o sistema em diferentes dispositivos, como celular e computador. | Alta |
| PB10 | Como desenvolvedor, quero documentar o projeto e realizar testes para facilitar sua compreensão e manutenção. | Média |
| PB11 | Como usuário, quero informar meu CEP no formulário de contato para facilitar o preenchimento do endereço por meio de uma consulta à API ViaCEP. | Média |


## 4. Planejamento de Sprint

### Sprint 1 — Estrutura e funcionalidades principais

- **Objetivo:** desenvolver a estrutura inicial da aplicação e disponibilizar as principais páginas.
- **Escopo:** PB01, PB02, PB03 e PB08.
- **Entregas:** criação das páginas Home, Sobre, Tratamentos, Detalhes do Tratamento e Contato, configuração da navegação e implementação do formulário de contato.
- **Início:** 27/09/2026.
- **Término:** 07/11/2026.

### Sprint 2 — Gerenciamento de tratamentos e melhorias

- **Objetivo:** implementar as funcionalidades de gerenciamento e realizar os ajustes finais da aplicação.
- **Escopo:** PB04, PB05, PB06, PB07, PB09, PB10 e PB11.
- **Entregas:** cadastro, edição e remoção de tratamentos, filtros, ordenação, persistência local dos dados, melhorias de responsividade, integração com a API ViaCEP, documentação e testes automatizados.
- **Início:** 08/11/2026.
- **Término:** 14/11/2026.

## 5. Daily Scrum

Registros dos acompanhamentos realizados durante o desenvolvimento do projeto:

| Data | O que foi concluído? | O que será feito a seguir? | Impedimentos |
|---|---|---|---|
| 04/10/2026 | Desenvolvimento da estrutura principal da aplicação Clínica Belleza, com criação das páginas Home, Sobre e Contato. | Implementar e aprimorar a navegação entre as páginas. | Nenhum impedimento registrado. |
| 07/10/2026 | Implementação da navegação com React Router, incluindo as páginas de Tratamentos, Detalhes do Tratamento e página 404. | Desenvolver as funcionalidades de gerenciamento dos tratamentos. | Necessidade de ajustar a organização das rotas. |
| 17/10/2026 | Implementação do catálogo de tratamentos, com filtros por categoria, ordenação e visualização dos detalhes. | Implementar e revisar as operações de cadastro, edição e remoção. | Ajustes na organização e no gerenciamento dos dados. |
| 10/11/2026 | Implementação das operações de cadastro, edição e remoção de tratamentos, além da persistência dos dados utilizando localStorage. | Revisar o funcionamento dos formulários e aprimorar a interface. | Necessidade de corrigir comportamentos e padronizar elementos visuais. |
| 13/11/2026 | Revisão visual dos botões, padronização de tamanhos e ajustes na interface. Também foi revisada a estratégia de carregamento dos dados JSON, mantendo a importação direta para evitar problemas no ambiente Programiz. | Organizar a documentação e finalizar os testes automatizados. | Limitações do ambiente Programiz para executar ferramentas que dependem de Node.js e npm. |
| 13/11/2026 | Reescrita e organização do README, preparação da documentação Scrum e organização dos testes com Vitest e React Testing Library. | Executar os testes e realizar os ajustes finais. | Necessidade de utilizar um ambiente compatível com Node.js e npm. |
| 14/11/2026 | Execução dos testes automatizados, com resultado positivo, e finalização dos ajustes da documentação. | Revisar a entrega final do projeto. | Nenhum impedimento registrado. |

## 6. Sprint Review

- **Data do registro:** 10/11/2026.
- **Incremento desenvolvido:** aplicação Clínica Belleza com navegação entre páginas, catálogo de tratamentos, filtros, ordenação, visualização de detalhes, cadastro, edição e remoção de tratamentos. Também foram implementados formulários com validação, persistência local dos dados, integração com a API ViaCEP e ajustes na interface.
- **Feedback:** durante o desenvolvimento, foram identificadas oportunidades de melhoria na padronização visual dos botões, organização da documentação e preparação dos testes automatizados.
- **Melhorias realizadas:** ajustes visuais, atualização do README, organização da documentação Scrum e execução dos testes automatizados.

## 7. Sprint Retrospective

- **Data do registro:** 13/11/2026.

**O que funcionou bem:** A organização dos componentes e das páginas facilitou o desenvolvimento da aplicação. A utilização do React Router permitiu estruturar a navegação, enquanto o Context API, o reducer e o localStorage auxiliaram no gerenciamento e na persistência dos tratamentos. Também foi possível aprimorar a interface por meio de revisões sucessivas.

**O que poderia melhorar:** A execução dos testes automatizados poderia ter sido iniciada anteriormente. A documentação e o planejamento das atividades também poderiam ter sido organizados desde o início.

**Ação para trabalhos futuros:** Organizar melhor as etapas do desenvolvimento, iniciar os testes com antecedência e realizar verificações frequentes da aplicação em diferentes tamanhos de tela.

## 8. Definition of Done (conclusão das atividades)

- Funcionalidade implementada e integrada ao projeto.
- Interface revisada em computadores e dispositivos móveis.
- Formulários e funcionalidades revisados.
- Testes relacionados executados.
- Documentação atualizada.
- Aplicação revisada para a entrega final.
