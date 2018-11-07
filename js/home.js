$(document).ready(function(){
	$("#startQuizButton").click(function(){
		console.log("Start a new quiz");
		/* go to second page*/
		
	});

	$("#joinQuizButton").click(function(){
		console.log("Join a new quiz");
		$("#joinQuizKey").prop('type', 'text');
		$("#joinQuizGo").prop('type', 'button');
		
	});

	$("#joinQuizGo").click(function(){
		//Remove invaild key message
		$("#invalidJoin").css("display","none");
		console.log("Joined quiz GO");
		var key=$("#joinQuizKey").val();

		/* send request to server *
		Validate key 
		get response*/
		obj.SendKeyToServer(key);



	});
});

var obj={
	xhr:new XMLHttpRequest(),
	SendKeyToServer:function(key){
		//console.log("sending request");
		this.xhr.onreadystatechange=this.GetResponse;
		this.xhr.open("GET","php/home.php?key="+key);
		this.xhr.send();
	},
	GetResponse:function(){
		//console.log("got response");
		if(this.readyState==4 && this.status==200){
			var res=this.responseText; 
			var resJson=JSON.parse(res);
			if(resJson.valid==1){
				console.log("Valid key");
				$("body").load("sink.html")
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

