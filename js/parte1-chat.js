'use strict';

// Initializes Parte1Chat.
function Parte1Chat(experimentoChave , idplayer) {
  this.experimentoChave = experimentoChave;
  this.idplayer = idplayer;

  // Shortcuts to DOM Elements.
  this.messageList = document.getElementById('messages');
  this.messageForm = document.getElementById('message-form');
  this.messageInput = document.getElementById('message');
  this.submitButton = document.getElementById('submit');
  this.userName = document.getElementById('user-name');
  
  this.sala = document.getElementById('sala');
  //var buttonTRefresh = this.refresh.bind(this);
  //this.sala.addEventListener('keyup', this.refreshList.bind(this));

  // Saves message on form submit.
  this.messageForm.addEventListener('submit', this.saveMessage.bind(this));

  // Toggle for the button.
  var buttonTogglingHandler = this.toggleButton.bind(this);
  this.messageInput.addEventListener('keyup', buttonTogglingHandler);
  this.messageInput.addEventListener('change', buttonTogglingHandler);

  this.txtCountdown = document.getElementById('txtCountdown');
  this.btnProximo = document.getElementById('btnProximo');
  
  this.txtWatting = document.getElementById('txtWatting');

  // Template for messages.
  this.MESSAGE_TEMPLATE =
    '<div class="message-container">' +
      '<div class="spacing"><div class="pic"><div class="name"></div></div></div>' +
      '<br/><div class="message"></div>' +
    '</div>';

  this.naSala = false;

  this.initFirebase();
}

Parte1Chat.prototype.getID = function() {
  firebase.database().ref('/experiment/'+this.experimentoChave+'/participant/' + this.idplayer).once('value').then(function(snapshot) {
    Parte1Chat.userName.textContent=snapshot.val().id;
    Parte1Chat.sala.value = snapshot.val().group.number;
    Parte1Chat.btnProximo.setAttribute('href','parte1-decisao.html');
    Parte1Chat.iAmHere();
    verifica();
  });
};

Parte1Chat.prototype.iAmHere = function() {
  var tableCtrlChat = firebase.database().ref('/experiment/'+Parte1Chat.experimentoChave+'/ctrlChat/' + Parte1Chat.sala.value +'/'+ Parte1Chat.idplayer);
  tableCtrlChat.set(1).then(function(snapshot) {
    console.log('CtrlChat Atualizado');
  }).catch(function(error) {
    console.error('Error writing new message to Firebase Database', error);
  });

  firebase.database().ref('/experiment/'+Parte1Chat.experimentoChave+'/ctrlChat/' + Parte1Chat.sala.value).on('value',function(snapshot) {
    var participantsHash={};
    var participants = snapshot.val();
    for(var p in participants) {
      if(!participantsHash[p]) {
        participantsHash[p]=true;
      }
    }
 
 var numerogrupo = firebase.database().ref('/experiment/'+Parte1Chat.experimentoChave+'/participant/' + Parte1Chat.idplayer+ '/group/' + 'number').once('value').then(function(snapshot) {
       var group_number = snapshot.val();

       var adc = firebase.database().ref('/experiment/'+ Parte1Chat.experimentoChave + '/contadorchat/' + group_number).once('value').then(function(snapshot) {
       var adc_number = snapshot.val();
       var maisum = adc_number + 1 ;

       var acrescenta = firebase.database().ref('/experiment/'+ Parte1Chat.experimentoChave + '/contadorchat/' + group_number);
        acrescenta.set(maisum);

      var ref = firebase.database().ref('/experiment/'+ Parte1Chat.experimentoChave + '/contadorchat/' + group_number);
       ref.once("value", function(snapshot) {
      var valorbolado = snapshot.val();
        


    if(valorbolado>=3) {
      firebase.database().ref('/experiment/'+Parte1Chat.experimentoChave+'/ctrlChat/' + Parte1Chat.sala.value).off();
      verifica();
     //Parte1Chat.startChat();
    }

    }, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
    });
  });
  });
  });
};

// Sets up shortcuts to Firebase features and initiate firebase auth.
Parte1Chat.prototype.initFirebase = function() {
  this.database = firebase.database();
  this.getID();
};

Parte1Chat.prototype.startChat = function() {
  z++;
   if(z==1)
  {
  Parte1Chat.loadMessages();
  Parte1Chat.txtWatting.remove();
  Parte1Chat.messageInput.disabled=false;
  Parte1Chat.txtCountdown.removeAttribute('hidden');
  setTimeout(startCountdown,1000);
    }

};

Parte1Chat.prototype.refreshList = function() {
  this.messageList.textContent='';
  this.initFirebase();
};

// Loads chat messages history and listens for upcoming ones.
Parte1Chat.prototype.loadMessages = function() {
  // Reference to the /messages/ database path.
  this.messagesRef = this.database.ref('/experiment/'+this.experimentoChave+'/messages/'+this.sala.value);
  // Make sure we remove all previous listeners.
  this.messagesRef.off();

  // Loads the last 12 messages and listen for new ones.
  var setMessage = function(data) {
    var val = data.val();
    this.displayMessage(data.key, val.participant, val.text, val.photoUrl, val.imageUrl);
  }.bind(this);
  this.messagesRef.limitToLast(12).on('child_added', setMessage);
  this.messagesRef.limitToLast(12).on('child_changed', setMessage);
};

// Saves a new message on the Firebase DB.
Parte1Chat.prototype.saveMessage = function(e) {
  e.preventDefault();
  // Check that the user entered a message and is signed in.
	//var currentUser = this.auth.currentUser;
    // Add a new message entry to the Firebase Database.
    this.messagesRef.push({
      participant: this.userName.textContent,//currentUser.displayName,
      text: this.messageInput.value,
    }).then(function() {
      // Clear message text field and SEND button state.
      Parte1Chat.resetMaterialTextfield(this.messageInput);
      this.toggleButton();
    }.bind(this)).catch(function(error) {
      console.error('Error writing new message to Firebase Database', error);
    });
};

// Resets the given MaterialTextField.
Parte1Chat.prototype.resetMaterialTextfield = function(element) {
  element.value = '';
  element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
};

// A loading image URL.
Parte1Chat.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';

// Displays a Message in the UI.
Parte1Chat.prototype.displayMessage = function(key, name, text, picUrl, imageUri) {
  var div = document.getElementById(key);
  // If an element for that message does not exists yet we create it.
  if (!div) {
    var container = document.createElement('div');
    container.innerHTML = Parte1Chat.MESSAGE_TEMPLATE;
    div = container.firstChild;
    div.setAttribute('id', key);
    this.messageList.appendChild(div);
  }
  if (picUrl) {
    div.querySelector('.pic').style.backgroundImage = 'url(' + picUrl + ')';
  }
  div.querySelector('.name').textContent = name+": ";
  var messageElement = div.querySelector('.message');
  if (text) { // If the message is text.
    messageElement.textContent = text;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  } else if (imageUri) { // If the message is an image.
    var image = document.createElement('img');
    image.addEventListener('load', function() {
      this.messageList.scrollTop = this.messageList.scrollHeight;
    }.bind(this));
    this.setImageUrl(imageUri, image);
    messageElement.innerHTML = '';
    messageElement.appendChild(image);
  }
  // Show the card fading-in.
  setTimeout(function() {div.classList.add('visible')}, 1);
  this.messageList.scrollTop = this.messageList.scrollHeight;
  this.messageInput.focus();
};

// Enables or disables the submit button depending on the values of the input
// fields.
Parte1Chat.prototype.toggleButton = function() {
  if (this.messageInput.value) {
    this.submitButton.removeAttribute('disabled');
  } else {
    this.submitButton.setAttribute('disabled', 'true');
    this.txtWatting.setAttribute('disabled', 'true');
  }
};

Parte1Chat.prototype.refresh = function() {
  this.messageList.value='';
};



firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
              var idplayer = firebaseUser.photoURL;
              var experimentoChave = firebaseUser.displayName;
              window.Parte1Chat = new Parte1Chat(experimentoChave , idplayer);
    }
    else
    {
      console.log('Deslogado!');
    }
  });


var minuto = 2;
var segundo = 1;
var contagemRegressiva;
var zeroSegundo = "";

function startCountdown(){

  if(segundo==0) {
    segundo=60;
    minuto--;
  }
  if(minuto<0) {
    Parte1Chat.txtCountdown.setAttribute('style','display:none');
    Parte1Chat.btnProximo.removeAttribute('style');
    Parte1Chat.btnProximo.setAttribute('style','display:block');
    Parte1Chat.messageInput.disabled=true;
  } else {
    segundo--;
    if(segundo<10) {
      zeroSegundo="0";
    } else {
      zeroSegundo="";
    }
    numberCountdown.innerText = '0' + minuto + ':' + zeroSegundo + segundo;
    setTimeout(startCountdown,1000);
  }
}



  var z =0;

function verifica(){
  var contagem = 0;

  firebase.database().ref('/experiment/'+Parte1Chat.experimentoChave + '/participant/' + Parte1Chat.idplayer + '/group/').once('value').then(function(snapshot) {
    
    var meugrupo = snapshot.val().number;


var idpartida = firebase.database() .ref('/experiment/'+Parte1Chat.experimentoChave + '/ctrlChat/' + meugrupo +'/');
      idpartida.orderByKey() .on("child_added", function(data) {
     var id_partida = data.key;
     if(data.key != undefined)
     {
        contagem++;
     }


firebase.database().ref('/experiment/'+Parte1Chat.experimentoChave + '/ctrlChat/' + meugrupo + '/' + Parte1Chat.idplayer).once('value').then(function(snapshot) {
  var meunum = snapshot.val();


    if(contagem == 3 )
    {
      Parte1Chat.startChat();
    }


   });
});
  });


}
