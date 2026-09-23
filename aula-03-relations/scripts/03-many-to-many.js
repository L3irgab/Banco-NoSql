// ==========================================================
// Aula 3 - Relations | N:M (Muitos para Muitos)
// Executar: mongosh aula-03-relations/scripts/03-many-to-many.js
// ==========================================================

db = db.getSiblingDB("aula3_relations");

// ----------------------------------------------------------
// Exemplo #5 - Clientes <-> Produtos (EMBARCADO)
// O pedido é um "retrato" do momento da compra: título e preço
// ficam congelados dentro do cliente, mesmo que o produto mude.
// ----------------------------------------------------------
db.customers.drop();

const customer = db.customers.insertOne({ name: "Jefté", age: 35 });

// Em aula: db.customers.updateOne({}, {...}) -> atualiza o primeiro documento.
// Aqui filtramos pelo _id para garantir que é o cliente certo.
db.customers.updateOne(
  { _id: customer.insertedId },
  { $set: { orders: [{ title: "A Book", price: 12.99, quantity: 2 }] } }
);

printjson(db.customers.findOne({ _id: customer.insertedId }));

// ----------------------------------------------------------
// Exemplo #6 - Livros <-> Autores (ARRAY DE REFERÊNCIAS)
// Um livro tem vários autores e um autor escreve vários livros.
// O livro guarda um array com os ObjectIds dos autores.
// ----------------------------------------------------------
db.authors.drop();
db.books.drop();

const authors = db.authors.insertMany([
  { name: "Jorge Amado", age: 78, address: { street: "Bahia" } },
  { name: "Graciliano Ramos", age: 55, address: { street: "Rio de Janeiro" } }
]);

const book = db.books.insertOne({ title: "Livro de Exemplo" });

// Em aula usamos os ids fixos:
// authors: [ObjectId("5b98d9e44d01c52e1637a9a6"), ObjectId("5b98d9e44d01c52e1637a9a7")]
db.books.updateOne(
  { _id: book.insertedId },
  { $set: { authors: Object.values(authors.insertedIds) } }
);

// Livro com os dados completos dos autores via $lookup
printjson(
  db.books.aggregate([
    { $lookup: { from: "authors", localField: "authors", foreignField: "_id", as: "authorsData" } },
    { $project: { _id: 0, title: 1, "authorsData.name": 1, "authorsData.age": 1 } }
  ]).toArray()
);
