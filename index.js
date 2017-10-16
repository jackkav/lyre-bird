const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('OK')
})

app.post('/', function (req, res) {
  const repo = req.body.repo
  const post = {
    "push_data": {
      "tag": "latest"
    },
    "repository": {
      "repo_name": repo
    }
  }
  const webhook = 'http://rancher.ihealthcn.com/v1-webhooks/endpoint\?key\=4GEzZqQtwzH0CSgqyWSMvTpz6e47rwV3IC4Nbm0q\&projectId\=1a445'
  
  axios.post(webhook, post)
  .then(function (response) {
    console.log(repo + ' auto upgrading...');
  })
  .catch(function (error) {
    console.log(error);
  });

  res.send('Recieved!')
})

app.listen(3000, function () {
  console.log('Listening on port 3000!')
})