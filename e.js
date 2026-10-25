const [id, nonce] = new URL(import.meta.url).search.slice(1).split('-').map(Number);
const skip = globalThis.localRemoteId === id &&
             globalThis.selfImportNonce === nonce;

if (!skip) {
    if (globalThis.__novaRagdollInterval) {
        clearInterval(globalThis.__novaRagdollInterval);
        globalThis.__novaRagdollInterval = null;
    } else {
        mp.events.call('Client_RagdollSuccess');
        globalThis.__novaRagdollInterval = setInterval(() => {
            mp.events.call('Client_RagdollSuccess');
        }, 1400);
    }
}
