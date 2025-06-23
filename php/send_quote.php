<?php
$allowedOrigins = [
  "https://nusky7studio.es",
  "http://127.0.0.1:5501"
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowedOrigins)) {
  header("Access-Control-Allow-Origin: $origin");
  header("Access-Control-Allow-Methods: POST");
  header("Access-Control-Allow-Headers: Content-Type");
}

// Validar archivo PDF
if (!isset($_FILES['pdf']) || $_FILES['pdf']['error'] !== UPLOAD_ERR_OK) {
  http_response_code(400);
  echo "Archivo PDF no recibido correctamente.";
  exit;
}

// Datos del cliente
$clientName = $_POST['clientName'] ?? 'No proporcionado';
$clientEmail = $_POST['clientEmail'] ?? 'No proporcionado';
$clientPhone = $_POST['clientPhone'] ?? 'No proporcionado';

// Email destinatario principal
$to = "info@nusky7studio.es"; // Asegúrate de que este es el tuyo real
$subject = "Nuevo presupuesto desde N7Studio";

// Construir mensaje en HTML
$htmlMessage = '
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #111;">
  <h2 style="color: #A259FF;">Nuevo presupuesto web desde N7Studio</h2>
  <p>Hola ' . htmlspecialchars($clientName) . ', has recibido el presupuesto para tu proyecto generado desde la calculadora web.</p>

  <h4 style="text-align:center;">Datos del Cliente</h4>
  <div style="border:1px solid #444; border-radius:8px; overflow:hidden;">
    <div style="background-color:rgba(162,89,255,0.15); color:#A259FF; padding:12px; border-bottom:1px solid #444;">
      👤 Nombre
    </div>
    <div style="padding:10px; border-bottom:1px solid #333;">' . htmlspecialchars($clientName) . '</div>

    <div style="background-color:rgba(162,89,255,0.15); color:#A259FF; padding:12px; border-bottom:1px solid #444;">
      📧 Email
    </div>
    <div style="padding:10px; border-bottom:1px solid #333; word-break:break-all;">' . htmlspecialchars($clientEmail) . '</div>

    <div style="background-color:rgba(162,89,255,0.15); color:#A259FF; padding:12px; border-bottom:1px solid #444;">
      📱 Teléfono
    </div>
    <div style="padding:10px; border-bottom:1px solid #333;">' . htmlspecialchars($clientPhone) . '</div>

  </div>

  <p style="margin-top:1em;">📎 Se adjunta el archivo PDF con los detalles estimados.</p>
  <p style="font-size: 0.9em; color:#888;">* Recuerda: los presupuestos online son orientativos. Para un presupuesto cerrado, agenda una reunión.</p>

<p style="margin-top:2em; text-align:center; font-size:0.8em; color:#555;">
  N7Studio · Diseño & Desarrollo Web<br>
  <a href="https://nusky7studio.es/sites" style="color:#A259FF; text-decoration:none;" target="_blank">www.nusky7studio.es</a>
</p>
</div>
';

// Preparar el archivo
$file = $_FILES['pdf']['tmp_name'];
$filename = basename($_FILES['pdf']['name']);
$fileContents = chunk_split(base64_encode(file_get_contents($file)));
$uid = md5(uniqid(time()));
$boundary = "==Multipart_Boundary_x{$uid}x";

// Headers
$headers = "From: N7Studio <info@nusky7studio.es>\r\n";
$headers .= "Reply-To: info@nusky7studio.es\r\n";
$headers .= "Cc: {$clientEmail}\r\n"; // copia para cliente
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: multipart/mixed; boundary=\"{$boundary}\"\r\n";

// Cuerpo completo con adjunto
$body = "--{$boundary}\r\n";
$body .= "Content-Type: text/html; charset=\"UTF-8\"\r\n";
$body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
$body .= $htmlMessage . "\r\n";

$body .= "--{$boundary}\r\n";
$body .= "Content-Type: application/pdf; name=\"{$filename}\"\r\n";
$body .= "Content-Transfer-Encoding: base64\r\n";
$body .= "Content-Disposition: attachment; filename=\"{$filename}\"\r\n\r\n";
$body .= $fileContents . "\r\n";
$body .= "--{$boundary}--";

// Enviar correo
if (mail($to, $subject, $body, $headers)) {
  echo "Enviado";
} else {
  http_response_code(500);
  echo "Error al enviar";
}
