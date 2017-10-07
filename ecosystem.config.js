module.exports = {
    /**
     * Application configuration section
     * http://pm2.keymetrics.io/docs/usage/application-declaration/
     */
    apps: [
        // First application
        {
            name: 'PickAPlace',
            script: 'app.js',
            env: {
                NODE_ENV: 'production'
            }
        }

    ]
};