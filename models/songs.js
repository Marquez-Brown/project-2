module.exports = function (sequelize, DataTypes) {
  const Train = sequelize.define("Song", {
    name: DataTypes.STRING,
    number: DataTypes.INTEGER,
    status: DataTypes.STRING,
    currentStation: DataTypes.STRING,
    eta: DataTypes.DATE,
  });

  return Train;
};
