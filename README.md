[![CircleCI](https://circleci.com/gh/Domitnator/kenticocloud-nuxt-module.svg?style=svg&circle-token=ca67cac592202e6584670a87c3ace63abe9ef36a)](https://circleci.com/gh/Domitnator/kenticocloud-nuxt-module)

# kenticocloud-nuxt-module
Add kentico cloud super power to your nuxt app

## Features

The module makes it easy to do delivery client api calls via the [Kentico Cloud Delivery JavaScript / TypeScript SDK](https://github.com/Enngage/KenticoCloudDeliveryTypeScriptSDK/blob/master/README.md).

## Quick start
- Install via npm

```
npm i kenticocloud-nuxt-module --save
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
    project_id: 'xxxx-xxx-xxxx-xxxx-xxxxx'
  },
```
- $deliveryClient is now globally available.

```javascript

 this.$deliveryClient.items()
    .type('page')
    .get()
    .subscribe(response => console.log('DeliveryClient Response', response));

```
