require("reflect-metadata");
const { DataSource } = require("typeorm");

const Message = require("../model/Message");
// console.log(process.env);

const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Message],
  synchronize: true,
  // logging: true,
});
// console.log(AppDataSource);
// to initialize the initial connection with the database, register all entities
// and "synchronize" database schema, call "initialize()" method of a newly created database
// once in your application bootstrap
AppDataSource.initialize()
  .then(() => {
    console.log("Database Connected!");
    // here you can start to work with your database
  })
  .catch((error) => console.log(error));

module.exports = AppDataSource;
