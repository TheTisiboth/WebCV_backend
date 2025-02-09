# 🚀 Getting started with Strapi

Strapi comes with a full-featured [Command Line Interface](https://docs.strapi.io/dev-docs/cli) (CLI) which lets you scaffold and manage your project in seconds.

### `develop`

Start your Strapi application with autoReload enabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-develop)

```
pnpm run develop
```

### `start`

Start your Strapi application with autoReload disabled. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-start)

```
pnpm run start
```

### `build`

Build your admin panel. [Learn more](https://docs.strapi.io/dev-docs/cli#strapi-build)

```
pnpm run build
```

## Integration

This project is hosted on Heroku. In order to achieve this, I followed this [documentation](https://strapi.io/integrations/heroku).
Because it is hosted on Heroku, the file system is ephemeral, and the data will be lost when the dyno restarts. To avoid this, I used a PostgreSQL database, hosted on Heroku as well, and I host the media files on cloudinary.
For the cloudinary integration, I followed this [documentation](https://strapi.io/blog/add-cloudinary-support-to-your-strapi-application).
Furthermore, I first created a local db, and then I transfered the data to the production db, using the following command:
```
npm run strapi transfer -- --to <my_admin_url> ‑‑to‑token <my_token>
```
I faced some issues using pnpm for this command, so as a workaround, when I used this command, here are the steps I followed:
- I removed all mention to pnpm in the package.json file
- I rebuild the project with npm: `npm install`
- I ran the command: `npm run strapi transfer -- --to <my_admin_url> ‑‑to‑token <my_token
- I rebuilt the project with pnpm: `pnpm install`


## ⚙️ Deployment

Strapi gives you many possible deployment options for your project including [Strapi Cloud](https://cloud.strapi.io). However, I chose to host it on Heroku.
In order to deploy your project to Heroku, you should just commit your changes on main branch, and it will be automatically deployed.

## Technical details

### Generate types script

I'm using a script in order to generate the types based on the Strapi API. I followed this [documentation](https://www.npmjs.com/package/strapi-plugin-schemas-to-ts) to achieve this.
