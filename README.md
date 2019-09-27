[![CircleCI](https://circleci.com/gh/Domitnator/kenticocloud-nuxt-module.svg?style=svg&circle-token=ca67cac592202e6584670a87c3ace63abe9ef36a)](https://circleci.com/gh/Domitnator/kenticocloud-nuxt-module)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![NPM](https://nodei.co/npm/kenticocloud-nuxt-module.png?mini=true)](https://npmjs.org/package/kenticocloud-nuxt-module)

# kentico-kontent-nuxt-module
Add kentico kontent super power to your nuxt app

## Features

The module makes it easy to do delivery client api calls via the [Kentico kontent Delivery SDK](https://github.com/Kentico/kentico-kontent-js/tree/master/packages/delivery/README.md).

## Quick start
- Install via npm

```
npm i kentico-kontent-nuxt-module --save
npm i rxjs --save (because this is a peer dependency of the Kentico Kontent Delivery SDK)

```

- Add `kentico-kontent-nuxt-module` to `modules` section of `nuxt.config.js`

```js

  /*
  ** Nuxt.js modules
  */
  modules: [
    'kentico-kontent-nuxt-module'
  ],
  kenticokontent: {
    projectId: 'xxxx-xxx-xxxx-xxxx-xxxxx',
    enableAdvancedLogging: false,
    previewApiKey: 'xxxxxxxxxxxxxxxxxxxxxxxxxxx',
    enablePreviewMode: true,
    baseUrl: 'https://custom.uri/api/KenticoKontentProxy',
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
By default Nuxt can only work with promises. Therefor you always use the "toPromise" method provided by the Kentico Kontent Delivery SDK! RxJs operator's are not supported at the moment.

## Caching
API calls can be "cached" (they will be stored in memory) client side via the "viaCache" method.

```javascript
 const query =  this.$deliveryClient.items().type('page');
 const cacheSeconds = 30;
 this.$deliveryClient.viaCache(query, cacheSeconds)
        .then(response => console.log('DeliveryClient Response', response));

```

## Extending

If you need to customize the Kentico Kontent Delivery SDK by registering interceptors and changing global config, you have to create a nuxt plugin.

### nuxt.config.js
```
{
  modules: [
    'kentico-kontent-nuxt-module',
  ],

  plugins: [
    '~/plugins/kenticokontentNuxtModule'
  ]
}
```

### plugins/kenticokontentNuxtModule.js
```
export default function ({ store, $deliveryClient }) {
    $deliveryClient.config.globalHeaders = (queryConfig) => {
        let headers = [];
        headers.push({header: 'Authorization', value: 'bearer ' + store.state.token });
        return headers;
      }
  }
```