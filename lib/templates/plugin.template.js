import { DeliveryClient } from '@kentico/kontent-delivery';
import CacheService from '../services/CacheService';

export default (ctx, inject) => {
  // Create new  delivery client Instance
  let settings = JSON.parse('KENTICOOPTIONS');

  // Add tracking header
  settings = Object.assign({}, settings, {
    globalQueryConfig: {
      customHeaders: [
        { header: 'X-KC-SOURCE', value: 'kentico-kontent-nuxt-module' }
      ]
    }
  });

  const deliveryClient = new DeliveryClient(settings);

  const cacheService = new CacheService([]);

  deliveryClient['viaCache'] = function(query, seconds, cacheKey) {
    return cacheService.viaCache(query, seconds, cacheKey, process.server);
  };

  // Inject the deliveryClient to the context as $deliveryClient
  ctx.$deliveryClient = deliveryClient;
  inject('deliveryClient', deliveryClient);
};
