<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);


$east = filter_input(INPUT_POST, 'east', FILTER_VALIDATE_FLOAT);
$west = filter_input(INPUT_POST, 'west', FILTER_VALIDATE_FLOAT);
$north = filter_input(INPUT_POST, 'north', FILTER_VALIDATE_FLOAT);
$south = filter_input(INPUT_POST, 'south', FILTER_VALIDATE_FLOAT);

if ($east === false || $west === false || $north === false || $south === false) {
    $output['status']['code'] = "400";
    $output['status']['name'] = "bad request";
    $output['status']['description'] = "Invalid or missing parameters for south/north/east/west";
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
    exit;
}

$url = 'http://api.geonames.org/weatherJSON?north=' . $north . '&south=' . $south . '&east=' . $east . '&west=' . $west .'&username=rimmon';


$ch = curl_init();
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); 
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true); 
curl_setopt($ch, CURLOPT_URL, $url); 

$result = curl_exec($ch);

if ($result === false) {
    $output['status']['code'] = "500";
    $output['status']['name'] = "internal server error";
    $output['status']['description'] = curl_error($ch);
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    curl_close($ch);
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
    exit;
}

curl_close($ch);


$decode = json_decode($result, true);


if (isset($decode['status']) && $decode['status']['value'] != "ok") {
    $output['status']['code'] = "505";
    $output['status']['name'] = "internal server error";
    $output['status']['description'] = $decode['status']['message'] ?? 'Unknown error';
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
    exit;
}


$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['data'] = $decode['weatherObservations'] ?? [];

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);

file_put_contents('curl_result.log', $result . PHP_EOL, FILE_APPEND);

?>
