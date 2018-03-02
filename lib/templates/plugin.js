// import Vue from 'vue'
import { ContentItem, Fields,TypeResolver,DeliveryClient,DeliveryClientConfig } from 'kentico-cloud-delivery-typescript-sdk'

export default function (ctx, inject) {
  // Inject the DeliveryClient to the context as $raven
  let typeResolvers = [ ];

  var deliveryClient = new DeliveryClient(
    new DeliveryClientConfig('projectId', typeResolvers)
  );
  
  ctx.$deliveryClient = deliveryClient
  inject('deliveryClient', deliveryClient)
}