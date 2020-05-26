const express = require('express');
const cors = require('cors');
const request = require('request');
const saveFace = require('./db');

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
}));

app.use(express.static(__dirname + "/../dist/"));

const uriBase = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect/';
const subscriptionKey = '3df4149b259b497fbde1d330c901ac74';

const port = 3000;

app.post('/', (req, res) => {
  const { imageUrl } = req.body;

  const params = {
    'returnFaceAttributes': 'emotion'
  };

  const options = {
    url: uriBase,
    qs: params,
    body: '{"url": ' + '"' + imageUrl + '"}',
    headers: {
      'Content-Type': 'application/json',
      'Ocp-Apim-Subscription-Key' : subscriptionKey
    }
  };

  // TODO: Send Request to Face API
  // TODO: Send Face API response to front-end
  // TODO: Save Face API response to database
  request.post(options, (error, response, body) =>{
    console.log(body);
    //Set data-type to JSON, so the Front-End knows how to read it.
    res.setHeader('Content-Type', 'application/json');
    //Send the API response bodyto the Front-End
    res.send(body);
    if(response.statusCode == "200"){
      saveFace(imageUrl, JSON.stringify(body));
    }
  })
});

app.listen(port, () => console.log(`Emojifier back-end listening on port ${port}!`));
