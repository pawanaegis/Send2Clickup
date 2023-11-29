const config = {
    development: {
      clickupURL: process.env.REACT_APP_CLICKUP_URL_DEV,
      clickupSecret: process.env.REACT_APP_CLICKUP_SECRET_DEV,
      airtable_api: process.env.REACT_APP_AIRTABLE_API,
      appLogo: 'https://i.ibb.co/WxFms7W/send.png',
      airtable_base: process.env.REACT_APP_AIRTABLE_BASE,
      airtable_table: process.env.REACT_APP_AIRTABLE_TABLEID,

    },
    production: {
        clickupURL: process.env.REACT_APP_CLICKUP_URL_PROD,
        clickupSecret: process.env.REACT_APP_CLICKUP_SECRET_DEV,
        airtable_api: process.env.REACT_APP_AIRTABLE_API,
        appLogo: 'https://i.ibb.co/WxFms7W/send.png',
        airtable_base: process.env.REACT_APP_AIRTABLE_BASE,
        airtable_table: process.env.REACT_APP_AIRTABLE_TABLEID,
    },
  };
  console.log(process.env.NODE_ENV);
  export default process.env.NODE_ENV === 'production' ? config.production : config.development;
  