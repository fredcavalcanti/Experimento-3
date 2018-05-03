'use strict';

// Initializes Parte2InstrucoesChat.
function SemJogadores(experimentoChave , idplayer) {
  this.experimentoChave = experimentoChave;
  this.idplayer = idplayer;
  // Shortcuts to DOM Elements.
  this.userName = document.getElementById('user-name');



  this.link = document.getElementById('link');

  this.initFirebase();

  //setTimeout(startCountdown,1000);
}
SemJogadores.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.deletePlayer();
};

SemJogadores.prototype.deletePlayer = function() {
  firebase.database().ref('/experiment/' + this.experimentoChave + '/participant/' + this.idplayer + '/group/' ).once('value').then(function(snapshot) {
    var meugrupo = snapshot.val().number;


  var playersRef = firebase.database() .ref('/experiment/'+SemJogadores.experimentoChave+'/group/' + meugrupo );
  playersRef.orderByKey() .on("child_added", function(data) {

   firebase.database().ref('/experiment/' + SemJogadores.experimentoChave + '/group/' + meugrupo + '/' + data.key ).once('value').then(function(snapshot) {
    var idreal = snapshot.val();


    if(idreal == SemJogadores.idplayer)
    {
      var del = firebase.database().ref('/experiment/'+SemJogadores.experimentoChave+'/group/' + meugrupo + '/' + data.key);
      del.remove();

      firebase.database().ref('/experiment/'+SemJogadores.experimentoChave+'/ctrlider/' + meugrupo + '/lideres/' + SemJogadores.idplayer).remove();


    firebase.database().ref('/experiment/'+SemJogadores.experimentoChave+'/contadorlider/' + meugrupo).once('value').then(function(snapshot) {
    var valorlider = snapshot.val();

    var sub = valorlider - 1 ;


    var lidersub = firebase.database().ref('/experiment/'+SemJogadores.experimentoChave+'/contadorlider/' + meugrupo);
    lidersub.set(sub);



  firebase.database().ref('/experiment/'+SemJogadores.experimentoChave+'/ctrlplayers/' + meugrupo + '/jogador/').once('value').then(function(snapshot) {
    var valorplayers = snapshot.val();

    var subplayer = valorplayers -1 ;
    var playersub = firebase.database().ref('/experiment/'+SemJogadores.experimentoChave+'/ctrlplayers/' + meugrupo + '/jogador/');
    playersub.set(subplayer);

  firebase.database().ref('/experiment/'+SemJogadores.experimentoChave+'/participant/' + SemJogadores.idplayer).remove();
  window.sessionStorage.clear(); 
  window.localStorage.clear(); 
  const ativa = document.getElementById('okbtn');
  ativa.removeAttribute('disabled');

    console.log('REMOVIDO');
     });
   });


    }



  /*firebase.database().ref('/experiment/'+SemJogadores.experimentoChave+'/ctrlider/' + meugrupo + '/lideres/' + SemJogadores.idplayer).remove();


    firebase.database().ref('/experiment/'+SemJogadores.experimentoChave+'/contadorlider/' + meugrupo).once('value').then(function(snapshot) {
    var valorlider = snapshot.val();

    var sub = valorlider - 1 ;


    var lidersub = firebase.database().ref('/experiment/'+SemJogadores.experimentoChave+'/contadorlider/' + meugrupo);
    lidersub.set(sub);



  firebase.database().ref('/experiment/'+SemJogadores.experimentoChave+'/ctrlplayers/' + meugrupo + '/jogador/').once('value').then(function(snapshot) {
    var valorplayers = snapshot.val();

    var subplayer = valorplayers -1 ;
    var playersub = firebase.database().ref('/experiment/'+SemJogadores.experimentoChave+'/ctrlplayers/' + meugrupo + '/jogador/');
    playersub.set(subplayer);

  firebase.database().ref('/experiment/'+SemJogadores.experimentoChave+'/participant/' + SemJogadores.idplayer).remove();
  window.sessionStorage.clear(); 
  window.localStorage.clear(); 
  const ativa = document.getElementById('okbtn');
  ativa.removeAttribute('disabled');

    console.log('REMOVIDO');

    

      });
    });*/

  });
  });
  });
}


 firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
              var idplayer = firebaseUser.photoURL;
              var experimentoChave = firebaseUser.displayName;
              window.SemJogadores = new SemJogadores(experimentoChave , idplayer);
    }
    else
    {
      console.log('Deslogado!');
    }
  });