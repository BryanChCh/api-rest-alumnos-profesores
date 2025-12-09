const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Profesor = sequelize.define(
  "Profesor",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    numeroEmpleado: {
      // Ojo: en la DB será un número, pero lo manejamos como string/int según necesitemos
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    horasClase: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "profesores",
    timestamps: false,
  }
);

module.exports = Profesor;
