export const environment = {
  production: false,
  databaseName: "travel_db",
  databaseUrl: "mongodb://localhost:27017/{{datastore.dbName}}",
  // username: "dbUser",
  // password: "nOSLjiJZENzDbQo2",
  redisUrl: "redis://127.0.0.1:6379",
  retryAttempts: 6,
  retryDelays: 4,

};
