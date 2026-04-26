const authorsModel = require('../models/authorsModel'); // Importar modelo de autores
const authorsViews = require('../views/responseFormatter'); // Importar formateador

const authorsController = { // Controlador de autores
  getAuthors: () => { // Obtener todos los autores
    const authors = authorsModel.readAuthors(); // Leer autores del archivo
    return authorsViews.responseFormatter(authors); // Formatear respuesta
  },

  addAuthor: (newAuthor) => { // Agregar nuevo autor
    const authors = authorsModel.readAuthors(); // Leer autores existentes
    authors.push(newAuthor); // Agregar nuevo a lista
    authorsModel.writeAuthors(authors); // Guardar en archivo
    return authorsViews.responseFormatter({ message: "Autor agregado exitosamente" }); // Confirmar
  },

  findAuthorByName: (name) => { // Buscar autor por nombre
    const authors = authorsModel.readAuthors(); // Leer todos los autores

    const result = authors.filter(author => // Filtrar por nombre
      author.name && // Validar que name existe
      author.name.toLowerCase().includes(name.toLowerCase()) // Búsqueda insensible a mayúsculas
    );

    return authorsViews.responseFormatter(result); // Retornar resultados
  },

  findAuthorByNationality: (nationality) => { // Buscar autor por nacionalidad
    const authors = authorsModel.readAuthors(); // Leer todos los autores

    const result = authors.filter(author => // Filtrar por nacionalidad
      author.nationality && // Validar que nationality existe
      author.nationality.toLowerCase().includes(nationality.toLowerCase()) // Búsqueda insensible a mayúsculas
    );

    return authorsViews.responseFormatter(result); // Retornar resultados
  }
};

module.exports = authorsController; // Exportar controlador