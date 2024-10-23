const { Link } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Link.bulkCreate([
      {
        userId: 1,
        name: 'Google',
        link: 'https://www.google.com',
        shortLink: 'https://bit.ly/4feNbvA',
      },
      {
        userId: 1,
        name: 'Amazon',
        link: 'https://www.amazon.com',
        shortLink: 'https://bit.ly/3BVUrhK'
      },
      {
        userId: 2,
        name: 'Facebook',
        link: 'https://www.facebook.com',
        shortLink: 'https://bit.ly/4hrzmMy'
      },
      {
        userId: 2,
        name: 'Twitter',
        link: 'https://www.x.com',
        shortLink: 'https://bit.ly/3Ye3CSd'
      },
      {
        userId: 3,
        name: 'LinkedIn',
        link: 'https://www.linkedin.com',
        shortLink: 'https://bit.ly/48gsiy4'
      },
      {
        userId: 3,
        name: 'Instagram',
        link: 'https://www.instagram.com',
        shortLink: 'https://bit.ly/3YzXeWX'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Links";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1, 2, 3, 4, 5, 6]
      }
    }, {});
  }
};
