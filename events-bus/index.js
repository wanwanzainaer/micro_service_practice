const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const events = [];
app.post('/events', async (req, res) => {
  const event = req.body;

  events.push(event);

  await axios.post('http://posts-clusterip-srv:4000/events', events);
  await axios.post('http://comments-srv:4001/events', events);
  await axios.post('http://query-srv:4002/events', events);
  await axios.post('http://moderation-srv:4003/events', events);

  res.send({ status: 'OK' });
});
app.get('/events', (req, res) => {
  res.send(events);
});

app.listen(4005, () => {
  console.log('Events bus listening on 4005');
});
