declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT: any;
    readonly DB: string;
    // readonly BASE_URL: string;
    // readonly NODE_ENV: string;
    // readonly JWT_SECRET_KEY: string;
    // readonly JWT_EXPIRED_TIME: string;
    // readonly EMAIL_HOST: string;
    // readonly EMAIL_USERNAME: string;
    // readonly EMAIL_PASSWORD: string;
    // readonly APP_NAME: string;
  }
}