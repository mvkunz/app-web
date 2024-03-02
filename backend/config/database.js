const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("verceldb", "default", "SszYxr0N6ZcW", {
  host: "ep-dry-forest-a46o2c93-pooler.us-east-1.aws.neon.tech",
  dialect: "postgres",
  port: 5432,
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // Certificado SSL fornecido pelo Vercel
    },
  },
});

module.exports = sequelize;
