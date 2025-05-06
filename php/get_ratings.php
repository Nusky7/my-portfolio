<?php
$allowedOrigins = [
    "https://nusky7studio.es",
    "http://127.0.0.1:5501"
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
    header("Access-Control-Allow-Origin: $origin");
}

header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Pragma: no-cache");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$firebaseUrl = "https://firestore.googleapis.com/v1/projects/ratings-51c29/databases/(default)/documents/ratings";

// Inicializar cURL para obtener los datos
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $firebaseUrl);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Ejecutar la solicitud
$response = curl_exec($ch);
curl_close($ch);

$data = json_decode($response, true);

if (isset($data['documents'])) {
    $totalVotes = count($data['documents']);
    $sumRatings = 0;

    foreach ($data['documents'] as $document) {
        $fields = $document['fields'];
        $sumRatings += intval($fields['rating']['integerValue']);
    }

    $averageRating = $totalVotes > 0 ? $sumRatings / $totalVotes : 0;

    echo json_encode([
        "status" => "success",
        "total_votes" => $totalVotes,
        "average_rating" => $averageRating
    ]);
} else {
    echo json_encode(["status" => "error", "message" => "No ratings found"]);
}
?>
