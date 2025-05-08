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