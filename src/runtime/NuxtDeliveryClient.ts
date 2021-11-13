import { ItemResponses, DeliveryClient, IMappingService, LanguagesQuery, MultipleTypeQuery, SingleTypeQuery, ContentItem, MultipleItemQuery, ItemsFeedQuery, ItemsFeedQueryAll, SingleItemQuery, TaxonomiesQuery, TaxonomyQuery, ElementQuery, IDeliveryClientConfig, IDeliveryClient } from "@kentico/kontent-delivery";
import { CacheService } from "./cacheService";
import { INuxtDeliveryClient } from "./INuxtDeliveryClient";

export class NuxtDeliveryClient implements INuxtDeliveryClient{
    mappingService: IMappingService;
    deliveryClient: IDeliveryClient;
    cacheService: CacheService;
    constructor(config: IDeliveryClientConfig){
        this.deliveryClient = new DeliveryClient(config);
        this.cacheService = new CacheService(this.deliveryClient);
    }
    viaCache<TItem extends ContentItem>(query: MultipleItemQuery<TItem>, seconds: number, cacheKey?: string, isServerProcess?: boolean): Promise<ItemResponses.ListContentItemsResponse<TItem>> {
        return this.cacheService.viaCache(query, seconds, cacheKey, isServerProcess);
    }
    languages(): LanguagesQuery {
       return this.deliveryClient.languages();
    }
    types(): MultipleTypeQuery {
        return this.deliveryClient.types();
    }
    type(typeCodename: string): SingleTypeQuery {
        return this.type(typeCodename);
    }
    items<TItem extends ContentItem>(): MultipleItemQuery<TItem> {
        return this.deliveryClient.items<TItem>();
    }
    itemsFeed<TItem extends ContentItem>(): ItemsFeedQuery<TItem> {
        return this.deliveryClient.itemsFeed<TItem>();
    }
    itemsFeedAll<TItem extends ContentItem>(): ItemsFeedQueryAll<TItem> {
        return this.deliveryClient.itemsFeedAll<TItem>();
    }
    item<TItem extends ContentItem>(codename: string): SingleItemQuery<TItem> {
        return this.deliveryClient.item<TItem>(codename);
    }
    taxonomies(): TaxonomiesQuery {
        return this.deliveryClient.taxonomies();
    }
    taxonomy(codename: string): TaxonomyQuery {
        return this.deliveryClient.taxonomy(codename);
    }
    element(typeCodename: string, elementCodename: string): ElementQuery {
        return this.deliveryClient.element(typeCodename, elementCodename);
    }
}