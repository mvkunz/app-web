const { Product, ProductDetails } = require("../models");
const sequelize = require("../config/database");
import { Op } from 'sequelize';

exports.getProducts = async (req, res) => {
  try {
    const { name, brand, model, price, color } = req.query;
    const products = await Product.findAll({
      include: [
        {
          model: ProductDetails,
          as: "details",
        },
      ],
      where: {
        ...(name && { name: { [Op.like]: `%${name}%` } }),
        ...(brand && { brand: { [Op.like]: `%${brand}%` } }),
        ...(model && { model: { [Op.like]: `%${model}%` } }),
        ...(price && { "$details.price$": { [Op.like]: `%${price}%` } }),
        ...(color && { "$details.color$": { [Op.like]: `%${color}%` } }),
      },
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
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.params; // ID do produto principal
    const { name, brand, model, data } = req.body;

    // Atualiza o produto principal
    const [updated] = await Product.update(
      { name, brand, model },
      { where: { id: id } },
      { transaction }
    );

    if (updated === 0) {
      throw new Error("Produto não encontrado.");
    }

    // Atualiza os detalhes existentes e adiciona novos detalhes
    if (data && Array.isArray(data)) {
      for (const detail of data) {
        const { id: detailId, color, price } = detail;

        if (detailId) {
          // Atualizar detalhes existentes
          await ProductDetails.update(
            { color, price },
            { where: { id: detailId, productId: id } },
            { transaction }
          );
        } else {
          // Adicionar novos detalhes
          await ProductDetails.create(
            { productId: id, color, price },
            { transaction }
          );
        }
      }
    }

    await transaction.commit();

    const updatedProduct = await Product.findByPk(id, {
      include: [{ model: ProductDetails, as: 'details' }],
    });

    res.json(updatedProduct);
  } catch (error) {
    await transaction.rollback();
    console.error(error);
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

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.params; // Obtém o ID do produto da URL

    const product = await Product.findByPk(id, {
      include: [
        {
          model: ProductDetails,
          as: "details", // Certifique-se de que 'details' é como você definiu a associação no seu modelo Product
        },
      ],
    });

    if (!product) {
      return res.status(404).send("Produto não encontrado.");
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

