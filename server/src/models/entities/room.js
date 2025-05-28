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
        images: {
            type: "json",
            nullable: true,
        },
        status: {
            type: "varchar",
            default: "active"
        },
        building: {
            type: "varchar",
            nullable: true,
        },
        floor: {
            type: "int",
            nullable: true,
        },
        type: {
            type: "varchar",
            nullable: true,
        },
        note: {
            type: "varchar",
            nullable: true,
        },
        devices: {
            type: "json",
            nullable: true,
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
        users: {
            type: "one-to-many",
            target: "User",
            inverseSide: "room"
        }
    }
});

module.exports = { Room };