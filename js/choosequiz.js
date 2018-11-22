
	//var url_s=window.location.href;

	//var url=new URL(url_s);
	//var username=url.searchParams.get("username");
	//var key=url.searchParams.get("key");

	//console.log(username,key);

	// To display the questions 
	// Send GET request to  /getAllQuizzes
	// JSON Parse the results
	//
	//


var startQuiz={
	xhr:new XMLHttpRequest(),
	getAllQuizes:function(){
		//console.log("sending request username =",username);
		this.xhr.onreadystatechange=this.GetResponse;
		this.xhr.open("GET","http://localhost:3000/getAllQuizzes");
		this.xhr.send();
	},
	GetResponse:function(){
		if(this.readyState==4 && this.status==200){
			var res=this.responseText;
			console.log("Response : ",res); 
			var resj=JSON.parse(res);
			document.getElementById("topic1").innerHTML=resj[0].name;
			document.getElementById("topic2").innerHTML=resj[1].name;
			document.getElementById("topic3").innerHTML=resj[2].name;
			document.getElementById("topic4").innerHTML=resj[3].name;
			
			document.getElementById("desc1").innerHTML=resj[0].desc;
			document.getElementById("desc2").innerHTML=resj[1].desc;
			document.getElementById("desc3").innerHTML=resj[2].desc;
			document.getElementById("desc4").innerHTML=resj[3].desc;
			
			
			
		}
	}
}

function chosen(e)
{
if (confirm('Are you sure you want to pick Topic '+e.getAttribute('value')+'?'))
	console.log(e.getAttribute('value'))

//To find which topic is chosen
}
startQuiz.getAllQuizes();

