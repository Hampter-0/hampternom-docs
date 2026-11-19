---
title: Run a database with Docker
description: Choose MySQL with phpMyAdmin or PostgreSQL with pgAdmin. Each example keeps the database on a private Compose network and binds its admin page to the VPS loopback address.
---

# Run a database with Docker

Choose MySQL with phpMyAdmin or PostgreSQL with pgAdmin. Each example keeps the database on a private Compose network and binds its admin page to the VPS loopback address.

## Choose one database stack

Install Docker Engine and the Compose plugin using Docker's [Linux installation guide](https://docs.docker.com/engine/install/). These are alternative Compose files; use the one that matches your application. If your app also runs in Docker, put its service in the same Compose project so it can connect using the database service name.

Create a `.env` file beside `compose.yaml` for the passwords used in the example. Keep it private, add it to `.gitignore`, and never commit it. The environment variables initialize a new empty database volume; changing them later does not change an existing database user's password.

## MySQL with phpMyAdmin

Save this as `compose.yaml`. There is intentionally no host port mapping for MySQL; phpMyAdmin reaches it over the private Compose network.

```yaml
services:
  mysql:
    image: mysql:8.4
    restart: unless-stopped
    environment:
      MYSQL_DATABASE: ${MYSQL_DATABASE}
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql

  phpmyadmin:
    image: phpmyadmin:5.2-apache
    restart: unless-stopped
    depends_on:
      - mysql
    environment:
      PMA_HOST: mysql
    ports:
      - "127.0.0.1:8080:80"

volumes:
  mysql_data:
```

Set these values in the adjacent `.env` file. Use unique, long passwords and replace both placeholders:

```dotenv
MYSQL_DATABASE=app_db
MYSQL_USER=app_user
MYSQL_PASSWORD=replace_with_a_long_random_password
MYSQL_ROOT_PASSWORD=replace_with_a_different_long_random_password
```

Start the stack from that directory:

```bash
chmod 600 .env
sudo docker compose up -d
sudo docker compose ps
```

## PostgreSQL with pgAdmin

This alternative keeps PostgreSQL private and exposes pgAdmin only on the server's loopback interface.

```yaml
services:
  postgres:
    image: postgres:17
    restart: unless-stopped
    environment:
      POSTGRES_DB: ${POSTGRES_DB}
      POSTGRES_USER: ${POSTGRES_USER}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data

  pgadmin:
    image: dpage/pgadmin4:9
    restart: unless-stopped
    depends_on:
      - postgres
    environment:
      PGADMIN_DEFAULT_EMAIL: ${PGADMIN_DEFAULT_EMAIL}
      PGADMIN_DEFAULT_PASSWORD: ${PGADMIN_DEFAULT_PASSWORD}
    ports:
      - "127.0.0.1:5050:80"
    volumes:
      - pgadmin_data:/var/lib/pgadmin

volumes:
  postgres_data:
  pgadmin_data:
```

For the PostgreSQL stack, use these values in `.env` instead:

```dotenv
POSTGRES_DB=app_db
POSTGRES_USER=app_user
POSTGRES_PASSWORD=replace_with_a_long_random_password
PGADMIN_DEFAULT_EMAIL=you@example.com
PGADMIN_DEFAULT_PASSWORD=replace_with_another_long_random_password
```

Start it from the directory containing this Compose file and `.env`:

```bash
chmod 600 .env
sudo docker compose up -d
sudo docker compose ps
```

## Database ports and UFW

MySQL normally listens on TCP `3306`; PostgreSQL normally listens on TCP `5432`. The Compose examples above do not publish either port, so the databases stay reachable only to containers on their Docker network. You do not need to open these ports in UFW.

For a database installed directly on Linux, choose a firewall policy. To block inbound connections to both ports from everyone:

```bash
sudo ufw deny 3306/tcp
sudo ufw deny 5432/tcp
sudo ufw status numbered
```

If a host-installed database must accept connections from one trusted fixed IP instead, replace the example IP and insert this allow rule before any broad deny rule. Remove any broad allow rule for that port and keep UFW's default incoming policy set to deny:

```bash
sudo ufw insert 1 allow from 198.51.100.25 to any port 3306 proto tcp
sudo ufw status verbose
sudo ufw status numbered
```

Use port `5432` instead for PostgreSQL. Apply a matching restriction in your provider firewall too. Docker-published ports can bypass UFW rules; do not add public `ports:` mappings for database containers and assume UFW will block them. See Docker's [UFW and packet-filtering guidance](https://docs.docker.com/engine/network/packet-filtering-firewalls/#docker-and-ufw). If you need host access to a container, bind its published port to `127.0.0.1` and connect over SSH as shown below.

## Open the admin UI through SSH

The `127.0.0.1` port bindings prevent the admin pages from listening on the public network interface. From your own computer, open an SSH tunnel to the VPS:

```bash
ssh -L 8080:127.0.0.1:8080 -L 5050:127.0.0.1:5050 your-user@YOUR_SERVER_IP
```

While the tunnel is open, visit `http://localhost:8080` for phpMyAdmin or `http://localhost:5050` for pgAdmin. Add `-p YOUR_SSH_PORT` to the SSH command if your server uses a custom SSH port. Do not expose either admin UI publicly without a deliberate access-control and HTTPS setup.

For a Laravel app in the same Compose project, use the service name as the database host and set its credentials to match the application user in the selected Compose stack. Choose one block:

```dotenv
# MySQL
DB_CONNECTION=mysql
DB_HOST=mysql
DB_PORT=3306
DB_DATABASE=app_db
DB_USERNAME=app_user
DB_PASSWORD=replace_with_mysql_password

# PostgreSQL
DB_CONNECTION=pgsql
DB_HOST=postgres
DB_PORT=5432
DB_DATABASE=app_db
DB_USERNAME=app_user
DB_PASSWORD=replace_with_postgres_password
```

If your app is in a different Compose project, attach it to a shared Docker network rather than publishing the database port to the internet.

## Back up and update the database

Named Docker volumes preserve data when a container is replaced, but they are not backups. Back up databases to storage outside the VPS and test restoring a copy before relying on it.

Keep the Compose file, password file, and database backups protected. Before changing image versions, read the database release notes and take a verified backup. See the official image docs for [MySQL](https://hub.docker.com/_/mysql), [PostgreSQL](https://hub.docker.com/_/postgres), [phpMyAdmin](https://hub.docker.com/_/phpmyadmin), and [pgAdmin](https://www.pgadmin.org/docs/pgadmin4/latest/container_deployment.html).
