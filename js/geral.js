const id = document.getElementById('user-name');
const btnlink =  document.getElementById('button-link');



function crea(experimentoChave){
this.experimentoChave = experimentoChave;

	this.database = firebase.database();
	this.table = this.database.ref('/experiment/'+ this.experimentoChave+'/participant/');
	this.datePush = new Date();
  	this.idUser = Math.round(Math.random()*100000);

  	this.table.push({
      id: this.idUser,
      start: this.datePush.getTime()
  }).then(function(snapshot) {
      //Geral.userName.textContent=snapshot.child('id').val();
      id.textContent=this.idUser;
      this.minhakey = snapshot.key;

      firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
      firebaseUser.updateProfile({
              displayName: experimentoChave,
              photoURL: crea.minhakey
            }).then(function() {
              var id_do_jogador = firebaseUser.uid;
              var name = firebaseUser.displayName;
              console.log('ID REAL: ' + crea.minhakey);
              console.log('ID JOGO:' + name);
              console.log('ID Player:' + id_do_jogador);

            }).catch(function(error) {
              // An error happened.
            });
    }
  });

      btnlink.href="questionario.html";
      btnlink.removeAttribute('disabled');
  }.bind(this)).catch(function(error) {
      console.error('Error writing new message to Firebase Database', error);
  });

}




/*function init() {
  firebase.database().ref('/experiment/open').once('value', function(snapshot) {
    var experimentoChave = snapshot.val();
    if(experimentoChave) {
      window.Geral = new Geral(experimentoChave);
    } else {
      window.location = "index.html?err=1";
    }
  });
}*/


firebase.auth().onAuthStateChanged(function(user) {
  if (user && user.isAnonymous == true) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
     uid = user.uid;

    firebase.database().ref('/experiment/open').once('value', function(snapshot) {
    var experimentoChave = snapshot.val();
    if(experimentoChave) {
       window.crea = new crea(experimentoChave);
    } else {
      window.sessionStorage.clear(); 
      window.localStorage.clear();
      window.location = "desculpe.html";
    }
  });


    // ...
  } else {
    // User is signed out.
    // ...
    console.log('Deslogado!');
    window.sessionStorage.clear(); 
      window.localStorage.clear();
      window.location = "index.html";
  }
  // ...
});
