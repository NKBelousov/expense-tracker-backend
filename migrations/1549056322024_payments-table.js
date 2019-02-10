exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable("users_payments", {
    id: "id",
    user_id: {
      notNull: true,
      references: "users(id)",
      type: "id",
      unique: false,
    },
    type_id: {
      notNull: true,
      references: "payment_types(id)",
      type: "id",
      unique: false,
    },
    name: {
      notNull: true,
      unique: false,
      type: "varchar(100)",
    },
    cost: {
      notNull: true,
      unique: false,
      type: "float",
    },
    created_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
};

exports.down = pgm => {
  pgm.dropTable("users_payments", {
    ifExists: true,
  });
};
