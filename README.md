## About This Project

This is a paltform, Where you and your group can connect on same space, share thoghts, ideas, discussion topics. And everyone in the same space/group can vote each other's post thoghts, ideas, topics. To get a better idea about which topic is getting more votes and on which everyone is interested to talk to.

As a group/space host you will have certain controls like enable/disable rights to post in your sapce. more feature will be added later over time.

## Getting Started

To setup this project locally, firstly clone this repo and then you need follow these steps:

First run this command to copy `.env.example` to `.env`

```bash
cp .env.example .env
```

> **Next Step:**

You need to have a Pusher account, just log in to your Pusher Dashboard and create a `Pusher Channel`

Next get the API Creds from Pusher Dashboard and paste it in `.env` file. And you are good to go with the env.

> **Next Step**

You need to have docker installed or else you have to setup postgres database locally, to run via docker just run:

```bash
docker-compose up -d
```

This will fire up postgres database and pgadmin web, you can open this address to access PGAdmin Web on browser [http://localhost:5480]()

> **Next Step**

Once database is up locally run this following command to sync the database schema locally:

```bash
npx prisma db push
```

> **Next Step**

Once done run these command to start the project

```bash
 npm install
 # or
 yarn install
 # or
 pnpm install
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

> **Note**

Once done with the project work also run this command to stop the docker containers.

```bash
docker-compose down
```

## Some Screenshorts

![1699868606664](image/README/1699868606664.png)

![1699868635825](image/README/1699868635825.png)

![1699868647263](image/README/1699868647263.png)

![1699868886915](image/README/1699868886915.png)

## Teachnologies I have learnt and used

- Next.js as Fullstack framework
- Tailwind as CSS library
- Shadcn/UI as UI component
- Socket.IO as realtime communcation
- Pusher as realtime communcation on serverless env
- Prisma as Database ORM

## Contribution

This is one of my part-time project and I have open sourced it. So if anyone wants to add any feature, report bugs or suggest anything I'm all ears and will be happy to work on it.
