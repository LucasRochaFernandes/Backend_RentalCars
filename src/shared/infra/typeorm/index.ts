import { Connection, createConnection, getConnectionOptions } from "typeorm";

export default async (host = "database_ignite"): Promise<Connection> => {
  const defaultOptions = await getConnectionOptions();
  // Possível argumento para o createConnection -> Object.assign(defaultOptions, { host })

  return await createConnection(
    Object.assign(defaultOptions, {
      host: process.env.NODE_ENV === "test" ? "localhost": host,
      database:
        process.env.NODE_ENV === "test"
          ? "rentx_supertest"
          : defaultOptions.database,
    })
  );
};


