import { Contracts, IContentItem, IContentItemElements, IDeliveryClient, IDeliveryNetworkResponse, MultipleItemsQuery, Responses } from "@kontent-ai/delivery-sdk"

export class CacheService {
    cacheEntries: any[]
    deliveryClient: IDeliveryClient;
    constructor (client: IDeliveryClient) {
      this.cacheEntries = [];
      this.deliveryClient = client;
    }
    viaCache<TContentItem extends IContentItem<IContentItemElements>>(query: MultipleItemsQuery<TContentItem>, seconds: number, cacheKey?: string, isServerProcess?: boolean): Promise<IDeliveryNetworkResponse<Responses.IListContentItemsResponse<TContentItem>, Contracts.IListContentItemsContract>> {

       // Always perform a query when on the server
       if (this.cacheEntries && query && isServerProcess) {
        return query.toPromise();
      };

      if (!seconds) {
        seconds = 30
      }

      // If on client, check if a cache entry it present
      if (query && !process.server) {
        const key = (cacheKey && cacheKey !== '') ? cacheKey : query.getUrl()
        const cacheEntry = getCacheEntry(this.cacheEntries, key)

        // return from cache
        if (cacheEntry && getDiffInSeconds(new Date(), cacheEntry.timestamp) < seconds) {
          return new Promise<IDeliveryNetworkResponse<Responses.IListContentItemsResponse<TContentItem>, Contracts.IListContentItemsContract>>((resolve, reject) => {
              console.log('viaCache: response taken from cache');
              resolve(cacheEntry.object);
          });
        } else {
          return query.toPromise().then(response => {
            console.log('viaCache: response taken from server');

            if (cacheEntry) {
              cacheEntry.timestamp = new Date()
            } else {
              this.cacheEntries.push({ key: key, object: response, seconds: seconds, timestamp: new Date() })
            }
            return response
          })
        }
      }

      return new Promise<IDeliveryNetworkResponse<Responses.IListContentItemsResponse<TContentItem>, Contracts.IListContentItemsContract>>((resolve, reject) => {
        resolve(null);
      });

    }
}

function getCacheEntry(cacheEntries: any[], key: string) {
  if (cacheEntries) {
    return cacheEntries.find(s => s.key === key)
  }
  return null
}
function getDiffInSeconds(t1: Date, t2: any) {
  const dif = t1.getTime() - t2.getTime()
  const secondsFromT1ToT2 = dif / 1000
  const secondsBetweenDates = Math.abs(secondsFromT1ToT2)
  return secondsBetweenDates
}

