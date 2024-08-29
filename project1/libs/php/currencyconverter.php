<?php

ini_set('display_errors', 'On');
error_reporting(E_ALL);

$executionStartTime = microtime(true);

$value = $_REQUEST['value'] ?? 1;
$fromcu = $_REQUEST['fromcu'] ?? 'USD';
$tocu = $_REQUEST['tocu'] ?? 'EUR';

// Sanitize inputs if necessary


$url = 'https://api.freecurrencyapi.com/v1/latest?base_currency='.$_REQUEST['fromcu'].'&apikey=fca_live_6j8Cj0O44JNYd9Bp18W2Ua27ZCHDw8uiCbRxxBQa';

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

if (json_last_error() !== JSON_ERROR_NONE) {
    $output['status']['code'] = "500";
    $output['status']['name'] = "JSON parse error";
    $output['status']['description'] = json_last_error_msg();
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
    exit;
}

if (!is_array($decode) || isset($decode['error'])) {
    $output['status']['code'] = "505";
    $output['status']['name'] = "internal server error";
    $output['status']['description'] = isset($decode['error']) ? $decode['error'] : 'Unknown error';
    $output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
    header('Content-Type: application/json; charset=UTF-8');
    echo json_encode($output);
    exit;
}

$output['status']['code'] = "200";
$output['status']['name'] = "ok";
$output['status']['description'] = "success";
$output['status']['returnedIn'] = intval((microtime(true) - $executionStartTime) * 1000) . " ms";
$output['data'] = $decode;

header('Content-Type: application/json; charset=UTF-8');
echo json_encode($output);

file_put_contents('curl_result.log', $result . PHP_EOL, FILE_APPEND);

?>
