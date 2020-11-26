# Blockbuster

Projeto gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 10.2.0.

## Executar o projeto local

#### Intalando e executando o [json-server](https://github.com/typicode/json-server)

- Execute o comando `npm install -g json-server` para instalar
- Na pasta _src\assets\data_ deste projeto tem um arquivo exemplo chamado **db.json**:
    - Copie o arquivo para sua máquina
    - No diretório copiado executar o seguinte comando `json-server --watch db.json`
    - Note que vai subir um servidor local na porta 3000 (_http://localhost:3000_)

**OBS: Não executar o serve apontado para o arquivo que está na raiz do projeto, pois a cada update no arquivo para a execução das operações é interpretado como uma nova atualização em arquivo e ocorre o live reload**

#### Executando o projeto

- Execute o comando `npm i` para instalar
- Execute o comando `ng serve -o` para executar o projeto e abrir automaticamente em seu navegador na URL **http://localhost:4200/**
