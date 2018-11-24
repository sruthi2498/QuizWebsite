
var startQuiz={
	xhr:new XMLHttpRequest(),
	response:0,
	getAllQuizes:function(){
		//console.log("sending request username =",username);
		this.xhr.onreadystatechange=this.GetResponse;
		this.xhr.open("GET","http://localhost:3000/getAllQuizzes");
		this.xhr.send();
	},
	GetResponse:function(){
		if(this.readyState==4 && this.status==200){
			res=this.responseText;
			console.log("Response : ",res); 
			resj=JSON.parse(res);
			console.log(resj);
			startQuiz.response=resj;
			document.getElementById("t1").innerHTML=resj[0].name;
			document.getElementById("t2").innerHTML=resj[1].name;
			document.getElementById("t3").innerHTML=resj[2].name;

			
			document.getElementById("d1").innerHTML=resj[0].desc;
			document.getElementById("d2").innerHTML=resj[1].desc;
			document.getElementById("d3").innerHTML=resj[2].desc;

			
	
			
		}
	}
}



function gogo()
{


	var form=document.getElementsByName('optradio');
	for(var i=0,length=form.length;i<length;i++)
		if(form[i].checked)
			mode=form[i].value;
	qname=startQuiz.response[selected-1].name;
	console.log(qname,mode);
	sendQuiz.sendQuizNameToServer(qname,mode,key);
	//
	//quizname_url=0;
	//


}

var sendQuiz={
		xhr:new XMLHttpRequest(),

		sendQuizNameToServer:function(qname,difficulty,key){ 
		//if next=1, get next question, else get previous question
			console.log("sending quiz name, mode  =",qname,mode);

			query_string=quizname_url+"?quiz_name="+qname+"&mode="+difficulty+"&key="+key;
			//if(next)query_string=quest_url+"?quiz_name="+quiz_name+"&curr_quest="+curr_quest+"&next=1";
			this.xhr.onreadystatechange=this.GetResponse;
			this.xhr.open("GET",query_string);
			this.xhr.send();
		},
		GetResponse:function(){
				var res=this.responseText;
				console.log("Response : ",res);
				if(res=="OK"){
					window.location="http://localhost:3000/joinquiz?username="+username+"&key="+key.toString()+"&quiz_name="+qname+"&mode="+mode+"&modal=0";
				}
				
		}
}

$(document).ready(function(){
	var url_string=window.location.href;
	var url=new URL(url_string);
	username=url.searchParams.get("username");
	key=url.searchParams.get("key");
	quizname_url="http://localhost:3000/setQuizAndMode";


	console.log("username ",username," key ",key);

	startQuiz.getAllQuizes();
	
});

