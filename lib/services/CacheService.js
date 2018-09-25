export default class CacheService {
    constructor(cacheEntries) {
        if (!(cacheEntries instanceof Array)) {
            throw new Error('The supplied settings are not an array of cache entries!');
        };

        this.cacheEntries = cacheEntries;
    }
    viaCache(query, seconds, cacheKey, isServerProcess) {
        // Always perform a query when on the server
        if (this.cacheEntries && query && isServerProcess) {
            return query.getPromise();
        };

        if (!seconds) {
            seconds = 30;
        }

        // If on client, check if a cache entry it present
        if (query && !process.server) {
            let key = (cacheKey && cacheKey !== '') ? cacheKey : query.getUrl();
            let cacheEntry = getCacheEntry(this.cacheEntries, key);

            // return from cache
            if (cacheEntry && getDiffInSeconds(new Date(), cacheEntry.timestamp) < seconds) {
                return new Promise(function (resolve, reject) {
                    resolve(cacheEntry.object);
                });
            }
            else {
                return query.getPromise().then(response => {
                  if (cacheEntry) {
                    cacheEntry.timestamp = new Date();
                  }
                  else {
                    this.cacheEntries.push({ key: key, object: response, seconds: seconds, timestamp: new Date() });
                  }
                  return response;
                });
              }
        }

        return new Promise(function (resolve, reject) {
            resolve(null);
        });
    }
}

const getCacheEntry = (entries, key) => {
    if (entries) {
      return entries.find(s => s.key === key);
    }
    return null;
};

const getDiffInSeconds = (t1, t2) => {
    let dif = t1.getTime() - t2.getTime();
    let secondsFromT1ToT2 = dif / 1000;
    let secondsBetweenDates = Math.abs(secondsFromT1ToT2);
    return secondsBetweenDates;
};
