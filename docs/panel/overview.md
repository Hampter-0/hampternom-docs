---
title: Your panel
description: A tour of the panel where you manage your bot, from the console to schedules.
---

# Your panel

The panel is where you manage your bot. Each plan is a "server" in the panel. Open it from the **Servers** list to see its pages in the sidebar.

## The status card and power buttons

At the top of every page you see your server's name, its state (**Running**, **Starting**, **Stopping** or **Offline**) and how long it has been running.

Below it are the power buttons:

- **Start** starts your bot when it's offline.
- **Restart** stops it and starts it again. Use this after you change your code.
- **Stop** shuts it down. If it hangs while stopping, the button turns into **Kill**, which forces it off.

## The pages

| Page | What you use it for |
| --- | --- |
| **Console** | See your bot's logs live, send commands, and watch CPU and memory use. |
| **Files** | Upload and edit your code in the browser, or find your SFTP login. See [Files and SFTP](/panel/files). |
| **Databases** | Create a database for your bot, on plans that include one. See [Databases](/panel/databases). |
| **Schedules** | Run actions automatically, like a daily restart. |
| **Backups** | Save a copy of your files and restore it later. See [Backups](/panel/backups). |
| **Startup** | See the start command and set variables, like which file to run. |
| **Settings** | Rename your server or reinstall it. |
| **Activity** | A log of everything that happened, like who restarted the bot and when. |

Depending on your plan, you might not see every page.

## Console

The console shows everything your bot prints, as it happens. It's the first place to look when something goes wrong: errors show up here.

You can also type into the console. What that does depends on your bot; most Discord bots don't read console input.

The graphs next to the console show CPU and memory use. If memory stays close to your plan's limit, your bot can crash. See [Troubleshooting](/bots/troubleshooting#my-bot-keeps-crashing-or-restarting).

## Schedules

A schedule runs actions for you at set times. A common one is a nightly restart:

1. Open **Schedules** and create a new schedule.
2. Set it to run every day at a quiet time, for example 04:00.
3. Add a step that sends the **restart** power action.

## Subusers

Working on a bot with friends? With **Subusers** you give someone else access to your server, and choose what they can do. They need their own panel account.
