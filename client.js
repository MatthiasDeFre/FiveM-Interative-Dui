
let duis = [];
let counter = 0;
let keepPrinting = false;
let showCursor = false;
let coordsTop;
let coordsBottom;
let mainDui;
let tickCounter = 0;
/* function CreateNamedRenderTargetForModel(name, model) {
	let handle = 0
	if(!IsNamedRendertargetRegistered(name))
		RegisterNamedRendertarget(name, 0)
	if(!IsNamedRendertargetLinked(model))
		LinkNamedRendertarget(model)
	if(IsNamedRendertargetRegistered(name))
		handle = GetNamedRendertargetRenderId(name)
	return handle
} */
//let tdx = CreateRuntimeTxd("test");
RegisterNuiCallbackType('pageLoaded') // register the type

// register a magic event name
on('__cfx_nui:pageLoaded', (data, cb) => {
  console.log("page loaded")
    console.log("page loaded", data.counter)
    cb();
});
RegisterCommand(
  "gothere",
  async (_source) => {
    const ped = PlayerPedId();
    SetEntityCoords(ped, 269.7664, -320.8406, 46.33287, true, false, false, false);
  }, false
);

RegisterCommand(
  "replace",
  async (_source, [ useWebpage = false ]) => {
 
   /*  for (let i = 1; i <= 135; i++) {
      const dictionaryName = `testobjecttxd0${i}`;
      const textureName = `testobjecttx0${i}`;
      const replacementDictionaryName = `${dictionaryName}_replaced`;
      const replacementTextureName = `${textureName}_replaced`;
      const tdx = CreateRuntimeTxd(replacementDictionaryName);
      CreateRuntimeTexture(tdx, replacementTextureName, 1024, 1024);
      
    }
    console.log("DUIS: ", duis.length) */
    const [x, y] = GetScreenResolution();
    const [xx, yy] = GetActiveScreenResolution();
    console.log(x, y)
    console.log(xx, yy)
     for (let i = 1; i <= 1; i++) {
      const dictionaryName = `testobjecttxd0${i}`;
      const textureName = `testobjecttx0${i}`;
  
      const dui = CreateDui(
        useWebpage ? 
        `nui://fivem-texture-bug-main/blank.html?${i}` :
        `https://via.placeholder.com/1024.png?text=0${i}`,
        1024, 1024);
      duis.push(dui);
        mainDui = dui
      while (!IsDuiAvailable(dui)) {
        await new Promise((res) => setTimeout(res, 100));
      }
  
      const replacementDictionaryName = `${dictionaryName}_replaced`;
      const replacementTextureName = `${textureName}_replaced`;

      const tdx = CreateRuntimeTxd(replacementDictionaryName);
      const tx = CreateRuntimeTextureFromDuiHandle(tdx, replacementTextureName, GetDuiHandle(dui));
      
     AddReplaceTexture(dictionaryName, textureName, replacementDictionaryName, replacementTextureName);
     }
  }, false
);
RegisterCommand(
  "printNuiMouse",
  async (_source) => {
      const [x, y] = GetNuiCursorPosition();
      console.log(x, y)
  }, false
);
RegisterCommand(
  "keepPrinting",
  async (_source) => {
    keepPrinting = true;
    while(keepPrinting) {
      await new Promise((res) => setTimeout(res, 1000));
      const x = GetControlNormal(0, 239)
      const y = GetControlNormal(0, 240)
      console.log(x, y)
    }
  }, false
);
RegisterCommand(
  "stopPrinting",
  async (_source) => {
    keepPrinting = false;
  }, false
);

RegisterCommand(
  "showCursor",
  async (_source) => {
    setTick(() => {
      if(showCursor) {
        SetMouseCursorActiveThisFrame()
      }
    });  
  }, false
);
RegisterCommand(
  "enableCursor",
  async (_source) => {
    showCursor = true;
  }, false
);

RegisterCommand(
  "disableCursor",
  async (_source) => {
    showCursor = false;
  }, false
);
RegisterCommand(
  "quaterinionTest",
  async (_source, [ whatSphere = false ]) => {
    const [minimum, maximum] = GetModelDimensions(3575239602);
    const center = [269.7664, -320.8406, 46.33287]
    
    let q = [0.98480707, 0, 0, -0.1736482]
    let qI = [0.98480707, 0, 0, 0.1736482]
    let g = [269.7664, -320.8406, 46.33287]
    let p = [0, center[0]+minimum[0], center[1]+minimum[1], center[2]+minimum[2]]

    coordsBottom = [
      center[0]+1/(q[0]**2+q[1]**2+q[2]**2+q[3]**2)*((q[0]**2+q[1]**2-q[2]**2-q[3]**2)*maximum[0]+2*(q[1]*q[2]-q[0]*q[3])*minimum[1]+2*(q[0]*q[2]+q[1]*q[3])*minimum[2]),
      center[1]+1/(q[0]**2+q[1]**2+q[2]**2+q[3]**2)*(2*(q[0]*q[3]+q[1]*q[2])*maximum[0]+(q[0]**2-q[1]**2+q[2]**2-q[3]**2)*minimum[1]+2*(q[2]*q[3]-q[0]*q[1])*minimum[2]),
      center[2]+1/(q[0]**2+q[1]**2+q[2]**2+q[3]**2)*(2*(q[1]*q[3]-q[0]*q[2])*maximum[0]+2*(q[0]*q[1]+q[2]*q[3])*minimum[1]+(q[0]**2-q[1]**2-q[2]**2+q[3]**2)*minimum[2])
    ]
  
    p = [0, center[0]+maximum[0], center[1]+maximum[1], center[2]+maximum[2]]
    coordsTop = [
      center[0]+1/(q[0]**2+q[1]**2+q[2]**2+q[3]**2)*((q[0]**2+q[1]**2-q[2]**2-q[3]**2)*minimum[0]+2*(q[1]*q[2]-q[0]*q[3])*maximum[1]+2*(q[0]*q[2]+q[1]*q[3])*maximum[2]),
      center[1]+1/(q[0]**2+q[1]**2+q[2]**2+q[3]**2)*(2*(q[0]*q[3]+q[1]*q[2])*minimum[0]+(q[0]**2-q[1]**2+q[2]**2-q[3]**2)*maximum[1]+2*(q[2]*q[3]-q[0]*q[1])*maximum[2]),
      center[2]+1/(q[0]**2+q[1]**2+q[2]**2+q[3]**2)*(2*(q[1]*q[3]-q[0]*q[2])*minimum[0]+2*(q[0]*q[1]+q[2]*q[3])*maximum[1]+(q[0]**2-q[1]**2-q[2]**2+q[3]**2)*maximum[2])
    ]
    
    /* setTick(() => {
      if(whatSphere) {
        DrawSphere(coords[0], coords[1], coords[2], 1.0, 0, 0, 255, 0.2)
      } else {
        DrawSphere(coords2[0], coords2[1], coords2[2], 1.0, 0, 0, 255, 0.2)
      }
     
      
    });  */
   /*  const [top, topX, topY] = GetScreenCoordFromWorldCoord(coords2[0], coords2[1], coords2[2])
    const [bottom, bottomX, bottomY] = GetScreenCoordFromWorldCoord(coords[0], coords[1], coords[2])
    const cursorX = GetControlNormal(0, 239)
    const cursorY = GetControlNormal(0, 240)
    console.log(topX, topY)
    console.log(bottomX, bottomY)
    console.log(cursorX, cursorY) */
    /*   let r = [0, center[0]+minimum[0], center[1]+maximum[1], center[2]+maximum[2]]

   console.log(r)

    let p = [0.9848077, 0, 0, 0.1736482]
    const rAccent = [p[0], -p[1], -p[2], -p[3]]
    r = [
      r[0]*p[0]-r[1]*p[1]-r[2]*p[2]-r[3]*p[3],
      r[0]*p[1]+r[1]*p[0]-r[2]*p[3]+r[3]*p[2],
      r[0]*p[2]+r[1]*p[3]+r[2]*p[0]-r[3]*p[1],
      r[0]*p[3]-r[1]*p[2]+r[2]*p[1]+r[3]*p[0]
    ]
    p = rAccent
    const resultPoint  = [
      r[0]*p[0]-r[1]*p[1]-r[2]*p[2]-r[3]*p[3],
      r[0]*p[1]+r[1]*p[0]-r[2]*p[3]+r[3]*p[2],
      r[0]*p[2]+r[1]*p[3]+r[2]*p[0]-r[3]*p[1],
      r[0]*p[3]-r[1]*p[2]+r[2]*p[1]+r[3]*p[0]
    ]
    console.log(resultPoint[0], resultPoint[1], resultPoint[2], resultPoint[3])
    setTick(() => {
      DrawSphere(resultPoint[1], resultPoint[2], resultPoint[3], 1.0, 0, 0, 255, 0.2)
    });  */
  }, false
);
RegisterCommand(
  "cursorTest",
  async (_source) => {
    setTick(() => {
      if(tickCounter % 5 == 0) {
        const [top, topX, topY] = GetScreenCoordFromWorldCoord(coordsTop[0], coordsTop[1], coordsTop[2])
        const [bottom, bottomX, bottomY] = GetScreenCoordFromWorldCoord(coordsBottom[0], coordsBottom[1], coordsBottom[2])
        const cursorX = GetControlNormal(0, 239)
        const cursorY = GetControlNormal(0, 240)
        const browserX = (cursorX-topX)/(bottomX-topX)*1024
        const browserY = (cursorY-topY)/(bottomY-topY)*1024
        console.log(browserX, browserY)
        const coords = {
          x: browserX,
          y: browserY
        }
        SendDuiMessage(mainDui, JSON.stringify(coords))
      }
      tickCounter++;
    
   /*    SendDuiMouseMove(mainDui, browserX, browserY)
      SendDuiMouseDown(mainDui, 'left') */
    });  
  }, false
);
//0, 0, 0.1736482, 0.9848077
RegisterCommand(
  "worldCoordXp",
  async (_source) => {
    const [minimum, maximum] = GetModelDimensions(3575239602);

    const [retval, screenX, screenY] = GetScreenCoordFromWorldCoord(269.7664, -320.8406, 46.33287)
    console.log(screenX, screenY)
    console.log(minimum, maximum)
    setTick(() => {
      DrawSphere(269.7664+minimum[0], -320.84064+maximum[1], 46.33287, 1.0, 0, 0, 255, 0.2)
    });  
  }, false
);
RegisterCommand(
  "worldCoordXm",
  async (_source) => {
    const [minimum, maximum] = GetModelDimensions(3575239602);

    const [retval, screenX, screenY] = GetScreenCoordFromWorldCoord(269.7664, -320.8406, 46.33287)
    console.log(screenX, screenY)
    console.log(minimum, maximum)
    setTick(() => {
      DrawSphere(269.7664+maximum[0], -320.84+maximum[1], 46.33287+minimum[2], 1.0, 0, 0, 255, 0.2)
    });
    
  }, false
);
RegisterCommand(
  "test",
  async (_source) => {
    const center = [269.7664, -320.8406, 46.33287];
    const [retval, screenX, screenY] = GetScreenCoordFromWorldCoord()
    const topRight = [center[0]+maximum[0], center[1], center[2]+minimum[2]]
    const topLeft = [center[0]+minimum[0], center[1], center[2]+maximum[2]]
  }, false
);

RegisterCommand(
  "drawSphere",
  async (_source) => {
    setTick(() => {
      DrawSphere(269.7664, -320.8406, 46.33287, 1.0, 0, 0, 255, 0.2)
    });

  }, false
);

RegisterCommand(
  "destroy",
  async (_source) => {
    for (let i = 0; i < 10; i++) {
      RemoveReplaceTexture(`testobjecttxd0${i}`, `testobjecttx0${i}`);
    }
    duis.forEach(DestroyDui);
    duis = [];
  }, false
);



