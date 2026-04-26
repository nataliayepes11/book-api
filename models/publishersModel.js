const fs = require("fs"); // Importar módulo del sistema de archivos
const path = require("path"); // Importar módulo de rutas

const filePath = path.join(__dirname, "../data/publishers.json"); // Definir ruta del archivo de editoriales

const publishersModel = { // Crear objeto modelo de editoriales

  readPublishers: () => { // Función para leer editoriales del archivo
    try { // Intentar leer el archivo
         const data = fs.readFileSync(filePath, "utf-8"); // Leer contenido del archivo
         return JSON.parse(data); // Parsear y retornar datos JSON
     } catch (error) { // Si hay error
          console.error("Error al leer el archivo de editoriales:", error); // Mostrar mensaje de error
          return []; // Retornar lista vacía
     }
  },

  writePublishers: (publishers) => { // Función para escribir editoriales en el archivo
      try { // Intentar escribir en el archivo
          fs.writeFileSync(filePath, JSON.stringify(publishers, null, 2)); // Escribir datos formateados
      } catch (error) { // Si hay error
          console.error("Error al escribir en el archivo de editoriales:", error); // Mostrar mensaje de error
     }
  }
};

module.exports = publishersModel; // Exportar modelo de editoriales