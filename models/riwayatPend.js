"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class RiwayatPendidikan extends Model {
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
    RiwayatPendidikan.init({
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
        level_education: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        institute: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        major: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        year: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ipk: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: "riwayat_pendidikan",
        freezeTableName: true,
        timestamps: true,
        autoIncrementField: "id",
    });
    return RiwayatPendidikan;
};