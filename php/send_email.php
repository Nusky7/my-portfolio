<?php
$allowed_origins = [
  'http://127.0.0.1:5501',
  'https://nusky7studio.es',
];

$BR = '<br>';

// CORS
if (isset($_SERVER['HTTP_ORIGIN']) && in_array($_SERVER['HTTP_ORIGIN'], $allowed_origins)) {
  header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
  header("Access-Control-Allow-Methods: POST, OPTIONS");
  header("Access-Control-Allow-Headers: Content-Type");
}

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
  http_response_code(200);
  exit;
}

$to = "info@nusky7studio.es";
$subject = "⚙️ N7S · Nueva Solicitud";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Sanitización
  $name = htmlspecialchars(trim($_POST["name"] ?? ''));
  $email = htmlspecialchars(trim($_POST["email"] ?? ''));
  $message = htmlspecialchars(trim($_POST["message"] ?? ''));
  $phone = htmlspecialchars(trim($_POST["phone"] ?? ''));
  $prefix = htmlspecialchars(trim($_POST["prefix"] ?? ''));
  $interes = htmlspecialchars(trim($_POST["interes"] ?? ''));
  $express = isset($_POST["express"]) ? 'Sí' : '';
  $seo = isset($_POST["seo"]) ? 'Sí' : '';
  $branding = isset($_POST["branding"]) ? 'Sí' : '';
  $extras = htmlspecialchars(trim($_POST["extras"] ?? ''));


  // Validación mínima
  if (empty($name) || empty($email)) {
    http_response_code(400);
    echo "Faltan campos requeridos.";
    exit;
  }

  // Cuerpo
  $body = "📧 Has recibido un nuevo mensaje desde la Lanzadera:\n\n";
  $body .= $message . "\n\n";

  // Agregar teléfono si se ha proporcionado
  if (!empty($phone)) {
    $fullPhone = $prefix . ' ' . $phone;
    $body .= "📞 Teléfono: $fullPhone\n";
  }

  $body .= "Enviado por: $name <$email>";

  // Cabeceras
  $headers = "From: $name <$email>\r\n";
  $headers .= "Reply-To: $email\r\n";
  $headers .= "MIME-Version: 1.0\r\n";
  $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

  $body = '
  <!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <title>Solicitud Lanzadera N7S</title>
  </head>
  <body style="max-width:100vw;background-color:#0f0f0f;color:#f5f5f5;font-family:sans-serif;padding:2em; color: #fffff">
    <div style="max-width:100%;margin:0 auto;background-color:#1c1c1c;border:1px solid #333;padding:2em; border-radius: 1rem;">
      <h2 style="color:#ff66c4;margin-top:0;">Nueva Solicitud</h2>

      <p style="font-size:1.1em; color: #fffff">Consulta enviada desde el formulario web:</p>

   <!-- Tabla horizontal reducida -->
    <div style="max-width:100%; margin-top:1.5em; border:1px solid #444; border-radius:8px; overflow:hidden; font-family:sans-serif;">
      
      <!-- Nombre -->

      <div style="background-color:rgba(128,0,128,0.15); color:#ff66c4; padding:12px; border-bottom:1px solid #444;">
        👤 Nombre
      </div>
      <div style="padding:10px; border-bottom:1px solid #333; color:#ccc;">
        ' . $name . '
      </div>

      <!-- Email -->
      <div style="background-color:rgba(128,0,128,0.15); color:#ff66c4; padding:12px; border-bottom:1px solid #444;">
        📧 Email
      </div>
      <div style="padding:10px; color:#ccc; word-break:break-all;">
        ' . $email . '
      </div>

      <!-- Interés -->
      <div style="background-color:rgba(128,0,128,0.15); color:#ff66c4; padding:12px; border-bottom:1px solid #444;">
        🎯 Interés
      </div>
      <div style="padding:10px; border-bottom:1px solid #333; color:#ccc;">
        ' . (!empty($interes) ? $interes : '—') . '
      </div>

      <!-- Extras -->
      <div style="background-color:rgba(128,0,128,0.15); color:#ff66c4; padding:12px; border-bottom:1px solid #444;">
        🛠️ Extras
      </div>
      <div style="padding:10px; border-bottom:1px solid #333; color:#ccc;">
        ' . (!empty($extras) ? $extras : '—') . '
      </div>

    </div>

    <!-- Botón con Teléfono debajo -->
    <div style="margin-top: 1em; text-align: center;">
      ' . (!empty($phone) ? '
        <a href="tel:' . $prefix . $phone . '"
          style="display:inline-block; padding:10px 18px; margin-top:8px;
                  background-color:rgba(128,0,128,0.15); color:#ff66c4;
                  border-radius:3rem; text-decoration:none; font-weight:bold;">
          📞 ' . $prefix . ' ' . $phone . '
        </a>' : '
        <span style="color:#777;">📞 Teléfono no proporcionado</span>') . '
    </div>



      <!-- Mensaje -->
      <div style="margin-top:2em;">
        <h3 style="color:#ff66c4;margin-bottom:0.5em;">📝 Mensaje:</h3>
        <div style="background-color:#111;padding:1em;border-radius:8px;border:1px solid #333;white-space:pre-line;">
          ' . nl2br(preg_replace('/^(Nombre|Email|Teléfono):.*$/m', '', $message)) . '
        </div>
      </div>

      <p style="margin-top:2em;color:#888;font-size:0.9em;text-align:center;">
        ⭐ Este mensaje fue enviado desde <strong style="color:#ff66c4">N7Studio</strong>
      </p>
    </div>
  </body>
  </html>';

  // Envío
  if (mail($to, $subject, $body, $headers)) {
    http_response_code(200);
    echo "Mensaje enviado correctamente.";
  } else {
    http_response_code(500);
    echo "Error al enviar el mensaje.";
  }
} else {
  http_response_code(405);
  echo "Método no permitido.";
}
