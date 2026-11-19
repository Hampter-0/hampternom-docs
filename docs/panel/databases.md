---
title: Databases
description: Create a database for your bot and connect to it from your code.
---

# Databases

The 1 GB and 2 GB bot plans include a database. Use it to store things like ticket counts, user settings or levels, so they survive a restart.

## Create a database

1. Open **Databases** and click **Create database**.
2. Give it a name, for example `bot`.
3. The panel shows the connection details: host, port, database name, username and password.

## Connect from your bot

Put the connection details in your `.env` file, not in your code:

```dotenv
DB_HOST=the-host-from-the-panel
DB_PORT=3306
DB_NAME=the-database-name
DB_USER=the-username
DB_PASSWORD=the-password
```

Then read them in your code. For example, with the [`mysql2`](https://www.npmjs.com/package/mysql2) package in Node.js:

```js
import 'dotenv/config';
import mysql from 'mysql2/promise';

const db = await mysql.createConnection({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

const [rows] = await db.query('SELECT 1 + 1 AS result');
console.log(rows);
```

Use the port the panel shows. It's often `3306`, but not always.

## Keep your data safe

- Your database isn't included in file backups. Export it now and then to keep a copy.
- If your database password leaks, rotate it on the **Databases** page and update your `.env` file.
- Need more than one database? [Ask us](/help/support).
