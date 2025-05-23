const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
    name: "User",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        full_name: {
            type: "varchar"
        },
        email: {
            type: "varchar",
            unique: true,
        },
        gender: {
            type: "enum",
            enum: ["male", "female", "other"],
            default: "other"
        },
        password: {
            type: "varchar",
            length: 1000

        },
        phone: {
            type: "varchar",
            nullable: true
        },
        student_id: {
            type: "varchar",
            unique: true
        },
        avatar: {
            type: "varchar"
        },
        status: {
            type: "enum",
            enum: ["active", "inactive", "graduated", "deleted"],
            default: "active"
        },
        faculty_name: {
            type: "varchar"
        },
        class_code: {
            type: "varchar"
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
            inverseSide: "users"
        },
        contracts: {
            type: "one-to-many",
            target: "Contract",
            inverseSide: "user"
        },
        payments: {
            type: "one-to-many",
            target: "Payment",
            inverseSide: "user"
        },
        requests: {
            type: "one-to-many",
            target: "Request",
            inverseSide: "user"
        },
        violations: {
            type: "one-to-many",
            target: "Violation",
            inverseSide: "user"
        }
    }
});

module.exports = { User }; 