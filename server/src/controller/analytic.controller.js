const { UserModel, RoomModel, DeviceModel } = require("../models/db");
const { Between } = require("typeorm");
const moment = require("moment");
const getYYYYMMDD = (date) => {
    return moment(date).format('YYYY-MM-DD');
}

const AnalyticController = {
    getUserAnalytic: async (req, res) => {
        try {
            const { month, year } = req.query;
            const startDate = moment(`${year}-${month}-01`).startOf('month').format('YYYY-MM-DD');
            const endDate = moment(`${year}-${month}-01`).endOf('month').format('YYYY-MM-DD');

            const users = await UserModel.find({
                where: {
                    createdAt: Between(startDate, endDate)
                }
            });
            const firstDateOfMonth = moment(`${year}-${month}-01`).startOf('month').format('YYYY-MM-DD');
            const lastDateOfMonth = moment(`${year}-${month}-01`).endOf('month').format('YYYY-MM-DD');

            let usersArray = [];
            if (users.length) {
                usersArray = users.reduce((acc, user) => {
                    const existingUser = acc.find(item => item.x === getYYYYMMDD(user.createdAt));
                    if (existingUser) {
                        existingUser.y++;
                    } else {
                        acc.push({
                            x: getYYYYMMDD(user.createdAt),
                            y: 1
                        });
                    }
                    return acc;
                }, []);

                if (usersArray?.[0]?.x.toString() !== firstDateOfMonth.toString()) {
                    usersArray.unshift({
                        x: firstDateOfMonth,
                        y: 0
                    })
                }
            } else {
                usersArray.push({
                    x: firstDateOfMonth,
                    y: 0
                })
                usersArray.push({
                    x: lastDateOfMonth,
                    y: 0
                })
            }

            return res.status(200).json({
                data: usersArray,
                message: "Success",
                status: 200
            });
        } catch (e) {
            return res.status(500).json({
                data: [],
                message: e.message,
                status: 500
            });
        }
    },
    getRoomAnalytic: async (req, res) => {
        try {
            const { month, year } = req.query;
            const startDate = moment(`${year}-${month}-01`).startOf('month').format('YYYY-MM-DD');
            const endDate = moment(`${year}-${month}-01`).endOf('month').format('YYYY-MM-DD');

            const rooms = await RoomModel.find({
                where: {
                    createdAt: Between(startDate, endDate)
                }
            });
            const firstDateOfMonth = moment(`${year}-${month}-01`).startOf('month').format('YYYY-MM-DD');
            const lastDateOfMonth = moment(`${year}-${month}-01`).endOf('month').format('YYYY-MM-DD');

            let roomsArray = [];
            if (rooms.length) {
                roomsArray = rooms.reduce((acc, user) => {
                    const existingUser = acc.find(item => item.x === getYYYYMMDD(user.createdAt));
                    if (existingUser) {
                        existingUser.y++;
                    } else {
                        acc.push({
                            x: getYYYYMMDD(user.createdAt),
                            y: 1
                        });
                    }
                    return acc;
                }, []);

                if (roomsArray?.[0]?.x.toString() !== firstDateOfMonth.toString()) {
                    roomsArray.unshift({
                        x: firstDateOfMonth,
                        y: 0
                    })
                }
            } else {
                roomsArray.push({
                    x: firstDateOfMonth,
                    y: 0
                })
                roomsArray.push({
                    x: lastDateOfMonth,
                    y: 0
                })
            }

            return res.status(200).json({
                data: roomsArray,
                message: "Success",
                status: 200
            });
        } catch (e) {
            return res.status(500).json({
                data: [],
                message: e.message,
                status: 500
            });
        }
    },
    getDeviceAnalytic: async (req, res) => {
        try {
            const { month, year } = req.query;
            const startDate = moment(`${year}-${month}-01`).startOf('month').format('YYYY-MM-DD');
            const endDate = moment(`${year}-${month}-01`).endOf('month').format('YYYY-MM-DD');

            const devices = await DeviceModel.find({
                where: {
                    createdAt: Between(startDate, endDate)
                }
            });

            // group device by mame, return array of object { x: name, y: count }
            const deviceMap = devices.reduce((acc, device) => {
                const existingDevice = acc.find(item => item.x === device.name);
                if (existingDevice) {
                    existingDevice.y++;
                } else {
                    acc.push({
                        x: device.name,
                        y: 1
                    });
                }
                return acc;
            }, []);

            return res.status(200).json({
                data: deviceMap,
                message: "Success",
                status: 200
            });
        } catch (e) {
            return res.status(500).json({
                data: [],
                message: e.message,
                status: 500
            });
        }
    },
    getContractAnalytic: async (req, res) => {
        const { month, year } = req.query;
    },
    getPaymentAnalytic: async (req, res) => {
        const { month, year } = req.query;
    }
}

module.exports = AnalyticController;