const { AppDataSource } = require("../models/db");
const { Admin } = require("../models/entities/admin");
const argon2 = require("argon2");
const { User } = require("../models/entities/user");

const seedUser = async () => {
    try {
        const dataSource = await AppDataSource.initialize();

        const userRepository = dataSource.getRepository(User);

        const randomStudentId = Math.floor(Math.random() * 1000000000);
        const userData = [
            {
                username: "user",
                password: "Matkhau123@",
                gender: "male",
                phone: "0909090909",
                student_id: `${randomStudentId}`,
                full_name: "Nguyen Van A",
                status: "active",
                avatar: "",
            },
        ];

        for (const user of userData) {
            const hashedPassword = await argon2.hash(user.password);
            const existingUser = await userRepository.findOneBy({ username: user.username });
            if (!existingUser) {
                const data = {
                    ...user,
                    password: hashedPassword,
                };
                await userRepository.save(data);
            }
        }

        console.log("User seeding completed.");
        await dataSource.destroy();
    } catch (error) {
        console.error("Error seeding user data:", error);
    }
};

module.exports = {
    seedUser
}
