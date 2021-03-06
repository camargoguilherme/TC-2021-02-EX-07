// Este codigo faz a leitura de dados para apps coletadas do Google Play

const fs = require("fs");
const csvparse = require("csv-parse/lib/sync");

// Le cada linha do arquivo csv como um objeto e armazena no array 'app'
let apps = csvparse(fs.readFileSync("./gplaydata.csv", "utf-8"), {
  columns: true,
  delimiter: ",",
  skip_empty_lines: true,
});
// converte alguns atributos que sao inicialmente lidos com strings
apps = apps.map((elem) => {
  elem.score = parseFloat(elem.score);
  elem.installs = parseInt(elem.installs);
  elem.androidVersion = parseFloat(elem.androidVersion);
  return elem;
});

console.log("Total de objetos deste array:", apps.length);
console.log("A estrutura do 1.o objeto:");
console.log(apps[0]);

// EXERCICIO 1: use reduce() para calcular o numero total de installs para todas as apps.
function calculateTotalInstallations(acc, app) {
  acc += app.installs;
  return acc;
}

const totalInstallations = apps.reduce(calculateTotalInstallations, 0);
console.log("totalInstallations", totalInstallations);
console.log("===============================================================");

// EXERCICIO 2: use filter() para selecionar somente apps com score maior que quatro (> 4)
function filterAppWithScoreGreaterThanFor(app) {
  return app.score > 4.0;
}

const appsWithScoreGreaterThanFor = apps.filter(
  filterAppWithScoreGreaterThanFor
);
console.log("appsWithScoreGreaterThanFor", appsWithScoreGreaterThanFor);
console.log("===============================================================");

// EXERCICIO 3: use map() para mudar o atributo appname para lowerCase
function changeAppnameToLowerCase(app) {
  app.appname = app.appname.toLocaleLowerCase();
  return app;
}

const appsWithAppnameLowerCase = apps.map(changeAppnameToLowerCase);
console.log("appsWithAppnameLowerCase", appsWithAppnameLowerCase);
console.log("===============================================================");
