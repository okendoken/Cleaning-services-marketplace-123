const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class VendorsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const vendors = await db.vendors.create(
      {
        id: data.id || undefined,

        hourly_rate: data.hourly_rate || null,
        name: data.name || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await vendors.setUser(data.user || null, {
      transaction,
    });

    await vendors.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.vendors.getTableName(),
        belongsToColumn: 'picture',
        belongsToId: vendors.id,
      },
      data.picture,
      options,
    );

    return vendors;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const vendorsData = data.map((item, index) => ({
      id: item.id || undefined,

      hourly_rate: item.hourly_rate || null,
      name: item.name || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const vendors = await db.vendors.bulkCreate(vendorsData, { transaction });

    // For each item created, replace relation files

    for (let i = 0; i < vendors.length; i++) {
      await FileDBApi.replaceRelationFiles(
        {
          belongsTo: db.vendors.getTableName(),
          belongsToColumn: 'picture',
          belongsToId: vendors[i].id,
        },
        data[i].picture,
        options,
      );
    }

    return vendors;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const vendors = await db.vendors.findByPk(id, {}, { transaction });

    await vendors.update(
      {
        hourly_rate: data.hourly_rate || null,
        name: data.name || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await vendors.setUser(data.user || null, {
      transaction,
    });

    await vendors.setOrganization(currentUser.organization.id || null, {
      transaction,
    });

    await FileDBApi.replaceRelationFiles(
      {
        belongsTo: db.vendors.getTableName(),
        belongsToColumn: 'picture',
        belongsToId: vendors.id,
      },
      data.picture,
      options,
    );

    return vendors;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const vendors = await db.vendors.findByPk(id, options);

    await vendors.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await vendors.destroy({
      transaction,
    });

    return vendors;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const vendors = await db.vendors.findOne({ where }, { transaction });

    if (!vendors) {
      return vendors;
    }

    const output = vendors.get({ plain: true });

    output.orders_vendor = await vendors.getOrders_vendor({
      transaction,
    });

    output.reviews_vendor = await vendors.getReviews_vendor({
      transaction,
    });

    output.picture = await vendors.getPicture({
      transaction,
    });

    output.user = await vendors.getUser({
      transaction,
    });

    output.organization = await vendors.getOrganization({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    var limit = filter.limit || 0;
    var offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    var orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.users,
        as: 'user',
      },

      {
        model: db.organizations,
        as: 'organization',
      },

      {
        model: db.file,
        as: 'picture',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('vendors', 'name', filter.name),
        };
      }

      if (filter.hourly_rateRange) {
        const [start, end] = filter.hourly_rateRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            hourly_rate: {
              ...where.hourly_rate,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            hourly_rate: {
              ...where.hourly_rate,
              [Op.lte]: end,
            },
          };
        }
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.user) {
        var listItems = filter.user.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          userId: { [Op.or]: listItems },
        };
      }

      if (filter.organization) {
        var listItems = filter.organization.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.vendors.count({
            where: globalAccess ? {} : where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.vendors.findAndCountAll({
          where: globalAccess ? {} : where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit, globalAccess, organizationId) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('vendors', 'name', query),
        ],
      };
    }

    const records = await db.vendors.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
