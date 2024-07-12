const { Sequelize } = require("sequelize");

const DATABASE_URL = "postgresql://hotel_reservation_bd_user:Tk41pqFRSywiDmgJ82m2m0IRnZU1wXZE@dpg-cq6689bv2p9s73cgkat0-a.oregon-postgres.render.com/hotel_reservation_bd";

const sequelize = new Sequelize(DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false // Puedes necesitar esto si tu base de datos en Render requiere SSL
    }
  }
});

async function connectToDatabase() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

connectToDatabase();

module.exports = sequelize;
