import { ItemResponses, ContentItem, IDeliveryClient, MultipleItemQuery} from '@kentico/kontent-delivery'

export interface INuxtDeliveryClient extends IDeliveryClient {
    viaCache<TItem extends ContentItem>(query: MultipleItemQuery<TItem>, seconds: number, cacheKey?: string, isServerProcess?: boolean): Promise<ItemResponses.ListContentItemsResponse<TItem>>;
  }