const { EntitySchema } = require("typeorm");

const MaintenanceRequest = new EntitySchema({
    name: "MaintenanceRequest",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        description: {
            type: "varchar"
        },
        status: {
            type: "enum",
            enum: ["pending", "in_progress", "completed"],
            default: "pending"
        },
        created_at: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP"
        },
        updated_at: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP",
            onUpdate: "CURRENT_TIMESTAMP"
        }
    },
    relations: {
        roomDevice: {
            type: "many-to-one",
            target: "RoomDevice"
        },
        user: {
            type: "many-to-one",
            target: "User"
        }
    }
});

module.exports = { MaintenanceRequest }; 