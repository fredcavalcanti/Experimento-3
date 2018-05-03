/*var tid = setInterval(init, 2000);*/

function aguarde(experimentoChave) {
   this.experimentoChave = experimentoChave;

   this.loading = document.getElementById("loading");

   this.userName = document.getElementById('user-name');
   this.link = document.getElementById('link');

}

aguarde.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.initFirebase();
  /*this.getID();*/
};

/*aguarde.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/' + QueryString.k).once('value').then(function(snapshot) {
    aguarde.userName.textContent=snapshot.val().id;

  });
}
*/
function init() {



  var idpartida = firebase.database() .ref("/experiment/");
      idpartida.orderByKey() .on("child_added", function(data) {
    
     var id_partida = data.key;

     var idparticipante = firebase.database() .ref("/experiment/" + id_partida + '/participant/');
     idparticipante.orderByKey() .on("child_added", function(data) {
    
     var id_participante = data.key;



var numerogrupo = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/group/' + 'number').once('value').then(function(snapshot) {
       var group_number = snapshot.val();
    
    

     /*var numerogrupo = firebase.database() .ref('/experiment/'+id_partida+'/participant/' + id_participante);
      numerogrupo.orderByChild('/group/') .once("child_added", function(data) {

      var group_number = data.val().number;*/


      var tipogrupo = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/group/' + 'tipo').once('value').then(function(snapshot) {
       var group_type = snapshot.val();
      
    

      /*var tipogrupo = firebase.database() .ref('/experiment/'+id_partida+'/participant/' + id_participante);
      tipogrupo.orderByChild('/group/') .once("child_added", function(data) {
      var group_type = data.val().tipo;*/


      var tent1 = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/answer/' + 'parte1QtdTentativas').once('value').then(function(snapshot) {
       var tent_1 = snapshot.val();
   


       var tent2 = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/answer/' + 'parte2QtdTentativas').once('value').then(function(snapshot) {
       var tent_2 = snapshot.val();
 


       /*var tent1 = firebase.database() .ref('/experiment/'+id_partida+'/participant/' + id_participante);
      tent1.orderByChild('/answer/') .once("child_added", function(data) {

      var tent_1 = data.val().parte1QtdTentativas;*/

      /*var tent2 = firebase.database() .ref('/experiment/'+id_partida+'/participant/' + id_participante);
      tent2.orderByChild('/answer/') .once("child_added", function(data) {

      var tent_2 = data.val().parte2QtdTentativas;*/
    
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


      var var_zerarpt1 = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/answer/' + 'vaizerarparte1').once('value').then(function(snapshot) {
      var zerar_pt1 = snapshot.val();
      if(zerar_pt1 == null && group_type == 'NPC')
      {
        zerar_pt1 = 'GRUPO NPC';
      }
      else
      {
        if(zerar_pt1 == true)
        {
          zerar_pt1 = 'Zerou a primeira Parte';
        }
        else
        {
          zerar_pt1 = 'Não zerou a primeira Parte';
        }
      }

      var var_zerarpt2 = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/answer/' + 'vaizerarparte2').once('value').then(function(snapshot) {
      var zerar_pt2 = snapshot.val();
      if(zerar_pt2 == null && group_type == 'NPC')
      {
        zerar_pt2 = 'GRUPO NPC';
      }
      else
      {
        if(zerar_pt2 == true)
        {
          zerar_pt2 = 'Zerou a segunda Parte';
        }
        else
        {
           zerar_pt2 = 'Não zerou a segunda Parte';
        }
      }

      var dual = ['','cod','cod','aud','aud','cod','cod','aud','aud','cod','cod','aud','aud','cod','cod','aud','aud','cod','cod','aud','aud','cod','cod','aud','aud','cod','cod','aud','aud','cod','cod','aud','aud','cod','cod','aud','aud','cod','cod','aud','aud'];
      if(dual[group_number] == 'cod')
      {
          var typeSou = 'Códgio de ética';
      }
      else
      {
          var typeSou = 'Auditoria'; 
      }

      var var_rec = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante +  '/resultado').once('value').then(function(snapshot) {
      var rec_var = snapshot.val();


      var var_pt1 = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/answer/' + '/parte/' + 'decisaodaparte1').once('value').then(function(snapshot) {
      var desc_pt1 = snapshot.val();

      var var_pt2 = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/answer/' + '/parte/' + 'decisaodaparte2').once('value').then(function(snapshot) {
      var desc_pt2 = snapshot.val();

      var var_end = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/' +  'end').once('value').then(function(snapshot) {
      var fim_end = snapshot.val();

      var var_start = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/' +  'start').once('value').then(function(snapshot) {
      var ini_start = snapshot.val();

      var aux_temp = fim_end - ini_start;
      
      if(aux_temp < 0)
      {
        var var_temp = 'Nao terminou o jogo!';
      }
      if(aux_temp > 0)
      {
        
        var min_utos = aux_temp/1000;
        var minuto_s = parseInt(min_utos);
        var m_inutos = minuto_s/60;
        var minutos = parseInt(m_inutos);
        var segundos = minuto_s%60;
        var var_temp = minutos + ':' + segundos;
          

      }

        var teste = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/id').once('value').then(function(snapshot) {
      var teste_1 = snapshot.val();
      var id_id = teste_1;
 


        var x = document.getElementsByClassName("odd");
        var i;
        for (i = 0; i < x.length; i++) {
        x[i].setAttribute('class','sorting_1');
        }   

    

    var local=document.getElementById('tabela');
    var tblBody = local.tBodies[0];
    var newRow = tblBody.insertRow(-1);

    var newCell0 = newRow.insertCell(0);
    newCell0.innerHTML = '<ta class="sorting_1">'+ id_partida + '</td>'; 
    var newCell1 = newRow.insertCell(1);
    newCell1.innerHTML = '<td>'+id_participante+'</td>';
  var newCell2 = newRow.insertCell(2);
  newCell2.innerHTML = '<td>'+group_number+'</td>';
  var newCell3 = newRow.insertCell(3);
  newCell3.innerHTML = '<td>'+group_type+` e ${typeSou}`+'</td>';
  var newCell4 = newRow.insertCell(4);
  newCell4.innerHTML = '<td>'+tent_1+'</td>';
  var newCell5 = newRow.insertCell(5);
  newCell5.innerHTML = '<td>'+id_id+'</td>';
  var newCell6 = newRow.insertCell(6);
  newCell6.innerHTML = '<td>'+ curso_aluno +'</td>';
  var newCell7 = newRow.insertCell(7);
  newCell7.innerHTML = '<td>'+ genero_aluno +'</td>';
  var newCell8 = newRow.insertCell(8);
  newCell8.innerHTML = '<td>'+ idade_alu +'</td>';
  var newCell9 = newRow.insertCell(9);
  newCell9.innerHTML = '<td>'+ inst_aluno +'</td>';
  var newCell10 = newRow.insertCell(10);
  newCell10.innerHTML = '<td>'+ ndp_aluno +'</td>';
  var newCell11 = newRow.insertCell(11);
  newCell11.innerHTML = '<td>'+ renda_aluno +'</td>';
  var newCell12 = newRow.insertCell(12);
  newCell12.innerHTML = '<td>'+ desc_pt1 +'</td>';
  var newCell13 = newRow.insertCell(13);
  newCell13.innerHTML = '<td>'+ desc_pt2 +'</td>';
  var newCell14 = newRow.insertCell(14);
  newCell14.innerHTML = '<td>'+ zerar_pt1 +'</td>'
  var newCell15 = newRow.insertCell(15);
  newCell15.innerHTML = '<td>'+ zerar_pt2 +'</td>'
  var newCell16 = newRow.insertCell(16);
  newCell16.innerHTML = '<td>'+ rec_var +'</td>';
  var newCell17 = newRow.insertCell(17);
  newCell17.innerHTML = '<td>'+ var_temp +'</td>';



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


}

//function fnExcelReport()
//{
/*const exportador = document.getElementsByClassName('exporte');

  exportador[0].addEventListener('click' , () =>{
      var tab_text="<table border='2px'><tr bgcolor='#87AFC6'>";
    var textRange; var j=0;
    tab = document.getElementById('tabela'); // id of table

    for(j = 0 ; j < tab.rows.length ; j++) 
    {     
        tab_text=tab_text+tab.rows[j].innerHTML+"</tr>";
        //tab_text=tab_text+"</tr>";
    }

    tab_text=tab_text+"</table>";
    tab_text= tab_text.replace(/<A[^>]*>|<\/A>/g, "");//remove if u want links in your table
    tab_text= tab_text.replace(/<img[^>]*>/gi,""); // remove if u want images in your table
    tab_text= tab_text.replace(/<input[^>]*>|<\/input>/gi, ""); // reomves input params

    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE "); 

    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./))      // If Internet Explorer
    {
        txtArea1.document.open("txt/html","replace");
        txtArea1.document.write(tab_text);
        txtArea1.document.close();
        txtArea1.focus(); 
        sa=txtArea1.document.execCommand("SaveAs",true,"Say Thanks to Sumit.xls");
    }  
    else                 //other browser not tested on IE 11
        sa = window.open('data:application/vnd.ms-excel,' + encodeURIComponent(tab_text));  

    return (sa);
  });
    */


const procurador = document.getElementsByClassName('procurendo');

procurador[0].addEventListener('focus' , () => {

  
});



var tableToExcel = (function() {
  var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
  return function(table, name) {
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
    //window.location.href = uri + base64(format(template, ctx))
    var downloadName = prompt("Escolha um nome para exportar:", "table");
    var link = document.createElement("a");
    link.download = downloadName + ".xls";
    link.href = uri + base64(format(template, ctx));
    link.click();
  }
})()