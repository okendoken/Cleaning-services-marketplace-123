const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const reviews = sequelize.define(
    'reviews',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      content: {
        type: DataTypes.TEXT,
      },

      review_date: {
        type: DataTypes.DATE,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  reviews.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.reviews.belongsTo(db.users, {
      as: 'customer',
      foreignKey: {
        name: 'customerId',
      },
      constraints: false,
    });

    db.reviews.belongsTo(db.vendors, {
      as: 'vendor',
      foreignKey: {
        name: 'vendorId',
      },
      constraints: false,
    });

    db.reviews.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.reviews.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.reviews.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return reviews;
};
