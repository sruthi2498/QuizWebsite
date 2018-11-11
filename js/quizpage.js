questions=["Who is Ramu?","Why u gay?","No u"];
a=document.getElementById('quizDiv');
index=-1;
newd=document.createElement('div');

function init()
{
index=0;
document.getElementById("prev").disabled=true;
newd.innerHTML="Q) "+questions[index];
a.appendChild(newd);

}

function previous()
{
if(index==0)
	{
	
	return;}
document.getElementById("next").disabled=false;
index--;
if(index==0)
	document.getElementById("prev").disabled=true;
newd.innerHTML="Q) "+questions[index];
//a.removeChild(a.childNodes[0]);
a.appendChild(newd);


}

function next()
{
if(index==questions.length-1)
	{
	
	return;}
document.getElementById("prev").disabled=false;
index++;
	if(index==questions.length-1)
		document.getElementById("next").disabled=true;
newd.innerHTML="Q) "+questions[index];
//a.removeChild(a.childNodes[0]);
a.appendChild(newd);

}
