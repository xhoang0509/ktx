const { EntitySchema } = require("typeorm");

const Payment = new EntitySchema({
    name: "Payment",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        rent_amount: {
            type: "decimal",
            precision: 10,
            scale: 2
        },
        utility_amount: {
            type: "decimal",
            precision: 10,
            scale: 2,
            default: 0
        },
        total_amount: {
            type: "decimal",
            precision: 10,
            scale: 2
        },
        payment_method: {
            type: "enum",
            enum: ["VNPay", "cash", "bank_transfer"],
            nullable: true
        },
        status: {
            type: "enum",
            enum: ["pending", "completed", "failed"],
            default: "pending"
        },
        payment_date: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP"
        },
        month: {
            type: "int"
        },
        year: {
            type: "int"
        },
        is_settled: {
            type: "boolean",
            default: false
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
        user: {
            type: "many-to-one",
            target: "User",
            inverseSide: "payments"
        },
        room: {
            type: "many-to-one",
            target: "Room",
            inverseSide: "id"
        }
    }
});

module.exports = { Payment }; 