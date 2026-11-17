const test = require('node:test');
const assert = require('node:assert/strict');
const { somar, mensagemDeBoasVindas } = require('../src/app');

test('Deve somar dois números corretamente', () => {
  assert.equal(somar(2, 3), 5);
});

test('Deve gerar uma mensagem de boas-vindas', () => {
  assert.equal(
    mensagemDeBoasVindas('Ana'),
    'Olá, Ana! Bem-vindo(a) ao projeto CI/CD.'
  );
});
