const fs = require("fs"); // Importar módulo del sistema de archivos
const path = require("path"); // Importar módulo de rutas

const filePath = path.join(__dirname, "../data/authors.json"); // Definir ruta del archivo de autores

const authorsModel = { // Crear objeto modelo de autores

  readAuthors: () => { // Función para leer autores del archivo
    try { // Intentar leer el archivo
         const data = fs.readFileSync(filePath, "utf-8"); // Leer contenido del archivo
         return JSON.parse(data); // Parsear y retornar datos JSON
     } catch (error) { // Si hay error
          console.error("Error al leer el archivo de autores:", error); // Mostrar mensaje de error
          return []; // Retornar lista vacía
     }
  },

  writeAuthors: (authors) => { // Función para escribir autores en el archivo
      try { // Intentar escribir en el archivo
          fs.writeFileSync(filePath, JSON.stringify(authors, null, 2)); // Escribir datos formateados
      } catch (error) { // Si hay error
          console.error("Error al escribir en el archivo de autores:", error); // Mostrar mensaje de error
     }
  }
};

module.exports = authorsModel; // Exportar modelo de autores