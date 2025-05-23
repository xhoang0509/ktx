const { EntitySchema } = require("typeorm");

const RoomDevice = new EntitySchema({
    name: "RoomDevice",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        quantity: {
            type: "int"
        },
        condition: {
            type: "enum",
            enum: ["good", "broken", "under_maintenance"]
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
            inverseSide: "roomDevices"
        },
        device: {
            type: "many-to-one",
            target: "Device"
        }
    }
});

module.exports = { RoomDevice }; 