const nome = document.getElementById('mynameis');
const email = document.getElementById('myemailis');
const foto = document.getElementById('mypicture');
var a = 0;



const logout = document.getElementById('logout');


logout.addEventListener('click' , a => {

	 window.sessionStorage.clear(); 
	 window.localStorage.clear(); 
	 window.location.href="index";
});



firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser && firebaseUser.isAnonymous == false){

		/*firebaseUser.updateProfile({
              displayName: 'Frederico Sampaio',
              photoURL: 'https://scontent-gig.xx.fbcdn.net/v/t1.0-9/12250098_740026739461525_431530568825237912_n.jpg?oh=81ddc7edeac560db229599ada1893acb&oe=5B02066D'
            }).then(function() {
                console.log('OK!')
            }).catch(function(error) {
              // An error happened.
            });*/
    	
    	/*console.log("  Name: "+firebaseUser.displayName);
    	console.log("  Email: "+firebaseUser.email);
    	console.log("  Photo URL: "+firebaseUser.photoURL);*/
    	nome.textContent = firebaseUser.displayName;
    	email.textContent = firebaseUser.email;
    	foto.setAttribute('src',firebaseUser.photoURL);

		}
		else
		{
			//console.log('Deslogado!')
			window.sessionStorage.clear(); 
	 		window.localStorage.clear(); 
			window.location.href="index";
		}
	});
