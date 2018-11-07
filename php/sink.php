<?php
	header("Content-type:text/event-stream");
	//ob_start(); //COMMENT THIS OUT IF IT DOES NOT WORK
	while(true){
		echo "event:OpponentReady\n";
		echo "data:true\n\n";

		ob_flush();
		flush();
		sleep(5);
	}
?>