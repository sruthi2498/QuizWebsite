$(document).ready(function(){
    var socket = io();
    var username="test user"; //get actual username here

    userReady=0;
    oppReady=1;
	$("#readyButton").click(function(){
            console.log("user ready, sending into socket");
            socket.emit('userReady', username);
            userReady=1;
	});
    socket.on('opponentReady', function(data){
        if(data!=username){
            console.log("opponent ready : ",data);
            oppReady=1;
        }
    });
});
setTimeout(
    function(){
        if(userReady==1 && oppReady==1){
            window.location="http://localhost:3000/quizpage";
        }
      }, 
2000);



