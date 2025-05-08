const { EntitySchema } = require("typeorm");

const Contract = new EntitySchema({
    name: "Contract",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        start_date: {
            type: "date"
        },
        end_date: {
            type: "date"
        },
        duration: {
            type: "int"
        },
        status: {
            type: "enum",
            enum: ["pending", "active", "terminated", "expired"],
            default: "pending"
        }
    },
    relations: {
        user: {
            type: "many-to-one",
            target: "User",
            inverseSide: "contracts"
        },
        room: {
            type: "many-to-one",
            target: "Room",
            inverseSide: "users"
        }
    }
});

module.exports = { Contract }; 