import chai, { expect, should } from 'chai';
import CacheService from '../lib/services/CacheService';
import chaiAsPromised from 'chai-as-promised';
import 'babel-polyfill';

should();
chai.use(chaiAsPromised);

const query = {
    getPromise: () => {
        return new Promise(function (resolve, reject) {
            resolve('fake data');
        });
    },
    getUrl: () => {
        return '/fake/url/';
    }
};

const resolvingPromiseAfter2500Milliseconds = new Promise((resolve) => {
   setTimeout(() => {
    resolve('promise resolved');
   }, 2500);
});

describe('Test the behavior of the CacheService', function () {
    it('CacheService throws error if not supplied cache entries array', function () {
         expect(function() { new CacheService(); }).to.throw('The supplied settings are not an array of cache entries!');
    });
    it('CacheService is created when called with array', function () {
        let service = new CacheService([]);
        expect(service.cacheEntries).not.equal([]);
    });

    describe('Test the behavior of the viaCache method', function () {
        it('viaCache method return null when called with no parameters', () => {
        let service = new CacheService([]);
        return service.viaCache().then(s => {
            expect(s).to.equal(null);
            });
        });
        it('viaCache method returns response from \'getPromise\'', () => {
            let service = new CacheService([]);

            return service.viaCache(query, 10, 'key1', false).then(s => {
                expect(s).to.equal('fake data');
            });
        });
        it('viaCache method adds two cache entry', async () => {
            let service = new CacheService([]);

            await service.viaCache(query, 10, 'key1', false).then(s => {
                expect(s).to.equal('fake data');
            });

            await service.viaCache(query, null, null, false).then(s => {
                expect(s).to.equal('fake data');
            });

            expect(service.cacheEntries.length).to.equal(2);
            expect(service.cacheEntries[0].key).to.equal('key1');
            expect(service.cacheEntries[0].seconds).to.equal(10);

            expect(service.cacheEntries[1].key).to.equal('/fake/url/');
            expect(service.cacheEntries[1].seconds).to.equal(30);
        });
        it('viaCache return result from cache when cache seconds is not expired', async () => {
            let service = new CacheService([]);

            await service.viaCache(query, 10, 'key1', false).then(s => {
                expect(s).to.equal('fake data');
            });

            const cacheTimestamp1 = service.cacheEntries[0].timestamp;

            await service.viaCache(query, 10, 'key1', false).then(s => {
                expect(s).to.equal('fake data');
            });

            const cacheTimestamp2 = service.cacheEntries[0].timestamp;

            expect(service.cacheEntries.length).to.equal(1);
            expect(cacheTimestamp1).to.equal(cacheTimestamp2);
        });
        it('viaCache method updates cache entry when cache seconds is expired', async () => {
            let service = new CacheService([]);

            await service.viaCache(query, 2, 'key1', false).then(s => {
                expect(s).to.equal('fake data');
            });

            expect(service.cacheEntries.length).to.equal(1);
            const cacheTimestamp = service.cacheEntries[0].timestamp;

            await resolvingPromiseAfter2500Milliseconds;

            await service.viaCache(query, 2, 'key1', false);

            expect(service.cacheEntries[0].timestamp).to.not.equal(cacheTimestamp);
        }).timeout(5000);
    });
});
