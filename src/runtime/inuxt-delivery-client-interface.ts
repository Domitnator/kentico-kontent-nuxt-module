import { Contracts, IContentItem, IContentItemElements, IDeliveryClient, IDeliveryNetworkResponse, MultipleItemsQuery, Responses} from '@kentico/kontent-delivery'

export interface INuxtDeliveryClient extends IDeliveryClient {
    viaCache<TContentItem extends IContentItem>(query: MultipleItemsQuery<TContentItem>, seconds: number, cacheKey?: string, isServerProcess?: boolean): 
      Promise<IDeliveryNetworkResponse<Responses.IListContentItemsResponse<TContentItem>, Contracts.IListContentItemsContract>>;
  }