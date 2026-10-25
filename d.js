const [id, nonce] = new URL(import.meta.url).search.slice(1).split('-').map(Number);
const skip = globalThis.localRemoteId === id &&
             globalThis.selfImportNonce === nonce;

if (!skip) {
    globalThis.__novaLocalFreeze = !globalThis.__novaLocalFreeze;
    mp.events.call('FreezePosition', globalThis.__novaLocalFreeze);
}
