---
title: VPS security
description: A VPS is exposed to the internet and needs ongoing maintenance. Start with SSH and firewall rules, then keep software and backups current.
---

# VPS security

A VPS is exposed to the internet and needs ongoing maintenance. Start with SSH and firewall rules, then keep software and backups current.

## Harden SSH and configure a firewall

SSH commonly listens on TCP port `22`. Use SSH keys, disable direct root login, and allow SSH only from trusted addresses when practical. A custom port can reduce automated scan noise, but it is not a replacement for these protections.

On Debian-family distributions, UFW is commonly used. Allow SSH and only the web services you need before enabling it:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw enable
sudo ufw status
```

On Fedora, Rocky Linux, or AlmaLinux, a server may use firewalld instead. Confirm it is installed and active before applying rules:

```bash
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
sudo firewall-cmd --list-all
```

The `ssh` service normally means port 22. A Discord bot typically needs outbound access but no public inbound port.

## Change the SSH port

Moving SSH from port 22 to a high, unused port such as `2222` can reduce log noise from automated scanners. It does not stop determined scans or secure SSH by itself; keep key authentication enabled and software updated.

1. Verify that key-based login works in a second terminal, and keep your current SSH session open.
2. Allow the new TCP port in both the VPS provider firewall and the Linux firewall before changing SSH. For example, with UFW:

```bash
sudo ufw allow 2222/tcp
```

With firewalld, allow the same port and reload the rules:

```bash
sudo firewall-cmd --permanent --add-port=2222/tcp
sudo firewall-cmd --reload
```

Edit the active SSH daemon configuration file (commonly `/etc/ssh/sshd_config` or a file it includes) and set:

```text
Port 2222
```

Validate the configuration, then reload the SSH service. Debian-family systems commonly call it `ssh`; Fedora/RHEL-family systems commonly call it `sshd`:

```bash
sudo sshd -t
sudo systemctl reload ssh
```

On Fedora/RHEL-family systems, use `sudo systemctl reload sshd` instead. From a second terminal, test the new connection:

```bash
ssh -p 2222 your-user@YOUR_SERVER_IP
```

Only after confirming it works should you remove the old port 22 rule from both firewalls. If the new connection fails, use the still-open session to restore access.

## Keep software updated and monitor it

- Install operating-system security updates regularly and review provider security notices.
- Monitor disk space, memory, service status, and application logs.
- Use separate credentials for each service and rotate any credential that may have been exposed.
- Set renewal reminders for your domain and review your provider's backup retention.

## Back up data and protect secrets

Back up databases, uploads, and configuration to storage outside the VPS. Test restoring a backup; a backup that has never been restored is unverified.

Keep environment files and API tokens out of source control and public web directories. Restrict access to secret files, and rotate credentials immediately if they are leaked.
