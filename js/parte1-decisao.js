'use strict';

// Initializes Parte1Decisao.
function Parte1Decisao(experimentoChave , idplayer) {
  this.experimentoChave = experimentoChave;
  this.idplayer = idplayer;

  // Shortcuts to DOM Elements.
  this.userName = document.getElementById('user-name');

  this.decisao = document.getElementById('decisao');

  this.msgErrada = document.getElementById('msg-errada');
  this.msgErrada2 = document.getElementById('msg-errada2');
  this.msgCerta = document.getElementById('msg-certa');
  this.error = document.getElementById('error');

  this.buttonVerify = document.getElementById('save');
  this.buttonVerify.addEventListener('click', this.save);

  this.link = document.getElementById('link');

  this.initFirebase();
}

// A loading image URL.
Parte1Decisao.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Sets up shortcuts to Firebase features and initiate firebase auth.
Parte1Decisao.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.getID();
};


Parte1Decisao.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/' + this.idplayer).once('value').then(function(snapshot) {
    Parte1Decisao.userName.textContent=snapshot.val().id;
    Parte1Decisao.buttonVerify.removeAttribute('disabled');
    /*Parte1Decisao.link.setAttribute('href','parte-final.html?k='+QueryString.k+"&e="+QueryString.e);*/
  });
}

Parte1Decisao.prototype.save = function() {
  Parte1Decisao.msgCerta.setAttribute('hidden','');
  Parte1Decisao.msgErrada.setAttribute('hidden','');
  Parte1Decisao.error.setAttribute('hidden','');
  if(Parte1Decisao.decisao.value=='') {
    Parte1Decisao.msgErrada.removeAttribute('hidden');
  } else if(Parte1Decisao.decisao.value>6 || Parte1Decisao.decisao.value<=0) {
    Parte1Decisao.msgErrada2.removeAttribute('hidden');    
  } else {
    this.table = firebase.database().ref('/experiment/'+Parte1Decisao.experimentoChave+'/participant/'+Parte1Decisao.idplayer+'/answer/parte/decisaodaparte1');

    this.table.set(Parte1Decisao.decisao.value).then(function(snapshot) {

       


      Parte1Decisao.msgCerta.removeAttribute('hidden');
      Parte1Decisao.link.removeAttribute('hidden');
      Parte1Decisao.decisao.setAttribute('disabled','true');
      Parte1Decisao.buttonVerify.setAttribute('hidden','')

      var qualgrupo1 = firebase.database() .ref("/experiment/" + Parte1Decisao.experimentoChave+'/participant/' + Parte1Decisao.idplayer + '/group/');
      qualgrupo1.orderByChild('number') .once("child_added", function(data) {
      var numerobanco = (data.val());

      var numerobancostring = numerobanco.toString();


      var qualgrupo = firebase.database() .ref("/experiment/" + Parte1Decisao.experimentoChave+'/participant/' + Parte1Decisao.idplayer + '/group/').limitToLast(1);
      qualgrupo.orderByChild("tipo") .once("child_added", function(data) {
      var qgrupo =data.val();
  
   if(qgrupo == "PC"){
      
        Parte1Decisao.link.setAttribute('href','aguardept1.html');  
   }
   else{
       Parte1Decisao.link.setAttribute('href','parte2-codaud.html');
   }
   
    }).catch(function(error) {
        console.error('Error writing new message to Firebase Database', error);
        Parte1Decisao.error.removeAttribute('hidden');
    });
    });
    });
  }
}


 firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
              var idplayer = firebaseUser.photoURL;
              var experimentoChave = firebaseUser.displayName;
              window.Parte1Decisao = new Parte1Decisao(experimentoChave , idplayer);
    }
    else
    {
      console.log('Deslogado!');
    }
  });
