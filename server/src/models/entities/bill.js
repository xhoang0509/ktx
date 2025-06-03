const { EntitySchema } = require("typeorm");

const Bill = new EntitySchema({
    name: "Bill",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        code: {
            type: "varchar",
        },
        electricity: {
            type: "json",
            nullable: true
        },
        water: {
            type: "json",
            nullable: true
        },
        internet: {
            type: "int",
            nullable: true
        },
        cleaning: {
            type: "int",
            nullable: true
        },
        totalAmount: {
            type: "int",
            nullable: true
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
        room: {
            type: "many-to-one",
            target: "Room",
            inverseSide: "id"
        },
        contract: {
            type: "many-to-one",
            target: "Contract",
            inverseSide: "id"
        },
        billUsers: {
            type: "one-to-many",
            target: "BillUser",
            inverseSide: "bill"
        }
    }
});

module.exports = { Bill }; 