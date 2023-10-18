chrome.storage.local.get('trans').then(({ trans = [] }) => {
    window.container.innerHTML = trans.reverse().map((tran) => {
        return `
        <div>
            <div>${tran.origin}</div>
            <div>${tran.translate}</div>
            <div class="remove">&times;</div>
        </div>
        `        
    }).join('')

    window.container.addEventListener('click', ({ target }) => {
        if (target.className !== 'remove') {
            return
        }

        const row = target.parentElement
        const origin = row.querySelector('div').innerHTML

        row.parentElement.removeChild(row)

        chrome.storage.local.get('trans').then(({ trans = [] }) => {
            trans = trans.filter((t) => t.origin !== origin)
            chrome.storage.local.set({ trans })              
        })
    })
})