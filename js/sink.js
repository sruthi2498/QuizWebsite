$(document).ready(function(){
    var socket = io();
    var url_string=window.location.href;
    var url=new URL(url_string);
    var username=url.searchParams.get("username");
    var key=url.searchParams.get("key");
    quiz_name="quiz_a";

    $("#user").text("You");
    $("#code").text("code : "+key);

    userReady=0;
    oppReady=0;
    setInterval(
        function(){
          //  console.log("userReady ",userReady,"oppReady ",oppReady);
            if(userReady==1 && oppReady==1){
                window.location="http://localhost:3000/quizpage?username="+username+"&key="+key+"&quiz_name="+quiz_name;
            }
          }, 
    2000);

	$("#readyButton").click(function(){
            console.log("user ready, sending into socket");
            socket.emit('userReady', {"username":username,"key":key});
            userReady=1;
	});
    socket.on('opponentReady', function(data){
        console.log("received from socket",data);
        if(data.key==key && data.username!=username){
             $("#loading").css("display","none");
            console.log("opponent ready : ",data.username);
            $("#opponent").text(data.username);
            oppReady=1;
        }
    });
});




