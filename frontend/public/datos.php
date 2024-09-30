<?php
// Conectar a la base de datos MySQL usando las credenciales proporcionadas por Railway
$host = 'HOST_DE_MYSQL';   // Reemplaza con el host de la base de datos (puedes obtenerlo en Railway)
$db   = 'NOMBRE_BD';       // Nombre de la base de datos
$user = 'USUARIO_BD';      // Usuario de la base de datos
$pass = 'CONTRASEÑA_BD';   // Contraseña de la base de datos

$dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (PDOException $e) {
    echo json_encode(['status' => 'error', 'message' => 'Database connection failed: ' . $e->getMessage()]);
    exit;
}

// Verificar si se recibe una solicitud POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obtener los datos enviados en formato JSON
    $json_data = file_get_contents('php://input');
    $data = json_decode($json_data, true);
    
    // Verificar si los datos son válidos
    if ($data && isset($data['sensor']) && isset($data['valor'])) {
        // Preparar la consulta SQL para insertar los datos
        $stmt = $pdo->prepare("INSERT INTO sensores (sensor, valor) VALUES (:sensor, :valor)");
        $stmt->execute([
            ':sensor' => $data['sensor'],
            ':valor'  => $data['valor'],
        ]);
        
        // Enviar una respuesta de éxito
        echo json_encode(['status' => 'success', 'message' => 'Data stored successfully']);
    } else {
        // Enviar una respuesta de error si los datos no son válidos
        echo json_encode(['status' => 'error', 'message' => 'Invalid data received']);
    }
} else {
    // Si no es una solicitud POST, devolver un mensaje de error
    echo json_encode(['status' => 'error', 'message' => 'Invalid request method']);
}
?>
