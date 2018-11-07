<?php

	extract($_GET);
	$res=array();
	if($key=="abc"){
		$res["valid"]=1;
	}
	else{
		$res["valid"]=0;
	}
	$ret=json_encode($res);
	echo $ret;


?>