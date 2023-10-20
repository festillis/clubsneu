import express from 'express';

const app = express();
app.use(express.json());

app.get('/', (req, res) => {
  const message = req.body.message;

  if (!message) {
    res.status(400).send('Message is required');
    return;
  }

  res.status(200).send(`The message is: ${message}`);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});
