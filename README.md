# MERN Starter

## Setup

### Setup Express Server

1. `npm init -y`
2. `mkdir server`
3. `touch server/index.js`
4. `npm i express dotenv`
5. `touch .env`
6. Add `PORT=3001` to `.env` file.

To start:
`npm start` in root.

### Setup React Client

1. `npx create-react-app client`
2. Add `"proxy": "http://localhost:3001"` to `package.json`.
3. `npm i react-router-dom`

To start:
```
cd client
npm start
```

## Resources

1. https://dev.to/pratham10/how-to-set-up-a-node-js-express-server-for-react-2fja
2. https://www.npmjs.com/package/dotenv
