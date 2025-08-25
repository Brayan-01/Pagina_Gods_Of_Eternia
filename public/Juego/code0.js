gdjs.InicioCode = {};
gdjs.InicioCode.localVariables = [];
gdjs.InicioCode.GDFONDOObjects1= [];
gdjs.InicioCode.GDFONDOObjects2= [];
gdjs.InicioCode.GDJugarObjects1= [];
gdjs.InicioCode.GDJugarObjects2= [];
gdjs.InicioCode.GDcolisionObjects1= [];
gdjs.InicioCode.GDcolisionObjects2= [];
gdjs.InicioCode.GDPersonaje_9595PrincipalObjects1= [];
gdjs.InicioCode.GDPersonaje_9595PrincipalObjects2= [];
gdjs.InicioCode.GDDetalles_9595mapaObjects1= [];
gdjs.InicioCode.GDDetalles_9595mapaObjects2= [];
gdjs.InicioCode.GDCasasObjects1= [];
gdjs.InicioCode.GDCasasObjects2= [];
gdjs.InicioCode.GDEnemigo_95951Objects1= [];
gdjs.InicioCode.GDEnemigo_95951Objects2= [];
gdjs.InicioCode.GDCenterObjects1= [];
gdjs.InicioCode.GDCenterObjects2= [];
gdjs.InicioCode.GDSpawnpointObjects1= [];
gdjs.InicioCode.GDSpawnpointObjects2= [];
gdjs.InicioCode.GDTeletransporteObjects1= [];
gdjs.InicioCode.GDTeletransporteObjects2= [];
gdjs.InicioCode.GDCaja_9595Da_95241oObjects1= [];
gdjs.InicioCode.GDCaja_9595Da_95241oObjects2= [];
gdjs.InicioCode.GDGui_9595Da_95241oObjects1= [];
gdjs.InicioCode.GDGui_9595Da_95241oObjects2= [];


gdjs.InicioCode.mapOfGDgdjs_9546InicioCode_9546GDJugarObjects1Objects = Hashtable.newFrom({"Jugar": gdjs.InicioCode.GDJugarObjects1});
gdjs.InicioCode.eventsList0 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Jugar"), gdjs.InicioCode.GDJugarObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.cursorOnObject(gdjs.InicioCode.mapOfGDgdjs_9546InicioCode_9546GDJugarObjects1Objects, runtimeScene, true, false);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isMouseButtonPressed(runtimeScene, "Left");
}
if (isConditionTrue_0) {
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, "Intro", false);
}}

}


{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("FONDO"), gdjs.InicioCode.GDFONDOObjects1);
{gdjs.evtTools.camera.centerCamera(runtimeScene, (gdjs.InicioCode.GDFONDOObjects1.length !== 0 ? gdjs.InicioCode.GDFONDOObjects1[0] : null), true, "", 0);
}{gdjs.evtTools.camera.setCameraZoom(runtimeScene, 2.5, "", 2);
}}

}


{


let isConditionTrue_0 = false;
{
{gdjs.evtTools.camera.clampCamera(runtimeScene, 2, 333, 1275, 941, "", 0);
}}

}


};

gdjs.InicioCode.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.InicioCode.GDFONDOObjects1.length = 0;
gdjs.InicioCode.GDFONDOObjects2.length = 0;
gdjs.InicioCode.GDJugarObjects1.length = 0;
gdjs.InicioCode.GDJugarObjects2.length = 0;
gdjs.InicioCode.GDcolisionObjects1.length = 0;
gdjs.InicioCode.GDcolisionObjects2.length = 0;
gdjs.InicioCode.GDPersonaje_9595PrincipalObjects1.length = 0;
gdjs.InicioCode.GDPersonaje_9595PrincipalObjects2.length = 0;
gdjs.InicioCode.GDDetalles_9595mapaObjects1.length = 0;
gdjs.InicioCode.GDDetalles_9595mapaObjects2.length = 0;
gdjs.InicioCode.GDCasasObjects1.length = 0;
gdjs.InicioCode.GDCasasObjects2.length = 0;
gdjs.InicioCode.GDEnemigo_95951Objects1.length = 0;
gdjs.InicioCode.GDEnemigo_95951Objects2.length = 0;
gdjs.InicioCode.GDCenterObjects1.length = 0;
gdjs.InicioCode.GDCenterObjects2.length = 0;
gdjs.InicioCode.GDSpawnpointObjects1.length = 0;
gdjs.InicioCode.GDSpawnpointObjects2.length = 0;
gdjs.InicioCode.GDTeletransporteObjects1.length = 0;
gdjs.InicioCode.GDTeletransporteObjects2.length = 0;
gdjs.InicioCode.GDCaja_9595Da_95241oObjects1.length = 0;
gdjs.InicioCode.GDCaja_9595Da_95241oObjects2.length = 0;
gdjs.InicioCode.GDGui_9595Da_95241oObjects1.length = 0;
gdjs.InicioCode.GDGui_9595Da_95241oObjects2.length = 0;

gdjs.InicioCode.eventsList0(runtimeScene);
gdjs.InicioCode.GDFONDOObjects1.length = 0;
gdjs.InicioCode.GDFONDOObjects2.length = 0;
gdjs.InicioCode.GDJugarObjects1.length = 0;
gdjs.InicioCode.GDJugarObjects2.length = 0;
gdjs.InicioCode.GDcolisionObjects1.length = 0;
gdjs.InicioCode.GDcolisionObjects2.length = 0;
gdjs.InicioCode.GDPersonaje_9595PrincipalObjects1.length = 0;
gdjs.InicioCode.GDPersonaje_9595PrincipalObjects2.length = 0;
gdjs.InicioCode.GDDetalles_9595mapaObjects1.length = 0;
gdjs.InicioCode.GDDetalles_9595mapaObjects2.length = 0;
gdjs.InicioCode.GDCasasObjects1.length = 0;
gdjs.InicioCode.GDCasasObjects2.length = 0;
gdjs.InicioCode.GDEnemigo_95951Objects1.length = 0;
gdjs.InicioCode.GDEnemigo_95951Objects2.length = 0;
gdjs.InicioCode.GDCenterObjects1.length = 0;
gdjs.InicioCode.GDCenterObjects2.length = 0;
gdjs.InicioCode.GDSpawnpointObjects1.length = 0;
gdjs.InicioCode.GDSpawnpointObjects2.length = 0;
gdjs.InicioCode.GDTeletransporteObjects1.length = 0;
gdjs.InicioCode.GDTeletransporteObjects2.length = 0;
gdjs.InicioCode.GDCaja_9595Da_95241oObjects1.length = 0;
gdjs.InicioCode.GDCaja_9595Da_95241oObjects2.length = 0;
gdjs.InicioCode.GDGui_9595Da_95241oObjects1.length = 0;
gdjs.InicioCode.GDGui_9595Da_95241oObjects2.length = 0;


return;

}

gdjs['InicioCode'] = gdjs.InicioCode;
