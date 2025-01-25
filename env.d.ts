export {};
declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_INITDB_DATABASE: string;
      MONGO_INITDB_ROOT_USERNAME: string;
      MONGO_INITDB_ROOT_PASSWORD: string;
      MONGODB_DB: string;
      MONGODB_USER: string;
      MONGODB_PASSWORD: string;
      MONGODB_URI: string;

      RABBITMQ_DEFAULT_PASS: string;
      RABBITMQ_DEFAULT_USER: string;
      RABBITMQ_DEFAULT_VHOST: string;
      RABBITMQ_URI: string;
    }
  }
}
