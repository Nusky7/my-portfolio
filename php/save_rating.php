<?php
$allowedOrigins = [
    "https://nusky7studio.es",
    "http://127.0.0.1:5501"
];

// Obtener el origen de la solicitud
$origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : "";

// Verificar si el origen está permitido
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

// Manejar solicitudes OPTIONS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$firebaseUrl = "https://firestore.googleapis.com/v1/projects/ratings-51c29/databases/(default)/documents/ratings";

// Obtener la valoración
$rating = intval($_POST['rating']); // Convertir a entero

if ($rating >= 0 && $rating <= 5) {
    // Datos a enviar
    $data = [
        "fields" => [
            "rating" => ["integerValue" => $rating],
            "created_at" => ["timestampValue" => date('c')] // Fecha en formato ISO 8601
        ]
    ];

    // cURL
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $firebaseUrl);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        "Content-Type: application/json"
    ]);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    $response = curl_exec($ch);
    curl_close($ch);

    echo $response;
} else {
    echo json_encode(["status" => "error", "message" => "Valoración inválida"]);
}
?>
