const { EntitySchema } = require("typeorm");

const Room = new EntitySchema({
    name: "Room",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        gender: {
            type: "enum",
            enum: ["male", "female", "other"]
        },
        max_capacity: {
            type: "int"
        },
        current_capacity: {
            type: "int",
            default: 0
        },
        base_price: {
            type: "decimal",
            precision: 10,
            scale: 2
        },
        createdAt: {
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP"
        },
        updatedAt: {
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP"
        }
    },
    relations: {
        roomDevices: {
            type: "one-to-many",
            target: "RoomDevice",
            inverseSide: "room"
        },
        users: {
            type: "one-to-many",
            target: "User",
            inverseSide: "room"
        }
    }
});

module.exports = { Room }; 