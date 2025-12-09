const sequelize = require("./config/database");
const Alumno = require("./models/Alumno");
const Profesor = require("./models/Profesor");

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a RDS exitosa.");

    // Esto crea las tablas si no existen (Sincronización)
    await sequelize.sync({ force: true });
    console.log("✅ Tablas creadas en la base de datos.");
  } catch (error) {
    console.error("❌ No se pudo conectar a la base de datos:", error);
  } finally {
    await sequelize.close();
  }
}

testConnection();
