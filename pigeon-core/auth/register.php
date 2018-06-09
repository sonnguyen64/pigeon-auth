<?php
    //Turn off PHP error reporting
    error_reporting(0);

    require "../configdb.php";

    $db = new mysqli(HOSTNAME, USERNAME, PASSWORD, DATABASE) or die ("Unable to Connect to the Database");
   
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        $input = json_decode(file_get_contents('php://input'));
        
        $userTable = mysqli_real_escape_string($db, $input->userTable);

        $columns = "";
        $values = "";

        foreach ($input as $key => $item) {
            if ($key != "userTable" && $key != "id") {
                $columns = $columns.$key.",";
                $values = $values."'".$item."',";
            }
        }

        $columns = rtrim($columns, ",");
        $values = rtrim($values, ",");
      
        $sql = "INSERT INTO $userTable ($columns) VALUES ($values)";

        $result = mysqli_query($db, $sql);
        
        if ($result) {
            $response['status'] = 'success';
            $response['message'] = 'Successfully registered account!';
            if (!isset($_SESSION)) {
                session_start();
            }
            $_SESSION['id'] = $input->id;
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Failed registered account!';
        }

        echo json_encode($response);
    }

?>
