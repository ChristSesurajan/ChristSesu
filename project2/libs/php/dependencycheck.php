<?php
include("config.php");

header('Content-Type: application/json; charset=UTF-8');

$conn = new mysqli($cd_host, $cd_user, $cd_password, $cd_dbname, $cd_port, $cd_socket);

if (mysqli_connect_errno()) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed']);
    exit();
}

$recordId = $_POST['id'];

// Check for dependencies
if($_POST['name']==='dept'){
$query = $conn->prepare('SELECT COUNT(*) AS count FROM personnel WHERE departmentID = ?');
$query->bind_param('i', $recordId);
$query->execute();
$query->bind_result($count);
$query->fetch();
$query->close();
}else{
$query = $conn->prepare('SELECT COUNT(*) AS count FROM department WHERE locationID = ?');
$query->bind_param('i', $recordId);
$query->execute();
$query->bind_result($count);
$query->fetch();
$query->close();
}
if ($count > 0) {
    echo json_encode(['hasDependencies' => true, 'count'=>$count]);
} else {
    echo json_encode(['hasDependencies' => false]);
}

$conn->close();
?>
