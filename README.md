# MERN Starter

## Setup

### Setup Express Server

1. `npm init -y`
2. `mkdir server`
3. `touch server/index.js`
4. `npm i express dotenv axios`
5. `touch .env`
6. Add `PORT=3001` to `.env` file.

To start:
`npm start` in root, or `npm run dev` to run with nodemon.

### Setup React Client

1. `npx create-react-app client`
2. `npm i react-router-dom`

To start:
```
cd client
npm start
```

3. Styling with Material UI
`npm install @mui/material @mui/icons-material @emotion/react @emotion/styled`

4. Add Dashboard template
`npm i recharts`
- https://mui.com/material-ui/getting-started/templates/
- https://github.com/mui/material-ui/tree/v5.11.10/docs/data/material/getting-started/templates/dashboard

## Resources

1. https://dev.to/pratham10/how-to-set-up-a-node-js-express-server-for-react-2fja
2. https://www.npmjs.com/package/dotenv
