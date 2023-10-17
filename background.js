const GG_TRANSLATE_API = 'https://translate.googleapis.com/translate_a/single'

chrome.webRequest.onResponseStarted.addListener(
    (details) => {
        if (!details.url.startsWith(GG_TRANSLATE_API)) {
            return
        }

        if (details.url.endsWith('#_stop')) {
            return
        }

        fetch(details.url + '#_stop').then((res) => res.json()).then((body) => {
            if (!body.sentences?.length) {
                return
            }

            chrome.storage.local.get('trans').then(({ trans = [] }) => {
                trans = trans.filter((t) => t.origin !== body.sentences[0].orig)

                trans.push({
                    origin: body.sentences[0].orig,
                    translate: body.sentences[0].trans,
                    created: Date.now(),
                })

                trans = trans.slice(-200)

                chrome.storage.local.set({ trans })              
            })
        })
    },

    { urls: ["<all_urls>"] }
)
