const net = require('net'); // Importar módulo TCP
const { v4: uuidv4 } = require('uuid'); // Importar generador de IDs únicos

const booksController = require('./controllers/booksController'); // Importar controlador de libros
const authorsController = require('./controllers/authorsController'); // Importar controlador de autores
const publishersController = require('./controllers/publishersController'); // Importar controlador de editoriales

function buildResponse(status, data = null, error = null) { // Construir respuesta estándar
  return JSON.stringify({ status, data, error }, null, 2) + "\n"; // Serializar a JSON formateado
}

const server = net.createServer((socket) => { // Crear servidor que acepta conexiones TCP
  console.log(`Cliente conectado desde ${socket.remoteAddress}:${socket.remotePort}`); // Registrar IP y puerto

  socket.on('data', (data) => { // Escuchar datos del cliente
    const input = data.toString().trim(); // Convertir a string y eliminar espacios

    let request; // Variable para solicitud

    try {
      request = JSON.parse(input); // Parsear entrada JSON
    } catch (error) {
      socket.write(buildResponse('error', null, 'JSON inválido')); // Enviar error si JSON inválido
      return; // Salir
    }

    const { action, payload } = request; // Desestructurar acción y payload

    if (!action) { // Validar existencia de acción
      socket.write(buildResponse('error', null, 'Falta action')); // Enviar error
      return; // Salir
    }

    if (action === "get_books") { // Obtener todos los libros
      const response = JSON.parse(booksController.getBooks()); // Consultar controlador
      socket.write(buildResponse('success', response)); // Enviar respuesta
    }

    else if (action === "add_book") { // Agregar nuevo libro
      if (!payload || !payload.title || !payload.gender || !payload.year) { // Validar campos
        socket.write(buildResponse('error', null, 'Faltan campos obligatorios')); // Enviar error
        return; // Salir
      }

      const newBook = { // Crear objeto libro
        id: uuidv4(), // Generar ID único
        ...payload // Incluir datos
      };

      const response = JSON.parse(booksController.addBook(newBook)); // Guardar libro
      socket.write(buildResponse('success', response)); // Enviar confirmación
    }

    else if (action === "find_book_by_title") { // Buscar libro por título
      if (!payload || !payload.title) { // Validar título
        socket.write(buildResponse('error', null, 'Falta title')); // Enviar error
        return; // Salir
      }

      const response = JSON.parse(booksController.findBookByTitle(payload.title)); // Buscar
      socket.write(buildResponse('success', response)); // Enviar resultados
    }

    else if (action === "find_book_by_gender") { // Buscar libro por género
      if (!payload || !payload.gender) { // Validar género
        socket.write(buildResponse('error', null, 'Falta gender')); // Enviar error
        return; // Salir
      }

      const response = JSON.parse(booksController.findBookByGender(payload.gender)); // Buscar
      socket.write(buildResponse('success', response)); // Enviar resultados
    }

    else if (action === "get_authors") { // Obtener todos los autores
      const response = JSON.parse(authorsController.getAuthors()); // Consultar controlador
      socket.write(buildResponse('success', response)); // Enviar respuesta
    }

    else if (action === "add_author") { // Agregar nuevo autor
      if (!payload || !payload.name) { // Validar nombre
        socket.write(buildResponse('error', null, 'Falta nombre')); // Enviar error
        return; // Salir
      }

      const newAuthor = { // Crear objeto autor
        id: uuidv4(), // Generar ID único
        ...payload // Incluir datos
      };

      const response = JSON.parse(authorsController.addAuthor(newAuthor)); // Guardar autor
      socket.write(buildResponse('success', response)); // Enviar confirmación
    }

    else if (action === "find_author_by_name") { // Buscar autor por nombre
      if (!payload || !payload.name) { // Validar nombre
        socket.write(buildResponse('error', null, 'Falta nombre')); // Enviar error
        return; // Salir
      }

      const response = JSON.parse(authorsController.findAuthorByName(payload.name)); // Buscar
      socket.write(buildResponse('success', response)); // Enviar resultados
    }

    else if (action === "find_author_by_nationality") { // Buscar autor por nacionalidad
      if (!payload || !payload.nationality) { // Validar nacionalidad
        socket.write(buildResponse('error', null, 'Falta nacionalidad')); // Enviar error
        return; // Salir
      }

      const response = JSON.parse(authorsController.findAuthorByNationality(payload.nationality)); // Buscar
      socket.write(buildResponse('success', response)); // Enviar resultados
    }

    else if (action === "get_publishers") { // Obtener todas las editoriales
      const response = JSON.parse(publishersController.getPublishers()); // Consultar controlador
      socket.write(buildResponse('success', response)); // Enviar respuesta
    }

    else if (action === "add_publisher") { // Agregar nueva editorial
      if (!payload || !payload.name) { // Validar nombre
        socket.write(buildResponse('error', null, 'Falta nombre')); // Enviar error
        return; // Salir
      }

      const newPublisher = { // Crear objeto editorial
        id: uuidv4(), // Generar ID único
        ...payload // Incluir datos
      };

      const response = JSON.parse(publishersController.addPublisher(newPublisher)); // Guardar editorial
      socket.write(buildResponse('success', response)); // Enviar confirmación
    }

    else if (action === "find_publisher_by_name") { // Buscar editorial por nombre
      if (!payload || !payload.name) { // Validar nombre
        socket.write(buildResponse('error', null, 'Falta nombre')); // Enviar error
        return; // Salir
      }

      const response = JSON.parse(publishersController.findPublisherByName(payload.name)); // Buscar
      socket.write(buildResponse('success', response)); // Enviar resultados
    }

    else { // Si acción no existe
      socket.write(buildResponse('error', null, 'Acción no reconocida')); // Enviar error
    }
  });

  socket.on('end', () => { // Escuchar desconexión del cliente
    console.log(`Cliente desconectado ${socket.remoteAddress}:${socket.remotePort}`); // Registrar desconexión
  });

  socket.on('close', () => { // Escuchar cierre de conexión
    console.log(`Conexión cerrada ${socket.remoteAddress}:${socket.remotePort}`); // Registrar cierre
  });

  socket.on('error', (err) => { // Escuchar errores de conexión
    console.log(`Error en la conexión: ${err.message}`); // Registrar error
  });
});

server.listen(8080, () => { // Iniciar servidor en puerto 8080
  console.log("Servidor TCP escuchando en el puerto 8080"); // Confirmar inicio
});