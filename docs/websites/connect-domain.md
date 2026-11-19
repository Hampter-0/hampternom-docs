---
title: Connect your domain
description: Point your own domain to your hampternom website with Cloudflare.
---

# Connect your domain

::: info Website hosting is coming soon
You can't order website hosting yet. This guide is here so you can prepare your domain. [Join our Discord](https://discord.gg/45gRX62b77) to hear when it opens.
:::

To use website hosting you need your own domain, like `yourname.nl`. We recommend managing it in [Cloudflare](https://www.cloudflare.com/), which is free for this.

## 1. Get a domain

Buy a domain from any registrar. Many registrars sell `.nl` and `.com` domains for around €10 a year. You can also buy it directly at Cloudflare.

## 2. Move your DNS to Cloudflare

If you bought the domain somewhere else:

1. Create a free Cloudflare account and click **Add a domain**.
2. Cloudflare shows two nameservers.
3. At the company where you bought the domain, replace the nameservers with the two from Cloudflare.
4. Wait until Cloudflare says your domain is active. This can take a few hours.

## 3. Point your domain to us

When your website is set up, we send you the IP address of your server. In Cloudflare, open **DNS** and add:

| Type | Name | Content |
| --- | --- | --- |
| `A` | `@` | the IP address we send you |
| `A` | `www` | the same IP address |

`@` stands for your domain itself, so `yourname.nl`. The `www` record makes `www.yourname.nl` work too.

## 4. Wait a moment

DNS changes usually work within a few minutes, sometimes a few hours. Your site gets free SSL, so it works on `https://`.

Not working after a few hours? [Ask us on Discord](https://discord.gg/45gRX62b77) and tell us your domain.
