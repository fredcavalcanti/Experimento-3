'use strict';

// Initializes Geral.
function ParteFinal(experimentoChave , idplayer) {
  this.experimentoChave = experimentoChave;
  this.idplayer = idplayer;

  // Shortcuts to DOM Elements.
  this.userName = document.getElementById('user-name');
  this.pontos = document.getElementById('pontos');
  this.valorReceber = document.getElementById('valor-receber');
  this.buttonLink = document.getElementById('button-link');

  this.loading = document.getElementById("loading");

  this.initFirebase();
}

// A loading image URL.
ParteFinal.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Sets up shortcuts to Firebase features and initiate firebase auth.
ParteFinal.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.getID();
  this.getPontos();
};

ParteFinal.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/' + this.idplayer).once('value').then(function(snapshot) {
    ParteFinal.userName.textContent=snapshot.val().id;
  });
}
ParteFinal.prototype.getPontos = function() {

  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/'+ this.idplayer).once('value').then(function(snapshot) {
    var jogador = snapshot.val();
    if(jogador.group.tipo == 'PC')
    {
      firebase.database().ref('/experiment/'+ParteFinal.experimentoChave+'/participant/'+ ParteFinal.idplayer+'/answer').once('value').then(function(snapshot) {
    ParteFinal.loading.setAttribute('hidden','');
    var zerou1 = snapshot.val().vaizerarparte1;
    var valor1 = snapshot.val().parte.decisaodaparte1;
    var zerou2 = snapshot.val().vaizerarparte2;
    var valor2 = snapshot.val().parte.decisaodaparte2;
    var pontosParte1 = 0;
    var pontosParte2 = 0;
    if(zerou1 == true)
    {
      pontosParte1 = 0;
    }
    else
    {
      pontosParte1 = parseInt(valor1);
    }
    if(zerou2 == true)
    {
      pontosParte2 = 0;
    }
    else
    {
      pontosParte2 = parseInt(valor2);
    }
    var pontos = pontosParte1+pontosParte2;
    ParteFinal.pontos.textContent=pontos;
    ParteFinal.valorReceber.textContent=pontos;
    var resultadofinal = firebase.database().ref('/experiment/'+ ParteFinal.experimentoChave +'/participant/'+ParteFinal.idplayer + '/resultado/');
    resultadofinal.set(pontos);
      });
    }
    else
    {
      firebase.database().ref('/experiment/'+ParteFinal.experimentoChave+'/participant/'+ ParteFinal.idplayer+'/answer/parte').once('value').then(function(snapshot) {
    ParteFinal.loading.setAttribute('hidden','');
    var pontosParte1 = 0;
    if(snapshot.val().decisaodaparte1) {
      pontosParte1 = parseInt(snapshot.val().decisaodaparte1);
    }
    var pontosParte2 = 0;
    if(snapshot.val().decisaodaparte2) {
      pontosParte2 = parseInt(snapshot.val().decisaodaparte2);
    }    
    var pontos = pontosParte1+pontosParte2;
    ParteFinal.pontos.textContent=pontos;
    ParteFinal.valorReceber.textContent=pontos;
    var resultadofinal = firebase.database().ref('/experiment/'+ ParteFinal.experimentoChave +'/participant/'+ParteFinal.idplayer + '/resultado/');
        resultadofinal.set(pontos);


    });
  }


});
  this.dateEnd = new Date();
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/'+this.idplayer+'/end/')
    .set(this.dateEnd.getTime()).then(function(snapshot) {
        console.info('Finish');
    }).then(function() {
               window.sessionStorage.clear(); 
               window.localStorage.clear();
                console.log('OK!')
            }).catch(function(error) {
        console.error('Error writing new message to Firebase Database', error);
    });
}



firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
              var idplayer = firebaseUser.photoURL;
              var experimentoChave = firebaseUser.displayName;
              window.ParteFinal = new ParteFinal(experimentoChave , idplayer);
    }
    else
    {
      console.log('Deslogado!');
    }
  });