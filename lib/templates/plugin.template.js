import { DeliveryClient } from 'kentico-cloud-delivery';
import CacheService from '../services/CacheService';

export default (ctx, inject) => {
  // Create new  delivery client Instance
  const deliveryClient = new DeliveryClient(JSON.parse('KENTICOOPTIONS'));

  const cacheService = new CacheService([]);

  deliveryClient['viaCache'] = function(query, seconds, cacheKey) {
    return cacheService.viaCache(query, seconds, cacheKey, process.server);
  };

  // Inject the deliveryClient to the context as $deliveryClient
  ctx.$deliveryClient = deliveryClient;
  inject('deliveryClient', deliveryClient);
};
