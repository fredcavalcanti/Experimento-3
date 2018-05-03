const emailuser = document.getElementById('email');
const password = document.getElementById('senha');
const erroremail = document.getElementById('div-email');
const errorsenha = document.getElementById('div-senha')
const btnlogin = document.getElementById('login');


btnlogin.addEventListener('click' , a => {

	if(emailuser.value =='' || emailuser.value == undefined || emailuser.value == null)
	{
		erroremail.removeAttribute('hidden');
	}
	else
	{
		erroremail.setAttribute('hidden','');
	}
	if(password.value =='' || password.value == undefined || password.value == null)
	{
		errorsenha.removeAttribute('hidden');
	}
	else
	{
		errorsenha.setAttribute('hidden','');
	}

	validalogin();
});

function validalogin(){
	if(emailuser.value != '' && emailuser.value != undefined && emailuser.value != null && password.value != '' && password.value != undefined && password.value != null)
	{
		

	const email = emailuser.value;
	const pass = password.value;
	const auth = firebase.auth();

	const promise = auth.signInWithEmailAndPassword(email,pass);
	promise.catch(e => alert('Usuário ou senha incorreto!'));
	emailuser.value = '';
	password.value = '';
	}

}



	firebase.auth().onAuthStateChanged(firebaseUser => {
		if(firebaseUser && firebaseUser.isAnonymous == false){

		/*console.log(firebaseUser.isAnonymous);
    	console.log("  Name: "+firebaseUser.displayName);
    	console.log("  Email: "+firebaseUser.email);
    	console.log("  Photo URL: "+firebaseUser.photoURL);*/
    	

		window.location.href="home";
		}
		else
		{
			//console.log('Deslogado!')
			window.sessionStorage.clear(); 
			window.localStorage.clear(); 
			
		}
	});