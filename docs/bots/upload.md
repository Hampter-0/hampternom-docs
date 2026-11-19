---
title: Host your own bot
description: Get your own Discord bot online on hampternom, from preparing your code to the first start.
---

# Host your own bot

You've written a bot and it runs on your own computer. This guide gets it running on hampternom, so it stays online when your PC is off.

## Before you start

You need:

- A bot that works on your own computer.
- Its **bot token** from the [Discord Developer Portal](https://discord.com/developers/applications).
- Your login for the panel. You get it once your server is set up, see [How hosting works](/getting-started/how-it-works).

## Prepare your code

Make sure your project lists everything it needs, so the server can install it.

::: code-group

```json [Node.js: package.json]
{
  "name": "my-bot",
  "type": "module",
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "discord.js": "^14.16.0",
    "dotenv": "^16.4.0"
  }
}
```

```text [Python: requirements.txt]
discord.py>=2.4
python-dotenv>=1.0
```

:::

Check that the file the server starts (`main` in `package.json`, or your main `.py` file) is the right one. You can see and change which file starts on the **Startup** page in the panel.

## Add your bot token

Never put your token in your code. Put it in a file called `.env` in the main folder of your bot:

```dotenv
DISCORD_TOKEN=paste_your_token_here
```

Then read it in your code:

::: code-group

```js [Node.js]
import 'dotenv/config';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
```

```python [Python]
import os
import discord
from dotenv import load_dotenv

load_dotenv()

intents = discord.Intents.default()
client = discord.Client(intents=intents)

@client.event
async def on_ready():
    print(f"Logged in as {client.user}")

client.run(os.getenv("DISCORD_TOKEN"))
```

:::

::: danger If your token leaks
Anyone with your token controls your bot. If it ends up somewhere public, go to the Developer Portal right away and click **Reset Token**, then put the new one in your `.env` file.
:::

## Upload your files

1. In the panel, open **Files**.
2. Upload your project. The fastest way is to zip it on your computer, upload the `.zip`, then right-click it and unzip it.
3. Don't upload `node_modules` or `venv`. The server installs your packages itself.

Make sure your files end up in the main folder, not in a subfolder. `package.json` (or `requirements.txt`) should be at the top level.

Prefer your own tools? You can also [upload with SFTP](/panel/files#with-sftp).

## Start your bot

1. Open **Console** and click **Start**.
2. Watch the console. The server installs your packages first, then starts your bot.
3. When you see your bot's "logged in" message, it's online. Check Discord to be sure.

If you see an error instead, look it up in [Troubleshooting](/bots/troubleshooting).

## Update your bot later

1. Make a [backup](/panel/backups) first.
2. Upload the changed files, overwriting the old ones.
3. Click **Restart**.

If you added new packages, the restart installs them.
