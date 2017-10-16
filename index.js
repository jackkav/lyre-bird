const express = require('express')
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('OK')
})

app.post('/', function (req, res) {
  if(req.body.build.status!=='Success')return
  const repo = req.body.repo
  const post = {
    "push_data": {
      "tag": "latest"
    },
    "repository": {
      "repo_name": 'daocloud.io/'+repo
    }
  }
  
  const webhookPlay = 'http://rancher.ihealthcn.com/v1-webhooks/endpoint\?key\=4GEzZqQtwzH0CSgqyWSMvTpz6e47rwV3IC4Nbm0q\&projectId\=1a445'
  const webhookStaging = 'http://rancher.ihealthcn.com/v1-webhooks/endpoint?key=NzUmfHmrVf8t6SegKW4I0pKzzqvxGGNkqm2MVrHD&projectId=1a46'
  const webhookStagingPigeon = 'http://rancher.ihealthcn.com/v1-webhooks/endpoint?key=ZIsJhshB14nM3KjtbGXjMZ5T5eBi5RQ5WAtFxARN&projectId=1a46'
  const webhookStagingDodgyDove = 'http://rancher.ihealthcn.com/v1-webhooks/endpoint?key=6QgDJ64p3UULZpGF6wsJf4OPzcllgTozlVn9L1Hv&projectId=1a46'
  const webhookStagingSwiftSnail = 'http://rancher.ihealthcn.com/v1-webhooks/endpoint?key=6OACQ3hVju4k9T3n6hmzkUnXQySJZnjKF8SL4xn1&projectId=1a46'
  let webhook=webhookStaging
  if(repo.includes('pigeon'))webhook=webhookStagingPigeon
  if(repo.includes('dodgy-dove'))webhook=webhookStagingDodgyDove
  if(repo.includes('swift-snail'))webhook= webhookStagingSwiftSnail
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