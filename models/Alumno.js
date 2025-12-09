const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Alumno = sequelize.define(
  "Alumno",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombres: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    apellidos: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    matricula: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    promedio: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    // Nuevos campos para la Segunda Entrega
    fotoPerfilUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true, // Lo haremos obligatorio luego
    },
  },
  {
    tableName: "alumnos",
    timestamps: false, // Si no quieres campos createdAt/updatedAt
  }
);

module.exports = Alumno;
