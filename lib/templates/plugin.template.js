import { DeliveryClient  } from 'kentico-cloud-delivery'

export default (ctx, inject) => {
  // Todo
  let typeResolvers = [];
  
  // Create new  delivery client Instance
  const deliveryClient = new DeliveryClient({
    enablePreviewMode: <%= options.enablePreviewMode %>,
    projectId: '<%= options.projectId %>',
    previewApiKey: '<%= options.previewApiKey %>',
    defaultLanguage: '<%= options.defaultLanguage %>',
    enableAdvancedLogging: <%= options.enableAdvancedLogging %>,
    baseUrl: '<%= options.baseUrl %>',
    typeResolvers: typeResolvers
  });
  
  // Inject the deliveryClient to the context as $deliveryClient
  ctx.$deliveryClient = deliveryClient
  inject('deliveryClient', deliveryClient)
}