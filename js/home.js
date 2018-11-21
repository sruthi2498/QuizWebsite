$(document).ready(function(){

	var socket = io();
	var username=prompt("Enter username");
		  
	socket.emit('clientUsername', username);
	socket.on('testerEvent', function(data){console.log("got : ",data)});
		


	$("#startQuizButton").click(function(){
		console.log("Start a new quiz");
		$("#joinQuizContainer").css("display","none");
		/* get key*/
		
	});

	$("#joinQuizButton").click(function(){
		console.log("Join a new quiz");
		$("#joinQuizContainer").css("display","block");
		
	});

	$("#joinQuizGo").click(function(){
		//Remove invaild key message
		$("#invalidJoin").css("display","none");
		console.log("Joined quiz GO");
		var key=$("#joinQuizKey").val();

		/* send request to server *
		Validate key 
		get response*/
		joinQuiz.SendKeyToServer(key);



	});
});

var joinQuiz={
	xhr:new XMLHttpRequest(),
	SendKeyToServer:function(key){
		console.log("sending request key =",key);
		this.xhr.onreadystatechange=this.GetResponse;
		this.xhr.open("POST","http://localhost:3000/joinquizkey");
		this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		this.xhr.send("key="+key);
	},
	GetResponse:function(){
		if(this.readyState==4 && this.status==200){
			var res=this.responseText;
			console.log("Response : ",res); 
			if(res=="Valid"){
				console.log("Going to sink page");
				$("#joinForm").submit();
			}
			else{
				console.log("Invalid key");
				//Show invaild key message
				$("#invalidJoin").css("display","block");
				// make input blank again
				$("#joinQuizKey").prop("value","");
			}
			
			
		}
	}
}



