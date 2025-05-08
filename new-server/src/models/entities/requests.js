const { EntitySchema } = require("typeorm");

const Request = new EntitySchema({
    name: "Request",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        category: {
            type: "enum",
            enum: ["repair", "complaint", "suggestion", "leave_dorm", "guest_visit"]
        },
        description: {
            type: "text"
        },
        status: {
            type: "enum",
            enum: ["pending", "in_progress", "resolved", "approved", "rejected"],
            default: "pending"
        }
    },
    relations: {
        user: {
            type: "many-to-one",
            target: "User",
            inverseSide: "requests"
        }
    }
});

module.exports = { Request }; 