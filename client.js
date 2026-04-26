const net = require("net"); // Importar módulo TCP
const readline = require("readline"); // Importar módulo para entrada del usuario

const rl = readline.createInterface({ // Crear interfaz de línea
  input: process.stdin, // Entrada estándar
  output: process.stdout // Salida estándar
});

const client = new net.Socket(); // Crear socket cliente

client.connect(8080, 'localhost', () => { // Conectar al servidor
  console.log("CONECTADO AL SERVIDOR TCP"); // Confirmar conexión
  showMenu(); // Mostrar menú
});

function showMenu() { // Mostrar menú de opciones
  console.log(`
===== MENU =====
1. VER LIBROS
2. AGREGAR LIBRO
3. BUSCAR LIBRO POR TITULO
4. BUSCAR LIBRO POR GENERO
5. VER AUTORES
6. AGREGAR AUTOR
7. BUSCAR AUTOR POR NOMBRE
8. BUSCAR AUTOR POR NACIONALIDAD
9. VER EDITORIALES
10. AGREGAR EDITORIAL
11. BUSCAR EDITORIAL POR NOMBRE
12. SALIR
================
  `);

  rl.question("ELEGÍ UNA OPCIÓN: ", (option) => { // Solicitar opción al usuario

    if (option === "1") { // Ver libros
      sendRequest({ action: "get_books" });
    }

    else if (option === "2") { // Agregar libro
      addBookFlow();
    }

    else if (option === "3") { // Buscar por título
      rl.question("TITULO (ej. El Principito): ", (title) => {
        sendRequest({
          action: "find_book_by_title",
          payload: { title }
        });
      });
    }

    else if (option === "4") { // Buscar por género
      rl.question("GENERO (ej. Ficción): ", (gender) => {
        sendRequest({
          action: "find_book_by_gender",
          payload: { gender }
        });
      });
    }

    else if (option === "5") { // Ver autores
      sendRequest({ action: "get_authors" });
    }

    else if (option === "6") { // Agregar autor
      addAuthorFlow();
    }

    else if (option === "7") { // Buscar autor por nombre
      rl.question("NOMBRE (ej. Liz): ", (name) => {
        sendRequest({
          action: "find_author_by_name",
          payload: { name }
        });
      });
    }

    else if (option === "8") { // Buscar autor por nacionalidad
      rl.question("NACIONALIDAD (ej. Argentina): ", (nationality) => {
        sendRequest({
          action: "find_author_by_nationality",
          payload: { nationality }
        });
      });
    }

    else if (option === "9") { // Ver editoriales
      sendRequest({ action: "get_publishers" });
    }

    else if (option === "10") { // Agregar editorial
      addPublisherFlow();
    }

    else if (option === "11") { // Buscar editorial por nombre
      rl.question("NOMBRE (ej. Penguin): ", (name) => {
        sendRequest({
          action: "find_publisher_by_name",
          payload: { name }
        });
      });
    }

    else if (option === "12") { // Salir
      console.log("SALIENDO...");
      client.end();
      rl.close();
    }

    else { // Opción inválida
      console.log("OPCIÓN INVÁLIDA");
      showMenu();
    }
  });
}

function sendRequest(request) { // Enviar solicitud al servidor
  client.write(JSON.stringify(request) + "\n"); // Serializar y enviar
}

function addBookFlow() { // Flujo para agregar libro
  rl.question("TITULO (ej. El Principito): ", (title) => { // Pedir título
    rl.question("GENERO (ej. Ficción): ", (gender) => { // Pedir género
      rl.question("AÑO (ej. 1943): ", (year) => { // Pedir año

        const request = { // Crear solicitud
          action: "add_book",
          payload: {
            title: title,
            gender: gender,
            year: Number(year) // Convertir a número
          }
        };

        sendRequest(request); // Enviar solicitud
      });
    });
  });
}

function addAuthorFlow() { // Flujo para agregar autor
  rl.question("NOMBRE (ej. Antoine de Saint-Exupéry): ", (name) => { // Pedir nombre
    rl.question("NACIONALIDAD (ej. Francia): ", (nationality) => { // Pedir nacionalidad

      const request = { // Crear solicitud
        action: "add_author",
        payload: {
          name: name,
          nationality: nationality
        }
      };

      sendRequest(request); // Enviar solicitud
    });
  });
}

function addPublisherFlow() { // Flujo para agregar editorial
  rl.question("NOMBRE (ej. Penguin Books): ", (name) => { // Pedir nombre
    rl.question("PAIS (ej. Reino Unido): ", (country) => { // Pedir país

      const request = { // Crear solicitud
        action: "add_publisher",
        payload: {
          name: name,
          country: country
        }
      };

      sendRequest(request); // Enviar solicitud
    });
  });
}

client.on('data', (data) => { // Escuchar respuesta del servidor
  console.log("\nRESPUESTA DEL SERVIDOR:"); // Mostrar encabezado
  console.log(data.toString()); // Mostrar datos
  showMenu(); // Volver al menú
});

client.on('close', () => { // Escuchar cierre de conexión
  console.log("CONEXION CERRADA"); // Registrar cierre
});

client.on('error', (err) => { // Escuchar errores
  console.error("ERROR:", err.message); // Mostrar error
});