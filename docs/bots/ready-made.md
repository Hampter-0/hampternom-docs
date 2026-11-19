---
title: Ready-made bots
description: Set up the hampternom Ticket Bot or Server Bot in your Discord server.
---

# Ready-made bots

Don't want to write code? Our ready-made bots work as soon as you invite them. You set them up with slash commands in your own server.

| Bot | Price | What it does |
| --- | --- | --- |
| **Ticket Bot** | €8 one-time | A support ticket system |
| **Server Bot** | €12 one-time | Everything in Ticket Bot, plus rules, information and announcements |

Both are paid once. To keep the bot online, add hosting from €1 a month when you order, or host it yourself.

## Get your bot

1. Order the bot in the [client area](https://billing.hampternom.nl), with or without hosting.
2. Once your payment has arrived, we set it up and send you an invite link.
3. Open the link, pick your server and click **Authorize**. You need the **Manage Server** permission in that server.

## Ticket Bot

Ticket Bot lets members open a private channel to talk to your staff.

1. Go to the channel where members should open tickets, for example `#support`.
2. Run `/ticket panel`. The bot posts the ticket panel in that channel.
3. When a member opens a ticket, the bot creates a private channel for it.

::: tip
Make sure the bot's role can create channels and manage permissions, or it can't make ticket channels.
:::

## Server Bot

Server Bot has everything Ticket Bot has, plus commands to set up your server:

| Command | What it does |
| --- | --- |
| `/ticket panel` | Posts the ticket panel, like Ticket Bot |
| `/setup rules` | Sets up your rules channel |
| `/setup information` | Sets up your information channel |
| `/announce` | Sends an announcement with a title and a message |

Run the commands in the channel you want to set up.

## Something doesn't work?

- **The commands don't show up:** check that the bot was invited with the link we sent, which includes slash commands. Reinvite it if needed.
- **The bot doesn't respond:** check that its role is high enough in your server's role list and that it can see the channel.
- Still stuck? [Ask us on Discord](https://discord.gg/45gRX62b77). You can also see the bots working in our own server.
