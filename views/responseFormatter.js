const responseFormatter = { // Crear objeto formateador de respuestas
  responseFormatter: (data) => { // Función para formatear datos en respuesta
    return JSON.stringify(data, null, 2) + "\n"; // Convertir datos a JSON formateado con indentación y salto de línea
  }
};

module.exports = responseFormatter; // Exportar formateador de respuestas
