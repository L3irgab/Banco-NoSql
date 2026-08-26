// ==========================================================
// Projeto: Loja Informática - Prática MongoDB
// Descrição: Comandos executados em sequência no mongosh
// ==========================================================

// 1. Exibir os bancos de dados existentes
show databases

// 2. Criar (ou acessar) o banco de dados loja_informatica
use loja_informatica

// 3. Criar a collection "cliente"
db.createCollection("cliente")

// 4. Listar todas as collections do banco
show collections

// 5. Mostrar todos os documentos da collection "cliente"
db.cliente.find()

// 6. Inserir um documento simples
db.cliente.insertOne({"name": "maria"})

// 7. Inserir um documento com mais campos
db.cliente.insertOne({"name": "maria", "idade": 24})

// 8. Inserir um documento com array e objeto aninhado
db.cliente.insertOne({
  "nome": "jefté",
  "idade": 35,
  "pets": ["dora", "sabrina"],
  "endereco": {
    "logradouro": "Sossego"
  }
})

// 9. Inserir vários documentos de uma vez
db.cliente.insertMany([
  { "nome": "Brenno"},
  { "nome": "João"},
  { "nome": "MAria"},
  { "nome": "José"},
  { "nome": "Noé"}
])

// 10. Buscar um documento pelo campo "nome"
db.cliente.find({"nome": "José"})

// 11. Buscar um documento pelo identificador único (_id)
// Obs: substitua pelo _id real gerado na sua base
db.cliente.find({_id: ObjectId('6a7bbab007ff2cf8649f68a9')})

// 12. Corrigir um dado com erro de digitação
db.cliente.updateOne(
  {"nome": "MAria"},
  {$set: {"nome": "Maria"}}
)

// 13. Adicionar um novo campo a um documento já existente
db.cliente.updateOne(
  {"nome": "Maria"},
  {$set: {"endereco": {"logradouro": "sossego"}}}
)

// 14. Conferir o resultado final
db.cliente.find()
