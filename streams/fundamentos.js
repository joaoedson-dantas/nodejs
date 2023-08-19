/* Stream
    Netflix / Spotify
*/

// Ser possível obter pequenos partes( pequenas partes de algo ) e já conseguir trabalhar com aqueles dados mesmo
// antes de ler aquele arquivo completo. Basicamente conseguir trabalhar com os dados mesmo antes de ler o arquivo completo

// Importação de clientes via CSV (Excel)
// 1gb => 1.000.000,00
// POST /unpload - import.csv

// 100mb/s -> 100s
// 100s => Inserção no banco de dados

// 10ms/s => 10.000,00

// Readable Streams(Lendo uma arquivo aos poucos) / Writable Streams(Enviado uma informação aos poucos. )

// Toda porta de entrada e saida é uma stream ->  No caso, requisição e respostas são portas de entrada e saidas.
// O raq e o res no final das contas são strams

// streams ->
// stdin = tudo que é digitado no terminal pipe() -> conectar
// stdout = stream de saida

// Tudo que estou recebendo como entranda eu estou encaminhado
// para uma saida (stdout)
/* process.stdin //lendo a stram
  .pipe(process.stdout); //escrevendo a stream */

import { Readable, Transform, Writable } from 'node:stream';

/* Criando uma stream de leitura */
class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    // leitura - Toda stram readable _read() -> vai retornar os dados da stream.
    const i = this.index++;

    if (i > 100) {
      this.push(null); // Não tenho mais informações para ser enviada da stram
    } else {
      const buf = Buffer.from(String(i)); // Dentro de strams não é possível trabalhar com strings ou numeros. Não pode está em formato primitivo. Precisa trablhar com outro formato, no caso o Buffer. É preciso converter em uma string
      this.push(buf);
    }
  }
}

/* Criando uma stream de escrita. Ela vai receber dados de uma stream de leitura e vai fazer algo com as informações. */

class IverseNumberStream extends Transform {
  _transform(chunk, encoding, callback) {
    const transformed = Number(chunk.toString()) * -1;

    callback(null, Buffer.from(String(transformed))); // Primeiro parâmetro é um ERRO. O segundo parâmetro é a conversão (Transformar.)
  }
}

class MultiPlayByTenStream extends Writable {
  _write(chunk, encoding, callback) {
    // Método de escrita que recebe 3 parâmetros(chunk, encoding, callback)  => Não retorna nada, apenas processa o dado
    console.log(Number(chunk.toString()) * 10);
    callback();
  }
}

new OneToHundredStream() // Lendo a stram e enquanto ler a strem ele vai tentar escrever algo
  .pipe(new IverseNumberStream()) // Teransformando a stream.
  .pipe(new MultiPlayByTenStream()); // Escrevendo a stream.

// chunk -> O pedaço que foi lido da stream de leitura => É o que foi enviado dentro do this.push(buf);
// encoding -> É como essa informação está codificada
// callback -> Função que a stream de escrita precisa chamar quando ela terminou de fazer

/* Transforms Streams -> Stream de transformação -> Tranformar um dado em outrou (Um chunck em outro), ela precisa obrigatoriamente ler dados de algum lugar e escrever dados em outro lugar. Ela é utilizada no intermeio, para comunicação entre duas outras streams,*/

// Buffer => É uma representação de uma espaço na memória do computador.
// Usado especificadamento para transitar dados de uma maneira muito rápida. Maneira de salvar ee ler na memória de forma perfomática
