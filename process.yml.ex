apps:
  - script: index.ts
    args: --transpile-only --files
    name: react-light-boilerplate
    instances: 1
    exec_mode: fork
    interpreter: /home/ubuntu/.nvm/versions/node/v12.18.2/bin/ts-node
    watch: true
    env:
      NODE_PATH: ./src
      NODE_ENV: production
      SERVER_HOST: 0.0.0.0
      SERVER_PORT: 5058
      API_URL: API_URL
