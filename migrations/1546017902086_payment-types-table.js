const _ = require("lodash");

exports.shorthands = undefined;

const TYPES = [
  'required',
  'not_required',
];

exports.up = (pgm) => {
  pgm.createTable("payment_types", {
    id: "id",
    name: {
      notNull: true,
      type: "varchar(1000)",
      unique: true,
    },
  });

  _.each(TYPES, (t, i) => {
    pgm.sql(`INSERT INTO payment_types (id, name) VALUES (${i}, '${t}')`);
  });
};

exports.down = (pgm) => {
  pgm.dropTable("payment_types", {
    ifExists: true,
  });
};
