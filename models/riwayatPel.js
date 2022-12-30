"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class RiwayatPelatihan extends Model {
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
    RiwayatPelatihan.init({
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
        course: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        certificate: {
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
        modelName: "riwayat_pelatihan",
        freezeTableName: true,
        timestamps: true,
        autoIncrementField: "id",
    });
    return RiwayatPelatihan;
};