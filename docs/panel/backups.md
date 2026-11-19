---
title: Backups
description: Make a backup of your bot's files before you change something, and restore it when something breaks.
---

# Backups

A backup is a copy of all your server's files at one moment. If an update breaks your bot, you restore the backup and you're back where you were.

## Make a backup

1. Open **Backups**.
2. Click **Create backup** and give it a name you'll recognise, like "Before v2 update".
3. Wait until it shows as finished.

Make one before every big change: updating packages, replacing your code, or trying something new.

::: tip
Your plan has a limit on how many backups you can keep. When you reach it, delete an old one before you make a new one.
:::

## Restore a backup

1. Stop your bot.
2. Open **Backups**, find the backup, and choose **Restore**.
3. Wait until the restore is done, then start your bot.

Restoring replaces your current files with the ones in the backup. Anything you changed after the backup was made is lost, so download what you want to keep first.

::: warning If a restore fails
If a restore stops halfway, the panel locks your server until you acknowledge it. Your files may be incomplete, so check them before you start your bot, or restore the backup again.
:::

## Download a backup

You can download a backup to keep a copy on your own computer. That protects you even if something goes wrong on our side. It's a good habit for anything you can't easily rebuild, like a database or a bot's saved data.
