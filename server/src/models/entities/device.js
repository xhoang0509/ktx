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
        type: {
            type: "varchar"
        },
        year_of_manufacture: {
            type: "int"
        },
        status: {
            type: "enum",
            enum: ["good", "broken", "under_maintenance", "deleted"],
            default: "good"
        },
        createdAt: {
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP"
        },
        updatedAt: {
            type: "datetime",
            default: () => "CURRENT_TIMESTAMP"
        }
    }
});

module.exports = { Device }; 