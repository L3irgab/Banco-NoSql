# Loja Informática - Prática MongoDB

Projeto prático de introdução ao **MongoDB**, com foco em operações básicas de banco de dados NoSQL: criação de banco, criação de coleção, inserção de documentos (simples e múltiplos), busca por campo, busca por `_id` e atualização de documentos.

## 📋 Sobre o projeto

O objetivo desta atividade foi simular o cadastro de clientes de uma loja de informática (`loja_informatica`), utilizando o `mongosh` (shell do MongoDB) para executar os comandos diretamente.

## 🛠️ Pré-requisitos

- [MongoDB Community Server](https://www.mongodb.com/try/download/community) instalado
- `mongosh` (MongoDB Shell) instalado e configurado no PATH
- (Opcional) [MongoDB Compass](https://www.mongodb.com/try/download/compass) para visualização gráfica

## ▶️ Como executar

1. Inicie o serviço do MongoDB na sua máquina.
2. Abra o terminal e digite `mongosh` para entrar no shell.
3. Execute os comandos na ordem apresentada abaixo (ou rode o arquivo `comandos.js` completo — veja a seção [Executando o script](#-executando-o-script-completo)).

## 🧭 Passo a passo dos comandos

### 1. Exibir os bancos de dados existentes

```js
show databases
```

### 2. Criar (ou acessar) o banco de dados `loja_informatica`

```js
use loja_informatica
```

> No MongoDB, o banco só é efetivamente criado quando o primeiro dado é gravado nele.

### 3. Criar a collection `cliente`

```js
db.createCollection("cliente")
```

### 4. Listar todas as collections do banco

```js
show collections
```

### 5. Mostrar todos os documentos da collection `cliente`

```js
db.cliente.find()
```

### 6. Inserir um documento simples

```js
db.cliente.insertOne({"name": "maria"})
```

### 7. Inserir um documento com mais campos

```js
db.cliente.insertOne({"name": "maria", "idade": 24})
```

### 8. Inserir um documento com array e objeto aninhado

```js
db.cliente.insertOne({
  "nome": "jefté",
  "idade": 35,
  "pets": ["dora", "sabrina"],
  "endereco": {
    "logradouro": "Sossego"
  }
})
```

### 9. Inserir vários documentos de uma vez (`insertMany`)

```js
db.cliente.insertMany([
  { "nome": "Brenno"},
  { "nome": "João"},
  { "nome": "MAria"},
  { "nome": "José"},
  { "nome": "Noé"}
])
```

### 10. Buscar um documento pelo campo `nome`

```js
db.cliente.find({"nome": "José"})
```

### 11. Buscar um documento pelo identificador único (`_id`)

```js
db.cliente.find({_id: ObjectId('6a7bbab007ff2cf8649f68a9')})
```

> ⚠️ O valor do `ObjectId` é único para cada documento inserido. Substitua pelo `_id` real gerado na sua base ao testar.

### 12. Corrigir um dado com erro de digitação (`updateOne`)

```js
db.cliente.updateOne(
  {"nome": "MAria"},
  {$set: {"nome": "Maria"}}
)
```

### 13. Adicionar um novo campo a um documento já existente

```js
db.cliente.updateOne(
  {"nome": "Maria"},
  {$set: {"endereco": {"logradouro": "sossego"}}}
)
```

## 📂 Estrutura do repositório

```
mongodb-loja-informatica/
├── README.md         # Este arquivo, com o passo a passo completo
├── comandos.js        # Todos os comandos em sequência, prontos para executar
└── .gitignore
```

## 🚀 Executando o script completo

Se preferir rodar tudo de uma vez, use o arquivo `comandos.js`:

```bash
mongosh comandos.js
```

## 🧠 Conceitos praticados

- Comandos administrativos do shell (`show databases`, `use`, `show collections`)
- Criação de collection (`createCollection`)
- Inserção de documentos (`insertOne`, `insertMany`)
- Consulta de documentos (`find`, busca por campo e por `_id`)
- Atualização de documentos (`updateOne`, operador `$set`)
- Documentos com estruturas aninhadas (arrays e objetos dentro de um documento)

## ✍️ Autor

Atividade prática desenvolvida como parte do estudo de bancos de dados NoSQL com MongoDB.
