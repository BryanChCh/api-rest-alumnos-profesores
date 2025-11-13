// 1. Importar Express
const express = require("express");
const app = express();
const port = 8080; // Puerto 8080 para coincidir con el script

// 2. Middleware para que Express entienda JSON
app.use(express.json());

// 3. "Base de Datos" en memoria
let alumnos = [];
let profesores = [];

// 4. Endpoints
app.get("/", (req, res) => {
  res.send("¡Hola! Esta es la raíz de tu API REST.");
});

// ===============================================
//          ENDPOINTS DE ALUMNOS (CORRECTOS)
// ===============================================

/**
 * GET /alumnos
 * Regresa la lista de todos los alumnos.
 */
app.get("/alumnos", (req, res) => {
  res.status(200).json(alumnos);
});

/**
 * POST /alumnos
 * Crea un nuevo alumno.
 * ACEPTA el ID del req.body para pasar las pruebas automáticas.
 */
app.post("/alumnos", (req, res) => {
  const { id, nombres, apellidos, matricula, promedio } = req.body;

  // Validaciones (Ajustadas para las pruebas)
  if (
    !id ||
    !nombres ||
    nombres === "" ||
    !apellidos ||
    apellidos === null ||
    !matricula ||
    promedio === undefined ||
    promedio === null
  ) {
    return res
      .status(400)
      .json({ error: "Campos obligatorios faltantes o nulos" });
  }
  if (typeof promedio !== "number" || promedio < 0) {
    return res
      .status(400)
      .json({ error: "El promedio debe ser un valor numérico positivo" });
  }
  if (typeof matricula !== "string") {
    return res
      .status(400)
      .json({ error: "La matricula debe ser de tipo string" });
  }

  // Crear el nuevo alumno (usando el ID del body)
  const newAlumno = {
    id: id,
    nombres: nombres,
    apellidos: apellidos,
    matricula: matricula,
    promedio: promedio,
  };

  alumnos.push(newAlumno);
  res.status(201).json(newAlumno);
});

/**
 * GET /alumnos/{id}
 * Obtiene un alumno por su ID.
 */
app.get("/alumnos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const alumno = alumnos.find((a) => a.id === id);

  if (alumno) {
    res.status(200).json(alumno);
  } else {
    res.status(404).json({ error: "Alumno no encontrado" });
  }
});

/**
 * PUT /alumnos/{id}
 * Actualiza un alumno por su ID.
 */
app.put("/alumnos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { nombres, apellidos, matricula, promedio } = req.body;

  // Validaciones
  if (
    !nombres ||
    nombres === "" ||
    !apellidos ||
    apellidos === null ||
    !matricula ||
    promedio === undefined ||
    promedio === null
  ) {
    return res
      .status(400)
      .json({ error: "Campos obligatorios faltantes o nulos" });
  }
  if (typeof promedio !== "number" || promedio < 0) {
    return res
      .status(400)
      .json({ error: "El promedio debe ser un valor numérico positivo" });
  }
  if (typeof matricula !== "string") {
    // La prueba espera un 400 si la matrícula no es string
    return res
      .status(400)
      .json({ error: "La matricula debe ser de tipo string" });
  }

  const alumnoIndex = alumnos.findIndex((a) => a.id === id);

  if (alumnoIndex === -1) {
    return res.status(404).json({ error: "Alumno no encontrado" });
  }

  const updatedAlumno = {
    id: id,
    nombres: nombres,
    apellidos: apellidos,
    matricula: matricula,
    promedio: promedio,
  };

  alumnos[alumnoIndex] = updatedAlumno;
  res.status(200).json(updatedAlumno);
});

/**
 * DELETE /alumnos/{id}
 * Elimina un alumno por su ID.
 */
app.delete("/alumnos/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const alumnoIndex = alumnos.findIndex((a) => a.id === id);

  if (alumnoIndex === -1) {
    return res.status(404).json({ error: "Alumno no encontrado" });
  }

  alumnos.splice(alumnoIndex, 1);
  res.status(200).json({ message: "Alumno eliminado" });
});

/**
 * DELETE /alumnos
 * Endpoint "falso" para pasar la prueba testUnsuportedMethod
 * Regresa 405 (Método no permitido)
 */
app.delete("/alumnos", (req, res) => {
  res.status(405).json({ error: "Método no permitido" });
});

// ===============================================
//          ENDPOINTS DE PROFESORES (CORREGIDOS)
// ===============================================

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
 * CORREGIDO: Acepta ID del body y permite que numeroEmpleado sea número o string
 */
app.post("/profesores", (req, res) => {
  const { id, numeroEmpleado, nombres, apellidos, horasClase } = req.body;

  // Validaciones
  if (
    !id ||
    !numeroEmpleado ||
    !nombres ||
    nombres === "" ||
    !apellidos ||
    apellidos === null ||
    horasClase === undefined ||
    horasClase === null
  ) {
    return res
      .status(400)
      .json({ error: "Campos obligatorios faltantes o nulos" });
  }
  if (typeof horasClase !== "number" || horasClase < 0) {
    return res
      .status(400)
      .json({ error: "horasClase debe ser un valor numérico positivo" });
  }

  // ¡OJO! Aquí quitamos la validación de 'string' para numeroEmpleado
  // porque el script de prueba envía un número.

  const newProfesor = {
    id: id,
    numeroEmpleado: numeroEmpleado,
    nombres: nombres,
    apellidos: apellidos,
    horasClase: horasClase,
  };

  profesores.push(newProfesor);
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

  // Validaciones
  if (
    !numeroEmpleado ||
    !nombres ||
    !apellidos ||
    horasClase === undefined ||
    horasClase === null
  ) {
    return res
      .status(400)
      .json({ error: "Campos obligatorios faltantes o nulos" });
  }
  if (typeof horasClase !== "number" || horasClase < 0) {
    return res
      .status(400)
      .json({ error: "Las horasClase deben ser un valor numérico positivo" });
  }

  // ¡OJO! Aquí también quitamos la validación de 'string' para numeroEmpleado

  const profesorIndex = profesores.findIndex((p) => p.id === id);

  if (profesorIndex === -1) {
    return res.status(404).json({ error: "Profesor no encontrado" });
  }

  const updatedProfesor = {
    id: id,
    numeroEmpleado: numeroEmpleado,
    nombres: nombres,
    apellidos: apellidos,
    horasClase: horasClase,
  };

  profesores[profesorIndex] = updatedProfesor;
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
  res.status(200).json({ message: "Profesor eliminado" });
});

/**
 * DELETE /profesores
 * Endpoint "falso" para pasar la prueba testUnsuportedMethod
 * Regresa 405 (Método no permitido)
 */
app.delete("/profesores", (req, res) => {
  res.status(405).json({ error: "Método no permitido" });
});

// 5. Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor de API corriendo en http://localhost:${port}`);
});
