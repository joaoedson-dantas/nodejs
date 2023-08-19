import http from 'node:http';

import { json } from './middlewares/json.js';
import { Databese } from './database.js';
import { routes } from './routes.js';

const server = http.createServer(async (req, res) => {
  const { method, url } = req;
  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path === url;
  });

  if (route) {
    return route.handler(req, res);
  }

  console.log(route);

  return res.writeHead(404).end();
});

server.listen(3333);

/* começar importando um módulo interno do node  -> Para facilitar o trabalho */
// Padrão de importação chamado CommonJS -> require('');
// Hoje em dia utilizamos o ESModules => import/export

// createServer => Recebe 2 parâmetros
// 1: request/req => Dentro do raq é possível obter todas as informações das requisições que estão chegando do nosso servidor. Criar um usuário (name, email, senha)
// 2: response/res => fica resposável por devolver uma resposta para quem está chamando o servidor.

// Rotas http -> São caminhos de entrada dentro da aplicação (Meios de entrada)
// - Criar, listar, editar, remoção

// HTTP
// método http
// ULR

// GET, POST, PUT, PATCH, DELETE -> 5 métodos utilizados.
// GET => Buscar alguma recurso no back-end
// POST => Criar um recurso no back-end
// PUT => Editar/Atualizar um recurso no back-end
// PATCH => Atualizar uma informação informação específica de um recurso no back-end
// DELETE => Deletar um recurso do back-end

/* Soma do método com a URL --> É possível ter duas rotas no back / mesma url com métodos diferentes
  GET /users -> Buscando usuários no backend
  POST /users -> criando um usuário no backend 
*/

/* Salvando o usuário na memória (HEADRS) */
// Stateful - Stateçless

// JSON - JavaScript Object Notation - ESTRUTURA DE DADOS NA TRANSIÇÃO DE DADOS ENTRE FRONT E BACK.

/* Como o Frontend vai saber que que o bakc vai enviar uma reposta em JSON? 
Aí vem os CABEÇALHOS(requisição/resposta) => Metadados 

Cabeçalhos são informações adicionais que não tem haver com o dado retornado do back para o frontend. Mas sim, de como aquele dado pode ser interpretado pelo frontend. 



*/

// HTTP - Status Code - Simbolizar se deu certo ou errado
// Quando uma resposta é devolvida para o front - Comunicar para o front o que ocorreu com a  requisição. Se deu certo, erro e etc...
// 201 -> Sucesso. Simbolizando que conseguimos criar algo.
