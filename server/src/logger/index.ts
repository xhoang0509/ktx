import path from "path";

const LOGGER = isNaN(Number(process.env.LOGGER)) ? 1 : parseInt(process.env.LOGGER || "1", 10);

const LOGGER_LEVEL = {
    SUCCESS: "success",
    WARN: "warn",
    INFO: "info",
    DEBUG: "debug",
    ERROR: "error",
} as const;

function buildLog(file: string, func: string, level: string, message: string | Error) {
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

export function error(file: string, message: string | Error) {
    const func = error.caller?.name || "unknown";
    LOGGER === 1 && console.error(buildLog(file, func, LOGGER_LEVEL.ERROR, message));
}

export function debug(file: string, message: string | Error) {
    const func = debug.caller?.name || "unknown";
    LOGGER === 1 && console.debug(buildLog(file, func, LOGGER_LEVEL.DEBUG, message));
}

export function info(file: string, message: string | Error) {
    const func = info.caller?.name || "unknown";
    LOGGER === 1 && console.info(buildLog(file, func, LOGGER_LEVEL.INFO, message));
}

export function warn(file: string, message: string | Error) {
    const func = warn.caller?.name || "unknown";
    LOGGER === 1 && console.warn(buildLog(file, func, LOGGER_LEVEL.WARN, message));
}

export function success(file: string, message: string | Error) {
    const func = success.caller?.name || "unknown";
    LOGGER === 1 && console.log(buildLog(file, func, LOGGER_LEVEL.SUCCESS, message));
}
