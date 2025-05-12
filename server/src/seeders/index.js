const { seedAdmin } = require("./admin-seeder");
const { seedUser } = require("./user.seeder");

const run = async () => {
    await seedAdmin();
    await seedUser();
};

run();
