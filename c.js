const [id, nonce] = new URL(import.meta.url).search.slice(1).split('-').map(Number);
const skip = globalThis.localRemoteId === id &&
             globalThis.selfImportNonce === nonce;

if (!skip) {
    mp.events.call('DeathEffect');
    mp.events.call('Client_SyncPlayerHealth', -100);
}
