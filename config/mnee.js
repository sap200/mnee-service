import Mnee from '@mnee/ts-sdk';

const config = {
  environment: '<<ENVIRONMENT>>',
  apiKey: '<<MNEE_API_KEY>>'
};

const mnee = new Mnee(config);

mnee.config().then(mneeConfig => {
    console.log('MNEE Configuration:', mneeConfig);
});

export default mnee;
