import { Readable } from 'node:stream';

class OneToHundredStream extends Readable {
  index = 1;

  _read() {
    const i = this.index++;

    setTimeout(() => {
      if (i > 5) {
        this.push(null);
      } else {
        const buf = Buffer.from(String(i));

        this.push(buf);
      }
    }, 1000);
  }
}

fetch('http://localhost:3334', {
  method: 'POST', // Enviando uma informação aos poucos -> Por isso tem que ser o POST
  body: new OneToHundredStream(), // Passa no corpo da requisição uma stream.
})
  .then((response) => response.text())
  .then((data) => {
    console.log(data);
  });
