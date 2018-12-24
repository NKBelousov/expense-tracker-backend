exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users", {
    id: "id",
    name: {
      notNull: true,
      type: "varchar(1000)",
      unique: true,
    },
    password: {
      notNull: true,
      type: "varchar(100)",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users", {
    ifExists: true,
  });
};
