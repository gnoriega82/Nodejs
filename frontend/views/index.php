<?php
// Comprobar si se ha enviado una solicitud POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener los datos en formato JSON
    $json_data = file_get_contents('php://input');
    
    // Convertir los datos JSON a un arreglo de PHP
    $data = json_decode($json_data, true);

    // Comprobar si los datos se han recibido correctamente
    if ($data) {
        // Aquí puedes hacer algo con los datos, por ejemplo guardarlos en una base de datos
        file_put_contents('data.txt', print_r($data, true), FILE_APPEND);

        // Respuesta de éxito
        echo json_encode(['status' => 'success', 'message' => 'Data received']);
    } else {
        // Error en la recepción de datos
        echo json_encode(['status' => 'error', 'message' => 'Invalid data']);
    }
} else {
    // Si no es una solicitud POST, mostrar un mensaje de error
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
