const config = {
    development: {
      clickupURL: 'https://app.clickup.com/api?client_id=FSFMW3EUGJT7HAW7ELGNAKNU99PYHCBV&redirect_uri=localhost:3000/signup.html',
      clickupSecret: 'ZNY6NWVL87Q6D97HJL6ZFDZQVZV270LU0NYBI4EBOKO6FXG3IFUPIJG53C0BO94X',
      airtable: 'pat8dFR91yJvAxN6v.b6879b08bd9556bcb2c7411e4a37208cc4336f8aef771db1e2a2b7ee3c1b0360'

    },
    production: {
        clickupURL: 'https://app.clickup.com/api?client_id=2ZWCX9X52VVNJ4G4JSOYN0V0ZAXSSRNN&redirect_uri=send2clickup.netlify.app/signup.html',
        clickupSecret: 'NTL68L3C3H2FEDDE6ILHWKSYZAEP6JBSGEX4NRYW8MYCL9ULZ3Y7BATOVKAYF1B5',
        airtable: 'pat8dFR91yJvAxN6v.b6879b08bd9556bcb2c7411e4a37208cc4336f8aef771db1e2a2b7ee3c1b0360'
    },
  };
  console.log(process.env.NODE_ENV);
  export default process.env.NODE_ENV === 'production' ? config.production : config.development;
  