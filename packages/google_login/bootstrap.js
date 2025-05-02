const { merge } = require('@evershop/evershop/src/lib/util/merge');
const { addProcessor } = require('@evershop/evershop/src/lib/util/registry');

module.exports = () => {
  addProcessor('configuratonSchema', (schema) => {
    if (!schema || typeof schema !== 'object') {
      console.error('Invalid schema provided to configuratonSchema processor.');
      return schema;
    }

    merge(
      schema,
      {
        properties: {
          google_login: {
            type: 'object',
            description: 'Configuration for Google Login integration',
            properties: {
              client_id: {
                type: 'string',
                description: 'Google OAuth client ID',
              },
              client_secret: {
                type: 'string',
                description: 'Google OAuth client secret',
              },
              success_redirect_url: {
                type: 'string',
                format: 'uri',
                description: 'URL to redirect to on successful login',
              },
              failure_redirect_url: {
                type: 'string',
                format: 'uri',
                description: 'URL to redirect to on failed login',
              },
            },
            required: ['client_id', 'client_secret', 'success_redirect_url'],
          },
        },
      },
      100
    );
    return schema;
  });
};
