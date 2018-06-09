<?php
    //Turn off PHP error reporting
    error_reporting(0);

    require "../configdb.php";

    $db = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE) or die ("Unable to Connect to the Database");
   
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $input = json_decode(file_get_contents('php://input'));
        
        $userTable = mysqli_real_escape_string($db, $input->userTable);

        $sql = "SELECT * FROM $userTable WHERE ";

        foreach ($input as $key => $item) {
            if ($key != "userTable" && $key != "id") {
                $sql = $sql.$key." = '".$item."' AND ";
            }
        }

        $sql = rtrim($sql, " AND ");

        $result = mysqli_query($db, $sql);
        $user = mysqli_fetch_array($result, MYSQLI_ASSOC);  
        $count = mysqli_num_rows($result);
        
        if ($count > 0) {
            $response['status'] = 'success';
            $response['message'] = 'You have successfully logged in!';
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['id'] = $input->id;
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Login failed due to incorrect credentials!';
        }
        echo json_encode($response);
    }

?>
