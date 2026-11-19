---
title: Prepare your VPS
description: Start with a supported Linux distribution, a secure SSH connection, and a regular user account before deploying applications. Package managers and firewall tools vary by distribution, so use the matching commands below.
---

# Prepare your VPS

Start with a supported Linux distribution, a secure SSH connection, and a regular user account before deploying applications. Package managers and firewall tools vary by distribution, so use the matching commands below.

## Choose a server

Choose a maintained Linux server distribution you are comfortable updating, such as Debian, Fedora Server, Rocky Linux, or AlmaLinux. For a small site or bot, 1-2 vCPU and 2 GB RAM is a reasonable starting point; increase it as real usage requires. Choose a nearby region and check the provider's backup, support, and renewal pricing.

- A VPS with a public IP address and a supported Linux image.
- A domain name if you plan to host a public website.
- An SSH client and access to the email address on your provider account.
- A project that runs locally, with its dependencies and environment variables documented.

## Prepare a Linux VPS

Connect using the server address and the username supplied by your provider:

```bash
ssh your-user@YOUR_SERVER_IP
```

First identify the installed distribution:

```bash
cat /etc/os-release
```

On Debian-family distributions, use `apt` and the `sudo` group:

```bash
sudo apt update && sudo apt upgrade
sudo adduser your-user
sudo usermod -aG sudo your-user
```

On Fedora, Rocky Linux, or AlmaLinux, use `dnf` and the `wheel` administrator group:

```bash
sudo dnf upgrade --refresh
sudo useradd --create-home --groups wheel your-user
sudo passwd your-user
```

Set up SSH key authentication before disabling password login. Keep your current SSH session open while testing a second session, so a configuration mistake does not lock you out. Continue with the [VPS security guide](/self-hosting/security) before making the server public.
