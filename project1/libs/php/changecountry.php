<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

$data = file_get_contents('D:\xampp\htdocs\libs\countryBorders.geo.json'); 
if ($data === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Unable to read JSON file']);
    exit;
}

$data = json_decode($data, true);
if (json_last_error() !== JSON_ERROR_NONE) {
    http_response_code(500);
    echo json_encode(['error' => 'Error decoding JSON file']);
    exit;
}


$output = [];
foreach ($data['features'] as $feature) {
    if($_REQUEST['ISO']===$feature['properties']['iso_a2']){
        $output[] = ['coordinates' => $feature['geometry']['coordinates'],'iso_a2'=>$feature['properties']['iso_a2'],'name'=>$feature['properties']['name'],'feature'=>$feature];
    }
}

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);

?>
