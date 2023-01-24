"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const BaseDatabase_1 = require("../BaseDatabase");
const ShowDatabase_1 = require("../ShowDatabase");
const UserDatabase_1 = require("../UserDatabase");
const data_1 = require("./data");
class Migrations extends BaseDatabase_1.BaseDatabase {
    constructor() {
        super(...arguments);
        this.execute = async () => {
            try {
                console.log("Creating tables...");
                await this.createTables();
                console.log("Tables created successfully.");
                console.log("Populating tables...");
                await this.insertData();
                console.log("Tables populated successfully.");
                console.log("Migrations completed.");
            }
            catch (error) {
                console.log("FAILED! Error in migrations...");
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
            finally {
                console.log("Ending connection...");
                BaseDatabase_1.BaseDatabase.connection.destroy();
                console.log("Connection closed graciously.");
            }
        };
        this.createTables = async () => {
            await BaseDatabase_1.BaseDatabase.connection.raw(`
        DROP TABLE IF EXISTS ${ShowDatabase_1.ShowDatabase.TABLE_TICKETS};
        DROP TABLE IF EXISTS ${ShowDatabase_1.ShowDatabase.TABLE_SHOWS};
        DROP TABLE IF EXISTS ${UserDatabase_1.UserDatabase.TABLE_USERS};
        
        CREATE TABLE IF NOT EXISTS ${UserDatabase_1.UserDatabase.TABLE_USERS}(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL UNIQUE,
            password VARCHAR(255) NOT NULL,
            role ENUM("NORMAL", "ADMIN") DEFAULT "NORMAL" NOT NULL
        );

        CREATE TABLE IF NOT EXISTS ${ShowDatabase_1.ShowDatabase.TABLE_SHOWS}(
            id VARCHAR(255) PRIMARY KEY,
            band VARCHAR(255) NOT NULL,
            starts_at DATE NOT NULL
        );

        CREATE TABLE IF NOT EXISTS ${ShowDatabase_1.ShowDatabase.TABLE_TICKETS}(
            id VARCHAR(255) PRIMARY KEY,
            show_id VARCHAR(255) NOT NULL,
            user_id VARCHAR(255) NOT NULL,
            FOREIGN KEY (user_id) REFERENCES ${UserDatabase_1.UserDatabase.TABLE_USERS}(id),
            FOREIGN KEY (show_id) REFERENCES ${ShowDatabase_1.ShowDatabase.TABLE_SHOWS}(id)
        );
        `);
        };
        this.insertData = async () => {
            await BaseDatabase_1.BaseDatabase
                .connection(UserDatabase_1.UserDatabase.TABLE_USERS)
                .insert(data_1.users);
            await BaseDatabase_1.BaseDatabase
                .connection(ShowDatabase_1.ShowDatabase.TABLE_SHOWS)
                .insert(data_1.shows);
            await BaseDatabase_1.BaseDatabase
                .connection(ShowDatabase_1.ShowDatabase.TABLE_TICKETS)
                .insert(data_1.tickets);
        };
    }
}
const migrations = new Migrations();
migrations.execute();
//# sourceMappingURL=Migrations.js.map