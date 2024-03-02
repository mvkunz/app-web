const express = require("express");
const sequelize = require("./config/database");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware para parsear JSON

// Rota base para
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Testar conexão com o banco e iniciar o servidor
sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
});
