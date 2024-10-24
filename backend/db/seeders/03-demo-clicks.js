const { Click } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await Click.bulkCreate([
      {
        linkId: 1
      },
      {
        linkId: 3
      },
      {
        linkId: 1
      },
      {
        linkId: 3
      },
      {
        linkId: 4
      },
      {
        linkId: 5
      },
      {
        linkId: 4
      },
      {
        linkId: 4
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "Clicks";
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      id: {
        [Op.in]: [1, 2, 3, 4, 5]
      }
    }, {});
  }
};
