const { EntitySchema } = require("typeorm");

const DormitoryContract = new EntitySchema({
    name: "DormitoryContract",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        status: {
            type: "enum",
            enum: ["pending", "approved", "rejected"],
            default: "pending"
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
        student: {
            type: "many-to-one",
            target: "User",
            inverseSide: "contracts"
        },
        room: {
            type: "many-to-one",
            target: "Room",
            inverseSide: "contracts"
        }
    }
});

module.exports = { DormitoryContract }; 