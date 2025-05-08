const { EntitySchema } = require("typeorm");

const Admin = new EntitySchema({
    name: "Admin",
    columns: {
        id: {
            primary: true,
            type: "int",
            generated: true
        },
        username: {
            type: "varchar"
        },
        password: {
            type: "varchar"
        },
        role: {
            type: "enum",
            enum: ["superadmin", "staff"],
            default: "staff"
        }
    }
});

module.exports = { Admin }; 