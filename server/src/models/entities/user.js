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
        // tên khoa
        faculty_name: {
            type: "varchar"
        },
        // mã lớp
        class_code: {
            type: "varchar"
        },
        birth_date: {
            type: "varchar"
        },
        address: {
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
    }
});

module.exports = { User }; 