$(document).ready(function(){
    var socket = io();
    var username="test user"; //get actual username here

	$("#readyButton").click(function(){
            console.log("user ready, sending into socket");
            socket.emit('userReady', username);
	});
    socket.on('opponentReady', function(data){
        if(data!=username){
            console.log("opponent ready : ",data);
        }
    });
});


