exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("users_tokens", {
    user_id: {
      notNull: true,
      references: "users(id)",
      type: "id",
      unique: true,
    },
    token: {
      notNull: true,
      unique: true,
      type: "varchar(100)",
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable("users_tokens", {
    ifExists: true,
  });
};
