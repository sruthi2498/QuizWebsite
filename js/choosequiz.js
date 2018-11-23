
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

startQuiz.getAllQuizes();

function gogo()
{


var form=document.getElementsByName('optradio');
for(var i=0,length=form.length;i<length;i++)
	if(form[i].checked)
		difficulty=form[i].value;
qname=startQuiz.response[selected-1].name;


//
quizname_url= ? 
//

var sendQuiz={
	xhr:new XMLHttpRequest(),
	sendQuizNameToServer:function(qname,difficulty){ 
	//if next=1, get next question, else get previous question
		console.log("sending quiz name, diff  =",qname,diffculty);

		query_string=quizname_url+"?quiz_name="+qname+"&difficulty="+difficulty;
		//if(next)query_string=quest_url+"?quiz_name="+quiz_name+"&curr_quest="+curr_quest+"&next=1";
		//this.xhr.onreadystatechange=this.GetResponse;
		this.xhr.open("GET",query_string);
		this.xhr.send();
	},
	/*GetResponse:function(){
		if(this.readyState==4 && this.status==200){
			var res=this.responseText;

		//	console.log("Get Question Response : ",res); 
			var resj=JSON.parse(res); 
			document.getElementById("ques").innerHTML=resj[0].question;
			document.getElementById("option1").innerHTML=resj[0].option1;
			document.getElementById("option2").innerHTML=resj[0].option2;
			document.getElementById("option3").innerHTML=resj[0].option3;
			document.getElementById("option4").innerHTML=resj[0].option4;
			d1=new Date();
			//timer
			if(curr_quest>=quiz_len){
				document.getElementById("next").disabled=true;	
				console.log("QUIZ DONE");
				//window.location="http://localhost:3000/endquiz?username="+username+"&key="+key;
			}
			
		}
	}*/
}


}
