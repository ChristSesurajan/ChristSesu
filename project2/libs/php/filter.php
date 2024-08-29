<?php

	// example use from browser
	// http://localhost/companydirectory/libs/php/searchAll.php?txt=<txt>

	// remove next two lines for production
	
	ini_set('display_errors', 'On');
	error_reporting(E_ALL);

	$executionStartTime = microtime(true);

	include("config.php");

	header('Content-Type: application/json; charset=UTF-8');

	$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

	if (mysqli_connect_errno()) {
		
		$output['status']['code'] = "300";
		$output['status']['name'] = "failure";
		$output['status']['description'] = "database unavailable";
		$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output);

		exit;

	}	
if($_POST['depii']==''){
	$query = $conn->prepare('SELECT `p`.`id`, `p`.`firstName`, `p`.`lastName`, `p`.`email`, `p`.`jobTitle`, `d`.`id` as `departmentID`, `d`.`name` AS `departmentName`, `l`.`id` as `locationID`, `l`.`name` AS `locationName` FROM `personnel` `p` LEFT JOIN `department` `d` ON (`d`.`id` = `p`.`departmentID`) LEFT JOIN `location` `l` ON (`l`.`id` = `d`.`locationID`) WHERE `d`.`locationID`= ? ORDER BY `p`.`lastName`, `p`.`firstName`, `d`.`name`, `l`.`name`');
	$query->bind_param('i',$_POST['id']);
}elseif($_POST['id']==''){
	$query = $conn->prepare('SELECT `p`.`id`, `p`.`firstName`, `p`.`lastName`, `p`.`email`, `p`.`jobTitle`, `d`.`id` as `departmentID`, `d`.`name` AS `departmentName`, `l`.`id` as `locationID`, `l`.`name` AS `locationName` FROM `personnel` `p` LEFT JOIN `department` `d` ON (`d`.`id` = `p`.`departmentID`) LEFT JOIN `location` `l` ON (`l`.`id` = `d`.`locationID`) WHERE `p`.`departmentID` = ? ORDER BY `p`.`lastName`, `p`.`firstName`, `d`.`name`, `l`.`name`');
	$query->bind_param('i',$_POST['depii']);
}else{
	$query = $conn->prepare('SELECT `p`.`id`, `p`.`firstName`, `p`.`lastName`, `p`.`email`, `p`.`jobTitle`, `d`.`id` as `departmentID`, `d`.`name` AS `departmentName`, `l`.`id` as `locationID`, `l`.`name` AS `locationName` FROM `personnel` `p` LEFT JOIN `department` `d` ON (`d`.`id` = `p`.`departmentID`) LEFT JOIN `location` `l` ON (`l`.`id` = `d`.`locationID`) WHERE `p`.`departmentID` = ? AND `d`.`locationID`= ? ORDER BY `p`.`lastName`, `p`.`firstName`, `d`.`name`, `l`.`name`');
	$query->bind_param('ii',$_POST['depii'],$_POST['id']);
}




    
    

	


  //$query->bind_param("ssssss", $likeText, $likeText, $likeText, $likeText, $likeText, $likeText);

	$query->execute();
	
	if (false === $query) {

		$output['status']['code'] = "400";
		$output['status']['name'] = "executed";
		$output['status']['description'] = "query failed";	
		$output['data'] = [];

		mysqli_close($conn);

		echo json_encode($output); 

		exit;

	}
    
	$result = $query->get_result();

  $found = [];

	while ($row = mysqli_fetch_assoc($result)) {

		array_push($found, $row);

	}

	$output['status']['code'] = "200";
	$output['status']['name'] = "ok";
	$output['status']['description'] = "success";
	$output['status']['returnedIn'] = (microtime(true) - $executionStartTime) / 1000 . " ms";
	$output['data']['found'] = $found;
	
	mysqli_close($conn);

	echo json_encode($output); 

?>
