const publishersModel = require('../models/publishersModel'); // Importar modelo de editoriales
const publishersViews = require('../views/responseFormatter'); // Importar formateador

const publishersController = { // Controlador de editoriales
  getPublishers: () => { // Obtener todas las editoriales
    const publishers = publishersModel.readPublishers(); // Leer editoriales del archivo
    return publishersViews.responseFormatter(publishers); // Formatear respuesta
  },

  addPublisher: (newPublisher) => { // Agregar nueva editorial
    const publishers = publishersModel.readPublishers(); // Leer editoriales existentes
    publishers.push(newPublisher); // Agregar nueva a lista
    publishersModel.writePublishers(publishers); // Guardar en archivo
    return publishersViews.responseFormatter({ message: "Editorial agregada exitosamente" }); // Confirmar
  },

  findPublisherByName: (name) => { // Buscar editorial por nombre
    const publishers = publishersModel.readPublishers(); // Leer todas las editoriales

    const result = publishers.filter(pub => // Filtrar por nombre
      pub.name && // Validar que name existe
      pub.name.toLowerCase().includes(name.toLowerCase()) // Búsqueda insensible a mayúsculas
    );

    return publishersViews.responseFormatter(result); // Retornar resultados
  }
};

module.exports = publishersController; // Exportar controlador
