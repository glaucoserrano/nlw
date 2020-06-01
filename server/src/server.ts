import express from 'express';

const app = express();

app.get('/users', (request,response) => {
   console.log('Listagem de usuarios');

   response.json([
      "glauco",
      "marcelo",
      "thaty",
      "waldeir",
      "suzete"
   ]);
});

app.listen(3333);