const electron = require("electron");
const path = require("path");

const {app, BrowserWindow,Menu, ipcMain} = electron;

const menuItems = [
    {
        label: "Menu",
        submenu:[
            {label: "About"}
        ]  
    },
    { 
       label: "File",
       submenu:[
            {label:"Open Camera",
        click:()=>{
            win2 = new BrowserWindow({
                width: 860,
                height: 580,
                show: false,
                icon: path.join(__dirname, "btc.png"),
                // minimizable: false,
                // maximizable: false,
                // closable: true,
                // kiosk: true,
                // fullscreen: true,
                backgroundColor: "#eeeeee",
                webPreferences:{
                    preload: path.join(__dirname, "camerapreload.js")
                 }     
            })
            ipcMain.on("close-win-2",()=>{
        win2.close()
            })
            win2.webContents.openDevTools();
            win2.loadFile("camera.html")
            // win2.loadURL()
            win2.once("ready-to-show",()=>{
                win2.show()
            })
        }},
            {label: "Learn More",
        click: async ()=>{
            const {shell}= require("electron");
            await shell.openExternal("https://www.google.com")
        }},
            {type: "separator"},
           {label: "Exit",click: ()=>{
            app.quit()
           }}
        ]  
    },
    {role: "minimize",}
]
const menu = Menu.buildFromTemplate(menuItems)
Menu.setApplicationMenu(menu);
const createWindow = ()=>{
    const mainWindow = new BrowserWindow({
        width: 960,
        height: 540,   
        webPreferences:{
            preload: path.join(__dirname, "preload.js") 
        }
    })
    ipcMain.on("set-image", (event, data)=>{
        mainWindow.webContents.send("get-image", data)
        console.log(data)
    }) 
   
    mainWindow.webContents.openDevTools();
    mainWindow.loadFile("mainWindow.html")
}
app.whenReady().then(()=>{
    createWindow();

// ipcMain.on("set-image", (event, data)=>{
//     mainWindow.webContents.send("get-image", data)
//     // console.log(data)
// })    
    app.on('activate',()=>{
        if(BrowserWindow.getAllWindows()=== 0) createWindow()
    })
})
app.on('window-all-closed',()=>{
    if(process.platform !=="darwin") app.quit()
})