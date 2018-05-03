'use strict';

// Initializes Parte2Lancamento.
function Parte2Lancamento(experimentoChave , idplayer) {
  this.experimentoChave = experimentoChave;
  this.idplayer = idplayer;

  // Shortcuts to DOM Elements.
  this.userName = document.getElementById('user-name');

  this.link = document.getElementById('link');

  this.initFirebase();
}

// A loading image URL.
Parte2Lancamento.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Sets up shortcuts to Firebase features and initiate firebase auth.
Parte2Lancamento.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.getID();
};


Parte2Lancamento.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/' + this.idplayer)
    .once('value').then(function(snapshot) {
      Parte2Lancamento.userName.textContent=snapshot.val().id;
      Parte2Lancamento.link.setAttribute('href','parte2-chat.html');
      Parte2Lancamento.link.removeAttribute('disabled');
  });
}

 firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
              var idplayer = firebaseUser.photoURL;
              var experimentoChave = firebaseUser.displayName;
              window.Parte2Lancamento = new Parte2Lancamento(experimentoChave , idplayer);
    }
    else
    {
      console.log('Deslogado!');
    }
  });