# App de Tarefas

Esse projeto foi desenvolvido em React Native com Expo como parte da atividade de refatoração do app de tarefas.

A proposta era melhorar o aplicativo já existente, organizando melhor o código e usando componentes nativos do React Native.

## O que foi feito

No projeto, foram feitas as seguintes melhorias:

- troca da lista com `ScrollView` e `map()` por `FlatList`
- criação do componente `TaskItem` para representar cada tarefa
- criação do componente `TaskList` para renderizar a lista completa
- adição de imagem no cabeçalho do app
- adição de um texto mostrando a quantidade total de tarefas
- melhoria no `TextInput`, com limite de caracteres e melhor estilo
- uso de botão nativo com `Button` para excluir todas as tarefas
- ajustes no layout com `View`, `StyleSheet` e Flexbox

## Estrutura principal

- `App.tsx`
- `src/components/TaskItem.tsx`
- `src/components/TaskList.tsx`
- `src/utils/handle-api.ts`
- `assets/`

## Requisitos

Antes de rodar o projeto, é preciso ter instalado na máquina:

- Node.js
- NPM
- Expo

Também é recomendado usar uma IDE de sua preferência, como VS Code.

## Como executar

Primeiro, instale as dependências:

```bash
npm install
```

Depois, inicie o projeto com:

```bash
npx expo start
```

Após isso, é possível abrir no emulador ou no celular com o Expo Go.

## Funcionalidades

- adicionar tarefa
- editar tarefa
- excluir tarefa individualmente
- excluir todas as tarefas
- visualizar o total de tarefas

