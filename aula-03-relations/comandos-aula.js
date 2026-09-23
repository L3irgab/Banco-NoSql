// ==========================================================
// Aula 3 - Relations | Comandos exatamente como vistos em aula
// Colar linha a linha no mongosh.
// Obs: os ObjectIds abaixo são os que foram gerados na aula.
// Na sua base eles serão diferentes: copie o _id gerado pelo
// insert e substitua. (Os scripts em /scripts já fazem isso sozinhos.)
// ==========================================================

use aula3_relations

// ---------------- 1:1 (um para um) ----------------

// Embarcado
db.patients.insertOne({name: "Jefté", age: 35, diseaseSummary: {diseases: ["cold", "broken leg"]}})

// Por referência
db.persons.insertOne({name: "Jefté", age: 35, salary: 3000})
db.cars.insertOne({model: "BMW", price: 40000, owner: ObjectId('6aa9e2cee9c288ce1241317e')})

// ---------------- 1:N (um para muitos) ----------------

// Embarcado
db.questionThreads.insertOne({creator: "Jefté", question: "How does that work?", answers: [{text: "Like that."}, {text: "Thanks!"}]})

// Referência
db.cities.insertOne({name: "New York City", coordinates: {lat: 21, lng: 55}})
db.citizens.insertMany([{name: "Jefté Goes", cityId: ObjectId("5b98d6b44d01c52e1637a99f")}, {name: "Brenno Salvador", cityId: ObjectId("5b98d6b44d01c52e1637a99f")}])

// ---------------- N:M (muitos para muitos) ----------------

// Embarcado
db.customers.insertOne({name: "Jefté", age: 35})
db.customers.updateOne({}, {$set: {orders: [{title: "A Book", price: 12.99, quantity: 2}]}})

// Referência
db.authors.insertMany([{name: "Jorge Amado", age: 78, address: {street: "Bahia"}}, {name: "Graciliano Ramos", age: 55, address: {street: "Rio de Janeiro"}}])
// (o updateOne abaixo precisa de pelo menos um livro na coleção)
db.books.insertOne({title: "Livro de Exemplo"})
db.books.updateOne({},{$set: {authors: [ObjectId("5b98d9e44d01c52e1637a9a6"), ObjectId("5b98d9e44d01c52e1637a9a7")]}})
