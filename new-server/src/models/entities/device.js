const { EntitySchema } = require("typeorm");

const Device = new EntitySchema({
    name: "Device",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        name: {
            type: "varchar"
        },
        status: {
            type: "enum",
            enum: ["good", "broken", "deleted"],
            default: "good"
        }
    }
});

module.exports = { Device }; 