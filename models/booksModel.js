const fs = require("fs"); // Importar módulo del sistema de archivos
const path = require("path"); // Importar módulo de rutas

const filePath = path.join(__dirname, "../data/books.json"); // Definir ruta del archivo de libros

const bookModel = { // Crear objeto modelo de libros

  readBooks: () => { // Función para leer libros del archivo
    try { // Intentar leer el archivo
         const data = fs.readFileSync(filePath, "utf-8"); // Leer contenido del archivo
         return JSON.parse(data); // Parsear y retornar datos JSON
     } catch (error) { // Si hay error
          console.error("Error al leer el archivo de libros:", error); // Mostrar mensaje de error
          return []; // Retornar lista vacía
     }
  },

  writeBooks: (books) => { // Función para escribir libros en el archivo
      try { // Intentar escribir en el archivo
          fs.writeFileSync(filePath, JSON.stringify(books, null, 2)); // Escribir datos formateados
      } catch (error) { // Si hay error
          console.error("Error al escribir en el archivo de libros:", error); // Mostrar mensaje de error
     }
  }
};

module.exports = bookModel; // Exportar modelo de libros
