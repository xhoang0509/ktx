const { EntitySchema } = require("typeorm");

const Violation = new EntitySchema({
    name: "Violation",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        type: {
            type: "enum",
            enum: ["reward", "punishment"]
        },
        description: {
            type: "text"
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
            inverseSide: "violations"
        }
    }
});

module.exports = { Violation }; 