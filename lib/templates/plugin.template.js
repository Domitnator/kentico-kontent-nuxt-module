import { DeliveryClient,DeliveryClientConfig } from 'kentico-cloud-delivery-typescript-sdk'

export default function (ctx, inject) {
  // Todo
  let typeResolvers = [];

  var config = new DeliveryClientConfig('<%= options.projectId %>', typeResolvers);
  config.enableAdvancedLogging = <%= options.enableAdvancedLogging %>;
  config.enablePreviewMode = <%= options.enablePreviewMode %>;
  config.defaultLanguage = '<%= options.defaultLanguage %>';
  config.previewApiKey = '<%= options.previewApiKey %>';
  config.baseUrl = '<%= options.baseUrl %>';
  // Create new  delivery client Instance
  var deliveryClient = new DeliveryClient(config);
  
  // Inject the deliveryClient to the context as $deliveryClient
  ctx.$deliveryClient = deliveryClient
  inject('deliveryClient', deliveryClient)
}