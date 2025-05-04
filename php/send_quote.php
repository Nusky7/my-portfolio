<?php
// CORS: permitir origen desde web y local
$allowedOrigins = [
  "https://nusky7studio.es",
  "http://127.0.0.1:5501"
];

$clientName = $_POST['clientName'] ?? 'No proporcionado';
$clientEmail = $_POST['clientEmail'] ?? 'No proporcionado';
$clientPhone = $_POST['clientPhone'] ?? 'No proporcionado';


$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
  header("Access-Control-Allow-Origin: $origin");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Allow-Headers: Content-Type");
}

// Si no hay archivo PDF, abortar
if (!isset($_FILES['pdf']) || $_FILES['pdf']['error'] !== UPLOAD_ERR_OK) {
  http_response_code(400);
  echo "Archivo PDF no recibido correctamente.";
  exit;
}

$to = 'tu-email@n7studio.es'; // tu email
$subject = "Nuevo presupuesto desde N7Studio";
$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
$headers .= "From: N7Studio <no-reply@nusky7studio.es>" . "\r\n";
$headers .= "Cc: {$clientEmail}" . "\r\n"; // Copia para el cliente


// Cuerpo del mensaje del correo
$message = <<<EOD
Hola 👋,

Has recibido un nuevo presupuesto generado desde la calculadora web de N7Studio.

Se adjunta el archivo PDF con los detalles del presupuesto.

Se recuerda que los presupuestos online son aproximados y hay que valorar las necesidades del cliente en una reunión o meeting.

—
N7Studio - Desarrollo web personalizado
EOD;

// Preparar el archivo
$file = $_FILES['pdf']['tmp_name'];
$filename = basename($_FILES['pdf']['name']);
$fileContents = file_get_contents($file);
$content = chunk_split(base64_encode($fileContents));
$uid = md5(uniqid(time()));
$boundary = "==Multipart_Boundary_x{$uid}x";

// Encabezados
$headers = "From: N7Studio <info@nusky7studio.es>\r\n";
$headers .= "Reply-To: info@nusky7studio.es\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

// Cuerpo del correo
$body = "--{$boundary}\r\n";
$body .= "Content-Type: text/plain; charset=\"utf-8\"\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $message = "
<h3>Datos del Cliente</h3>
<ul>
  <li><strong>Nombre:</strong> {$clientName}</li>
  <li><strong>Email:</strong> {$clientEmail}</li>
  <li><strong>Teléfono:</strong> {$clientPhone}</li>
</ul>
<p>Se adjunta el presupuesto en PDF generado desde la calculadora de N7Studio.</p>
";

$body .= "--{$boundary}\r\n";
$body .= "Content-Type: application/pdf; name=\"{$filename}\"\r\n";
$body .= "Content-Transfer-Encoding: base64\r\n";
$body .= "Content-Disposition: attachment; filename=\"{$filename}\"\r\n\r\n";
$body .= $content . "\r\n";
$body .= "--{$boundary}--";

// Enviar
if (mail($to, $subject, $body, $headers)) {
  echo "Enviado";
} else {
  http_response_code(500);
  echo "Error al enviar";
}
