/*'use strict';*/

// Initializes Parte1InstrucoesChat.
function Parte1InstrucoesChat(experimentoChave , idplayer) {
  this.experimentoChave = experimentoChave;
  this.idplayer = idplayer;
  // Shortcuts to DOM Elements.
  this.userName = document.getElementById('user-name');

  this.link = document.getElementById('link');

  this.initFirebase();


  //setTimeout(startCountdown,1000);
}

// A loading image URL.
Parte1InstrucoesChat.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Sets up shortcuts to Firebase features and initiate firebase auth.
Parte1InstrucoesChat.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.getID();
};


Parte1InstrucoesChat.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/' + this.idplayer).once('value').then(function(snapshot) {
    Parte1InstrucoesChat.userName.textContent=snapshot.val().id;
    Parte1InstrucoesChat.idjogador = snapshot.val().id;

      firebase.database().ref('/experiment/'+Parte1InstrucoesChat.experimentoChave+'/participant/' + Parte1InstrucoesChat.idplayer).once('value').then(function(snapshot) {
     var y = snapshot.val().group;
     var ky = y.number;

   
   var k = ky.toString();

   console.log(k);


    firebase.database().ref('/experiment/' + Parte1InstrucoesChat.experimentoChave + /ctrlplayers/ + k ).once('value').then(function(snapshot) {
     var z = snapshot.val().jogador;

         Parte1InstrucoesChat.link.setAttribute('href','parte1-chat.html');
         Parte1InstrucoesChat.link.removeAttribute('disabled');

    
   });
});


  });
}





/*
function init() {
  window.Parte1InstrucoesChat = new Parte1InstrucoesChat(QueryString.e);
  var qualgrupo = firebase.database() .ref("/experiment/" + Parte1InstrucoesChat.experimentoChave+'/participant/' + QueryString.k + '/group/');
      qualgrupo.orderByChild("number") .once("child_added", function(data) {
     var y = data.val();
   
     var k = y.toString();

  var qualgrupo = firebase.database() .ref('/experiment/' + Parte1InstrucoesChat.experimentoChave + /ctrlplayers/ + k );
      qualgrupo.orderByChild('/jogador/') .once("child_added", function(data) {
     var z = data.val();

     if( z >= 3)
     {  
         Parte1InstrucoesChat.link.setAttribute('href','parte2-chat.html?k='+QueryString.k+"&e="+QueryString.e);

     }
          if( z <= 2)
     {  
         Parte1InstrucoesChat.link.setAttribute('href','semjogadores2.html?k='+QueryString.k+"&e="+QueryString.e);

     }

    
   });
});

};*/


 firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
              var idplayer = firebaseUser.photoURL;
              var experimentoChave = firebaseUser.displayName;
              window.Parte1InstrucoesChat = new Parte1InstrucoesChat(experimentoChave , idplayer);
    }
    else
    {
      console.log('Deslogado!');
    }
  });