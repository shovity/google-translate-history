chrome.storage.local.get('trans').then(({ trans = [] }) => {
    window.container.innerHTML = trans.reverse().map((tran) => {
        return `
        <div>
            <div>${tran.origin}</div>
            <div>${tran.translate}</div>
        </div>
        `        
    }).join('')
})