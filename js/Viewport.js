/**
 * Created by DELL on 2016/1/8.
 */
var Viewport=function(editor){
    var signals = editor.signals;

    var  container = new UI.Panel();
    container.setId( 'viewport' );

    var renderer = editor.renderer;
    renderer.autoClear=false;
    renderer.setClearColor(0x555555);

    container.dom.appendChild(renderer.domElement);
    var scene = editor.scene;
    var sceneHelpers = editor.sceneHelpers;
    var sceneGlobal = editor.sceneGlobal;

    editor.camera.position.z=1000;

    var cubecamera=editor.cubecamera;
    sceneGlobal.add(cubecamera);
    var cubecamera1=editor.cubecamera1;
    sceneGlobal.add(cubecamera1);


    var lightGlobal = editor.lightGlobal;
    editor.sceneGlobal.add(lightGlobal);
    //var lightBG = editor.lightBG;
    editor.sceneBG.add(editor.lightBG);

    var composer=editor.composer;

    var grid=editor.Grid;
    grid.visible=false;
    editor.scene.add(grid);

    editor.controls = new THREE.OrbitControls(editor.camera,container.dom);
  //  editor.controls.enableDamping = true;
  //  editor.controls.dampingFactor  =  1;
    editor.controls.addEventListener('change', function (){
        editor.signals.cameraChanged.dispatch(editor.camera);
        editor.controls.update();
    });

    var transformControls=new THREE.MyTransformControls(editor.camera,container.dom);

    transformControls.addEventListener("change",function(){

        editor.signals.selectTransform.dispatch();
        editor.signals.sceneGraphChanged.dispatch();
    })

    var projector=new THREE.Projector();
    var objects=[];
    var mousePosition=new THREE.Vector2();
    var raycaster = new THREE.Raycaster();

    container.dom.addEventListener("mousedown",onMouseDown,false);

    window.addEventListener( 'resize', onWindowResize, false );
    function onMouseDown(event){
        event.preventDefault();
        var button=event.button;
        var intersects=editor.getIntersects(event);
        if(button==0) {

            if (intersects.length > 0 && !transformControls.hasIntersect) {

                //transformControls.hasIntersect=false;
                editor.select(intersects[0].object);
            }
        }else if(button==2){
            editor.selectClear();
            $(".selected").removeClass("selected");
            // transformControls.hasIntersect=false;
            editor.signals.sceneGraphChanged.dispatch();

        }


        event.target.addEventListener("mousemove",onMouseMove,false);
        event.target.addEventListener("mouseup",onMouseUp,false);
    }
    function onMouseMove(event){
        event.preventDefault();
        mousePosition.x = ( (event.offsetX)/ (renderer.domElement.width) ) * 2 - 1;
        mousePosition.y = - ( event.offsetY/ renderer.domElement.height ) * 2 + 1;
        raycaster.setFromCamera(mousePosition, editor.camera );

    }
    function onMouseUp(event){
        event.preventDefault();
        event.target.removeEventListener("mousedown",onMouseDown,false);
        event.target.removeEventListener("mousemove",onMouseMove,false);
    }
    function onWindowResize( event ) {
        editor.signals.windowResize.dispatch();
    }
    function trace(){
        //console.log("trace")
        for(var i in editor.traceCamera){
            //console.log( editor.scene.getObjectByName(i));
            editor.allObject3D.getObjectByUuid(i).position.copy(editor.traceCamera[i]);
            editor.allObject3D.getObjectByUuid(i).position.unproject(editor.camera);
            //if(loop) requestAnimationFrame(trace);
        }
        //editor.signals.sceneGraphChanged.dispatch();
    }
    function render() {

        if(Object.keys(editor.traceCamera).length) trace();
        sceneHelpers.updateMatrixWorld();
        scene.updateMatrixWorld();

        renderer.clear();
        cubecamera.updateCubeMap( renderer, sceneGlobal);
        cubecamera1.updateCubeMap( renderer, sceneGlobal);
        transformControls.update();
        editor.allObject3D.traverse(function(child){
            if(child instanceof THREE.LightObject){
                var scale = child.position.distanceTo(editor.camera.position) / 1200*20;
                child.children[0].scale.set(scale,scale,scale);
            }
        });
        for(i in editor.helpers){
            //if(editor.allObject3D[i] instanceof THREE.LightObject) continue;
            editor.helpers[i].update();
        }


        if( editor.composer.enable()){
            composer.composer.render()
        }else{
            editor.enable2D ?  renderer.render( editor.sceneBG, editor.cameraBG ):  renderer.render(sceneGlobal, editor.camera);
            renderer.render( scene, editor.camera );
        }
        renderer.render( sceneHelpers,editor.camera );

    }
    function addenvMap(material,mappings){
        switch (mappings){
            case 301:
                // editor.bgType=='2d'?new THREE.TextureLoader().load(editor.planbox.material.map.image.src,function(texture){
                //     texture.mapping= THREE.SphericalReflectionMapping;
                //     material.envMap =texture;
                //     material.needsUpdate=true;
                //     editor.signals.sceneGraphChanged.dispatch();
                // }): new THREE.HDRCubeTextureLoader().load(editor.materialsri,function(hdrCubeMap){
                //     var pmremGenerator = new THREE.PMREMGenerator( hdrCubeMap );
                //     pmremGenerator.update( renderer );
                //     var pmremCubeUVPacker = new THREE.PMREMCubeUVPacker( pmremGenerator.cubeLods );
                //     pmremCubeUVPacker.update( renderer );
                //     material.envMap = pmremCubeUVPacker.CubeUVRenderTarget;
                //     material.needsUpdate=true;
                //     editor.signals.sceneGraphChanged.dispatch();
                // });
                if(editor.enable2D)
                {new THREE.TextureLoader().load(editor.planbox.material.map.image.src,function(texture){
                    texture.mapping=305;
                    material.envMap =texture;
                    material.needsUpdate=true;
                    editor.signals.sceneGraphChanged.dispatch();});
                }
                else{
                    cubecamera.renderTarget.mapping=mappings;
                    material.envMap = cubecamera.renderTarget;
                }
                break;
            case 302:
                // editor.bgType=='2d'?new THREE.TextureLoader().load(editor.planbox.material.map.image.src,function(texture){
                //     texture.mapping= THREE.EquirectangularRefractionMapping;
                //     material.envMap =texture;
                //     material.needsUpdate=true;
                //     editor.signals.sceneGraphChanged.dispatch();
                // }):new THREE.CubeTextureLoader().load(editor.materialsri,function(texture){
                //     texture.mapping= mappings;
                //     material.envMap =texture;
                //     material.needsUpdate=true;
                //     editor.signals.sceneGraphChanged.dispatch();
                // });
                if(editor.enable2D)
                {new THREE.TextureLoader().load(editor.planbox.material.map.image.src,function(texture){
                    texture.mapping= 304;
                    material.envMap =texture;
                    material.needsUpdate=true;
                    editor.signals.sceneGraphChanged.dispatch();});
                }
                else{
                    cubecamera1.renderTarget.mapping=mappings;
                    material.envMap = cubecamera1.renderTarget;
                }
                break;
        }

    }
    signals.envmappingChange.add(function(material,mappings){
        addenvMap(material,mappings);
    });
    Editor.prototype.getIntersects=function(event){
        mousePosition.x = ( (event.offsetX)/ (renderer.domElement.width) ) * 2 - 1;
        mousePosition.y = - ( event.offsetY/ renderer.domElement.height ) * 2 + 1;
        raycaster.setFromCamera(mousePosition, editor.camera );
        var intersects = raycaster.intersectObjects( objects );
        return intersects;
    }
    signals.labelChange.add( function (object ) {
        var labels=editor.labels;
        for(var i in labels){
            var position=labels[i].getWorldPosition();
            var v=new THREE.Vector3().copy( position);
            projector.projectVector( v, editor.camera);
            var left=( v.x+1)/2*window.innerWidth-140;
            var top=( -v.y+1)/2*window.innerHeight-190;

            document.getElementById(i).style.left= left+"px";
            document.getElementById(i).style.top= top+"px";
        }

    } );
    signals.selectChanged.add( function (object ) {

        transformControls.attach(editor.selected);
        if(object instanceof THREE.LightObject){
            $(".side_panel").css("display","none");
            $(".title")[1].click();
        }else{
            $(".side_panel").css("display","none");
            $(".title")[0].click();
        }
        editor.sceneHelpers.add(transformControls);
        editor.signals.sceneGraphChanged.dispatch();



    } );
    signals.selectClear.add( function ( ) {
        transformControls.detach();
        editor.sceneHelpers.remove(transformControls);

    })
    signals.objectAdded.add( function ( object ) {

        var materialsNeedUpdate = false;

        object.traverse( function ( child ) {

            if ( child instanceof THREE.Light ) materialsNeedUpdate = true;
            if(child instanceof  THREE.Mesh)  objects.push( child );
            if(child instanceof  THREE.Sprite)  objects.push( child );
        } );

        if ( materialsNeedUpdate === true ) editor.updateMaterials();

    } );
    signals.cameraChanged.add( function () {
        signals.labelChange.dispatch();

        render();

    } );
    signals.windowResize.add( function () {
        editor.camera.aspect = container.dom.offsetWidth / container.dom.offsetHeight;
        editor.camera.updateProjectionMatrix();
        renderer.setSize( container.dom.offsetWidth, container.dom.offsetHeight );
        signals.labelChange.dispatch();
        render();

    } );
    signals.sceneGraphChanged.add( function () {

        render();

    } );
    signals.selectTransform.add(function(mode){
        signals.labelChange.dispatch();
        if(mode!==undefined){
            transformControls.setMode(mode);
        }

        var helper=editor.helpers;
        var boxhelper=editor.boxHelpers
        for(i in helper){
                helper[i].update();

        }
        for(i in boxhelper){
          if(boxhelper[i] instanceof  THREE.BoxHelper){
                if(editor.selected[i]!==undefined){
                    boxhelper[i].update(editor.selected[i]);
                }
            }
        }
     // if(transformControls.object!==undefined){
     //     for (var i in transformControls.object){
     //         if(transformControls.object[i].type=="LightObject"){
     //             transformControls.object[i].children[2].update();
     //         }
     //     }

     // }


        transformControls.update();
    });
    signals.objectRemove.add(function(object){
        object.traverse( function ( child ) {
            if(child instanceof  THREE.Mesh||child instanceof  THREE.Sprite){

                    for(var i=0;i<child.children.length;i++){
                        var id=child.children[i].uuid;
                        delete editor.labels[id];
                        document.getElementById("viewport").removeChild(document.getElementById(id));
                    }

                if(child.geometry){
                    child.geometry.dispose();
                }else if(  child.material){
                    child.material.dispose();
                    if( child.material.texture){
                        child.material.texture.dispose();
                    }
                }
                objects.remove(child);
            }

        } );
        var id = object.uuid;
        $("#"+id).remove();
    });
    return container;
}