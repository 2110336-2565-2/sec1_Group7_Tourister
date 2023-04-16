
interface AppConfig {
    BACKEND_URL: string;
    OMISE_PUBLIC_KEY: string;
    OMISE_SECRET_KEY: string;
}

interface AppSettings {
    PRD: AppConfig;
    DEV: AppConfig;
}

type AppEnv = "PRD" | "DEV" | undefined

const APP_SETTINGS: AppSettings = {
    "PRD": {
        BACKEND_URL: "https://se-tourister-production.up.railway.app",
        OMISE_PUBLIC_KEY: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY ?? "",
        OMISE_SECRET_KEY: process.env.NEXT_PUBLIC_OMISE_SECRET_KEY ?? "",
    },
    "DEV": {
        BACKEND_URL: "http://localhost:2000",
        OMISE_PUBLIC_KEY: process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY ?? "",
        OMISE_SECRET_KEY: process.env.NEXT_PUBLIC_OMISE_SECRET_KEY ?? "",
    }
}

const env = process.env.NEXT_PUBLIC_NODE_ENV as AppEnv ?? "DEV"
export default APP_SETTINGS[env]

