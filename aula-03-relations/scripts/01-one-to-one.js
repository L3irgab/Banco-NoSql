// ==========================================================
// Aula 3 - Relations | 1:1 (Um para Um)
// Executar: mongosh aula-03-relations/scripts/01-one-to-one.js
// ==========================================================

db = db.getSiblingDB("aula3_relations");

// ----------------------------------------------------------
// Exemplo #1 - Paciente <-> Doença (EMBARCADO)
// O resumo de doenças pertence só ao paciente e é lido junto
// com ele, então fica dentro do próprio documento.
// ----------------------------------------------------------
db.patients.drop();

db.patients.insertOne({
  name: "Jefté",
  age: 35,
  diseaseSummary: {
    diseases: ["cold", "broken leg"]
  }
});

// Uma única consulta traz o paciente e as doenças
printjson(db.patients.findOne({ name: "Jefté" }));

// Projeção: só as doenças, sem o _id
printjson(db.patients.findOne({ name: "Jefté" }, { _id: 0, "diseaseSummary.diseases": 1 }));

// ----------------------------------------------------------
// Exemplo #2 - Pessoa <-> Carro (REFERÊNCIA)
// Pessoa e carro têm vida independente: o carro guarda o
// ObjectId do dono (campo "owner").
// ----------------------------------------------------------
db.persons.drop();
db.cars.drop();

const person = db.persons.insertOne({ name: "Jefté", age: 35, salary: 3000 });

// Em aula usamos o id fixo: owner: ObjectId('6aa9e2cee9c288ce1241317e')
// Aqui pegamos o id gerado agora, para o script funcionar em qualquer base.
db.cars.insertOne({
  model: "BMW",
  price: 40000,
  owner: person.insertedId
});

// Juntando as duas coleções com $lookup
printjson(
  db.cars.aggregate([
    { $lookup: { from: "persons", localField: "owner", foreignField: "_id", as: "ownerData" } },
    { $unwind: "$ownerData" },
    { $project: { _id: 0, model: 1, price: 1, "ownerData.name": 1, "ownerData.age": 1 } }
  ]).toArray()
);
