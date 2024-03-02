const { Product, ProductDetails } = require("../models");

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: ProductDetails,
          as: "details",
        },
      ],
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

exports.createProduct = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      // Verifica se todos os elementos no array correspondem à estrutura esperada
      const isValidArrayStructure = req.body.every(
        (item) =>
          "name" in item &&
          "brand" in item &&
          "model" in item &&
          Array.isArray(item.data) &&
          item.data.every((detail) => "price" in detail && "color" in detail)
      );
      if (!isValidArrayStructure) {
        return res
          .status(400)
          .send("Formato de requisição inválido para a Estrutura 3.");
      }
    } else {
      // Validação para Estruturas 1 e 2 (Objeto Único)
      const { name, details, brand, model, price, color } = req.body;

      if (details) {
        // Estrutura 2
        if (
          !("brand" in details && "model" in details && "color" in details) ||
          !price
        ) {
          return res
            .status(400)
            .send("Formato de requisição inválido para a Estrutura 2.");
        }
      } else {
        // Estrutura 1
        if (!(brand && model && price && color)) {
          return res
            .status(400)
            .send("Formato de requisição inválido para a Estrutura 1.");
        }
      }
    }

    if (!Array.isArray(req.body)) {
      let product;
      const { name, details, price, color } = req.body;

      // Estrutura 2: Quando details é fornecido
      if (details) {
        const { brand, model, ...restOfDetails } = details;
        product = await Product.create({
          name,
          brand,
          model,
        });
        await ProductDetails.create({
          productId: product.id,
          ...restOfDetails,
          price, // Supondo que price pode ser parte de details conforme o exemplo fornecido
          color: restOfDetails.color || color, // Usa color de details se disponível, senão usa color diretamente do body
        });
      } else {
        // Estrutura 1: Quando details não é fornecido
        product = await Product.create({
          name,
          brand: req.body.brand,
          model: req.body.model,
        });
        await ProductDetails.create({
          productId: product.id,
          price,
          color,
        });
      }

      return res.status(201).json(product);
    }

    // Estrutura 3: Tratamento de array de produtos
    if (Array.isArray(req.body)) {
      const products = await Promise.all(
        req.body.map(async (item) => {
          const product = await Product.create({
            name: item.name,
            brand: item.brand,
            model: item.model,
          });

          await Promise.all(
            item.data.map((detail) =>
              ProductDetails.create({
                productId: product.id,
                ...detail,
              })
            )
          );
          return product;
        })
      );

      return res.status(201).json(products);
    }
  } catch (error) {
    console.error(error);
    res.status(400).send(error.message);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Product.update(req.body, { where: { id: id } });

    if (updated) {
      const updatedProduct = await Product.findOne({ where: { id: id } });
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).send("Produto não encontrado.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Product.destroy({ where: { id: id } });

    if (deleted) {
      res.status(204).send("Produto deletado.");
    } else {
      res.status(404).send("Produto não encontrado.");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
