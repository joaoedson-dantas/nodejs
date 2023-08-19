import { randomUUID } from 'node:crypto'; // Unique Universal ID -> Id único universal
import { Databese } from './database.js';

const databese = new Databese();

export const routes = [
  {
    method: 'GET',
    path: '/users',
    handler: (req, res) => {
      const users = databese.select('users');
      // Early return
      return res.end(JSON.stringify(users));
    },
  },
  {
    method: 'POST',
    path: '/users',
    handler: (req, res) => {
      const { name, email } = req.body;

      const user = {
        id: randomUUID(),
        name,
        email,
      };

      databese.insert('users', user);

      return res.writeHead(201).end();
    },
  },
];
