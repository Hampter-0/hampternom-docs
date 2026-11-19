---
title: Deploy a website
description: Connect your domain to the VPS, publish your application, and put a web server in front of it.
---

# Deploy a website

Connect your domain to the VPS, publish your application, and put a web server in front of it.

## Point your domain to the server

In your DNS provider, create an `A` record for the root domain pointing to the VPS IPv4 address. Add a `www` record if you plan to use that hostname. DNS changes can take time to propagate. Do not publish an `AAAA` record unless IPv6 is configured and reachable on the server. If you use Cloudflare, see its documentation on [DNS proxy status](https://developers.cloudflare.com/dns/proxy-status/) and [supported network ports](https://developers.cloudflare.com/fundamentals/reference/network-ports/).

## Install and publish your app

Pick a stack that matches your project. For a static site, Nginx or Caddy can serve built files directly. For Laravel, use PHP-FPM with Nginx or Caddy. For a Node.js application, run the app on localhost and put a reverse proxy in front of it.

Deploy from a Git repository or upload a release artifact. Keep application files outside the public web root where possible, and configure the web server to serve only the built output or the framework's public directory.

For Laravel, set the web root to the project's `public/` directory, install production dependencies, and configure a private `.env` file. Run these commands for a new installation:

```bash
composer install --no-dev --optimize-autoloader
php artisan key:generate
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache
```

Generate `APP_KEY` only once for a new installation. Set `APP_ENV=production`, `APP_DEBUG=false`, a strong database password, and the correct `APP_URL`. Never commit `.env` or expose it from the web root.

## Get a free SSL certificate with Let's Encrypt

Let's Encrypt issues free TLS certificates, and Certbot can configure them for Nginx and renew them automatically. Before requesting a certificate, make sure your domain resolves to this VPS and inbound ports `80` and `443` are allowed in both the provider and Linux firewalls.

### Nginx with Certbot on Debian-family Linux

Install Certbot and its Nginx plugin, then replace the example hostnames with domains that already point to this server. Omit the `www` name if you do not have a DNS record for it:

```bash
sudo apt update
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx --redirect -d example.com -d www.example.com
```

Certbot asks for an email address and agreement to the Let's Encrypt terms, obtains the certificate, and updates the Nginx configuration to use HTTPS.

### Check renewal

Certbot normally installs a scheduled renewal task. Test that it can renew without waiting for the certificate to expire:

```bash
sudo certbot renew --dry-run
```

### Other Linux distributions and Caddy

Certbot installation varies by distribution. Use the [official Certbot instructions](https://certbot.eff.org/) and select your Linux distribution and web server. Alternatively, [Caddy's automatic HTTPS](https://caddyserver.com/docs/automatic-https) obtains and renews certificates when DNS is correct and ports 80/443 are reachable.

After setup, test both HTTP and HTTPS, check your application logs, and confirm forms and assets work.
