const booksModel = require('../models/booksModel'); // Importar modelo de libros
const booksViews = require('../views/responseFormatter'); // Importar formateador

const booksController = { // Controlador de libros
  getBooks: () => { // Obtener todos los libros
    const books = booksModel.readBooks(); // Leer libros del archivo
    return booksViews.responseFormatter(books); // Formatear respuesta
  },

  addBook: (newBook) => { // Agregar nuevo libro
    const books = booksModel.readBooks(); // Leer libros existentes
    books.push(newBook); // Agregar nuevo a lista
    booksModel.writeBooks(books); // Guardar en archivo
    return booksViews.responseFormatter({ message: "Libro agregado exitosamente" }); // Confirmar
  },

  findBookByTitle: (title) => { // Buscar libro por título
    const books = booksModel.readBooks(); // Leer todos los libros

    const result = books.filter(book => { // Filtrar por título
      const bookTitle = book.title || book.titulo; // Soportar ambas propiedades

      return bookTitle && // Validar que existe
        bookTitle.toLowerCase().includes(title.toLowerCase()); // Búsqueda insensible a mayúsculas
    });

    return booksViews.responseFormatter(result); // Retornar resultados
  },

  findBookByGender: (gender) => { // Buscar libro por género
    const books = booksModel.readBooks(); // Leer todos los libros

    const result = books.filter(book => { // Filtrar por género
      const bookGender = book.gender || book.genero; // Soportar ambas propiedades

      return bookGender && // Validar que existe
        bookGender.toLowerCase().includes(gender.toLowerCase()); // Búsqueda insensible a mayúsculas
    });

    return booksViews.responseFormatter(result); // Retornar resultados
  }
};

module.exports = booksController; // Exportar controlador