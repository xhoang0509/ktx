const { EntitySchema } = require("typeorm");
const Contract = new EntitySchema({
    name: "Contract",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        start_date: {
            type: "date"
        },
        end_date: {
            type: "date"
        },
        duration: {
            type: "int"
        },
        status: {
            type: "enum",
            enum: ["pending", "active", "terminated", "expired", "cancelled"],
            // pending: chờ duyệt
            // active: đang hoạt động
            // terminated: đã kết thúc
            // expired: đã hết hạn
            // cancelled: đã hủy
            default: "pending"
        },
        createdAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP"
        },
        updatedAt: {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP"
        }
    },
    relations: {
        user: {
            type: "many-to-one",
            target: "User",
            inverseSide: "contracts"
        },
        room: {
            type: "many-to-one",
            target: "Room",
            inverseSide: "users"
        }
    }
});

module.exports = { Contract }; 