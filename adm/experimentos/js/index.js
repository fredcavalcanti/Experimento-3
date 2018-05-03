var i = 0;
var a = 0;
var dim =0;
var numpart = 0;
var somadim = 0;

var idpartida = firebase.database() .ref("/experiment/");
      idpartida.orderByKey() .on("child_added", function(data) {
    
     var id_partida = data.key;
     
     if(id_partida != 'open')
     {
     	i++;
     }
     numpart = i;
     exps.innerText = numpart;


     var idparticipante = firebase.database() .ref("/experiment/" + id_partida + '/participant/');
     idparticipante.orderByKey() .on("child_added", function(data) {
    
     var id_participante = data.key;
     a++;
     parts.innerText = a;

     var var_rec = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante +  '/resultado').once('value').then(function(snapshot) {
      var rec_var = snapshot.val();
      somadim = somadim + rec_var;
      money.innerText = somadim + ',00';

 });
 });

});

