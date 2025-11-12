// 1. Importar Express
const express = require("express");
const app = express();
const port = 3000;

// 2. Middleware para que Express entienda JSON [cite: 22]
app.use(express.json());

// 3. "Base de Datos" en memoria [cite: 9]
let alumnos = [];
let profesores = [];

// Variable para el ID autoincremental de alumnos
let nextAlumnoId = 1;

// 4. Endpoints
app.get("/", (req, res) => {
  res.send("¡Hola! Esta es la raíz de tu API REST.");
});

// ===============================================
//          ENDPOINTS DE ALUMNOS
// ===============================================

/**
 * GET /alumnos [cite: 11]
 * Regresa la lista de todos los alumnos.
 */
app.get("/alumnos", (req, res) => {
  // Regresa el array y un código 200 (OK) [cite: 23]
  res.status(200).json(alumnos);
});

/**
 * POST /alumnos [cite: 13]
 * Crea un nuevo alumno.
 */
app.post("/alumnos", (req, res) => {
  const { nombres, apellidos, matricula, promedio } = req.body;

  // Validaciones [cite: 24]
  if (!nombres || !apellidos || !matricula || promedio === undefined) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  if (typeof promedio !== "number") {
    return res
      .status(400)
      .json({ error: "El promedio debe ser un valor numérico" });
  }
  if (typeof matricula !== "string") {
    return res
      .status(400)
      .json({ error: "La matricula debe ser de tipo string" });
  }

  // Crear el nuevo alumno
  const newAlumno = {
    id: nextAlumnoId++, // Asignar el ID y luego incrementarlo
    nombres: nombres,
    apellidos: apellidos,
    matricula: matricula,
    promedio: promedio,
  };

  alumnos.push(newAlumno);

  // Respuesta: código 201 (Creado) y el objeto nuevo [cite: 23]
  res.status(201).json(newAlumno);
});

/**
 * GET /alumnos/{id} [cite: 12]
 * Obtiene un alumno por su ID.
 */
app.get("/alumnos/:id", (req, res) => {
  // req.params.id siempre es un string, hay que convertirlo a número
  const id = parseInt(req.params.id);
  const alumno = alumnos.find((a) => a.id === id);

  if (alumno) {
    res.status(200).json(alumno); // [cite: 23]
  } else {
    // Si no se encuentra, 404 (No Encontrado) [cite: 23]
    res.status(404).json({ error: "Alumno no encontrado" });
  }
});

/**
 * PUT /alumnos/{id} [cite: 14]
 * Actualiza un alumno por su ID.
 */
app.put("/alumnos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombres, apellidos, matricula, promedio } = req.body;

  // Validaciones [cite: 24]
  if (!nombres || !apellidos || !matricula || promedio === undefined) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  if (typeof promedio !== "number") {
    return res
      .status(400)
      .json({ error: "El promedio debe ser un valor numérico" });
  }

  // Encontrar el índice del alumno en el array
  const alumnoIndex = alumnos.findIndex((a) => a.id === id);

  if (alumnoIndex === -1) {
    // Si no se encuentra, 404 (No Encontrado) [cite: 23]
    return res.status(404).json({ error: "Alumno no encontrado" });
  }

  // Crear el objeto actualizado
  const updatedAlumno = {
    id: id,
    nombres: nombres,
    apellidos: apellidos,
    matricula: matricula,
    promedio: promedio,
  };

  // Reemplazar el objeto antiguo con el nuevo
  alumnos[alumnoIndex] = updatedAlumno;

  // Regresar el objeto actualizado y código 200 (OK) [cite: 23]
  res.status(200).json(updatedAlumno);
});

/**
 * DELETE /alumnos/{id} [cite: 15]
 * Elimina un alumno por su ID.
 */
app.delete("/alumnos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const alumnoIndex = alumnos.findIndex((a) => a.id === id);

  if (alumnoIndex === -1) {
    // Si no se encuentra, 404 (No Encontrado) [cite: 23]
    return res.status(404).json({ error: "Alumno no encontrado" });
  }

  // Eliminar el alumno del array usando su índice
  alumnos.splice(alumnoIndex, 1);

  // Regresar un mensaje de éxito y código 200 (OK) [cite: 23]
  res.status(200).json({ message: "Alumno eliminado correctamente" });
});

// ===============================================
//          ENDPOINTS DE PROFESORES
// ===============================================

// Variable para el ID autoincremental de profesores
let nextProfesorId = 1;

/**
 * GET /profesores
 * Regresa la lista de todos los profesores.
 */
app.get("/profesores", (req, res) => {
  res.status(200).json(profesores);
});

/**
 * POST /profesores
 * Crea un nuevo profesor.
 */
app.post("/profesores", (req, res) => {
  const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;

  // Validaciones [cite: 24]
  if (!numeroEmpleado || !nombres || !apellidos || horasClase === undefined) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  if (typeof horasClase !== "number") {
    return res
      .status(400)
      .json({ error: "Las horasClase deben ser un valor numérico" });
  }
  if (typeof numeroEmpleado !== "string") {
    return res
      .status(400)
      .json({ error: "El numeroEmpleado debe ser de tipo string" });
  }

  // Crear el nuevo profesor [cite: 8]
  const newProfesor = {
    id: nextProfesorId++,
    numeroEmpleado: numeroEmpleado,
    nombres: nombres,
    apellidos: apellidos,
    horasClase: horasClase,
  };

  profesores.push(newProfesor);

  // Respuesta: código 201 (Creado) [cite: 23]
  res.status(201).json(newProfesor);
});

/**
 * GET /profesores/{id}
 * Obtiene un profesor por su ID.
 */
app.get("/profesores/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const profesor = profesores.find((p) => p.id === id);

  if (profesor) {
    res.status(200).json(profesor);
  } else {
    // Si no se encuentra, 404 (No Encontrado) [cite: 23]
    res.status(404).json({ error: "Profesor no encontrado" });
  }
});

/**
 * PUT /profesores/{id}
 * Actualiza un profesor por su ID.
 */
app.put("/profesores/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { numeroEmpleado, nombres, apellidos, horasClase } = req.body;

  // Validaciones [cite: 24]
  if (!numeroEmpleado || !nombres || !apellidos || horasClase === undefined) {
    return res.status(400).json({ error: "Todos los campos son obligatorios" });
  }
  if (typeof horasClase !== "number") {
    return res
      .status(400)
      .json({ error: "Las horasClase deben ser un valor numérico" });
  }

  const profesorIndex = profesores.findIndex((p) => p.id === id);

  if (profesorIndex === -1) {
    return res.status(404).json({ error: "Profesor no encontrado" });
  }

  // Crear el objeto actualizado
  const updatedProfesor = {
    id: id,
    numeroEmpleado: numeroEmpleado,
    nombres: nombres,
    apellidos: apellidos,
    horasClase: horasClase,
  };

  profesores[profesorIndex] = updatedProfesor;

  // Regresar el objeto actualizado y código 200 (OK)
  res.status(200).json(updatedProfesor);
});

/**
 * DELETE /profesores/{id}
 * Elimina un profesor por su ID.
 */
app.delete("/profesores/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const profesorIndex = profesores.findIndex((p) => p.id === id);

  if (profesorIndex === -1) {
    return res.status(404).json({ error: "Profesor no encontrado" });
  }

  profesores.splice(profesorIndex, 1);

  // Regresar un mensaje de éxito y código 200 (OK)
  res.status(200).json({ message: "Profesor eliminado correctamente" });
});

// 5. Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor de API corriendo en http://localhost:${port}`);
});
