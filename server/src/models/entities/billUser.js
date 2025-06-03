const { EntitySchema } = require("typeorm");

const BillUser = new EntitySchema({
    name: "BillUser",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        amount: {
            type: "decimal",
            precision: 10,
            scale: 2
        },
        status: {
            type: "enum",
            enum: ["pending", "paid"],
            default: "pending"
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
        bill: {
            type: "many-to-one",
            target: "Bill",
            inverseSide: "billUsers"
        },
        user: {
            type: "many-to-one",
            target: "User",
            inverseSide: "billUsers"
        }
    }
});

module.exports = { BillUser }; 