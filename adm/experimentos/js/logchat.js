    const pid = document.getElementById('partidaid');
    const msg1 = document.getElementById('msg1');
    const sel1 = document.getElementById('sel');
    const btnsel = document.getElementsByClassName('dropdown-menu');
    var gg = document.getElementsByTagName('input');
    var p = 1;
    var idpt;
    var i=0;
    var id1;
    var id2;
    var id3;
    var ko=1;
    var id_partidaold = '';
    var group_numberold = '';
    var idpartold = '';
    var msgpartold = '';
    var groupold = '';
    var gjh = 0;
    var texto = [''];
    var meucontrole = 0;
    var meucontrole2 =0;

    window.localStorage.setItem('grupo', 0);
    window.localStorage.setItem('idzao', 0);

      var idpartida = firebase.database() .ref("/experiment/");
      idpartida.orderByKey() .on("child_added", function(data) {

     var id_partida = data.key;
     if(id_partida != 'open')
     {
        btnsel[2].innerHTML += '<li data-original-index="'+p+'"><a tabindex="0" class="" style="" data-tokens="null"><span class="text">'+id_partida+'<small class="text-muted">Partida '+p+'</small></span><span class="glyphicon glyphicon-ok check-mark"></span></a></li>';
        sel1.innerHTML += '<option data-subtext="Partida '+p+'">'+id_partida+'</option>'
        p++;
      }
     var msg_var = firebase.database() .ref('/experiment/'+id_partida+'/messages/' +'1');
      msg_var.orderByKey() .on("child_added", function(data) {
      var msg = data.val();
        
     




     /* if(i==0)
      {
        id1 = msg.participant;
        i++;
      }
      if(msg.participant != id1 && id2 == undefined)
      {
        id2 = msg.participant;
      }
      if(msg.participant != id1 && msg.participant != id2 && id3 == undefined)
      {
        id3 = msg.participant;
      }
      console.log('idpartida: ' + id_partida);
      console.log('idpt: ' + idpt);
    if(idpt == undefined || idpt != id_partida)
      {
        idpt = id_partida;
            princ.innerHTML += '<div class="alert alert-danger" style="text-align:center;">' +'Partida: ' + id_partida + ' - Grupo: 4'+'</div>';
      }
      if(msg.participant == id1)
      {
        princ.innerHTML += '<div class="alert alert-success">' +'ID: ' + msg.participant+' --> ' + msg.text +'</div>';
      }
      if(msg.participant == id2)
      {
        princ.innerHTML += '<div class="alert alert-info">' +'ID: ' + msg.participant+' --> ' + msg.text +'</div>';
      }
      if(msg.participant == id3)
      {
        princ.innerHTML += '<div class="alert alert-warning">' +'ID: ' + msg.participant+' --> ' + msg.text +'</div>';
      }*/


      
 });
      });
      
var x=1;
    
var y = document.getElementsByTagName('select');
var meubtn = document.getElementsByClassName('bg-indigo');


      y[0].addEventListener('change' , () => {
        if(y[0].value != 'Selecionar' )
        {
          meubtn[4].removeAttribute('disabled');
        }
        else
        {
          meubtn[4].setAttribute('disabled','');
        }
        
      });

  meubtn[4].addEventListener('click' , () =>{

    var id_partida = y[0].value;
      var msg_var = firebase.database() .ref('/experiment/'+id_partida+'/messages/' + gg[0].value);
      msg_var.orderByKey() .on("child_added", function(data) {
      var msg = data.val();
        
      if(i==0)
      {
        id1 = msg.participant;
        i++;
      }
      if(msg.participant != id1 && id2 == undefined)
      {
        id2 = msg.participant;
      }
      if(msg.participant != id1 && msg.participant != id2 && id3 == undefined)
      {
        id3 = msg.participant;
      }
      console.log('idpartida: ' + id_partida);
      console.log('idpt: ' + idpt);
    if(idpt == undefined || idpt != id_partida)
      {
        idpt = id_partida;
            princ.innerHTML += '<div class="alert alert-danger" style="text-align:center;">' +'Partida: ' + id_partida + ' - Grupo: '+ gg[0].value +'</div>';
      }
      if(msg.participant == id1)
      {
        princ.innerHTML += '<div class="alert alert-success">' +'ID: ' + msg.participant+' --> ' + msg.text +'</div>';
      }
      if(msg.participant == id2)
      {
        princ.innerHTML += '<div class="alert alert-info">' +'ID: ' + msg.participant+' --> ' + msg.text +'</div>';
      }
      if(msg.participant == id3)
      {
        princ.innerHTML += '<div class="alert alert-warning">' +'ID: ' + msg.participant+' --> ' + msg.text +'</div>';
      }
       
       meubtn[4].setAttribute('style','display:none');});
        meubtn[5].removeAttribute('disabled');

  });


  meubtn[5].addEventListener('click' , () =>{
      location.reload();
  });


// EXPORTANDO A PARTE 1 NPC

  var exportadorpc = document.getElementsByClassName('bg-indigo');
  exportadorpc[2].addEventListener('click' , () =>{

     var idpartida = firebase.database() .ref("/experiment/");
      idpartida.orderByKey() .on("child_added", function(data) {

     var id_partida = data.key;


      var msg_num = firebase.database() .ref('/experiment/'+id_partida+'/messages/');
      msg_num.orderByKey() .on("child_added", function(data) {

      var numeroConversa = data.key;

      var msg_var2 = firebase.database() .ref('/experiment/'+id_partida+'/messages/' + numeroConversa + '/');
      msg_var2.orderByKey() .on("child_added", function(data) {

      var msg2 = data.key;
      

           var con_versa = firebase.database().ref('/experiment/'+id_partida+'/messages/'+ numeroConversa + '/'+ msg2).once('value').then(function(snapshot) {
           var conversa = snapshot.val();

               var idpart = conversa.participant;    
               var msgpart = conversa.text;
               
       //   console.log(group_number);
         // console.log(group_number%2);

    if(numeroConversa%2 != 0)
    {
          var local=document.getElementById('tabelaNPC');
          var tblBody = local.tBodies[0];
          var newRow = tblBody.insertRow(-1);
          var newCell0 = newRow.insertCell(0);
          newCell0.innerHTML = '<td>'+ id_partida + '</td>';
          var newCell1 = newRow.insertCell(1);
          newCell1.innerHTML = '<td>'+ numeroConversa + '</td>';
          var newCell2 = newRow.insertCell(2);
          newCell2.innerHTML = '<td>'+ idpart + '</td>'; 
          var newCell3 = newRow.insertCell(3);
         newCell3.innerHTML = '<td>'+ msgpart + '</td>';
    }
      
      tableToExcel('tabelaNPC', 'TabelaNPC-Parte-1');

     });
    });
});
    });
    });


// EXPORTANDO A PARTE 1 NPC








// EXPORTANDO A PARTE 2 NPC

  var exportadorpc = document.getElementsByClassName('bg-indigo');
  exportadorpc[0].addEventListener('click' , () =>{

     var idpartida = firebase.database() .ref("/experiment/");
      idpartida.orderByKey() .on("child_added", function(data) {

     var id_partida = data.key;


      var msg_num = firebase.database() .ref('/experiment/'+id_partida+'/messages2/');
      msg_num.orderByKey() .on("child_added", function(data) {

      var numeroConversa = data.key;

      var msg_var2 = firebase.database() .ref('/experiment/'+id_partida+'/messages2/' + numeroConversa + '/');
      msg_var2.orderByKey() .on("child_added", function(data) {

      var msg2 = data.key;
      

           var con_versa = firebase.database().ref('/experiment/'+id_partida+'/messages2/'+ numeroConversa + '/'+ msg2).once('value').then(function(snapshot) {
           var conversa = snapshot.val();

               var idpart = conversa.participant;    
               var msgpart = conversa.text;
               
       //   console.log(group_number);
         // console.log(group_number%2);

    if(numeroConversa%2 != 0)
    {
          var local=document.getElementById('tabelaNPC2');
          var tblBody = local.tBodies[0];
          var newRow = tblBody.insertRow(-1);
          var newCell0 = newRow.insertCell(0);
          newCell0.innerHTML = '<td>'+ id_partida + '</td>';
          var newCell1 = newRow.insertCell(1);
          newCell1.innerHTML = '<td>'+ numeroConversa + '</td>';
          var newCell2 = newRow.insertCell(2);
          newCell2.innerHTML = '<td>'+ idpart + '</td>'; 
          var newCell3 = newRow.insertCell(3);
         newCell3.innerHTML = '<td>'+ msgpart + '</td>';
    }
      
      tableToExcel('tabelaNPC2', 'TabelaNPC-Parte-2');

     });
    });
});
    });
    });


// EXPORTANDO A PARTE 2 NPC






// EXPORTANDO A PARTE 1 PC


  var exportadorpc = document.getElementsByClassName('bg-indigo');
  exportadorpc[3].addEventListener('click' , () =>{

     var idpartida = firebase.database() .ref("/experiment/");
      idpartida.orderByKey() .on("child_added", function(data) {

     var id_partida = data.key;


      var msg_num = firebase.database() .ref('/experiment/'+id_partida+'/messages/');
      msg_num.orderByKey() .on("child_added", function(data) {

      var numeroConversa = data.key;

      var msg_var2 = firebase.database() .ref('/experiment/'+id_partida+'/messages/' + numeroConversa + '/');
      msg_var2.orderByKey() .on("child_added", function(data) {

      var msg2 = data.key;
      

           var con_versa = firebase.database().ref('/experiment/'+id_partida+'/messages/'+ numeroConversa + '/'+ msg2).once('value').then(function(snapshot) {
           var conversa = snapshot.val();

               var idpart = conversa.participant;    
               var msgpart = conversa.text;
               
       //   console.log(group_number);
         // console.log(group_number%2);

    if(numeroConversa%2 == 0)
    {
          var local=document.getElementById('tabelaPC');
          var tblBody = local.tBodies[0];
          var newRow = tblBody.insertRow(-1);
          var newCell0 = newRow.insertCell(0);
          newCell0.innerHTML = '<td>'+ id_partida + '</td>';
          var newCell1 = newRow.insertCell(1);
          newCell1.innerHTML = '<td>'+ numeroConversa + '</td>';
          var newCell2 = newRow.insertCell(2);
          newCell2.innerHTML = '<td>'+ idpart + '</td>'; 
          var newCell3 = newRow.insertCell(3);
         newCell3.innerHTML = '<td>'+ msgpart + '</td>';
    }
      
      tableToExcel('tabelaPC', 'TabelaPC-Parte-1');

     });
    });
});
    });
    });



    // EXPORTANDO A PARTE 1 PC




    // EXPORTANDO A PARTE 2 PC



  var exportadorpc = document.getElementsByClassName('bg-indigo');
  exportadorpc[1].addEventListener('click' , () =>{

     var idpartida = firebase.database() .ref("/experiment/");
      idpartida.orderByKey() .on("child_added", function(data) {

     var id_partida = data.key;


      var msg_num = firebase.database() .ref('/experiment/'+id_partida+'/messages2/');
      msg_num.orderByKey() .on("child_added", function(data) {

      var numeroConversa = data.key;

      var msg_var2 = firebase.database() .ref('/experiment/'+id_partida+'/messages2/' + numeroConversa + '/');
      msg_var2.orderByKey() .on("child_added", function(data) {

      var msg2 = data.key;
      

           var con_versa = firebase.database().ref('/experiment/'+id_partida+'/messages2/'+ numeroConversa + '/'+ msg2).once('value').then(function(snapshot) {
           var conversa = snapshot.val();

               var idpart = conversa.participant;    
               var msgpart = conversa.text;
               
       //   console.log(group_number);
         // console.log(group_number%2);

    if(numeroConversa%2 == 0)
    {
          var local=document.getElementById('tabelaPC2');
          var tblBody = local.tBodies[0];
          var newRow = tblBody.insertRow(-1);
          var newCell0 = newRow.insertCell(0);
          newCell0.innerHTML = '<td>'+ id_partida + '</td>';
          var newCell1 = newRow.insertCell(1);
          newCell1.innerHTML = '<td>'+ numeroConversa + '</td>';
          var newCell2 = newRow.insertCell(2);
          newCell2.innerHTML = '<td>'+ idpart + '</td>'; 
          var newCell3 = newRow.insertCell(3);
         newCell3.innerHTML = '<td>'+ msgpart + '</td>';
    }
      
      tableToExcel('tabelaPC2', 'TabelaPC-Parte-2');

     });
    });
});
    });
    });



    // EXPORTANDO A PARTE 2 PC




  var tableToExcel = (function() {
  var uri = 'data:application/vnd.ms-excel;base64,'
    , template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>'
    , base64 = function(s) { return window.btoa(unescape(encodeURIComponent(s))) }
    , format = function(s, c) { return s.replace(/{(\w+)}/g, function(m, p) { return c[p]; }) }
  return function(table, name) {
    if (!table.nodeType) table = document.getElementById(table)
    var ctx = {worksheet: name || 'Worksheet', table: table.innerHTML}
    
    window.location.href = uri + base64(format(template, ctx))
    
  }
})()





 
  function exportadorGeral() {

     var idpartida = firebase.database() .ref("/experiment/");
      idpartida.orderByKey() .on("child_added", function(data) {

     var id_partida = data.key;


      var msg_num = firebase.database() .ref('/experiment/'+id_partida+'/messages/');
      msg_num.orderByKey() .on("child_added", function(data) {

      var numeroConversa = data.key;

      var msg_var2 = firebase.database() .ref('/experiment/'+id_partida+'/messages/' + numeroConversa + '/');
      msg_var2.orderByKey() .on("child_added", function(data) {

      var msg2 = data.key;
      

           var con_versa = firebase.database().ref('/experiment/'+id_partida+'/messages/'+ numeroConversa + '/'+ msg2).once('value').then(function(snapshot) {
           var conversa = snapshot.val();
 
               var msgpart = conversa.text;
              

               texto[0] += msgpart + ' \r\n';

     }).then(a =>{

      if(meucontrole == 0)
      {
        exportadorGeral2();
        meucontrole++;
      }
      else
      {
        return;
      }
      

    });
    });
});
    });
    }





  function exportadorGeral2() {

     var idpartida = firebase.database() .ref("/experiment/");
      idpartida.orderByKey() .on("child_added", function(data) {

     var id_partida = data.key;


      var msg_num = firebase.database() .ref('/experiment/'+id_partida+'/messages2/');
      msg_num.orderByKey() .on("child_added", function(data) {

      var numeroConversa = data.key;

      var msg_var2 = firebase.database() .ref('/experiment/'+id_partida+'/messages2/' + numeroConversa + '/');
      msg_var2.orderByKey() .on("child_added", function(data) {

      var msg2 = data.key;
      

           var con_versa = firebase.database().ref('/experiment/'+id_partida+'/messages2/'+ numeroConversa + '/'+ msg2).once('value').then(function(snapshot) {
           var conversa = snapshot.val();
 
               var msgpart = conversa.text;
              

               texto[0] += msgpart + ' \r\n';

     }).then(a =>{

      if(meucontrole2 == 0)
      {
        var blob = new Blob([texto], {type: "text/html;charset=utf-8"});
       saveAs(blob, "conversas.txt"); 
       meucontrole2++;
      }
      else
      {
        return;
      }
      

    });
    });
});
    });
    }
