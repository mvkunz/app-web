"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ProductDetails extends Model {
    static associate(models) {
      // associação com Product
      ProductDetails.belongsTo(models.Product, {
        as: "product",
        foreignKey: "productId",
      });
    }
  }
  ProductDetails.init(
    {
      productId: DataTypes.INTEGER,
      color: DataTypes.STRING,
      price: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "ProductDetails",
    }
  );
  return ProductDetails;
};
