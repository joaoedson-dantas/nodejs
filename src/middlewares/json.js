export async function json(req, res) {
  // Leitura de Streams => Para que seja possível lermos todo o corpo da req.
  const buffers = [];
  for await (const chunk of req) {
    buffers.push(chunk);
  }

  // Apos ler o corpo da req => Fazemos um parse (Transforma o corpo em um objeto JS com o parse) => JSON
  try {
    req.body = JSON.parse(Buffer.concat(buffers).toString());
  } catch {
    req.body = null;
  }
  res.setHeader('Content-type', 'application/json'); // Qual será o tipo de conteúdo?json
}

// middlewares -> É um interceptador nada mais é uma function que vai intercptar a nossa requisição
// sempre recebem como parametros o req e res => Pois vão ser tratados.
