var inp = document.getElementsByClassName('form-control');
var btn = document.getElementsByClassName('btn');
var masc = document.getElementsByClassName('radio-col-red');
var fem = document.getElementsByClassName('radio-col-pink');
var out = document.getElementsByClassName('radio-col-purple');

var idpartida = firebase.database() .ref("/experiment/");
      idpartida.orderByKey() .on("child_added", function(data) {
    
     var id_partida = data.key;

     var idparticipante = firebase.database() .ref("/experiment/" + id_partida + '/participant/');
     idparticipante.orderByKey() .on("child_added", function(data) {
    
     var id_participante = data.key;
    


     var numeroid = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/id').once('value').then(function(snapshot) {
       var id_number = snapshot.val();
      


       var var_curso = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/quiz/' + 'curso').once('value').then(function(snapshot) {
       var curso_aluno = snapshot.val();
   


      var var_gen = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/quiz/' + 'genero').once('value').then(function(snapshot) {
      var genero_aux = snapshot.val();
  
      if(genero_aux == 'M')
      {
        var genero_aluno = 'Masculino';
      }
      if(genero_aux == 'F')
      {
        var genero_aluno = 'Feminino';
      }
      if(genero_aux == 'Outro')
      {
      	var genero_aluno = 'Outro';
      }

      var var_idade = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/quiz/' + 'idade').once('value').then(function(snapshot) {
      var idade_alu = snapshot.val();


      var var_inst = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/quiz/' + 'instituicaoEnsino').once('value').then(function(snapshot) {
      var inst_aluno = snapshot.val();


      var var_ndp = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/quiz/' + 'numeroPessoas').once('value').then(function(snapshot) {
      var ndp_aluno = snapshot.val();


      var var_renda = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/quiz/' + 'renda').once('value').then(function(snapshot) {
      var renda_aluno = snapshot.val();

      btn[0].addEventListener('click' , () => {
      	if(inp[0].value == id_number)
     	{
     		inp[1].value = idade_alu + ' Anos';
     		inp[2].value = inst_aluno;
     		inp[3].value = curso_aluno;
     		inp[4].value = 'R$ '+renda_aluno;
     		inp[5].value = ndp_aluno;
     		if(genero_aluno == 'Masculino')
     		{
     			masc[0].setAttribute('checked','');
     		}
     		if(genero_aluno == 'Feminino')
     		{
     			fem[0].setAttribute('checked','');
     		}
     		if(genero_aluno == 'Outro')
     		{
     			out[0].setAttribute('checked','');
     		}

      	}

      });





 });
});
 });
       });
});
 });
        });
});
 });