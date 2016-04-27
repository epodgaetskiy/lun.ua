<?php

if (isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["country"]) && isset($_POST["city"]) && isset($_POST["fb"]) && isset($_POST["vk"]) && isset($_POST["tw"]) && isset($_POST["od"])) { 

	// Формируем массив для JSON ответа
    $result = array(
    	'name' => $_POST["name"],
    	'email' => $_POST["email"],
    	'country' => $_POST["country"],
    	'city' => $_POST["city"],
    	'fb' => $_POST["fb"],
    	'vk' => $_POST["vk"],
    	'tw' => $_POST["tw"],
    	'od' => $_POST["od"]
    ); 

    // Переводим массив в JSON
    echo json_encode($result); 
}

?>
