gdjs.Nivel_322Code = {};
gdjs.Nivel_322Code.localVariables = [];
gdjs.Nivel_322Code.forEachIndex3 = 0;

gdjs.Nivel_322Code.forEachIndex4 = 0;

gdjs.Nivel_322Code.forEachObjects3 = [];

gdjs.Nivel_322Code.forEachObjects4 = [];

gdjs.Nivel_322Code.forEachTemporary3 = null;

gdjs.Nivel_322Code.forEachTemporary4 = null;

gdjs.Nivel_322Code.forEachTotalCount3 = 0;

gdjs.Nivel_322Code.forEachTotalCount4 = 0;

gdjs.Nivel_322Code.GDMapaObjects1= [];
gdjs.Nivel_322Code.GDMapaObjects2= [];
gdjs.Nivel_322Code.GDMapaObjects3= [];
gdjs.Nivel_322Code.GDMapaObjects4= [];
gdjs.Nivel_322Code.GDcolisionObjects1= [];
gdjs.Nivel_322Code.GDcolisionObjects2= [];
gdjs.Nivel_322Code.GDcolisionObjects3= [];
gdjs.Nivel_322Code.GDcolisionObjects4= [];
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1= [];
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2= [];
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3= [];
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects4= [];
gdjs.Nivel_322Code.GDDetalles_9595mapaObjects1= [];
gdjs.Nivel_322Code.GDDetalles_9595mapaObjects2= [];
gdjs.Nivel_322Code.GDDetalles_9595mapaObjects3= [];
gdjs.Nivel_322Code.GDDetalles_9595mapaObjects4= [];
gdjs.Nivel_322Code.GDCasasObjects1= [];
gdjs.Nivel_322Code.GDCasasObjects2= [];
gdjs.Nivel_322Code.GDCasasObjects3= [];
gdjs.Nivel_322Code.GDCasasObjects4= [];
gdjs.Nivel_322Code.GDEnemigo_95951Objects1= [];
gdjs.Nivel_322Code.GDEnemigo_95951Objects2= [];
gdjs.Nivel_322Code.GDEnemigo_95951Objects3= [];
gdjs.Nivel_322Code.GDEnemigo_95951Objects4= [];
gdjs.Nivel_322Code.GDCenterObjects1= [];
gdjs.Nivel_322Code.GDCenterObjects2= [];
gdjs.Nivel_322Code.GDCenterObjects3= [];
gdjs.Nivel_322Code.GDCenterObjects4= [];
gdjs.Nivel_322Code.GDSpawnpointObjects1= [];
gdjs.Nivel_322Code.GDSpawnpointObjects2= [];
gdjs.Nivel_322Code.GDSpawnpointObjects3= [];
gdjs.Nivel_322Code.GDSpawnpointObjects4= [];
gdjs.Nivel_322Code.GDTeletransporteObjects1= [];
gdjs.Nivel_322Code.GDTeletransporteObjects2= [];
gdjs.Nivel_322Code.GDTeletransporteObjects3= [];
gdjs.Nivel_322Code.GDTeletransporteObjects4= [];
gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects1= [];
gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects2= [];
gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects3= [];
gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects4= [];
gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects1= [];
gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects2= [];
gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3= [];
gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects4= [];


gdjs.Nivel_322Code.eventsList0 = function(runtimeScene) {

{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "Left");
if (isConditionTrue_0) {
gdjs.copyArray(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1, gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2);

{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].addPolarForce(180, 80, 0);
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].returnVariable(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariables().getFromIndex(0)).setNumber(0);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "Right");
if (isConditionTrue_0) {
gdjs.copyArray(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1, gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2);

{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].addPolarForce(0, 80, 0);
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].returnVariable(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariables().getFromIndex(0)).setNumber(1);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "Up");
if (isConditionTrue_0) {
gdjs.copyArray(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1, gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2);

{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].addPolarForce(270, 80, 0);
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].returnVariable(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariables().getFromIndex(0)).setNumber(2);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "Down");
if (isConditionTrue_0) {
gdjs.copyArray(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1, gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2);

{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].addPolarForce(90, 80, 0);
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].returnVariable(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariables().getFromIndex(0)).setNumber(3);
}
}}

}


{



}


{

gdjs.copyArray(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1, gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariableNumber(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariables().getFromIndex(0)) == 0 ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getBehavior("Animation").setAnimationName("izquierda");
}
}}

}


{

gdjs.copyArray(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1, gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariableNumber(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariables().getFromIndex(0)) == 1 ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getBehavior("Animation").setAnimationName("derecha");
}
}}

}


{

gdjs.copyArray(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1, gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariableNumber(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariables().getFromIndex(0)) == 2 ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getBehavior("Animation").setAnimationName("arriba");
}
}}

}


{

gdjs.copyArray(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1, gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariableNumber(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariables().getFromIndex(0)) == 3 ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getBehavior("Animation").setAnimationName("Abajo");
}
}}

}


{



}


{

gdjs.copyArray(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1, gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getAverageForce().getLength() == 80 ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getBehavior("Animation").resumeAnimation();
}
}}

}


{

/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].hasNoForces() ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].getBehavior("Animation").pauseAnimation();
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].setAnimationFrame(0);
}
}}

}


};gdjs.Nivel_322Code.eventsList1 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Personaje_Principal"), gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].getVariableBoolean(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].getVariables().getFromIndex(1), false, false) ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length = k;
if (isConditionTrue_0) {

{ //Subevents
gdjs.Nivel_322Code.eventsList0(runtimeScene);} //End of subevents
}

}


};gdjs.Nivel_322Code.eventsList2 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Personaje_Principal"), gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariableBoolean(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariables().getFromIndex(1), false, false) ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].returnVariable(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariables().getFromIndex(1)).setBoolean(true);
}
}}

}


};gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDCaja_95959595Da_959595241oObjects3Objects = Hashtable.newFrom({"Caja_Daño": gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects3});
gdjs.Nivel_322Code.eventsList3 = function(runtimeScene) {

{

gdjs.copyArray(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2, gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3[i].getAnimationFrame() == 1 ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(16287188);
}
}
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3 */
gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects3.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDCaja_95959595Da_959595241oObjects3Objects, (( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3.length === 0 ) ? 0 :gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3[0].getPointX("Center")) - 45, (( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3.length === 0 ) ? 0 :gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3[0].getPointY("Center")), "");
}{for(var i = 0, len = gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects3.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects3[i].hide();
}
}}

}


{

/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getBehavior("Animation").hasAnimationEnded() ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Caja_Daño"), gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects2);
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects2[i].deleteFromScene(runtimeScene);
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getBehavior("Animation").setAnimationName("izquierda");
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].returnVariable(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariables().getFromIndex(1)).setBoolean(false);
}
}}

}


};gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDCaja_95959595Da_959595241oObjects3Objects = Hashtable.newFrom({"Caja_Daño": gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects3});
gdjs.Nivel_322Code.eventsList4 = function(runtimeScene) {

{

gdjs.copyArray(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2, gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3[i].getAnimationFrame() == 1 ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(16290740);
}
}
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3 */
gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects3.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDCaja_95959595Da_959595241oObjects3Objects, (( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3.length === 0 ) ? 0 :gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3[0].getPointX("Center")) + 45, (( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3.length === 0 ) ? 0 :gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3[0].getPointY("Center")), "");
}{for(var i = 0, len = gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects3.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects3[i].hide();
}
}}

}


{

/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getBehavior("Animation").hasAnimationEnded() ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Caja_Daño"), gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects2);
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects2[i].deleteFromScene(runtimeScene);
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getBehavior("Animation").setAnimationName("derecha");
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].returnVariable(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariables().getFromIndex(1)).setBoolean(false);
}
}}

}


};gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDCaja_95959595Da_959595241oObjects3Objects = Hashtable.newFrom({"Caja_Daño": gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects3});
gdjs.Nivel_322Code.eventsList5 = function(runtimeScene) {

{

gdjs.copyArray(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2, gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3[i].getAnimationFrame() == 1 ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(16294524);
}
}
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3 */
gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects3.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDCaja_95959595Da_959595241oObjects3Objects, (( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3.length === 0 ) ? 0 :gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3[0].getPointX("Center")), (( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3.length === 0 ) ? 0 :gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3[0].getPointY("Center")), "");
}{for(var i = 0, len = gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects3.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects3[i].hide();
}
}}

}


{

/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getBehavior("Animation").hasAnimationEnded() ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Caja_Daño"), gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects2);
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects2[i].deleteFromScene(runtimeScene);
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getBehavior("Animation").setAnimationName("arriba");
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].returnVariable(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariables().getFromIndex(1)).setBoolean(false);
}
}}

}


};gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDCaja_95959595Da_959595241oObjects2Objects = Hashtable.newFrom({"Caja_Daño": gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects2});
gdjs.Nivel_322Code.eventsList6 = function(runtimeScene) {

{

gdjs.copyArray(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1, gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getAnimationFrame() == 1 ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length = k;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(16298004);
}
}
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2 */
gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects2.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDCaja_95959595Da_959595241oObjects2Objects, (( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length === 0 ) ? 0 :gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[0].getPointX("Center")), (( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length === 0 ) ? 0 :gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[0].getPointY("Center")) + 30, "");
}{for(var i = 0, len = gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects2[i].hide();
}
}}

}


{

/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].getBehavior("Animation").hasAnimationEnded() ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length = k;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Caja_Daño"), gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects1);
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects1.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects1[i].deleteFromScene(runtimeScene);
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].getBehavior("Animation").setAnimationName("Abajo");
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].returnVariable(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].getVariables().getFromIndex(1)).setBoolean(false);
}
}}

}


};gdjs.Nivel_322Code.eventsList7 = function(runtimeScene) {

{



}


{

gdjs.copyArray(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1, gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariableNumber(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariables().getFromIndex(0)) == 0 ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getBehavior("Animation").setAnimationName("Ataque-izquierda");
}
}
{ //Subevents
gdjs.Nivel_322Code.eventsList3(runtimeScene);} //End of subevents
}

}


{



}


{

gdjs.copyArray(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1, gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariableNumber(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariables().getFromIndex(0)) == 1 ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getBehavior("Animation").setAnimationName("Ataque-derecha");
}
}
{ //Subevents
gdjs.Nivel_322Code.eventsList4(runtimeScene);} //End of subevents
}

}


{



}


{

gdjs.copyArray(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1, gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2);


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariableNumber(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getVariables().getFromIndex(0)) == 2 ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[i].getBehavior("Animation").setAnimationName("Ataque-arriba");
}
}
{ //Subevents
gdjs.Nivel_322Code.eventsList5(runtimeScene);} //End of subevents
}

}


{



}


{

/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].getVariableNumber(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].getVariables().getFromIndex(0)) == 3 ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].getBehavior("Animation").setAnimationName("Ataque-abajo");
}
}
{ //Subevents
gdjs.Nivel_322Code.eventsList6(runtimeScene);} //End of subevents
}

}


};gdjs.Nivel_322Code.eventsList8 = function(runtimeScene) {

{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.input.isKeyPressed(runtimeScene, "Space");
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(16283652);
}
}
if (isConditionTrue_0) {

{ //Subevents
gdjs.Nivel_322Code.eventsList2(runtimeScene);} //End of subevents
}

}


{



}


{

gdjs.copyArray(runtimeScene.getObjects("Personaje_Principal"), gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].getVariableBoolean(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].getVariables().getFromIndex(1), true, false) ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].getBehavior("Animation").resumeAnimation();
}
}
{ //Subevents
gdjs.Nivel_322Code.eventsList7(runtimeScene);} //End of subevents
}

}


};gdjs.Nivel_322Code.asyncCallback16300260 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.Nivel_322Code.localVariables);
{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "Spawn de enemigos");
}gdjs.Nivel_322Code.localVariables.length = 0;
}
gdjs.Nivel_322Code.eventsList9 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.Nivel_322Code.localVariables);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(5), (runtimeScene) => (gdjs.Nivel_322Code.asyncCallback16300260(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDSpawnpointObjects2Objects = Hashtable.newFrom({"Spawnpoint": gdjs.Nivel_322Code.GDSpawnpointObjects2});
gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDEnemigo_959595951Objects2Objects = Hashtable.newFrom({"Enemigo_1": gdjs.Nivel_322Code.GDEnemigo_95951Objects2});
gdjs.Nivel_322Code.eventsList10 = function(runtimeScene) {

};gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDEnemigo_959595951Objects1Objects = Hashtable.newFrom({"Enemigo_1": gdjs.Nivel_322Code.GDEnemigo_95951Objects1});
gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDcolisionObjects1Objects = Hashtable.newFrom({"colision": gdjs.Nivel_322Code.GDcolisionObjects1});
gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDcolisionObjects1Objects = Hashtable.newFrom({"colision": gdjs.Nivel_322Code.GDcolisionObjects1});
gdjs.Nivel_322Code.eventsList11 = function(runtimeScene) {

{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {

{ //Subevents
gdjs.Nivel_322Code.eventsList9(runtimeScene);} //End of subevents
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Spawnpoint"), gdjs.Nivel_322Code.GDSpawnpointObjects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.getTimerElapsedTimeInSecondsOrNaN(runtimeScene, "Spawn de enemigos") >= 1;
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.pickRandomObject((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDSpawnpointObjects2Objects);
}
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDSpawnpointObjects2 */
gdjs.Nivel_322Code.GDEnemigo_95951Objects2.length = 0;

{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDEnemigo_959595951Objects2Objects, (( gdjs.Nivel_322Code.GDSpawnpointObjects2.length === 0 ) ? 0 :gdjs.Nivel_322Code.GDSpawnpointObjects2[0].getPointX("")), (( gdjs.Nivel_322Code.GDSpawnpointObjects2.length === 0 ) ? 0 :gdjs.Nivel_322Code.GDSpawnpointObjects2[0].getPointY("")), "");
}{for(var i = 0, len = gdjs.Nivel_322Code.GDEnemigo_95951Objects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDEnemigo_95951Objects2[i].getBehavior("Resizable").setWidth(34);
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDEnemigo_95951Objects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDEnemigo_95951Objects2[i].getBehavior("Resizable").setHeight(32);
}
}{gdjs.evtTools.runtimeScene.resetTimer(runtimeScene, "Spawn de enemigos");
}}

}


{

gdjs.copyArray(runtimeScene.getObjects("Personaje_Principal"), gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2);

for (gdjs.Nivel_322Code.forEachIndex3 = 0;gdjs.Nivel_322Code.forEachIndex3 < gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length;++gdjs.Nivel_322Code.forEachIndex3) {
gdjs.copyArray(runtimeScene.getObjects("Enemigo_1"), gdjs.Nivel_322Code.GDEnemigo_95951Objects3);
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3.length = 0;


gdjs.Nivel_322Code.forEachTemporary3 = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2[gdjs.Nivel_322Code.forEachIndex3];
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3.push(gdjs.Nivel_322Code.forEachTemporary3);
let isConditionTrue_0 = false;
if (true) {
{for(var i = 0, len = gdjs.Nivel_322Code.GDEnemigo_95951Objects3.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDEnemigo_95951Objects3[i].addForceTowardObject((gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3.length !== 0 ? gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3[0] : null), 1, 1);
}
}}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Enemigo_1"), gdjs.Nivel_322Code.GDEnemigo_95951Objects1);
gdjs.copyArray(runtimeScene.getObjects("colision"), gdjs.Nivel_322Code.GDcolisionObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDEnemigo_959595951Objects1Objects, gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDcolisionObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDEnemigo_95951Objects1 */
/* Reuse gdjs.Nivel_322Code.GDcolisionObjects1 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDEnemigo_95951Objects1.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDEnemigo_95951Objects1[i].separateFromObjectsList(gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDcolisionObjects1Objects, false);
}
}}

}


};gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDTeletransporteObjects1Objects = Hashtable.newFrom({"Teletransporte": gdjs.Nivel_322Code.GDTeletransporteObjects1});
gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDPersonaje_95959595PrincipalObjects1Objects = Hashtable.newFrom({"Personaje_Principal": gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1});
gdjs.Nivel_322Code.eventsList12 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Personaje_Principal"), gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1);
gdjs.copyArray(runtimeScene.getObjects("Teletransporte"), gdjs.Nivel_322Code.GDTeletransporteObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDTeletransporteObjects1Objects, gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDPersonaje_95959595PrincipalObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDTeletransporteObjects1 */
{gdjs.evtTools.runtimeScene.replaceScene(runtimeScene, ((gdjs.Nivel_322Code.GDTeletransporteObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.Nivel_322Code.GDTeletransporteObjects1[0].getVariables()).getFromIndex(0).getAsString(), false);
}{runtimeScene.getGame().getVariables().getFromIndex(0).getChild("X").setNumber(((gdjs.Nivel_322Code.GDTeletransporteObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.Nivel_322Code.GDTeletransporteObjects1[0].getVariables()).getFromIndex(1).getAsNumber());
}{runtimeScene.getGame().getVariables().getFromIndex(0).getChild("Y").setNumber(((gdjs.Nivel_322Code.GDTeletransporteObjects1.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.Nivel_322Code.GDTeletransporteObjects1[0].getVariables()).getFromIndex(2).getAsNumber());
}}

}


};gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDCaja_95959595Da_959595241oObjects4Objects = Hashtable.newFrom({"Caja_Daño": gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects4});
gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDEnemigo_959595951Objects4Objects = Hashtable.newFrom({"Enemigo_1": gdjs.Nivel_322Code.GDEnemigo_95951Objects4});
gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDGui_95959595Da_959595241oObjects4Objects = Hashtable.newFrom({"Gui_Daño": gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects4});
gdjs.Nivel_322Code.eventsList13 = function(runtimeScene) {

};gdjs.Nivel_322Code.eventsList14 = function(runtimeScene) {

{

/* Reuse gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3[i].getVariableNumber(gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3[i].getVariables().getFromIndex(1)) == runtimeScene.getGame().getVariables().getFromIndex(1).getChild("Prob Crit").getAsNumber() ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3[k] = gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3[i].returnVariable(gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3[i].getVariables().getFromIndex(0)).mul(2);
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3[i].setColor("255;0;0");
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3[i].getBehavior("Text").setText("¡ " + gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3[i].getVariables().getFromIndex(0).getAsString() + " Critico!");
}
}}

}


};gdjs.Nivel_322Code.eventsList15 = function(runtimeScene) {

{

gdjs.copyArray(gdjs.Nivel_322Code.GDEnemigo_95951Objects2, gdjs.Nivel_322Code.GDEnemigo_95951Objects3);


for (gdjs.Nivel_322Code.forEachIndex4 = 0;gdjs.Nivel_322Code.forEachIndex4 < gdjs.Nivel_322Code.GDEnemigo_95951Objects3.length;++gdjs.Nivel_322Code.forEachIndex4) {
gdjs.copyArray(runtimeScene.getObjects("Caja_Daño"), gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects4);
gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects4.length = 0;

gdjs.Nivel_322Code.GDEnemigo_95951Objects4.length = 0;


gdjs.Nivel_322Code.forEachTemporary4 = gdjs.Nivel_322Code.GDEnemigo_95951Objects3[gdjs.Nivel_322Code.forEachIndex4];
gdjs.Nivel_322Code.GDEnemigo_95951Objects4.push(gdjs.Nivel_322Code.forEachTemporary4);
let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDCaja_95959595Da_959595241oObjects4Objects, gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDEnemigo_959595951Objects4Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
{isConditionTrue_0 = runtimeScene.getOnceTriggers().triggerOnce(16306436);
}
}
if (isConditionTrue_0) {
{gdjs.evtTools.object.createObjectOnScene((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDGui_95959595Da_959595241oObjects4Objects, (( gdjs.Nivel_322Code.GDEnemigo_95951Objects4.length === 0 ) ? 0 :gdjs.Nivel_322Code.GDEnemigo_95951Objects4[0].getCenterXInScene()), (( gdjs.Nivel_322Code.GDEnemigo_95951Objects4.length === 0 ) ? 0 :gdjs.Nivel_322Code.GDEnemigo_95951Objects4[0].getCenterYInScene()), "");
}{for(var i = 0, len = gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects4.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects4[i].returnVariable(gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects4[i].getVariables().getFromIndex(0)).setNumber(gdjs.randomInRange(runtimeScene.getGame().getVariables().getFromIndex(1).getChild("Daño min").getAsNumber(), runtimeScene.getGame().getVariables().getFromIndex(1).getChild("Daño Max").getAsNumber()));
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects4.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects4[i].getBehavior("Text").setText(gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects4[i].getVariables().getFromIndex(0).getAsString());
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDEnemigo_95951Objects4.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDEnemigo_95951Objects4[i].returnVariable(gdjs.Nivel_322Code.GDEnemigo_95951Objects4[i].getVariables().get("Vida")).sub(((gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects4.length === 0 ) ? gdjs.VariablesContainer.badVariablesContainer : gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects4[0].getVariables()).getFromIndex(0).getAsNumber());
}
}}
}

}


{

gdjs.copyArray(runtimeScene.getObjects("Gui_Daño"), gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3[i].getVariableNumber(gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3[i].getVariables().getFromIndex(0)) == runtimeScene.getGame().getVariables().getFromIndex(1).getChild("Daño Max").getAsNumber() ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3[k] = gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3[i].returnVariable(gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3[i].getVariables().getFromIndex(1)).setNumber(gdjs.randomInRange(1, runtimeScene.getGame().getVariables().getFromIndex(1).getChild("Prob Crit").getAsNumber()));
}
}
{ //Subevents
gdjs.Nivel_322Code.eventsList14(runtimeScene);} //End of subevents
}

}


{

/* Reuse gdjs.Nivel_322Code.GDEnemigo_95951Objects2 */

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDEnemigo_95951Objects2.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDEnemigo_95951Objects2[i].getVariableNumber(gdjs.Nivel_322Code.GDEnemigo_95951Objects2[i].getVariables().get("Vida")) <= 0 ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDEnemigo_95951Objects2[k] = gdjs.Nivel_322Code.GDEnemigo_95951Objects2[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDEnemigo_95951Objects2.length = k;
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDEnemigo_95951Objects2 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDEnemigo_95951Objects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDEnemigo_95951Objects2[i].deleteFromScene(runtimeScene);
}
}}

}


};gdjs.Nivel_322Code.asyncCallback16311020 = function (runtimeScene, asyncObjectsList) {
asyncObjectsList.restoreLocalVariablesContainers(gdjs.Nivel_322Code.localVariables);
gdjs.copyArray(asyncObjectsList.getObjects("Gui_Daño"), gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects2);

{for(var i = 0, len = gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects2.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects2[i].getBehavior("Tween").addObjectOpacityTween2("Desvanecer", 0, "linear", 0.3, true);
}
}gdjs.Nivel_322Code.localVariables.length = 0;
}
gdjs.Nivel_322Code.eventsList16 = function(runtimeScene) {

{


{
{
const asyncObjectsList = new gdjs.LongLivedObjectsList();
asyncObjectsList.backupLocalVariablesContainers(gdjs.Nivel_322Code.localVariables);
for (const obj of gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects1) asyncObjectsList.addObject("Gui_Daño", obj);
runtimeScene.getAsyncTasksManager().addTask(gdjs.evtTools.runtimeScene.wait(0.3), (runtimeScene) => (gdjs.Nivel_322Code.asyncCallback16311020(runtimeScene, asyncObjectsList)));
}
}

}


};gdjs.Nivel_322Code.eventsList17 = function(runtimeScene) {

{

gdjs.copyArray(runtimeScene.getObjects("Enemigo_1"), gdjs.Nivel_322Code.GDEnemigo_95951Objects2);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDEnemigo_95951Objects2.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDEnemigo_95951Objects2[i].getVariableBoolean(gdjs.Nivel_322Code.GDEnemigo_95951Objects2[i].getVariables().get("Golpeado"), false, false) ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDEnemigo_95951Objects2[k] = gdjs.Nivel_322Code.GDEnemigo_95951Objects2[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDEnemigo_95951Objects2.length = k;
if (isConditionTrue_0) {

{ //Subevents
gdjs.Nivel_322Code.eventsList15(runtimeScene);} //End of subevents
}

}


{



}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Gui_Daño"), gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects1);
{for(var i = 0, len = gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects1.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects1[i].getBehavior("Tween").addObjectPositionYTween2("Movimiento Vertical", (gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects1[i].getY()) - 30, "linear", 0.7, false);
}
}
{ //Subevents
gdjs.Nivel_322Code.eventsList16(runtimeScene);} //End of subevents
}

}


};gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDPersonaje_95959595PrincipalObjects1Objects = Hashtable.newFrom({"Personaje_Principal": gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1});
gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDcolisionObjects1Objects = Hashtable.newFrom({"colision": gdjs.Nivel_322Code.GDcolisionObjects1});
gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDcolisionObjects1Objects = Hashtable.newFrom({"colision": gdjs.Nivel_322Code.GDcolisionObjects1});
gdjs.Nivel_322Code.mapOfEmptyGDEnemigo_95951Objects = Hashtable.newFrom({"Enemigo_1": []});
gdjs.Nivel_322Code.eventsList18 = function(runtimeScene) {

{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Personaje_Principal"), gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1);
{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].setPosition(runtimeScene.getGame().getVariables().getFromIndex(0).getChild("X").getAsNumber(),runtimeScene.getGame().getVariables().getFromIndex(0).getChild("Y").getAsNumber());
}
}}

}


{


let isConditionTrue_0 = false;
{
gdjs.copyArray(runtimeScene.getObjects("Center"), gdjs.Nivel_322Code.GDCenterObjects1);
gdjs.copyArray(runtimeScene.getObjects("Spawnpoint"), gdjs.Nivel_322Code.GDSpawnpointObjects1);
gdjs.copyArray(runtimeScene.getObjects("Teletransporte"), gdjs.Nivel_322Code.GDTeletransporteObjects1);
{for(var i = 0, len = gdjs.Nivel_322Code.GDTeletransporteObjects1.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDTeletransporteObjects1[i].hide();
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDCenterObjects1.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDCenterObjects1[i].hide();
}
}{for(var i = 0, len = gdjs.Nivel_322Code.GDSpawnpointObjects1.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDSpawnpointObjects1[i].hide();
}
}}

}


{


gdjs.Nivel_322Code.eventsList1(runtimeScene);
}


{


gdjs.Nivel_322Code.eventsList8(runtimeScene);
}


{


gdjs.Nivel_322Code.eventsList11(runtimeScene);
}


{


gdjs.Nivel_322Code.eventsList12(runtimeScene);
}


{


gdjs.Nivel_322Code.eventsList17(runtimeScene);
}


{



}


{


let isConditionTrue_0 = false;
{
{gdjs.evtTools.camera.clampCamera(runtimeScene, 425, 337, 903, 811, "", 0);
}}

}


{



}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.runtimeScene.sceneJustBegins(runtimeScene);
}
}
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Mapa"), gdjs.Nivel_322Code.GDMapaObjects1);
gdjs.copyArray(runtimeScene.getObjects("colision"), gdjs.Nivel_322Code.GDcolisionObjects1);
{gdjs.evtTools.camera.setCameraZoom(runtimeScene, 6, "", 5);
}{gdjs.evtTools.camera.centerCamera(runtimeScene, (gdjs.Nivel_322Code.GDMapaObjects1.length !== 0 ? gdjs.Nivel_322Code.GDMapaObjects1[0] : null), true, "", 0);
}{for(var i = 0, len = gdjs.Nivel_322Code.GDcolisionObjects1.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDcolisionObjects1[i].hide();
}
}}

}


{



}


{

gdjs.copyArray(runtimeScene.getObjects("Personaje_Principal"), gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1);
gdjs.copyArray(runtimeScene.getObjects("colision"), gdjs.Nivel_322Code.GDcolisionObjects1);

let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.hitBoxesCollisionTest(gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDPersonaje_95959595PrincipalObjects1Objects, gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDcolisionObjects1Objects, false, runtimeScene, false);
if (isConditionTrue_0) {
isConditionTrue_0 = false;
for (var i = 0, k = 0, l = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length;i<l;++i) {
    if ( gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].getVariableBoolean(gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].getVariables().getFromIndex(1), false, false) ) {
        isConditionTrue_0 = true;
        gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[k] = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i];
        ++k;
    }
}
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length = k;
}
if (isConditionTrue_0) {
/* Reuse gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1 */
/* Reuse gdjs.Nivel_322Code.GDcolisionObjects1 */
{for(var i = 0, len = gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1[i].separateFromObjectsList(gdjs.Nivel_322Code.mapOfGDgdjs_9546Nivel_9595322Code_9546GDcolisionObjects1Objects, false);
}
}}

}


{


let isConditionTrue_0 = false;
isConditionTrue_0 = false;
isConditionTrue_0 = gdjs.evtTools.object.getSceneInstancesCount((typeof eventsFunctionContext !== 'undefined' ? eventsFunctionContext : runtimeScene), gdjs.Nivel_322Code.mapOfEmptyGDEnemigo_95951Objects) == 10;
if (isConditionTrue_0) {
gdjs.copyArray(runtimeScene.getObjects("Spawnpoint"), gdjs.Nivel_322Code.GDSpawnpointObjects1);
{for(var i = 0, len = gdjs.Nivel_322Code.GDSpawnpointObjects1.length ;i < len;++i) {
    gdjs.Nivel_322Code.GDSpawnpointObjects1[i].deleteFromScene(runtimeScene);
}
}}

}


};

gdjs.Nivel_322Code.func = function(runtimeScene) {
runtimeScene.getOnceTriggers().startNewFrame();

gdjs.Nivel_322Code.GDMapaObjects1.length = 0;
gdjs.Nivel_322Code.GDMapaObjects2.length = 0;
gdjs.Nivel_322Code.GDMapaObjects3.length = 0;
gdjs.Nivel_322Code.GDMapaObjects4.length = 0;
gdjs.Nivel_322Code.GDcolisionObjects1.length = 0;
gdjs.Nivel_322Code.GDcolisionObjects2.length = 0;
gdjs.Nivel_322Code.GDcolisionObjects3.length = 0;
gdjs.Nivel_322Code.GDcolisionObjects4.length = 0;
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length = 0;
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length = 0;
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3.length = 0;
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects4.length = 0;
gdjs.Nivel_322Code.GDDetalles_9595mapaObjects1.length = 0;
gdjs.Nivel_322Code.GDDetalles_9595mapaObjects2.length = 0;
gdjs.Nivel_322Code.GDDetalles_9595mapaObjects3.length = 0;
gdjs.Nivel_322Code.GDDetalles_9595mapaObjects4.length = 0;
gdjs.Nivel_322Code.GDCasasObjects1.length = 0;
gdjs.Nivel_322Code.GDCasasObjects2.length = 0;
gdjs.Nivel_322Code.GDCasasObjects3.length = 0;
gdjs.Nivel_322Code.GDCasasObjects4.length = 0;
gdjs.Nivel_322Code.GDEnemigo_95951Objects1.length = 0;
gdjs.Nivel_322Code.GDEnemigo_95951Objects2.length = 0;
gdjs.Nivel_322Code.GDEnemigo_95951Objects3.length = 0;
gdjs.Nivel_322Code.GDEnemigo_95951Objects4.length = 0;
gdjs.Nivel_322Code.GDCenterObjects1.length = 0;
gdjs.Nivel_322Code.GDCenterObjects2.length = 0;
gdjs.Nivel_322Code.GDCenterObjects3.length = 0;
gdjs.Nivel_322Code.GDCenterObjects4.length = 0;
gdjs.Nivel_322Code.GDSpawnpointObjects1.length = 0;
gdjs.Nivel_322Code.GDSpawnpointObjects2.length = 0;
gdjs.Nivel_322Code.GDSpawnpointObjects3.length = 0;
gdjs.Nivel_322Code.GDSpawnpointObjects4.length = 0;
gdjs.Nivel_322Code.GDTeletransporteObjects1.length = 0;
gdjs.Nivel_322Code.GDTeletransporteObjects2.length = 0;
gdjs.Nivel_322Code.GDTeletransporteObjects3.length = 0;
gdjs.Nivel_322Code.GDTeletransporteObjects4.length = 0;
gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects1.length = 0;
gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects2.length = 0;
gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects3.length = 0;
gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects4.length = 0;
gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects1.length = 0;
gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects2.length = 0;
gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3.length = 0;
gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects4.length = 0;

gdjs.Nivel_322Code.eventsList18(runtimeScene);
gdjs.Nivel_322Code.GDMapaObjects1.length = 0;
gdjs.Nivel_322Code.GDMapaObjects2.length = 0;
gdjs.Nivel_322Code.GDMapaObjects3.length = 0;
gdjs.Nivel_322Code.GDMapaObjects4.length = 0;
gdjs.Nivel_322Code.GDcolisionObjects1.length = 0;
gdjs.Nivel_322Code.GDcolisionObjects2.length = 0;
gdjs.Nivel_322Code.GDcolisionObjects3.length = 0;
gdjs.Nivel_322Code.GDcolisionObjects4.length = 0;
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects1.length = 0;
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects2.length = 0;
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects3.length = 0;
gdjs.Nivel_322Code.GDPersonaje_9595PrincipalObjects4.length = 0;
gdjs.Nivel_322Code.GDDetalles_9595mapaObjects1.length = 0;
gdjs.Nivel_322Code.GDDetalles_9595mapaObjects2.length = 0;
gdjs.Nivel_322Code.GDDetalles_9595mapaObjects3.length = 0;
gdjs.Nivel_322Code.GDDetalles_9595mapaObjects4.length = 0;
gdjs.Nivel_322Code.GDCasasObjects1.length = 0;
gdjs.Nivel_322Code.GDCasasObjects2.length = 0;
gdjs.Nivel_322Code.GDCasasObjects3.length = 0;
gdjs.Nivel_322Code.GDCasasObjects4.length = 0;
gdjs.Nivel_322Code.GDEnemigo_95951Objects1.length = 0;
gdjs.Nivel_322Code.GDEnemigo_95951Objects2.length = 0;
gdjs.Nivel_322Code.GDEnemigo_95951Objects3.length = 0;
gdjs.Nivel_322Code.GDEnemigo_95951Objects4.length = 0;
gdjs.Nivel_322Code.GDCenterObjects1.length = 0;
gdjs.Nivel_322Code.GDCenterObjects2.length = 0;
gdjs.Nivel_322Code.GDCenterObjects3.length = 0;
gdjs.Nivel_322Code.GDCenterObjects4.length = 0;
gdjs.Nivel_322Code.GDSpawnpointObjects1.length = 0;
gdjs.Nivel_322Code.GDSpawnpointObjects2.length = 0;
gdjs.Nivel_322Code.GDSpawnpointObjects3.length = 0;
gdjs.Nivel_322Code.GDSpawnpointObjects4.length = 0;
gdjs.Nivel_322Code.GDTeletransporteObjects1.length = 0;
gdjs.Nivel_322Code.GDTeletransporteObjects2.length = 0;
gdjs.Nivel_322Code.GDTeletransporteObjects3.length = 0;
gdjs.Nivel_322Code.GDTeletransporteObjects4.length = 0;
gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects1.length = 0;
gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects2.length = 0;
gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects3.length = 0;
gdjs.Nivel_322Code.GDCaja_9595Da_95241oObjects4.length = 0;
gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects1.length = 0;
gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects2.length = 0;
gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects3.length = 0;
gdjs.Nivel_322Code.GDGui_9595Da_95241oObjects4.length = 0;


return;

}

gdjs['Nivel_322Code'] = gdjs.Nivel_322Code;
