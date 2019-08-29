[![CircleCI](https://circleci.com/gh/Domitnator/kenticocloud-nuxt-module.svg?style=svg&circle-token=ca67cac592202e6584670a87c3ace63abe9ef36a)](https://circleci.com/gh/Domitnator/kenticocloud-nuxt-module)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![NPM](https://nodei.co/npm/kenticocloud-nuxt-module.png?mini=true)](https://npmjs.org/package/kenticocloud-nuxt-module)

# kenticocloud-nuxt-module
Add kentico cloud super power to your nuxt app

### ** Update: Beta 6
Want to use the new Kentico Cloud Delivery Beta 6 already? Then switch to this branche: https://github.com/Domitnator/kenticocloud-nuxt-module/tree/UpgradeToBeta6 (which is also available at NPM: https://www.npmjs.com/package/kenticocloud-nuxt-module/v/2.1.0)

## Features

The module makes it easy to do delivery client api calls via the [Kentico Cloud Delivery SDK](https://github.com/Enngage/kentico-cloud-js/blob/master/packages/delivery/README.md).

## Quick start
- Install via npm

```
npm i kenticocloud-nuxt-module --save
npm i rxjs --save (because this is a peer dependency of the Kentico Cloud Delivery SDK)

```

- Add `kenticocloud-nuxt-module` to `modules` section of `nuxt.config.js`

```js

  /*
  ** Nuxt.js modules
  */
  modules: [
    'kenticocloud-nuxt-module'
  ],
  kenticocloud: {
    projectId: 'xxxx-xxx-xxxx-xxxx-xxxxx',
    enableAdvancedLogging: false,
    previewApiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
    enablePreviewMode: true,
    baseUrl: 'https://custom.uri/api/KenticoCloudProxy',
    securedApiKey: 'xxx',
    enableSecuredMode: true
  },
```
- $deliveryClient is now globally available.

```javascript

 this.$deliveryClient.items()
    .type('page')
    .toPromise()
    .then(response => console.log('DeliveryClient Response', response));

```
## Note:
By default Nuxt can only work with promises. Therefor you always use the "toPromise" method provided by the Kentico Cloud Delivery SDK! RxJs operator's are not supported at the moment.

## Caching
API calls can be "cached" (they will be stored in memory) client side via the "viaCache" method.

```javascript
 const query =  this.$deliveryClient.items().type('page');
 const cacheSeconds = 30;
 this.$deliveryClient.viaCache(query, cacheSeconds)
        .then(response => console.log('DeliveryClient Response', response));

```

## Extending

If you need to customize the Kentico Cloud Delivery SDK by registering interceptors and changing global config, you have to create a nuxt plugin.

### nuxt.config.js
```
{
  modules: [
    'kenticocloud-nuxt-module',
  ],

  plugins: [
    '~/plugins/kenticocloudNuxtModule'
  ]
}
```

### plugins/kenticocloudNuxtModule.js
```
export default function ({ store, $deliveryClient }) {
    $deliveryClient.config.globalHeaders = (queryConfig) => {
        let headers = [];
        headers.push({header: 'Authorization', value: 'bearer ' + store.state.token });
        return headers;
      }
  }
```