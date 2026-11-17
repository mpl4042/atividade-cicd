const fs = require('node:fs');
const path = require('node:path');

const raiz = path.resolve(__dirname, '..');
const destino = path.join(raiz, 'dist');

fs.rmSync(destino, { recursive: true, force: true });
fs.mkdirSync(destino, { recursive: true });

for (const arquivo of ['index.html']) {
  fs.copyFileSync(path.join(raiz, arquivo), path.join(destino, arquivo));
}

console.log('Build realizado com sucesso! Arquivos preparados na pasta dist/.');
