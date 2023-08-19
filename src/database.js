import fs from 'node:fs/promises'; // (sistema de arquivos) no Node.js, que permite escrever dados em um arquivo. Ele é usado para criar ou substituir um arquivo no sistema de arquivos local.

const databasePath = new URL('../db.json', import.meta.url);

export class Databese {
  #databese = {};

  constructor() {
    fs.readFile(databasePath, 'utf8')
      .then((data) => {
        this.#databese = JSON.parse(data);
      })
      .catch(() => {
        this.#persist();
      });
  }

  #persist() {
    // Vai escrever o banco de dados em um arquivo físico
    fs.writeFile(databasePath, JSON.stringify(this.#databese)); //  O writeFile é um método fornecido pelo módulo fs
  }

  select(table) {
    const data = this.#databese[table] ?? [];
    return data;
  }

  insert(table, data) {
    if (Array.isArray(this.#databese[table])) {
      this.#databese[table].push(data);
    } else {
      this.#databese[table] = [data];
    }

    this.#persist();

    return data;
  }
}
