module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    "Product",
    {
      name: DataTypes.STRING,
      brand: DataTypes.STRING,
      model: DataTypes.STRING,
    },
    {}
  );
  Product.associate = function (models) {
    Product.hasMany(models.ProductDetails, {
      as: "details",
      foreignKey: "productId",
    });
  };
  return Product;
};
