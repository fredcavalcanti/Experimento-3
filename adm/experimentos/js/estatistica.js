var soma = 0;
          var a= 0;
          var somadim = 0;
          var mascu=0;
          var femi=0;
          var somaidade=0;
          var contapt1 =0;
          var contapt2 = 0;
          var femides1 = 0;
          var femides2 = 0;
          var mascdes1 = 0;
          var mascdes2 = 0;
          var out = 0;

          var idpartida = firebase.database() .ref("/experiment/");
          idpartida.orderByKey() .on("child_added", function(data) {
        
         var id_partida = data.key;
    
         var idparticipante = firebase.database() .ref("/experiment/" + id_partida + '/participant/');
         idparticipante.orderByKey() .on("child_added", function(data) {
        
         var id_participante = data.key;
         if(id_participante != null || id_participante != 'null')
         {
            a++
         }

         var var_gen = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/quiz/' + 'genero').once('value').then(function(snapshot) {
      var genero_aux = snapshot.val();
  
      if(genero_aux == 'M')
      {
        var genero_aluno = 'Masculino';
        mascu++;
      }
      if(genero_aux == 'F')
      {
        var genero_aluno = 'Feminino';
        femi++;
      }
      if(genero_aux == 'Outro')
      {
         var genero_aluno = 'Outro';
         out++;
      }
     
     
      var var_end = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/' +  'end').once('value').then(function(snapshot) {
      var fim_end = snapshot.val();

      var var_start = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/' +  'start').once('value').then(function(snapshot) {
      var ini_start = snapshot.val();
      var aux_temp = fim_end - ini_start;
      soma = soma + aux_temp;
      var resultado1 = soma/a;
      var auxiliando1 = parseInt(resultado1);
      var resultado2 = auxiliando1/1000;
      var auxiliando2 = parseInt(resultado2);
      var resultado3 = auxiliando2/60;
      var auxiliando3 = parseInt(resultado3); // Minutos auxiliando 3
      var resultado4 = auxiliando2%60;

      var var_rec = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante +  '/resultado').once('value').then(function(snapshot) {
      var rec_var = snapshot.val();
      somadim = somadim + rec_var;

      var var_idade = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/quiz/' + 'idade').once('value').then(function(snapshot) {
      var idade_alu = snapshot.val();
      var idadedoaluno = parseInt(idade_alu);
      somaidade = somaidade + idadedoaluno;
      var mediaidade2 = somaidade/a;
      var mediaidade = parseInt(mediaidade2);

      var var_pt1 = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/answer/' + '/parte/' + 'decisaodaparte1').once('value').then(function(snapshot) {
      var desc_pt1 = snapshot.val();
      if(desc_pt1!=1)
      {
        contapt1++;
        if(genero_aux == 'M')
      {
        mascdes1++;
      }
      if(genero_aux == 'F')
      {
        femides1++;
      }
      }

      var var_pt2 = firebase.database().ref('/experiment/'+id_partida+'/participant/' + id_participante + '/answer/' + '/parte/' + 'decisaodaparte2').once('value').then(function(snapshot) {
      var desc_pt2 = snapshot.val();
      if(desc_pt2!=2)
      {
        contapt2++;
        if(genero_aux == 'M')
      {
        mascdes2++;
      }
      if(genero_aux == 'F')
      {
        femides2++;
      }
      }
      

      document.getElementById("Teste").innerText = a ;
      document.getElementById("Teste1").innerText = femi ;
      document.getElementById("Teste2").innerText = mascu ;
      document.getElementById("Teste12").innerText = out ;
    document.getElementById("Teste5").innerText = mediaidade ;
      //document.getElementById("Teste3").innerHTML = auxiliando3 + ' Minutos e ' + resultado4 + ' Segundos';
      document.getElementById("Teste4").innerText = somadim +',00';
      document.getElementById("Teste6").innerText = contapt1 ;
      document.getElementById("Teste7").innerText = contapt2 ;
      document.getElementById("Teste8").innerText = mascdes1 ;
      document.getElementById("Teste9").innerText = femides1 ;
      document.getElementById("Teste10").innerText = mascdes2 ;
      document.getElementById("Teste11").innerText = femides2 ;


    });
      });
      });
      });
      });
      });
      });
         });
         });