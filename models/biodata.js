"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
    class Biodata extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            this.belongsTo(models.users, {
                foreignKey: 'user_id',
                target: 'id'
            })
            this.hasMany(models.riwayat_pendidikan, {
                foreignKey: 'biodata_id',
                target: 'id'
            })
            this.hasMany(models.riwayat_pelatihan, {
                foreignKey: 'biodata_id',
                target: 'id'
            })
            this.hasMany(models.riwayat_pekerjaan, {
                foreignKey: 'biodata_id',
                target: 'id'
            })
        }
    }
    Biodata.init({
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        ktp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        pob: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        blood: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        religion: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        telephone: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        person: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        position: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address_ktp: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        skill: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        place_work: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        income: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
    }, {
        sequelize,
        modelName: "biodata",
        freezeTableName: true,
        autoIncrementField: "id",
    });
    return Biodata;
};