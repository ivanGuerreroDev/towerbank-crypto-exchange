const faker = require('faker');

const getTransactions = async (crypto, page, limit) => {
  const items = [];
  let i = 0;
  while (i < limit) {
    const fid = faker.random.uuid();
    const item = {
      id: fid,
      symbol: crypto,
      amount: parseFloat(faker.random.number({ min: 0, max: 10000, precision: 0.01 }).toFixed(2)),
      date: faker.date.past(),
    };
    items.push(item);
    i += 1;
  }

  const response = {
    page,
    limit,
    items,
  };
  return response;
};

module.exports = {
  getTransactions,
};
