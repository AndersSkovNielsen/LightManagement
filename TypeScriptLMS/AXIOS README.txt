1. �ben ny Command Prompt (CMD)

2. G� til projekt mappe (cd 'path to folder')

3. Installer AXIOS (npm install axios)

4. Tilf�j import i TS fil ('import axios from 'axios';')

5. Tilf�j metoder

GET:
axios.get('https://resthighscore.azurewebsites.net/api/highscore')
  .then(function(response){
    console.log(response.data); // ex.: { user: 'Your User'}
    console.log(response.status); // ex.: 200
  }); 

POST:
axios.post('https://resthighscore.azurewebsites.net/api/highscore', {
    Name: 'ASN',
    Score: 42
  })
  .then(function (response) {
    console.log(response.status);
  });
  .catch(function (error) {
    console.log(error);
  });