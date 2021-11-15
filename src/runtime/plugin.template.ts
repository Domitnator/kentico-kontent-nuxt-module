import { Plugin } from '@nuxt/types'
import { NuxtDeliveryClient } from '~deliveryclientruntime/NuxtDeliveryClient'

// Default configuration
let config = {
  kenticokontent: {
    projectId: ''
  }
}

try {
  // tslint:disable-next-line: no-var-requires
  config = require('./kenticokontent-config.js')
  // @ts-ignore
  config = config.default || config
  // tslint:disable-next-line: no-empty
} catch (error) {}

declare module 'vue/types/vue' {
  interface Vue {
    $deliveryclient: NuxtDeliveryClient
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $deliveryclient: NuxtDeliveryClient
  }
  interface Context {
    $deliveryclient: NuxtDeliveryClient
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $deliveryclient: NuxtDeliveryClient
  }
}

const deliveryClientPlugin: Plugin = (context, inject) => {
  const deliveryClient = new NuxtDeliveryClient(config.kenticokontent);
  
  inject('deliveryclient', deliveryClient)
}

export default deliveryClientPlugin