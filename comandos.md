# Comandos MongoDB - Loja Informática

Sequência completa de comandos executados no `mongosh`.

## Comandos administrativos

```js
show databases
```

```js
use loja_informatica
```

```js
db.createCollection("cliente")
```

```js
show collections
```

```js
db.cliente.find()
```

## Inserções

Inserir um documento simples:

```js
db.cliente.insertOne({"name": "maria"})
```

Inserir um documento com mais campos:

```js
db.cliente.insertOne({"name": "maria", "idade": 24})
```

Inserir um documento com array e objeto aninhado:

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

Inserir vários documentos de uma vez:

```js
db.cliente.insertMany([
  { "nome": "Brenno"},
  { "nome": "João"},
  { "nome": "MAria"},
  { "nome": "José"},
  { "nome": "Noé"}
])
```

## Buscas

Buscar pelo campo `nome`:

```js
db.cliente.find({"nome": "José"})
```

Buscar pelo identificador único (`_id`):

```js
db.cliente.find({_id: ObjectId('6a7bbab007ff2cf8649f68a9')})
```

> ⚠️ Substitua pelo `_id` real gerado na sua base ao testar.

## Atualizações

Corrigir um dado com erro de digitação:

```js
db.cliente.updateOne(
  {"nome": "MAria"},
  {$set: {"nome": "Maria"}}
)
```

Adicionar um novo campo a um documento já existente:

```js
db.cliente.updateOne(
  {"nome": "Maria"},
  {$set: {"endereco": {"logradouro": "sossego"}}}
)
```

## Conferência final

```js
db.cliente.find()
```
