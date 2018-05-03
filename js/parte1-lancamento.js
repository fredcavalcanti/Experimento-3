'use strict';

// Initializes Parte1Lancamento.
function Parte1Lancamento(experimentoChave , idplayer) {
  this.experimentoChave = experimentoChave;
  this.idplayer = idplayer;

  // Shortcuts to DOM Elements.
  this.userName = document.getElementById('user-name');

  this.link = document.getElementById('link');

  this.initFirebase();
}

// A loading image URL.
Parte1Lancamento.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Sets up shortcuts to Firebase features and initiate firebase auth.
Parte1Lancamento.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.getID();
};


Parte1Lancamento.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/' + this.idplayer)
    .once('value').then(function(snapshot) {
      Parte1Lancamento.userName.textContent=snapshot.val().id;
      Parte1Lancamento.link.setAttribute('href','parte1-instrucoes-chat.html');
      Parte1Lancamento.link.removeAttribute('disabled');
  });
}

 firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
              var idplayer = firebaseUser.photoURL;
              var experimentoChave = firebaseUser.displayName;
              window.Parte1Lancamento = new Parte1Lancamento(experimentoChave , idplayer);
    }
    else
    {
      console.log('Deslogado!');
    }
  });