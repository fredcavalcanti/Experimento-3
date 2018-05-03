/*'use strict';*/

// Initializes Parte1Instrucoes.
function Parte1Instrucoes(experimentoChave , idplayer) {
  this.experimentoChave = experimentoChave;
  this.idplayer = idplayer;

  // Shortcuts to DOM Elements.
  this.userName = document.getElementById('user-name');

  this.msgCerta1 = document.getElementById('msg-certa1');
  this.msgErrada1 = document.getElementById('msg-errada1');
  this.msgCerta2 = document.getElementById('msg-certa2');
  this.msgErrada2 = document.getElementById('msg-errada2');

  this.resposta1 = document.getElementById('resposta1');
  this.resposta2 = document.getElementById('resposta2');

  this.link = document.getElementById('link');

  this.buttonVerify = document.getElementById('verificar-resposta');
  this.buttonVerify.addEventListener('click', this.verify);

  this.tipoGrupo = document.getElementById('tipo-grupo');

  this.qtdTentativa = 0;

  this.initFirebase();
}

// A loading image URL.
Parte1Instrucoes.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Sets up shortcuts to Firebase features and initiate firebase auth.
Parte1Instrucoes.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.getID();
};


Parte1Instrucoes.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave + '/participant/' + this.idplayer).once('value').then(function(snapshot) {
    Parte1Instrucoes.userName.textContent=snapshot.val().id;
    Parte1Instrucoes.lek =snapshot.val().id;
   Parte1Instrucoes.link.setAttribute('href','parte1-lancamento.html');
  });
}

 var ok = 0;
// Saves a new message on the Firebase DB.
Parte1Instrucoes.prototype.verify = function() {

 
  
  Parte1Instrucoes.qtdTentativa = Parte1Instrucoes.qtdTentativa+1;

  Parte1Instrucoes.msgCerta1.setAttribute('hidden','');
  Parte1Instrucoes.msgErrada1.setAttribute('hidden','');
  Parte1Instrucoes.msgCerta2.setAttribute('hidden','');
  Parte1Instrucoes.msgErrada2.setAttribute('hidden','');  

  

  // valores para NPC
  var resposta1Certa=4;
  var resposta2Certa=4;

  if(Parte1Instrucoes.tipoGrupo.value=='PC') {
    resposta2Certa=0;
  }

  if(Parte1Instrucoes.resposta1.value==resposta1Certa) {
    Parte1Instrucoes.msgCerta1.removeAttribute('hidden');
    ok++;
  } else {
    Parte1Instrucoes.msgErrada1.removeAttribute('hidden');
    ok = 0;
  }
  
  if(Parte1Instrucoes.resposta2.value==resposta2Certa) {
    Parte1Instrucoes.msgCerta2.removeAttribute('hidden');
    ok++;
  } else {
    Parte1Instrucoes.msgErrada2.removeAttribute('hidden');
    ok = 0;
  }


  if(ok>=2) {
    firebase.database().ref('/experiment/'+Parte1Instrucoes.experimentoChave+'/participant/'+Parte1Instrucoes.idplayer+'/answer/parte1QtdTentativas')
    .set(Parte1Instrucoes.qtdTentativa).then(function(snapshot) {
      des1();
       Parte1Instrucoes.link.removeAttribute('hidden');
       resposta1.setAttribute('disabled','');
       resposta2.setAttribute('disabled','');
        Parte1Instrucoes.buttonVerify.setAttribute('hidden','');
    }).catch(function(error) {
        console.error('Error writing new message to Firebase Database', error);
    });    
  }
};

firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
              var idplayer = firebaseUser.photoURL;
              var experimentoChave = firebaseUser.displayName;
              window.Parte1Instrucoes = new Parte1Instrucoes(experimentoChave , idplayer);
    }
    else
    {
      console.log('Deslogado!');
    }
  });



function des1()
{
  if(ok==2){
  var coe = document.getElementById('verificar-resposta');
        coe.disabled=true;
}
}