const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const vendors = sequelize.define(
    'vendors',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      hourly_rate: {
        type: DataTypes.DECIMAL,
      },

      name: {
        type: DataTypes.TEXT,
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

  vendors.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.vendors.hasMany(db.orders, {
      as: 'orders_vendor',
      foreignKey: {
        name: 'vendorId',
      },
      constraints: false,
    });

    db.vendors.hasMany(db.reviews, {
      as: 'reviews_vendor',
      foreignKey: {
        name: 'vendorId',
      },
      constraints: false,
    });

    //end loop

    db.vendors.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.vendors.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.vendors.hasMany(db.file, {
      as: 'picture',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.vendors.getTableName(),
        belongsToColumn: 'picture',
      },
    });

    db.vendors.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.vendors.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return vendors;
};
