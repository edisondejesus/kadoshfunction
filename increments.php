<?php
		
		#	{ 'x-access-token': '1DDBCDF465C44' }
	$ch= "https://api.indexa.do/api/rnc?rnc=131766293";
	$authorization = "Authorization: Bearer 1DDBCDF465C44";	
		curl_init($ch);
		curl_setopt($ch, CURLOPT_HTTPHEADER,[
			'Content-Type: application/json',
			"{'x-access-token': '1DDBCDF465C44'}"

		]);

		$d = curl_exec($ch);
		echo $d;


?>