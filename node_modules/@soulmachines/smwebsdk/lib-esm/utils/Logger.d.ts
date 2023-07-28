declare const logLevels: readonly ["debug", "log", "warn", "error"];
/**
 * @public
 */
export declare type LogLevel = typeof logLevels[number];
export declare class Logger {
    isEnabled: boolean;
    private availableLogLevels;
    private _minLogLevel;
    constructor(minLogLevel?: LogLevel, isEnabled?: boolean);
    log(type: LogLevel, ...args: any): void;
    enableLogging(enable: boolean): void;
    getMinLogLevel(): "error" | "debug" | "log" | "warn";
    setMinLogLevel(level: LogLevel): void;
}
export {};
//# sourceMappingURL=Logger.d.ts.map