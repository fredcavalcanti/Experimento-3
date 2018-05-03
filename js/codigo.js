function codigo(experimentoChave , idplayer) {
  this.experimentoChave = experimentoChave;
  this.idplayer = idplayer;
  // Shortcuts to DOM Elements.
  this.userName = document.getElementById('user-name');

  this.initFirebase();

  //setTimeout(startCountdown,1000);
}

codigo.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.getID();
  this.LiberarButton();
};

codigo.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/'+this.idplayer).once('value').then(function(snapshot) {
    codigo.userName.textContent=snapshot.val().id;
  });
}


codigo.prototype.LiberarButton = function() {
  okbtn.setAttribute('href','parte2-lançamento.html');
  okbtn.removeAttribute('disabled');

};

 firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
              var idplayer = firebaseUser.photoURL;
              var experimentoChave = firebaseUser.displayName;
              window.codigo = new codigo(experimentoChave , idplayer);
    }
    else
    {
      console.log('Deslogado!');
    }
  });


 var butao = document.getElementById('002');

 butao.addEventListener('click', a => {

  
  var radio1 = document.getElementsByName("quest1");
  var imagem = document.getElementsByTagName('img');


if(meuNumero == 0)
{
  
  if(radio1[0].checked)
  {
    imagem[0].removeAttribute('hidden');
    imagem[1].setAttribute('hidden','');
    butao.removeAttribute('class');
    butao.setAttribute('class','btn btn-success');
    butao.setAttribute('onclick','window.location.assign("parte2-lançamento.html");');
    butao.innerText = 'Avançar';
  }
  else
  {
    imagem[1].removeAttribute('hidden');
    imagem[0].setAttribute('hidden','');
    butao.removeAttribute('class');
    butao.setAttribute('class','btn btn-danger');
    butao.removeAttribute('onclick');
    butao.innerText = 'Verificar';
  }

}
else if(meuNumero == 1)
{
  
  if(radio1[3].checked)
  {
    imagem[0].removeAttribute('hidden');
    imagem[1].setAttribute('hidden','');
    butao.removeAttribute('class');
    butao.setAttribute('class','btn btn-success');
    butao.setAttribute('onclick','window.location.assign("parte2-lançamento.html");');
    butao.innerText = 'Avançar';
  }
  else
  {
    imagem[1].removeAttribute('hidden');
    imagem[0].setAttribute('hidden','');
    butao.removeAttribute('class');
    butao.setAttribute('class','btn btn-danger');
    butao.removeAttribute('onclick');
    butao.innerText = 'Verificar';
  }

}
else
{
  
  if(radio1[2].checked)
  {
    imagem[0].removeAttribute('hidden');
    imagem[1].setAttribute('hidden','');
    butao.removeAttribute('class');
    butao.setAttribute('class','btn btn-success');
    butao.setAttribute('onclick','window.location.assign("parte2-lançamento.html");');
    butao.innerText = 'Avançar';
  }
  else
  {
    imagem[1].removeAttribute('hidden');
    imagem[0].setAttribute('hidden','');
    butao.removeAttribute('class');
    butao.setAttribute('class','btn btn-danger');
    butao.removeAttribute('onclick');
    butao.innerText = 'Verificar';
  }

}

 });

  var meuNumero = Math.floor(Math.random() * 3);
  var meuTexto = document.getElementsByClassName('TextoResp');
  var minhaPergunta = document.getElementsByClassName('TextPergunt');
  if(meuNumero == 0)
  {

    minhaPergunta[0].innerText = 'São considerados deveres do Profissional da Contabilidade:';
    meuTexto[0].innerText = 'a) Exercer a profissão com honestidade e capacidade técnica, atendendo a legislação vigente;';
    meuTexto[1].innerText = 'b) Praticar a profissão de contador, junto com seus colegas, respeitando o espaço de todos;';
    meuTexto[2].innerText = 'c) Atender todos os preceitos da legislação tributária sem precisar observar as Normas Brasileiras de Contabilidade;';
    meuTexto[3].innerText = 'd) Praticar o melhor valor do mercado na execução dos seus serviços.';

  }
  else if(meuNumero == 1) 
  {
    minhaPergunta[0].innerText = 'É vedado ao profissional de contabilidade:';
    meuTexto[0].innerText = 'a) Praticar um valor pelos seus serviços muito acima do mercado;';
    meuTexto[1].innerText = 'b) Tirar dúvidas com outros profissionais da área;';
    meuTexto[2].innerText = 'c) Se especializar em uma área diferente daquela escolhida na graduação;';
    meuTexto[3].innerText = 'd) Ganhar dinheiro que provenha de forma ilícita.';
  }
  else
  {
    minhaPergunta[0].innerText = 'Transgredir qualquer infração ética do CEPC faz com que o profissional possa sofrer qual tipo de penalidade?';
    meuTexto[0].innerText = 'a) Condução coercitiva;';
    meuTexto[1].innerText = 'b) Fechamento do escritório de contabilidade;';
    meuTexto[2].innerText = 'c) Advertência;';
    meuTexto[3].innerText = 'd) Prisão preventiva.';
  }