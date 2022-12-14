'use strict';
const {
  Model,
  Validator
} = require('sequelize');
const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

    toSafeObject(){
      const { id, username, email } = this;
      return { id, username, email };
    }

    validatePassword(password){
      return bcrypt.compareSync(password, this.hashedPassword.toString())
    }

    static getCurrentUserById(id){
      return User.scope('currentUser').findByPk(id);
    }

    static async login({ credential, password }){
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      })
      if(user && user.validatePassword(password)){
        return await User.scope('currentUser').findByPk(user.id)
      }
    }

    static async signup({ firstName, lastName, username, email, password }){
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        hashedPassword
      })
      return await User.scope('signupUser').findByPk(user.id)
    }

    static associate(models) {
      // define association here
      User.hasMany(
        models.Spot,
          {foreignKey: 'ownerId', onDelete: 'CASCADE', hooks: true}
      )

      User.hasMany(
        models.Booking,
          {foreignKey: 'userId', onDelete: 'cascade', hooks: true}
      )

      User.hasMany(
        models.Review,
          {foreignKey: 'userId', onDelete: 'cascade', hooks: true}
      )
    }
  }
  User.init({
    firstName: {
      type: DataTypes.STRING,
      // allowNull: false

    },
    lastName: {
      type: DataTypes.STRING,

    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [4,30],
        isNotEmail(value){
          if(Validator.isEmail(value)){
            throw new Error("Cannot be an email.")
          }
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3,256],
        isEmail: true
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60,60]
      }
    },
    token: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt", "token"]
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ["hashedPassword"] }
      },
      loginUser: {
        attributes: {}
      },
      signupUser: {
        attributes: {
          exclude: ['createdAt', 'updatedAt', 'hashedPassword']
        }
      }
    }
  });
  return User;
};
