'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "title tidak boleh kosong"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "deskripsi tidak boleh kosong"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          msg: "status tidak boleh kosong"
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        function(instance) {
          if (instance < new Date()) {
            throw new Error("tanggal tidak valid")
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};