$(document).ready(function(){


	var socket = io();
	username=prompt("Enter username");
		
	socket.emit('clientUsername', username);
	socket.on('testerEvent', function(data){console.log("got : ",data)});
		
	startQuizKey=0;

	$("#startQuizButton").click(function(){
		console.log("Start a new quiz");
		$("#startKey").css("display","block");
		$("#generatedKey").css("display","block");

		/* make key*/
		startQuiz.SendUsernameToServer(username);

		
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
	key:"",
	SendKeyToServer:function(key){
		console.log("sending request key =",key);
		this.key=key;
		this.xhr.onreadystatechange=this.GetResponse;
		this.xhr.open("POST","http://localhost:3000/joinquizkey");
		this.xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		this.xhr.send("key="+key+"&username="+username);
	},
	GetResponse:function(){
		if(this.readyState==4 && this.status==200){
			var res=this.responseText;
			console.log("Response : ",res); 
			if(res=="Valid"){
				console.log("Add player2 to db");
				player2.SendUsernameToServer(username,joinQuiz.key);
				console.log("go to sync page");

				
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

var startQuiz={
	xhr:new XMLHttpRequest(),
	SendUsernameToServer:function(username){
		console.log("sending request username =",username);
		this.xhr.onreadystatechange=this.GetResponse;
		this.xhr.open("GET","http://localhost:3000/addPlayer1?username="+username);
		this.xhr.send();   
	},
	GetResponse:function(){
		if(this.readyState==4 && this.status==200){
			var res=this.responseText;
			console.log("Response : ",res); 
			startQuizKey=res;
			$("#generatedKey").text(res);
			$("#generatedKey").css("display","block");

			
		}
	}
}


var player2={
	xhr:new XMLHttpRequest(),
	SendUsernameToServer:function(username,key){
		console.log("sending request username =",username);
		this.xhr.onreadystatechange=this.GetResponse;
		this.xhr.open("GET","http://localhost:3000/addPlayer2?username="+username+"&key="+key);
		this.xhr.send();   
	},
	GetResponse:function(){
		if(this.readyState==4 && this.status==200){
			var res=this.responseText;
			console.log("Response : ",res); 

			
		}
	}
}



