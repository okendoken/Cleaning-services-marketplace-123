const db = require('../models');
const Users = db.users;

const Orders = db.orders;

const Reviews = db.reviews;

const Vendors = db.vendors;

const Organizations = db.organizations;

const OrdersData = [
  {
    order_date: new Date('2024-02-01'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    status: 'completed',

    // type code here for "relation_one" field
  },

  {
    order_date: new Date('2023-11-09'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    status: 'in_progress',

    // type code here for "relation_one" field
  },

  {
    order_date: new Date('2023-06-30'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    status: 'placed',

    // type code here for "relation_one" field
  },

  {
    order_date: new Date('2023-05-15'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    status: 'cancelled',

    // type code here for "relation_one" field
  },

  {
    order_date: new Date('2024-04-04'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    status: 'placed',

    // type code here for "relation_one" field
  },
];

const ReviewsData = [
  {
    content: 'Use your feelings, Obi-Wan, and find him you will.',

    review_date: new Date('2023-11-22'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    content: 'Already know you that which you need.',

    review_date: new Date('2024-03-06'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    content: 'Luminous beings are we - not this crude matter.',

    review_date: new Date('2023-05-03'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    content:
      'Much to learn you still have my old padawan. ... This is just the beginning!',

    review_date: new Date('2023-06-27'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    content: 'Reckless he is. Matters are worse.',

    review_date: new Date('2023-10-17'),

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const VendorsData = [
  {
    // type code here for "images" field

    hourly_rate: 88.56,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    name: 'Leonard Euler',
  },

  {
    // type code here for "images" field

    hourly_rate: 55.02,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    name: 'Claude Levi-Strauss',
  },

  {
    // type code here for "images" field

    hourly_rate: 26.66,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    name: 'Euclid',
  },

  {
    // type code here for "images" field

    hourly_rate: 12.45,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    name: 'August Kekule',
  },

  {
    // type code here for "images" field

    hourly_rate: 80.81,

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    name: 'Edward Teller',
  },
];

const OrganizationsData = [
  {
    name: 'Johannes Kepler',
  },

  {
    name: 'Marcello Malpighi',
  },

  {
    name: 'Trofim Lysenko',
  },

  {
    name: 'Stephen Hawking',
  },

  {
    name: 'Michael Faraday',
  },
];

// Similar logic for "relation_many"

async function associateUserWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User0 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (User0?.setOrganization) {
    await User0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User1 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (User1?.setOrganization) {
    await User1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User2 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (User2?.setOrganization) {
    await User2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User3 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (User3?.setOrganization) {
    await User3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const User4 = await Users.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (User4?.setOrganization) {
    await User4.setOrganization(relatedOrganization4);
  }
}

async function associateOrderWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setUser) {
    await Order0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setUser) {
    await Order1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setUser) {
    await Order2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order3 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Order3?.setUser) {
    await Order3.setUser(relatedUser3);
  }

  const relatedUser4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Order4 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Order4?.setUser) {
    await Order4.setUser(relatedUser4);
  }
}

async function associateOrderWithVendor() {
  const relatedVendor0 = await Vendors.findOne({
    offset: Math.floor(Math.random() * (await Vendors.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setVendor) {
    await Order0.setVendor(relatedVendor0);
  }

  const relatedVendor1 = await Vendors.findOne({
    offset: Math.floor(Math.random() * (await Vendors.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setVendor) {
    await Order1.setVendor(relatedVendor1);
  }

  const relatedVendor2 = await Vendors.findOne({
    offset: Math.floor(Math.random() * (await Vendors.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setVendor) {
    await Order2.setVendor(relatedVendor2);
  }

  const relatedVendor3 = await Vendors.findOne({
    offset: Math.floor(Math.random() * (await Vendors.count())),
  });
  const Order3 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Order3?.setVendor) {
    await Order3.setVendor(relatedVendor3);
  }

  const relatedVendor4 = await Vendors.findOne({
    offset: Math.floor(Math.random() * (await Vendors.count())),
  });
  const Order4 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Order4?.setVendor) {
    await Order4.setVendor(relatedVendor4);
  }
}

async function associateOrderWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Order0 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Order0?.setOrganization) {
    await Order0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Order1 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Order1?.setOrganization) {
    await Order1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Order2 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Order2?.setOrganization) {
    await Order2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Order3 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Order3?.setOrganization) {
    await Order3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Order4 = await Orders.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Order4?.setOrganization) {
    await Order4.setOrganization(relatedOrganization4);
  }
}

async function associateReviewWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Review0 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Review0?.setUser) {
    await Review0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Review1 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Review1?.setUser) {
    await Review1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Review2 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Review2?.setUser) {
    await Review2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Review3 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Review3?.setUser) {
    await Review3.setUser(relatedUser3);
  }

  const relatedUser4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Review4 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Review4?.setUser) {
    await Review4.setUser(relatedUser4);
  }
}

async function associateReviewWithVendor() {
  const relatedVendor0 = await Vendors.findOne({
    offset: Math.floor(Math.random() * (await Vendors.count())),
  });
  const Review0 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Review0?.setVendor) {
    await Review0.setVendor(relatedVendor0);
  }

  const relatedVendor1 = await Vendors.findOne({
    offset: Math.floor(Math.random() * (await Vendors.count())),
  });
  const Review1 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Review1?.setVendor) {
    await Review1.setVendor(relatedVendor1);
  }

  const relatedVendor2 = await Vendors.findOne({
    offset: Math.floor(Math.random() * (await Vendors.count())),
  });
  const Review2 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Review2?.setVendor) {
    await Review2.setVendor(relatedVendor2);
  }

  const relatedVendor3 = await Vendors.findOne({
    offset: Math.floor(Math.random() * (await Vendors.count())),
  });
  const Review3 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Review3?.setVendor) {
    await Review3.setVendor(relatedVendor3);
  }

  const relatedVendor4 = await Vendors.findOne({
    offset: Math.floor(Math.random() * (await Vendors.count())),
  });
  const Review4 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Review4?.setVendor) {
    await Review4.setVendor(relatedVendor4);
  }
}

async function associateReviewWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Review0 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Review0?.setOrganization) {
    await Review0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Review1 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Review1?.setOrganization) {
    await Review1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Review2 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Review2?.setOrganization) {
    await Review2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Review3 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Review3?.setOrganization) {
    await Review3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Review4 = await Reviews.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Review4?.setOrganization) {
    await Review4.setOrganization(relatedOrganization4);
  }
}

async function associateVendorWithUser() {
  const relatedUser0 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Vendor0 = await Vendors.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Vendor0?.setUser) {
    await Vendor0.setUser(relatedUser0);
  }

  const relatedUser1 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Vendor1 = await Vendors.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Vendor1?.setUser) {
    await Vendor1.setUser(relatedUser1);
  }

  const relatedUser2 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Vendor2 = await Vendors.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Vendor2?.setUser) {
    await Vendor2.setUser(relatedUser2);
  }

  const relatedUser3 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Vendor3 = await Vendors.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Vendor3?.setUser) {
    await Vendor3.setUser(relatedUser3);
  }

  const relatedUser4 = await Users.findOne({
    offset: Math.floor(Math.random() * (await Users.count())),
  });
  const Vendor4 = await Vendors.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Vendor4?.setUser) {
    await Vendor4.setUser(relatedUser4);
  }
}

async function associateVendorWithOrganization() {
  const relatedOrganization0 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Vendor0 = await Vendors.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (Vendor0?.setOrganization) {
    await Vendor0.setOrganization(relatedOrganization0);
  }

  const relatedOrganization1 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Vendor1 = await Vendors.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (Vendor1?.setOrganization) {
    await Vendor1.setOrganization(relatedOrganization1);
  }

  const relatedOrganization2 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Vendor2 = await Vendors.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (Vendor2?.setOrganization) {
    await Vendor2.setOrganization(relatedOrganization2);
  }

  const relatedOrganization3 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Vendor3 = await Vendors.findOne({
    order: [['id', 'ASC']],
    offset: 3,
  });
  if (Vendor3?.setOrganization) {
    await Vendor3.setOrganization(relatedOrganization3);
  }

  const relatedOrganization4 = await Organizations.findOne({
    offset: Math.floor(Math.random() * (await Organizations.count())),
  });
  const Vendor4 = await Vendors.findOne({
    order: [['id', 'ASC']],
    offset: 4,
  });
  if (Vendor4?.setOrganization) {
    await Vendor4.setOrganization(relatedOrganization4);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Orders.bulkCreate(OrdersData);

    await Reviews.bulkCreate(ReviewsData);

    await Vendors.bulkCreate(VendorsData);

    await Organizations.bulkCreate(OrganizationsData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateUserWithOrganization(),

      await associateOrderWithUser(),

      await associateOrderWithVendor(),

      await associateOrderWithOrganization(),

      await associateReviewWithUser(),

      await associateReviewWithVendor(),

      await associateReviewWithOrganization(),

      await associateVendorWithUser(),

      await associateVendorWithOrganization(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('orders', null, {});

    await queryInterface.bulkDelete('reviews', null, {});

    await queryInterface.bulkDelete('vendors', null, {});

    await queryInterface.bulkDelete('organizations', null, {});
  },
};
