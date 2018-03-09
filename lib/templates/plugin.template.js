// import Vue from 'vue'
import { ContentItem, Fields,TypeResolver,DeliveryClient,DeliveryClientConfig } from 'kentico-cloud-delivery-typescript-sdk'

export default function (ctx, inject) {
  //Todo
  let typeResolvers = [];
  console.log('ctx', ctx);

  // Create new  delivery client Instance
  const deliveryClient = new DeliveryClient(
    new DeliveryClientConfig('<%= options.project_id %>', typeResolvers)
  );
  
  // Inject the deliveryClient to the context as #deliveryClient
  ctx.$deliveryClient = deliveryClient
  inject('deliveryClient', deliveryClient)
}