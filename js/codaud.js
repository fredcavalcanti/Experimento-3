function codaud(experimentoChave , idplayer) {
  this.experimentoChave = experimentoChave;
  this.idplayer = idplayer;
  // Shortcuts to DOM Elements.
  this.userName = document.getElementById('user-name');

  this.msg1 = document.getElementById('msg1');
  this.msg2 = document.getElementById('msg2');

  this.link = document.getElementById('link');

  this.initFirebase();

  //setTimeout(startCountdown,1000);
}

codaud.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.getID();
  this.carregarMenssagem();
};

codaud.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/'+this.idplayer).once('value').then(function(snapshot) {
    codaud.userName.textContent=snapshot.val().id;
  });
}


codaud.prototype.carregarMenssagem = function() {

firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/').startAt(codaud.idplayer).once('value', function(snapshot) {

    
    var participants = snapshot.val();
    var qtd=0;
    var numeroGrupo=1;
    
    for(var p in participants) {
      console.log("P: "+p);
      qtd++;
      if(qtd>3) {
              qtd=1;
              numeroGrupo++;
      }
      if(p == codaud.idplayer) {
        if(participants[p].group) {
          console.log(numeroGrupo); 
          break;
        }
      }
    }

var dual = ['','cod','cod','aud','aud','cod','cod','aud','aud','cod','cod','aud','aud','cod','cod','aud','aud','cod','cod','aud','aud','cod','cod','aud','aud','cod','cod','aud','aud','cod','cod','aud','aud','cod','cod','aud','aud','cod','cod','aud','aud'];

  if(dual[numeroGrupo] == 'cod')
  {
    firebase.database().ref('/experiment/' + codaud.experimentoChave + '/participant/' + codaud.idplayer + '/group/' ).once('value').then(function(snapshot) {
            
            var meugrupo = snapshot.val().number;
            var ty = snapshot.val();
    if(ty.tipo == 'NPC')
        {
            const ativa = document.getElementById('okbtn');

            codaud.msg1.textContent = 'A parte 2 do experimento é similar a parte 1.';
            codaud.msg2.innerHTML = '<b>ATENÇÃO:</b>Você permanecerá com o mesmo grupo da parte 1.<br> Logo, Os números informados pelos outros membros do grupo <b>não afetarão</b> os seus pontos e o número que você informar, também não afetará os pontos dos outros participantes. Antes de informar o número, você terá a possibilidade de interagir com os demais membros do grupo.<br><br>Na parte 2 do experimento, você assistirá a outro vídeo com o lançamento de um dado.<br>O vídeo que você verá será selecionado aleatoriamente pelo computador e cada um dos seis números possui igual probabilidade de aparecer na tela.<br>A sua decisão de qual número registrar será tomada em grupo: o sistema escolherá, aleatoriamente, outros dois participantes que farão com você um grupo de três pessoas.Todos os membros do seu grupo verão o mesmo vídeo do lançamento do dado.<br><br><b>Sua tarefa:</b> Sua tarefa será memorizar o resultado do lançamento do dado e digitar na tela seguinte.<br><br><b><u>Seus pontos para essa tarefa:</u></b>';
            okbtn.setAttribute('href','codigo.html')
            okbtn.removeAttribute('disabled');
        }
        else
        {
          const ativa = document.getElementById('okbtn');

            codaud.msg1.textContent = 'A parte 2 do experimento é similar a parte 1.';
            codaud.msg2.innerHTML = '<b>ATENÇÃO:</b>Você permanecerá com o mesmo grupo da parte 1.<br> Logo, vocês ainda deverão informar o mesmo número que os outros participantes do grupo.<br>Todos os membros do grupo devem informar o mesmo número: caso pelo menos um participante informe um número diferente, todos os membros do grupo receberão 0 (zero) pontos.Antes de informar o número, você terá a possibilidade de interagir com os demais membros do grupo.<br>Na parte 2 do experimento, você assistirá a outro vídeo com o lançamento de um dado.<br>O vídeo que você verá será selecionado aleatoriamente pelo computador e cada um dos seis números possui igual probabilidade de aparecer na tela.<br>A sua decisão de qual número registrar será tomada em grupo: o sistema escolherá, aleatoriamente, outros dois participantes que farão com você um grupo de três pessoas.Todos os membros do seu grupo verão o mesmo vídeo do lançamento do dado.<br><br><b>Sua tarefa:</b> Sua tarefa será memorizar o resultado do lançamento do dado e digitar na tela seguinte.<br><br><b><u>Seus pontos para essa tarefa:</u></b>';
            okbtn.setAttribute('href','codigo.html')
            okbtn.removeAttribute('disabled');
        }


  
       });
  }
  else if(dual[numeroGrupo] == 'aud')
  {
    firebase.database().ref('/experiment/' + codaud.experimentoChave + '/participant/' + codaud.idplayer + '/group/' ).once('value').then(function(snapshot) {
            
            var meugrupo = snapshot.val().number;
            var tz = snapshot.val().tipo;
            if(tz == 'NPC')
            {
                const ativa = document.getElementById('okbtn');

                codaud.msg1.innerHTML = 'A parte 2 do experimento é similar a parte 1, sendo que agora, o seu grupo estará sujeito a passar por um <b><u>processo de auditoria.</b></u>';
                codaud.msg2.innerHTML = 'A todo momento, o seu grupo estará sujeito a passar por um processo de auditoria que o sistema realiza: de forma aleatória, o sistema escolhe um participante do grupo, dentre todos que estão participando, e fiscaliza se o número informado no vídeo do lançamento do dado é igual ao informado pelo grupo. Caso seja diferente, o participante <b><u>receberá 0 (zero) pontos</b></u> nessa etapa do experimento.<br><br><b>ATENÇÃO:</b>Você permanecerá com o mesmo grupo da parte 1. Logo, Os números informados pelos outros membros do grupo não afetarão os seus pontos e o número que você informar, também não afetará os pontos dos outros participantes. Antes de informar o número, você terá a possibilidade de interagir com os demais membros do grupo.<br><br>Na parte 2 do experimento, você assistirá a outro vídeo com o lançamento de um dado.O vídeo que você verá será selecionado aleatoriamente pelo computador e cada um dos seis números possui igual probabilidade de aparecer na tela.<br>A sua decisão de qual número registrar será tomada em grupo: o sistema escolherá, aleatoriamente, outros dois participantes que farão com você um grupo de três pessoas.Todos os membros do seu grupo verão o mesmo vídeo do lançamento do dado.<br><br><b><u>Sua tarefa:</b</u>Sua tarefa será memorizar o resultado do lançamento do dado e digitar na tela seguinte.<br><br><b><u>Seus pontos para essa tarefa:</b></u>'
                okbtn.setAttribute('href','parte2-lançamento.html');
            okbtn.removeAttribute('disabled');
            }
            else
            {
              const ativa = document.getElementById('okbtn');

                codaud.msg1.textContent = 'A parte 2 do experimento é similar a parte 1, sendo que agora, o seu grupo estará sujeito a passar por um <b><u>processo de auditoria.</b></u>';
                codaud.msg2.innerHTML = 'A todo momento, o seu grupo estará sujeito a passar por um processo de auditoria que o sistema realiza: de forma aleatória, o sistema escolhe um participante do grupo, dentre todos que estão participando, e fiscaliza se o número informado no vídeo do lançamento do dado é igual ao informado pelo grupo. Caso seja diferente, o participante <b><u>receberá 0 (zero) pontos</b></u> nessa etapa do experimento.<br><br><b>ATENÇÃO:</b>Você permanecerá com o mesmo grupo da parte 1. Logo, vocês ainda deverão informar o mesmo número que os outros participantes do grupo. Todos os membros do grupo devem informar o mesmo número: caso pelo menos um participante informe um número diferente, todos os membros do grupo receberão 0 (zero) pontos. Antes de informar o número, você terá a possibilidade de interagir com os demais membros do grupo.<br><br>Na parte 2 do experimento, você assistirá a outro vídeo com o lançamento de um dado.O vídeo que você verá será selecionado aleatoriamente pelo computador e cada um dos seis números possui igual probabilidade de aparecer na tela.<br>A sua decisão de qual número registrar será tomada em grupo: o sistema escolherá, aleatoriamente, outros dois participantes que farão com você um grupo de três pessoas.Todos os membros do seu grupo verão o mesmo vídeo do lançamento do dado.<br><br><b><u>Sua tarefa:</b</u>Sua tarefa será memorizar o resultado do lançamento do dado e digitar na tela seguinte.<br><br><b><u>Seus pontos para essa tarefa:</b></u>'
                okbtn.setAttribute('href','parte2-lançamento.html');
            okbtn.removeAttribute('disabled');
            }

            



  });

  }
  //  var table = firebase.database().ref('/experiment/'+codaud.experimentoChave+'/participant/'+codaud.idplayer+'/group');

    //var tipoGrupo = (numeroGrupo%2)==0 ? 'PC' : 'NPC';
});

};

 firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
              var idplayer = firebaseUser.photoURL;
              var experimentoChave = firebaseUser.displayName;
              window.codaud = new codaud(experimentoChave , idplayer);
    }
    else
    {
      console.log('Deslogado!');
    }
  });