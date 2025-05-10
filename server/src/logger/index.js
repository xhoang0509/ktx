const path = require("path");

const LOGGER = isNaN(Number(process.env.LOGGER)) ? 1 : parseInt(process.env.LOGGER || "1", 10);

const LOGGER_LEVEL = {
    SUCCESS: "success",
    WARN: "warn",
    INFO: "info",
    DEBUG: "debug",
    ERROR: "error",
};

function buildLog(file, func, level, message) {
    const now = new Date();
    const date = now.toLocaleDateString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
    const time = now.toLocaleTimeString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" });
    const log = {
        filename: `${path.basename(file)}`,
        caller: `${func}`,
        level: level,
        message: message instanceof Error ? message.stack : message,
        time: `${date} ${time}`,
    };
    return JSON.stringify(log);
}

function error(file, message) {
    const func = error.caller?.name || "unknown";
    LOGGER === 1 && console.error(buildLog(file, func, LOGGER_LEVEL.ERROR, message));
}

function debug(file, message) {
    const func = debug.caller?.name || "unknown";
    LOGGER === 1 && console.debug(buildLog(file, func, LOGGER_LEVEL.DEBUG, message));
}

function info(file, message) {
    const func = info.caller?.name || "unknown";
    LOGGER === 1 && console.info(buildLog(file, func, LOGGER_LEVEL.INFO, message));
}

function warn(file, message) {
    const func = warn.caller?.name || "unknown";
    LOGGER === 1 && console.warn(buildLog(file, func, LOGGER_LEVEL.WARN, message));
}

function success(file, message) {
    const func = success.caller?.name || "unknown";
    LOGGER === 1 && console.log(buildLog(file, func, LOGGER_LEVEL.SUCCESS, message));
}

module.exports = { error, debug, info, warn, success }; 