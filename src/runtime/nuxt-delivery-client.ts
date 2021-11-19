import { Contracts, DeliveryClient, ElementQuery, IContentItem, IContentItemElements, IDeliveryClient, IDeliveryClientConfig, IDeliveryNetworkResponse, IMappingService, ItemsFeedQuery, LanguagesQuery, MultipleItemsQuery, MultipleTypeQuery, Responses, SingleItemQuery, SingleTypeQuery, TaxonomiesQuery, TaxonomyQuery } from "@kentico/kontent-delivery";
import { CacheService } from "./cache-service";
import { INuxtDeliveryClient } from "./inuxt-delivery-client-interface";

export class NuxtDeliveryClient implements INuxtDeliveryClient{
    deliveryClient: IDeliveryClient;
    cacheService: CacheService;
    constructor(config: IDeliveryClientConfig){
        this.deliveryClient = new DeliveryClient(config);
        this.cacheService = new CacheService(this.deliveryClient);
    }
    viaCache<TContentItem extends IContentItem<IContentItemElements>>(query: MultipleItemsQuery<TContentItem>, seconds: number, cacheKey?: string, isServerProcess?: boolean): Promise<IDeliveryNetworkResponse<Responses.IListContentItemsResponse<TContentItem>, Contracts.IListContentItemsContract>> {
        return this.cacheService.viaCache(query, seconds, cacheKey, isServerProcess);
    }
    mappingService: IMappingService;
    languages(): LanguagesQuery {
        return this.deliveryClient.languages();
    }
    types(): MultipleTypeQuery {
        return this.deliveryClient.types();
    }
    type(typeCodename: string): SingleTypeQuery {
        return this.deliveryClient.type(typeCodename);
    }
    items<TContentItem extends IContentItem<IContentItemElements> = IContentItem<IContentItemElements>>(): MultipleItemsQuery<TContentItem> {
        return this.deliveryClient.items<TContentItem>();
    }
    itemsFeed<TContentItem extends IContentItem<IContentItemElements> = IContentItem<IContentItemElements>>(): ItemsFeedQuery<TContentItem> {
        return this.deliveryClient.itemsFeed<TContentItem>();
    }
    item<TContentItem extends IContentItem<IContentItemElements> = IContentItem<IContentItemElements>>(codename: string): SingleItemQuery<TContentItem> {
        return this.deliveryClient.item<TContentItem>(codename);
    }
    taxonomies(): TaxonomiesQuery {
        return this.deliveryClient.taxonomies();
    }
    taxonomy(codename: string): TaxonomyQuery {
        return this.taxonomy(codename);
    }
    element(typeCodename: string, elementCodename: string): ElementQuery {
        return this.element(typeCodename, elementCodename);
    }
    
}