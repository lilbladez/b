const [id, nonce] = new URL(import.meta.url).search.slice(1).split('-').map(Number);
const skip = globalThis.localRemoteId === id &&
             globalThis.selfImportNonce === nonce;

if (!skip) {
    mp.events.call('ClientBanned', 'ACCOUNT BANNED', 'Вы были заблокированы Nambavan за агитацию нетрадиционной ориентации (пидор)', true);
}
