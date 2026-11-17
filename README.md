# Atividade prática: Pipelines de CI/CD com GitHub Actions

Projeto didático simples para demonstrar **commit, GitHub Actions, testes automatizados, build e deploy simulado**.

## 1. O que este projeto faz?

Quando houver um `push` ou um `pull request` para a branch `main`, o GitHub Actions irá:

1. Baixar o código do repositório.
2. Preparar o Node.js.
3. Executar os testes automatizados.
4. Gerar a pasta `dist` (build).
5. Executar uma etapa de deploy simulado.

> O deploy é apenas uma demonstração: ele exibe uma mensagem no log. Não publica o site na internet.

## 2. Estrutura de pastas

```text
atividade-cicd-github-actions/
├── .github/
│   └── workflows/
│       └── ci-cd.yml
├── scripts/
│   └── build.js
├── src/
│   └── app.js
├── test/
│   └── app.test.js
├── .gitignore
├── index.html
├── package.json
└── README.md
```

## 3. Como colocar no GitHub pelo navegador

1. Entre em https://github.com e crie um repositório chamado `atividade-cicd`.
2. Abra o repositório e escolha **Add file > Upload files**.
3. Envie os arquivos e pastas deste projeto (extraia o ZIP antes).
4. Confirme em **Commit changes**. Use a branch `main`.
5. Abra a aba **Actions** e observe a execução chamada **Pipeline CI-CD**.

Se a aba Actions pedir habilitação, confirme para permitir a execução dos workflows.

## 4. Como demonstrar um teste com falha

1. Abra `test/app.test.js` no GitHub.
2. Clique no lápis para editar.
3. Troque o resultado esperado `5` por `10`.
4. Faça commit na branch `main`.
5. Abra **Actions**: o teste deverá falhar.
6. Volte ao arquivo, corrija o valor para `5` e faça outro commit.
7. Confira a nova execução: ela deverá terminar com sucesso.

## 5. Onde está o Firebase?

O roteiro da atividade também propõe Firebase Authentication e Cloud Firestore. Esta versão começa pela automação CI/CD, sem exigir credenciais ou configuração de conta Firebase para a primeira demonstração.

Para uma segunda etapa, crie um projeto no Firebase Console, habilite Authentication e Cloud Firestore e configure as credenciais como **GitHub Actions Secrets**. Nunca coloque senhas ou chaves privadas diretamente no código.

A chave `apiKey` usada pelo SDK Web do Firebase não é, por si só, uma senha de administrador. Mesmo assim, configure as regras de segurança do Firestore e não exponha credenciais privadas.

## 6. Conceitos para lembrar

- **CI (Integração Contínua):** executa verificações automaticamente quando o código muda.
- **CD (Entrega/Implantação Contínua):** automatiza a preparação ou publicação de uma versão.
- **Build:** prepara os arquivos finais do projeto.
- **Teste automatizado:** verifica se o comportamento esperado está correto.
- **Deploy:** disponibiliza a aplicação em um ambiente para uso.

## 7. Requisitos

- Conta GitHub.
- Navegador de internet.
- Para executar localmente: Node.js 22 ou superior.

Não é necessário instalar nada nos computadores dos alunos para executar o workflow: o GitHub Actions usa um ambiente Ubuntu hospedado pelo GitHub.
