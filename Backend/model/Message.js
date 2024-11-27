const { EntitySchema } = require("typeorm");

const Message = new EntitySchema({
  name: "messages", // Table name in the database
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: true,
    },
    room: {
      type: "varchar",
      length: 255,
    },
    user_id: {
      type: "varchar",
      length: 255,
    },
    message: {
      type: "text",
    },
    timestamp: {
      type: "timestamp",
      default: () => "CURRENT_TIMESTAMP",
    },
  },
});

module.exports = Message;
