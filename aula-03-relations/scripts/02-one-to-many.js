// ==========================================================
// Aula 3 - Relations | 1:N (Um para Muitos)
// Executar: mongosh aula-03-relations/scripts/02-one-to-many.js
// ==========================================================

db = db.getSiblingDB("aula3_relations");

// ----------------------------------------------------------
// Exemplo #3 - Tópico <-> Respostas (EMBARCADO)
// As respostas só existem dentro do tópico e são sempre
// exibidas junto com a pergunta.
// ----------------------------------------------------------
db.questionThreads.drop();

db.questionThreads.insertOne({
  creator: "Jefté",
  question: "How does that work?",
  answers: [
    { text: "Like that." },
    { text: "Thanks!" }
  ]
});

printjson(db.questionThreads.findOne({ creator: "Jefté" }));

// Adicionando mais uma resposta ao array
db.questionThreads.updateOne(
  { creator: "Jefté" },
  { $push: { answers: { text: "Great explanation!" } } }
);

// ----------------------------------------------------------
// Exemplo #4 - Cidade <-> Cidadãos (REFERÊNCIA)
// Uma cidade pode ter milhões de cidadãos. Embarcar todos
// estouraria o limite de 16MB por documento, então cada
// cidadão guarda o "cityId".
// ----------------------------------------------------------
db.cities.drop();
db.citizens.drop();

const city = db.cities.insertOne({
  name: "New York City",
  coordinates: { lat: 21, lng: 55 }
});

// Em aula usamos o id fixo: cityId: ObjectId("5b98d6b44d01c52e1637a99f")
db.citizens.insertMany([
  { name: "Jefté Goes", cityId: city.insertedId },
  { name: "Brenno Salvador", cityId: city.insertedId }
]);

// Todos os cidadãos de uma cidade
printjson(db.citizens.find({ cityId: city.insertedId }, { _id: 0, name: 1 }).toArray());

// Cidade com a lista de cidadãos via $lookup
printjson(
  db.cities.aggregate([
    { $lookup: { from: "citizens", localField: "_id", foreignField: "cityId", as: "citizens" } },
    { $project: { _id: 0, name: 1, "citizens.name": 1 } }
  ]).toArray()
);
