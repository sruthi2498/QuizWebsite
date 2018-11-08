<?php
   $command = escapeshellcmd('/home/sruthi/anaconda3/bin/python ../python/using_mongo.py');
  // $output = shell_exec($command);
   exec($command, $output, $return_var);
   for($x = 0; $x < count($output); $x++) {
	    echo $output[$x];
	    echo "<br>";
	}
   //echo $return_var;
 ?>