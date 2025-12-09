// config/database.js
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("escuela_db", "admin", "Password123!", {
  host: "proyecto-db.c2aombsd77vi.us-east-1.rds.amazonaws.com", // endpoint
  dialect: "mysql",
  port: 3306,
  logging: false, // Para que no llene la consola de SQL
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Necesario para RDS en algunos casos
    },
  },
});

module.exports = sequelize;
