const config = {
    development: {
      clickupURL: process.env.REACT_APP_CLICKUP_URL_DEV,
      clickupClientId: process.env.REACT_APP_CLICKUP_CLIENTID_DEV,
      clickupSecret: process.env.REACT_APP_CLICKUP_SECRET_DEV,
      airtable_api: process.env.REACT_APP_AIRTABLE_API,
      appLogo: 'https://i.ibb.co/WxFms7W/send.png',
      airtable_base: process.env.REACT_APP_AIRTABLE_BASE,
      airtable_table: process.env.REACT_APP_AIRTABLE_TABLEID,
      airtable_table_2 : process.env.REACT_APP_AIRTABLE_TABLEID_2,

    },
    production: {
        clickupURL: process.env.REACT_APP_CLICKUP_URL_PROD,
        clickupClientId: process.env.REACT_APP_CLICKUP_CLIENTID_PROD,
        clickupSecret: process.env.REACT_APP_CLICKUP_SECRET_PROD,
        airtable_api: process.env.REACT_APP_AIRTABLE_API,
        appLogo: 'https://i.ibb.co/WxFms7W/send.png',
        airtable_base: process.env.REACT_APP_AIRTABLE_BASE,
        airtable_table: process.env.REACT_APP_AIRTABLE_TABLEID,
        airtable_table_2 : process.env.REACT_APP_AIRTABLE_TABLEID_2,

    },
  };
  console.log(process.env.NODE_ENV);
  export default process.env.NODE_ENV === 'production' ? config.production : config.development;
  