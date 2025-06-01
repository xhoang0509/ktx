const { AppDataSource } = require("../models/db");
const { Admin } = require("../models/entities/admin");
const argon2 = require("argon2");

const seedAdmin = async () => {
    try {
        const dataSource = await AppDataSource.initialize();

        const adminRepository = dataSource.getRepository(Admin);

        const adminData = [
            {
                username: "admin",
                password: "123456",
                role: "superadmin",
            },
        ];

        for (const admin of adminData) {
            const hashedPassword = await argon2.hash(admin.password);
            const existingAdmin = await adminRepository.findOneBy({ username: admin.username });
            if (!existingAdmin) {
                const data = {
                    ...admin,
                    password: hashedPassword,
                };
                await adminRepository.save(data);
            }
        }

        console.log("Admin seeding completed.");
        await dataSource.destroy();
    } catch (error) {
        console.error("Error seeding admin data:", error);
    }
};

module.exports = {
    seedAdmin
}
