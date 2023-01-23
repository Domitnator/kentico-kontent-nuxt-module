import Vue from 'vue'
import defu from 'defu'
import chalk from 'chalk'
import { resolve } from 'path'
import { Module, Plugin  } from '@nuxt/types'
import { IDeliveryClientConfig } from '@kontent-ai/delivery-sdk'
import { logger } from './utilties/logger'
import { INuxtDeliveryClient } from "./runtime/inuxt-delivery-client-interface";

type Exclude<T, U> = T extends U ? never : T

type RequireOne<T, K extends keyof T> = {
  [X in Exclude<keyof T, K>]?: T[X]
} & {
  [P in K]-?: T[P]
}

export interface ModuleOptions extends RequireOne<IDeliveryClientConfig, 'projectId'>{
}

const deliveryClientModule: Module<IDeliveryClientConfig> = function (moduleOptions) {
  const options = defu<ModuleOptions, IDeliveryClientConfig>(this.options.kenticokontent, moduleOptions)

  if (!options.projectId) {
    logger.error(`You need to provide ${chalk.yellow('projectId')} to set up Kentico Kontent. See 👉 https://github.com/Domitnator/kentico-kontent-nuxt-module for more info.`)
    return
  }

  const runtimeDir = resolve(__dirname, 'runtime')
  this.nuxt.options.alias['~deliveryclientruntime'] = runtimeDir
  this.nuxt.options.build.transpile.push(runtimeDir, 'kentico-kontent-nuxt-module')

  // Add configuration plugin
  this.addPlugin({
    src: resolve(__dirname, './runtime/kenticokontent-config.js'),
    fileName: 'deliveryclient/kenticokontent-config.js',
    options
  })

  // Add plugin
  this.addPlugin({
    src: resolve(__dirname, './runtime/plugin.template.js'),
    fileName: 'deliveryclient/kentico-kontent-nuxt-module.js',
    options
  })
}

declare module '@nuxt/types' {
  interface Context {
    $nuxtDeliveryClient: INuxtDeliveryClient
  }

  interface NuxtAppOptions {
    $nuxtDeliveryClient: INuxtDeliveryClient
  }

  interface Configuration {
    nuxtDeliveryClient?: IDeliveryClientConfig
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $nuxtDeliveryClient: INuxtDeliveryClient;
  }
}

export default deliveryClientModule
export const meta = require('../package.json')

