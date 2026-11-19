---
title: Deploy a Discord bot
description: Use an always-on host and a process manager so your bot can reconnect after a crash or server restart.
---

# Deploy a Discord bot

Use an always-on host and a process manager so your bot can reconnect after a crash or server restart.

::: tip Rather not manage a server?
[hampternom bot hosting](https://hampternom.nl/bots) runs your bot for you from €1 a month, with a panel for your files and logs. See [Host your own bot](/bots/upload).
:::

## Create the application and token

For a JavaScript bot, use a supported Node.js LTS release and the official [discord.js](https://discord.js.org/) library. Python bots can use [discord.py](https://discordpy.readthedocs.io/). Choose one runtime and follow its official installation guide.

Create an application in the [Discord Developer Portal](https://discord.com/developers/applications), add a bot, and copy its token into a server-side environment file. Never put the token in source control, client-side code, screenshots, or public logs. If it leaks, reset it immediately in the portal.

## Choose an always-on host

A bot needs a host that allows a persistent background process. A small paid VPS is a straightforward option; avoid plans that suspend apps when idle or do not support background workers.

- [Hetzner Cloud](https://www.hetzner.com/cloud/) is worth comparing for budget-conscious VPS hosting in Europe.
- [DigitalOcean Droplets](https://www.digitalocean.com/products/droplets) offers beginner-friendly guides and a straightforward VPS workflow.
- [OVHcloud VPS](https://www.ovhcloud.com/en/vps/) is another provider with European VPS options.

Compare server location, memory, backups, support, network limits, and renewal price. Plans change, so confirm current pricing and terms directly with each provider.

## Keep the bot running with Docker Compose

Install Docker Engine and the Compose plugin using Docker's [official Linux installation guide](https://docs.docker.com/engine/install/) and [Compose installation instructions](https://docs.docker.com/compose/install/linux/). Make sure your project has a committed `package-lock.json`, then place these files in its root directory.

### Dockerfile

```dockerfile
FROM node:24-bookworm-slim
ENV NODE_ENV=production
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY --chown=node:node . .
USER node
CMD ["npm", "start"]
```

### .dockerignore

Keep local dependencies and secrets out of the image build:

```text
node_modules
.env
.env.*
.git
npm-debug.log*
```

### compose.yaml

The restart policy starts the bot again after a crash or server reboot, and the logging settings limit retained log size:

```yaml
services:
  bot:
    build: .
    init: true
    restart: unless-stopped
    env_file:
      - .env
    logging:
      driver: json-file
      options:
        max-size: "10m"
        max-file: "3"
```

### Bot token

Create a private `.env` file beside `compose.yaml`. Replace the placeholder with your real token and never commit this file:

```dotenv
DISCORD_TOKEN=replace_with_your_bot_token
```

### Build and start

From the project directory, enable Docker at startup and launch the service. These commands use `sudo`; adding a user to the Docker group grants root-equivalent access.

```bash
sudo systemctl enable --now docker
sudo docker compose up -d --build
sudo docker compose ps
sudo docker compose logs --tail=50 -f bot
```

Press `Ctrl+C` to stop following logs; the bot keeps running. To deploy an update after pulling new code, rebuild the image:

```bash
git pull
sudo docker compose up -d --build
sudo docker compose logs --tail=50 bot
```

The restart policy cannot prevent provider outages or fix bugs that do not exit the process, so check logs and configure provider monitoring. Discord bots usually need outbound network access only; do not publish an inbound port unless your bot serves a web endpoint.

## Invite and test safely

Generate an OAuth2 invite URL with the `bot` and `applications.commands` scopes. Grant only the permissions the bot needs. Enable privileged intents in the Developer Portal only when your code requires them. Test commands in a private server, check logs, and confirm the bot reconnects after a server restart.
