var values = [];

function aguarde(experimentoChave , idplayer) {
   this.experimentoChave = experimentoChave;
   this.idplayer = idplayer;

   this.loading = document.getElementById("loading");

   this.userName = document.getElementById('user-name');
   this.link = document.getElementById('link');
  this.initFirebase();
}

aguarde.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.getID();
};
//Pega ID e Coloca no Content
aguarde.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/' + this.idplayer).once('value').then(function(snapshot) {
    aguarde.userName.textContent=snapshot.val().id;
     Carregar();
  });
}
//Principal Função
function Carregar() {

	// Pegando Número do Grupo
	var numerogrupo = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/participant/' + aguarde.idplayer + '/group/' + 'number').once('value').then(function(snapshot) {
       var group_number = snapshot.val();

     //Pegando Chave de acesso De todos do Grupo 
       var playersRef = firebase.database() .ref('/experiment/'+aguarde.experimentoChave+'/group/' + group_number );
       playersRef.orderByKey() .on("child_added", function(data) {
     	var chave_geral = data.key;

     	//Pegando o ID
     	var idparti = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/group/' + group_number + '/' + chave_geral).once('value').then(function(snapshot) {
       var id_parti = snapshot.val();

       //Consultando o ID  -> Descobrindo a decisão da parte2
       var idp = firebase.database().ref('/experiment/' + aguarde.experimentoChave + '/participant/' + id_parti).once('value').then(function(snapshot) {
       var id_p = snapshot.val();
       values.push(id_p.answer.parte.decisaodaparte2);
       verificador();

			//IF ERROR:
       		}).catch(function(error) {
    			// Tem Player Que Não Respondeu Ainda || Error comum
    			console.log('Error');
    			 var resp = firebase.database() .ref('/experiment/' + aguarde.experimentoChave + '/participant/' );
       			resp.orderByChild(id_parti) .on("child_changed", function(data) {
       				location.reload();

       		});
		  });
   		});
     });
   });


	
	}
//Verificador de resultado
function verificador(){
	if(values[2]) // Se todos os players já tomaram sua decisão
	{
		if(values[0] == values[1] && values[0] == values[2] && values[1] == values[2]) // comparando as decisões
		{
			var decide = true;
			console.log(decide);
			var idp = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/participant/' + aguarde.idplayer + '/answer/').update({
				vaizerarparte2: false  // Se Todos são iguais -> Não zera a parte 1
			}).then(function(snapshot) {			
				window.location.href="parte-final.html";  //Prox Pag
			});
		}
		else // DECISÕES DIFERENTES
		{
			var decide = false;
			console.log(decide);
			var idp = firebase.database().ref('/experiment/'+aguarde.experimentoChave+'/participant/' + aguarde.idplayer + '/answer/').update({
				vaizerarparte2: true // Se existe decisões diferentes -> Zera a parte 1
			}).then(function(snapshot) {
				window.location.href="parte-final.html";  //Prox Pag
			});			
		}
	}
	else  // Se todos os players ainda não tomaram sua decisão
	{
		return;
	}
}


// Base Start do Script - > ID + Chave
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
              var idplayer = firebaseUser.photoURL;
              var experimentoChave = firebaseUser.displayName;
              window.aguarde = new aguarde(experimentoChave , idplayer);
    }
    else
    {
      console.log('Deslogado!');
    }
  });




setTimeout(function()
  { 
     location.href = 'aguardept2.html';
  }, 10000);
