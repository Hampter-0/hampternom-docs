import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'en',
  title: 'hampternom',
  titleTemplate: ':title · hampternom guides',
  description: 'Guides for hosting your Discord bot on hampternom, using the panel, and running your own server.',
  cleanUrls: true,
  appearance: 'force-dark',
  lastUpdated: true,
  sitemap: {
    hostname: 'https://docs.hampternom.nl',
  },
  head: [
    ['link', { rel: 'icon', href: '/logo.svg', type: 'image/svg+xml' }],
    ['meta', { name: 'theme-color', content: '#11131f' }],
  ],
  markdown: {
    theme: 'github-dark-dimmed',
  },
  themeConfig: {
    logo: '/logo.svg',
    siteTitle: 'HAMPTERNOM',
    nav: [
      { text: 'Get started', link: '/getting-started/custom-builds' },
      { text: 'Self-hosting', link: '/self-hosting/vps' },
      { text: 'hampternom.nl', link: 'https://hampternom.nl' },
      { text: 'Client area', link: 'https://billing.hampternom.nl' },
    ],
    sidebar: [
      {
        text: 'Getting started',
        items: [
          { text: 'Order a custom bot or website', link: '/getting-started/custom-builds' },
          { text: 'How hosting works', link: '/getting-started/how-it-works' },
          { text: 'Ordering and payment', link: '/getting-started/ordering' },
        ],
      },
      {
        text: 'Discord bots',
        items: [
          { text: 'Host your own bot', link: '/bots/upload' },
          { text: 'Ready-made bots', link: '/bots/ready-made' },
          { text: 'Troubleshooting', link: '/bots/troubleshooting' },
        ],
      },
      {
        text: 'The panel',
        items: [
          { text: 'Your panel', link: '/panel/overview' },
          { text: 'Files and SFTP', link: '/panel/files' },
          { text: 'Backups', link: '/panel/backups' },
          { text: 'Databases', link: '/panel/databases' },
        ],
      },
      {
        text: 'Websites',
        items: [{ text: 'Connect your domain', link: '/websites/connect-domain' }],
      },
      {
        text: 'Self-hosting',
        collapsed: true,
        items: [
          { text: 'Prepare your VPS', link: '/self-hosting/vps' },
          { text: 'Deploy a website', link: '/self-hosting/websites' },
          { text: 'Run a database with Docker', link: '/self-hosting/databases' },
          { text: 'Deploy a Discord bot', link: '/self-hosting/bots' },
          { text: 'VPS security', link: '/self-hosting/security' },
        ],
      },
      {
        text: 'Help',
        items: [{ text: 'Support and FAQ', link: '/help/support' }],
      },
    ],
    socialLinks: [
      { icon: 'discord', link: 'https://discord.gg/45gRX62b77' },
      { icon: 'github', link: 'https://github.com/Hampter-0' },
    ],
    search: {
      provider: 'local',
    },
    outline: {
      level: [2, 3],
      label: 'On this page',
    },
    editLink: {
      pattern: 'https://github.com/Hampter-0/hampternom-docs/edit/main/docs/:path',
      text: 'Edit this page on GitHub',
    },
    lastUpdated: {
      text: 'Last updated',
    },
    docFooter: {
      prev: 'Previous guide',
      next: 'Next guide',
    },
    footer: {
      message: 'Custom Discord bots, websites and hosting for communities and creators.',
      copyright: '© hampternom · Made in the Netherlands',
    },
  },
})
