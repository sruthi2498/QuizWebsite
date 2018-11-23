$(document).ready(function(){
    var socket = io();
    var url_string=window.location.href;
    var url=new URL(url_string);
    var modal=url.searchParams.get("modal");
    if(modal==1){
        $("#openModal").click();
    }
    else{
        username=url.searchParams.get("username");
        key=url.searchParams.get("key");
        quiz_name=url.searchParams.get("quiz_name");
        mode=url.searchParams.get("mode");

        if(quiz_name==null){
            q.Send(key);
        }


        $("#code").text("code : "+key);
        $("#topic").text("topic : "+quiz_name);
        $("#level").text("level : "+mode);
    }
    

    

    $("#user").text("You");



    userReady=0;
    oppReady=0;
    setInterval(
        function(){
          //  console.log("userReady ",userReady,"oppReady ",oppReady);
            if(userReady==1 && oppReady==1){
                window.location="http://localhost:3000/quizpage?username="+username+"&key="+key+"&quiz_name="+quiz_name+"&mode="+mode;
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

var q={
    xhr:new XMLHttpRequest(),
    Send:function(quiz_session_id){
        console.log("get quiz name and mode");
        this.xhr.onreadystatechange=this.GetResponse;
        this.xhr.open("GET","http://localhost:3000/getSessionDetails?quiz_session_id="+quiz_session_id);
        this.xhr.send();   
    },
    GetResponse:function(){
        if(this.readyState==4 && this.status==200){
            var res=this.responseText;
            console.log("Response : ",res); 
            resJ=JSON.parse(res);
            $("#topic").text("topic : "+resJ.quiz_name);
            $("#level").text("level : "+resJ.mode);
            
        }
    }
}



