const config = {
    development: {
      clickupURL: process.env.REACT_APP_CLICKUP_URL_DEV,
      clickupSecret: process.env.REACT_APP_CLICKUP_SECRET_DEV,
      airtable: process.env.REACT_APP_AIRTABLE,

    },
    production: {
        clickupURL: process.env.REACT_APP_CLICKUP_URL_PROD,
        clickupSecret: process.env.REACT_APP_CLICKUP_SECRET_DEV,
        airtable: process.env.REACT_APP_AIRTABLE
    },
  };
  console.log(process.env.NODE_ENV);
  export default process.env.NODE_ENV === 'production' ? config.production : config.development;
  