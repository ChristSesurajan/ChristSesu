<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);


$url = 'http://api.geonames.org/searchJSON?q=' .$_REQUEST['name']. '&maxRows=1000&username=rimmon';


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
$output['data'] = $decode['geonames'] ?? [];

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);

file_put_contents('curl_result.log', $result . PHP_EOL, FILE_APPEND);

?>
