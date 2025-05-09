const { EntitySchema } = require("typeorm");

const Notification = new EntitySchema({
    name: "Notification",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        type: {
            type: "enum",
            enum: ["all", "personal"],
            default: "all"
        },
        title: {
            type: "varchar"
        },
        message: {
            type: "text"
        },
        is_read: {
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
        sender: {
            type: "many-to-one",
            target: "Admin",
            nullable: true
        },
        receiver: {
            type: "many-to-one",
            target: "User",
            nullable: true
        }
    }
});

module.exports = { Notification }; 