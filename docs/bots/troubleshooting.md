---
title: Troubleshooting
description: Fixes for the most common problems when a Discord bot won't start, crashes or doesn't respond.
---

# Troubleshooting

Something not working? Open the **Console** in the panel first. The error your bot prints there almost always tells you what's wrong. Find it below.

## My bot won't log in

**The console says the token is invalid.** For example `An invalid token was provided` (discord.js) or `Improper token has been passed` (discord.py).

- Check your `.env` file: the line should be `DISCORD_TOKEN=...` with no spaces and no quotes around the token.
- Make sure your code loads the `.env` file (`import 'dotenv/config'` or `load_dotenv()`).
- If you reset the token in the Developer Portal, the old one stops working. Paste the new one.

## Privileged intents error

**The console says something like** `Used disallowed intents` or `PrivilegedIntentsRequired`.

Your code asks for an intent that isn't switched on. Go to the [Developer Portal](https://discord.com/developers/applications), open your application, then **Bot**, and switch on the intents your bot uses:

- **Message Content Intent** if your bot reads the text of messages
- **Server Members Intent** if it works with member lists or join events
- **Presence Intent** if it reads people's status

Save, then restart your bot.

## Cannot find module

**The console says** `Cannot find module 'something'` (Node.js) or `ModuleNotFoundError` (Python).

- The package is missing from `package.json` or `requirements.txt`. Add it, upload the file, and restart.
- If it says it can't find one of your own files, check the file name and its capitals. Linux sees `Commands.js` and `commands.js` as different files.
- Check that your files are in the main folder and not in a subfolder.

## My bot is online but commands don't show up

- Slash commands need to be registered. Check that your bot registers its commands when it starts.
- Global slash commands can take a while to appear. Commands registered for one server show up right away, which is handy while testing.
- The bot needs the `applications.commands` scope. Invite it again with both `bot` and `applications.commands`.
- Check that the bot has permission to see and send messages in the channel.

## My bot keeps crashing or restarting

- Look at the last lines in the console before it stops. The real error is usually right above the crash.
- Watch the memory graph. If it's close to your plan's limit when the bot stops, it ran out of memory. Find what uses so much memory, or [upgrade your plan](/help/support#can-i-upgrade-my-plan-later).
- Unhandled errors stop a Node.js bot. Catch errors in your commands so one bad command doesn't take down the whole bot.

## The server won't start at all

- Check the **Startup** page: is the file it starts the right one?
- Did you change something recently? [Restore a backup](/panel/backups#restore-a-backup) from before the change.
- Still stuck? [Ask us on Discord](https://discord.gg/45gRX62b77) and include the last lines of your console. Never share your token.
