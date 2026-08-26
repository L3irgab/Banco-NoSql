# Atividade MongoDB - Loja Informática

Atividade prática de MongoDB feita no mongosh, com criação de banco, collection e alguns comandos de insert, find e update.

## Pré-requisitos

- MongoDB instalado
- mongosh (shell do mongo)

## Comandos usados

Exibir os bancos de dados existentes:

```
show databases
```

Criar/usar o banco de dados:

```
use loja_informatica
```

Criar a collection cliente:

```
db.createCollection("cliente")
```

Ver as collections do banco:

```
show collections
```

Ver os documentos da collection:

```
db.cliente.find()
```

Inserir um cliente:

```
db.cliente.insertOne({"name": "maria"})
```

Inserir com mais campos:

```
db.cliente.insertOne({"name": "maria", "idade": 24})
```

Inserir com endereço e pets:

```
db.cliente.insertOne({
  "nome": "jefté",
  "idade": 35,
  "pets": ["dora", "sabrina"],
  "endereco": {
    "logradouro": "Sossego"
  }
})
```

Inserir vários de uma vez:

```
db.cliente.insertMany([
  { "nome": "Brenno"},
  { "nome": "João"},
  { "nome": "MAria"},
  { "nome": "José"},
  { "nome": "Noé"}
])
```

Buscar pelo nome:

```
db.cliente.find({"nome": "José"})
```

Buscar pelo id:

```
db.cliente.find({_id: ObjectId('6a7bbab007ff2cf8649f68a9')})
```

(o id muda dependendo do que foi gerado na sua base)

Corrigir o nome que tinha ficado errado (MAria -> Maria):

```
db.cliente.updateOne({"nome": "MAria"}, {$set: {"nome": "Maria"}})
```

Adicionar endereço na Maria:

```
db.cliente.updateOne({"nome": "Maria"}, {$set: {"endereco": {"logradouro": "sossego"}}})
```

## Arquivos do repositório

- README.md - este arquivo
- comandos.md - os mesmos comandos, só que separados
