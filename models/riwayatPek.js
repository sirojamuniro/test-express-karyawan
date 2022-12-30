"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class RiwayatPekerjaan extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.biodata, {
                foreignKey: 'biodata_id',
                target: 'id'
            })
        }
    }
    RiwayatPekerjaan.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        biodata_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        company: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        income: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        year: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: "riwayat_pekerjaan",
        freezeTableName: true,
        timestamps: false,
        autoIncrementField: "id",
    });
    return RiwayatPekerjaan;
};