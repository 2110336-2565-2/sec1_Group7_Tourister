
interface AppConfig {
    BACKEND_URL: string;
}

interface AppSettings {
    PRD: AppConfig;
    DEV: AppConfig;
}

type AppEnv = "PRD" | "DEV" | undefined

const APP_SETTINGS: AppSettings = {
    "PRD": {
        BACKEND_URL: "http://localhost:2000",
    },
    "DEV": {
        BACKEND_URL: "http://localhost:2000",
    }
}

const env = process.env.NEXT_PUBLIC_NODE_ENV as AppEnv ?? "DEV"
export default APP_SETTINGS[env]

