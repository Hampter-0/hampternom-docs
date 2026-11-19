---
title: Files and SFTP
description: Upload, edit and download your bot's files in the browser or with an SFTP client.
---

# Files and SFTP

You can manage your files in two ways: in the browser on the **Files** page, or with an SFTP client on your computer. Both show the same files.

## In the browser

The **Files** page works like a file explorer:

- **Upload** files from your computer. For a whole project, put it in a `.zip` first, upload that, and unzip it in the panel. That's much faster than uploading many small files.
- **Click a file** to open it in the editor. Save your changes, then restart your bot.
- **Right-click a file or folder** for options like rename, move, download, compress and delete.

::: warning Don't upload node_modules
Leave out `node_modules` (or `venv` for Python). They're large and get installed on the server anyway. Upload `package.json` and `package-lock.json` instead.
:::

## With SFTP

SFTP is handy for big uploads or if you prefer your own editor. You need an SFTP client, such as [FileZilla](https://filezilla-project.org/) or [WinSCP](https://winscp.net/) on Windows.

1. On the **Files** page, open the SFTP details. You see a server address, a port and a username.
2. In your SFTP client, connect with:
   - **Protocol:** SFTP
   - **Host and port:** the server address and port from the panel
   - **Username:** the username from the panel
   - **Password:** your panel password
3. You now see your bot's files. Drag files in to upload them.

::: tip
The SFTP username is not the same as your panel username. Copy it from the panel.
:::

## Files you should keep private

Your bot token belongs in a `.env` file or in a variable on the **Startup** page, never in your code. Files in your server are private, but if you also put your code on GitHub, add `.env` to your `.gitignore`. See [Host your own bot](/bots/upload#add-your-bot-token).
