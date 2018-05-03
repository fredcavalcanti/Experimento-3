	const btn = document.getElementById("logme");

	btn.addEventListener('click' , e =>{

		firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
  .then(function() {
    // Existing and future Auth states are now persisted in the current
    // session only. Closing the window would clear any existing state even
    // if a user forgets to sign out.
    // ...
    // New sign-in will be persisted with session persistence.
    return firebase.auth().signInAnonymously().catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
	});
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
  });



	});



firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;

    /*console.log('Logado!');
    console.log('ID: ' + uid);
    console.log('É Anonimo? ' + isAnonymous);*/

    if(user.isAnonymous)
    {
      window.location.href="geral.html";
    }
    else
    {
      window.sessionStorage.clear(); 
      window.localStorage.clear();
      window.location = "index.html";
    }

  } else {
    // User is signed out.
    // ...
    console.log('Deslogado!');
  }
  // ...
});
