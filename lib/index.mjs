#!/usr/bin/env node

// @ts-check

import { createServer } from "http";
import { getRequestListener } from "./get-request-listener.mjs";
import inquirer from 'inquirer'
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const {
  APP_PORT = '3333',
  APP_IP = 'localhost'
} = process.env

async function bootstrap() {
  const params = await yargs(hideBin(process.argv))
    .scriptName('http-status')
    .usage('$0 [args]')
    .option('interactive', {
      describe: 'Modo interactivo',
      alias: 'i',
      type: 'boolean',
      default: true
    })
    .parse()

  let answers = {
    APP_PORT,
    APP_IP
  }
  if (params.interactive) {
    answers = await inquirer.prompt([
      {
        type: 'input',
        name: 'APP_PORT',
        message: 'Introduce el puerto',
        default: APP_PORT
      },
      {
        type: 'input',
        name: 'APP_IP',
        message: 'Introduce la IP del servidor',
        default: APP_IP
      }
    ])
  }

  const requestListener = getRequestListener(answers.APP_IP, answers.APP_PORT)
  const server = createServer(requestListener)
  server.listen(APP_PORT, () => {
    console.log(`\nServidor en http://${answers.APP_IP}:${answers.APP_PORT}`)
  })
}

bootstrap().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
