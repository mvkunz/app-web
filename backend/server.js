const express = require("express");
const sequelize = require("./config/database");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./swaggerConfig");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json()); // Middleware para parsear JSON
app.use(cors());

// Rota base para
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

// Testar conexão com o banco e iniciar o servidor
sequelize.sync().then(() => {
  app.listen(port, () => console.log(`Servidor rodando na porta ${port}`));
});
