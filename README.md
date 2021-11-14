[![CircleCI](https://circleci.com/gh/Domitnator/kentico-kontent-nuxt-module.svg?style=svg&circle-token=ca67cac592202e6584670a87c3ace63abe9ef36a)](https://circleci.com/gh/Domitnator/kentico-kontent-nuxt-module)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![NPM](https://nodei.co/npm/kentico-kontent-nuxt-module.png?mini=true)](https://npmjs.org/package/kentico-kontent-nuxt-module)

# kentico-kontent-nuxt-module
Add Kentico Kontent super power to your nuxt app

## Features

The module makes it easy to do delivery client api calls via the [Kentico kontent Delivery JS SDK](https://github.com/Kentico/kontent-delivery-sdk-js/blob/master/readme.md).

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
    globalQueryConfig: {
			usePreviewMode: true, // Queries the Delivery Preview API.
      useSecureMode: false,
		},
    baseUrl: 'https://custom.uri/api/KenticoKontentProxy',
    secureApiKey: 'xxx',
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
### Note:
By default Nuxt can only work with promises. Therefor you always use the "toPromise" method provided by the Kentico Kontent Delivery SDK! RxJs operator's are not supported at the moment.

# Typescript

Since version 7 the kentico-kontent-nuxt-module has typescript support! 

Add the types to your "types" array in tsconfig.json after the @nuxt/types (Nuxt 2.9.0+) or @nuxt/vue-app entry

```json

 {
  "compilerOptions": {
    "types": [
      "@nuxt/types",
      "kentico-kontent-nuxt-module"
    ]
  }
}

```

## Generating
When using a static generated deployment you may need to use the [items-feed](https://docs.kontent.ai/reference/api-changelog#a-delivery-api-limitation) endpoint when generating your site (because the items endpoint has a rate limitation).

```javascript

 this.$deliveryClient.itemsFeedAll()
    .toPromise()
    .then(response => console.log('DeliveryClient Response', response));

```

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

### Type Resolvers

Type resolvers can also be registered by using a nuxt plugin:

### plugins/kenticokontentNuxtModule.js
```
import { TypeResolver, ContentItem } from '@kentico/kontent-delivery';

class Page extends ContentItem {
    constructor() {
        super({
            richTextResolver: (item, context) => {
                // todo: implement
            },
            urlSlugResolver: (link, context) => {
                // todo: implement
            }
        });
    }
}

export default function ({ store, app, $deliveryClient }) {
    $deliveryClient.config.typeResolvers = [
        new TypeResolver('page', () => new Page())
    ]
}
```