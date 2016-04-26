/**
 * Created by DELL on 2016/1/8.
 */
var Tool= function ( editor ) {

    var container = new UI.Panel();
    container.setId("tool");

    var loge = new UI.Panel();
    loge.setClass( 'loge' );
    container.add( loge );

    var tool = new UI.Panel();
    tool.setClass( 'tool' );
    container.add( tool);

    var toolMove= new UI.Panel();
    toolMove.setClass( 'toolList' );
    tool.add( toolMove);
    //     toolList 背景图片
    toolMove.dom.style.backgroundImage="url('image/toolmove.png')";
    toolMove.onClick(function(){
        editor.signals.selectTransform.dispatch( "translate");
        //        点击后更改绿色背景颜色
        for(var i=0;i<this.dom.parentNode.childNodes.length;i++){
            this.dom.parentNode.childNodes[i].style.backgroundColor="#343434";
        }
        this.dom.style.backgroundColor="green";
    });

    var toolRotate= new UI.Panel();
    toolRotate.setClass( 'toolList' );
    tool.add( toolRotate);
    //     toolList 背景图片
    toolRotate.dom.style.backgroundImage="url('image/toolRotate.png')";
    toolRotate.onClick(function(){
        editor.signals.selectTransform.dispatch( "rotate");
        //      点击后更改绿色背景颜色
        for(var i=0;i<this.dom.parentNode.childNodes.length;i++){
            this.dom.parentNode.childNodes[i].style.backgroundColor="#343434";
        }
        this.dom.style.backgroundColor="green";
    });

    var toolScale= new UI.Panel();
    toolScale.setClass( 'toolList' );
    tool.add( toolScale);
//     toolList 背景图片
    toolScale.dom.style.backgroundImage="url('image/toolScale.png')";

    toolScale.onClick(function(){
        editor.signals.selectTransform.dispatch( "scale");
        //        点击后更改绿色背景颜色
        for(var i=0;i<this.dom.parentNode.childNodes.length;i++){

            this.dom.parentNode.childNodes[i].style.backgroundColor="#343434";
        }
        this.dom.style.backgroundColor="green";
    });

    var toolCenter= new UI.Panel();
    toolCenter.setClass( 'toolList' );
    tool.add( toolCenter);
//     toolList 背景图片
    toolCenter.dom.style.backgroundImage="url('image/toolCenter.png')";

    toolCenter.onClick(function(){
        editor.resetAxis();
        //        点击后更改绿色背景颜色
        for(var i=0;i<this.dom.parentNode.childNodes.length;i++){
            this.dom.parentNode.childNodes[i].style.backgroundColor="#343434";
        }
        this.dom.style.backgroundColor="green";
    });

    var gridVis= new UI.Panel();
    gridVis.setClass( 'toolList' );
    tool.add( gridVis);
//     toolList 背景图片
    gridVis.dom.style.backgroundImage="url('image/6.png')";

    gridVis.onClick(function(){

        editor.Grid.visible=!editor.Grid.visible;
        editor.signals.sceneGraphChanged.dispatch();
        //        点击后更改绿色背景颜色
        for(var i=0;i<this.dom.parentNode.childNodes.length;i++){
            this.dom.parentNode.childNodes[i].style.backgroundColor="#343434";
        }
        this.dom.style.backgroundColor="green";
    });
    var resetCamera= new UI.Panel();
    resetCamera.setClass( 'toolList' );
    tool.add( resetCamera);
    resetCamera.dom.style.backgroundImage="url('image/resetCamera.png')";
    resetCamera.onClick(function(){

        editor.requestLoop=false;
        editor.CameraControls(1);

       //ditor.camera.position.copy(new THREE.Vector3(20,20,200));
       //ditor.controls.object.updateProjectionMatrix();
       //ditor.controls.update();
        editor.signals.sceneGraphChanged.dispatch();

    });

    var save = new UI.Panel();
    save.setClass( 'save' );
    container.add( save );

    var saveList = new UI.Panel();
    saveList.setClass( 'saveList' );
    saveList.setTextContent("保存");
    save.add( saveList );
    saveList.onClick(function(){
        //3denvMap
        //debugger
        dataBase.Env={};
        editor.allObject3D.traverse(function (child) {

            if (child instanceof THREE.Mesh) {
                if (child.material) {
                    if(child.material.envMap){

                        dataBase.Env[child.uuid]="["+[child.material.envMap.mapping,child.material.reflectivity,child.material.refractionRatio]+"]";
                    }
                }

            }
        });

        //controls
        var getBool=function(_div){
            if(document.getElementById(_div).className=="onButton"){
                return true;
            }else{
                return false;
            }
        };

        if(editor.controls.type=="OrbitControls"){
            dataBase.controls.type="1";
            dataBase.controls.atr1="["+[editor.camera.fov,getBool("rFov")].toString()+"]";
            dataBase.controls.atr2="["+[(Math.PI-editor.controls.maxPolarAngle) *200/Math.PI,getBool("rLimit")].toString()+"]";
            dataBase.controls.atr3="["+[(editor.controls.dampingFactor*100),getBool("rResistance")].toString()+"]";

        }else if(editor.controls.type=="FirstPersonControls"){
            dataBase.controls.type="2";
            dataBase.controls.atr1="["+[editor.camera.fov,getBool("pFov")].toString()+"]";
            dataBase.controls.atr2="["+[editor.controls.lookSpeed  *2000,getBool("pSpeed")].toString()+"]";
            dataBase.controls.atr3="["+[50,getBool("pHight")].toString()+"]";

        }else if(editor.controls.type=="FlyControls"){
            dataBase.controls.type="3";
            dataBase.controls.atr1="["+[editor.camera.fov,getBool("fFov")].toString()+"]";
            //dataBase.controls.atr2=undefined;
            dataBase.controls.atr2="["+[editor.controls.rollSpeed,getBool("fSpeed")].toString()+"]";

        }
       //dataBase.camera.position.x=editor.camera.position.x
       //dataBase.camera.position.y=editor.camera.position.y
       //dataBase.camera.position.z=editor.camera.position.z
        //composer

       dataBase.composer.DarkNight=editor.composer.DarkNight[1];
       dataBase.composer.DarkNightV=editor.composer.DarkNight.getValue();
       dataBase.composer.Luminous=editor.composer.Luminous[1];
       dataBase.composer.LuminousV=editor.composer.Luminous.getValue();
       dataBase.composer.Pixel=editor.composer.Pixel[1];
       dataBase.composer.PixelV=editor.composer.Pixel.getValue();
       dataBase.composer.Restoring=editor.composer.Restoring[1];
       dataBase.composer.RestoringV=editor.composer.Restoring.getValue();
       dataBase.composer.WhiteCurtain=editor.composer.WhiteCurtain[1];
       dataBase.composer.WhiteCurtainV=editor.composer.WhiteCurtain.getValue();
        //background

        dataBase.background.enable2D=editor.enable2D;
       // dataBase.background.enableBG=editor.enableBG;
        dataBase.background.fogColor=editor.sceneGlobal.fog.color.getHexString();
        dataBase.background.fogInten=editor.sceneGlobal.fog.density;
        dataBase.background.lightBGC=editor.lightBG.color.getHexString();
        dataBase.background.lightBGI= editor.lightBG.intensity;
        dataBase.background.lightGlobalC= editor.lightGlobal.color.getHexString();
        dataBase.background.lightGlobalI=editor.lightGlobal.intensity;



        var AmbientLight= editor.scene.getObjectByName("AmbientLight")
        editor.scene.remove(AmbientLight);
        for(var i in editor.traceCamera){
            dataBase.traceCamera={};
            dataBase.traceCamera[i]=editor.traceCamera[i];
        }


        var scene =editor.scene.toJSON();
        var scene1= JSON.stringify(scene);
        var sceneBG = editor.planbox.toJSON();
        var sceneBG1= JSON.stringify(sceneBG);
        var sceneGlobal = editor.skybox.toJSON();
        var sceneGlobal1= JSON.stringify(sceneGlobal );
        var data1= JSON.stringify(dataBase);

        var link = document.createElement( 'a' );
        link.style.display = 'none';
        document.body.appendChild( link ); // Firefox workaround, see #6594
        function save( blob, filename ) {
            link.href = URL.createObjectURL( blob );
            link.download = filename || 'data.json';
            link.click();

            // URL.revokeObjectURL( url ); breaks Firefox...
        }
        var t = new Date();
        var start = t.getTime();

        save(new Blob([scene1]  ,{type: "text/plain;charset=utf-8"}),"scene.json");
        save(new Blob([sceneGlobal1]  ,{type: "text/plain;charset=utf-8"}),"sceneGlobal.json");
        save(new Blob([sceneBG1]  ,{type: "text/plain;charset=utf-8"}),"sceneBG.json");
        save(new Blob([data1]  ,{type: "text/plain;charset=utf-8"}),"dataBase.json");
        var end = t.getTime();
        var time = end- start;
        console.log(time)
        editor.scene.add(AmbientLight);



      //  localStorage.setItem("menuTitle",  test1);
      //  console.log(JSON.parse((new THREE.OBJLoader("",function(){}))))
        //editor.fromJSON( JSON.parse( window.localStorage.getItem("menuTitle") ));

    //    var w = window.open("about:blank", "导出", "height=0,width=0,toolbar=no,menubar=no,scrollbars=no,resizable=on,location=no,status=no");w.document.write(test1);
       // editor.fromJSON( JSON.parse( window.localStorage.getItem("menuTitle") ));
      //  window.localStorage.getItem("menuTitle")
    });


    return container;

};