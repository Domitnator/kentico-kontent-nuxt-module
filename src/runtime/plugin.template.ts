import { DeliveryClient, IContentItem, MultipleItemsQuery } from '@kentico/kontent-delivery';
import { Plugin } from '@nuxt/types'
import { INuxtDeliveryClient } from "~deliveryclientruntime/inuxt-delivery-client-interface";
import { CacheService } from "~deliveryclientruntime/cache-service"

// Default configuration
let config = {
  kenticokontent: {
    projectId: '',
    globalQueryConfig: {}
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
    $nuxtDeliveryClient: INuxtDeliveryClient
  }
}

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $nuxtDeliveryClient: INuxtDeliveryClient
  }
  interface Context {
    $nuxtDeliveryClient: INuxtDeliveryClient
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $nuxtDeliveryClient: INuxtDeliveryClient
  }
}

const deliveryClientPlugin: Plugin = (context, inject) => {
 var kcSourceHeader = { header: 'X-KC-SOURCE', value: 'kentico-kontent-nuxt-module' };
  
  if(config.kenticokontent.globalQueryConfig){
    config.kenticokontent.globalQueryConfig = Object.assign({}, config.kenticokontent.globalQueryConfig, {
        customHeaders: [
          kcSourceHeader
        ]
    });
  }
  else{
    config.kenticokontent = Object.assign({}, config.kenticokontent, {
      globalQueryConfig: {
        customHeaders: [
          kcSourceHeader
        ]
      }
    });
  }

  const deliveryClient = new DeliveryClient(config.kenticokontent);
  const cacheService = new CacheService(deliveryClient);

  const nuxtDeliveryClient = deliveryClient as any as INuxtDeliveryClient;
  nuxtDeliveryClient.viaCache = <TContentItem extends IContentItem>(query: MultipleItemsQuery<TContentItem>, seconds: number, cacheKey?: string, isServerProcess?: boolean) => cacheService.viaCache(query, seconds, cacheKey, isServerProcess);

  inject('nuxtDeliveryClient', nuxtDeliveryClient)
}

export default deliveryClientPlugin