window.addEventListener('DOMContentLoaded',()=>{
    const replaceText = (selector,text)=>{
        const element = document.getElementById(selector)
        if(element) element.innerHTML = text
    }
    for (const dependency of ['chrome','node','electron']){
        replaceText(`${dependency}-version`,process.versions[dependency])
    }
});
const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
    getImage: (callback) => ipcRenderer.on('get-image', callback),
    closeWin2: () => ipcRenderer.send('close-win-2')
})