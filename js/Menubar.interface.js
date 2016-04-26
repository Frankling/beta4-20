/**
 * Created by asforever on 2016/3/31.
 */
/**
 * Created by DELL on 2016/1/8.
 */

/*4-18*/
Menubar.interface = function ( editor ) {
    var container = new UI.Panel().setClass('menu');
    var menuName = new UI.createDiv('title',container);
    menuName.dom.style.backgroundImage="url('image/scenarios.png')";
    menuName.onClick(function () {
        if(sidePanel.dom.style.display=="inline-block"){
            sidePanel.dom.style.display="none";
            return
        }
        $(".side_panel").css("display","none");
        sidePanel.dom.style.display="inline-block";
    });

    var sidePanel = new UI.createDiv('side_panel',container);
    sidePanel.setTop('40px');

    var panelHeader = new UI.createDiv('panel-header',sidePanel,'界面');
    var panelClose = new UI.createDiv('panel-close',panelHeader);
    panelClose.onClick(function(){
        sidePanel.dom.style.display="none";
    });
    var attributeList =new UI.createDiv('attributeList',sidePanel);
    attributeList.dom.style.height="calc(100% - 62px)";

    var bgAttr = new UI.createDiv('',attributeList);
    var bgHeader = new UI.createDiv('attrHeader',bgAttr,'标签');
    var bgHiddenArrow = new UI.createDiv('attrTriPng',bgHeader);
    var bgHelp = new UI.createDiv('attrHelp',bgHeader);

    bgHeader.onClick(function () {
        if (bgContent.dom.style.display == "none") {
            bgContent.dom.style.display = "block";
            bgHiddenArrow.dom.style.backgroundImage = "url('image/jiantou.png')";
        } else {
            bgContent.dom.style.display = "none";
            bgHiddenArrow.dom.style.backgroundImage = "url('image/jiantou-you.png')";
        }
    });
    var bgContent   = new UI.createDiv('Attr_Content',bgAttr);
    var editorBg    = new UI.createDiv('editorBg ',  bgContent);
    var addLabel    = new UI.createDiv('labelEditor',editorBg );
    var moveLabel   = new UI.createDiv('labelEditor',editorBg );
    var removeLabel = new UI.createDiv('labelEditor',editorBg );

    addLabel.onClick(function(){

    });
    /*

     var transformBody = new UI.Panel();
     transformBody.setClass('bodyAttributes' );
     transformAttributes.add(transformBody);

     var labelBackground = new UI.Panel();
     labelBackground.setClass('ScenariosTitleBackground');
     transformBody.add(labelBackground);

     var label2d=new UI.Panel();
     label2d.setClass("label2d");
     var labelHead=new UI.Panel();
     labelHead.setClass("labelHead");
     label2d.add(labelHead);

     var labelBody=new UI.Panel();
     labelBody.setClass("labelBody");
     label2d.add(labelBody);


     var addlabelFun=function(e){
     var button=e.button;
     if(button==0){
     var intersects=editor.getIntersects(e);
     if(intersects.length>0&& intersects[0].object instanceof THREE.Mesh){
     var map = new THREE.TextureLoader().load( "image/gizmo-light.png" );
     var material = new THREE.SpriteMaterial( { map: map, color: 0xffffff, fog: true } );
     var sprite=new THREE.Sprite(material);
     sprite.position.copy(intersects[0].point.sub( intersects[0].object.getWorldPosition()));
     sprite.position.multiply(new THREE.Vector3(1.1,1.1,1.1));
     intersects[0].object.add(sprite);

     var _div=label2d.dom.cloneNode(true);
     var top= e.offsetY-150;//-(v.y-1)/2*parseInt($(document.getElementById("viewport")).css("height"))-190;
     var left=e.offsetX-100;//(v.x+1)/2*parseInt($(document.getElementById("viewport")).css("width"))-100;
     _div.style.left=left+"px";
     _div.style.top=top+"px";
     var id=sprite.uuid;
     _div.id=id;
     editor.labels[id]=sprite;
     document.getElementById("viewport").appendChild(_div);
     editor.signals.sceneGraphChanged.dispatch();
     document.body.style.cursor="points";
     }
     }

     };
     var cancelAddlabel=function(e){

     var button=e.button;
     if(button==2){
     document.getElementById("viewport").style.cursor="default";
     document.getElementById("viewport").removeEventListener("mousedown",addlabelFun,false);
     document.removeEventListener("mousedown",cancelAddlabel,false);
     document.getElementById("viewport").focus();
     }

     };
     var Addlabel = new UI.Button();
     Addlabel.setClass('ScenariosTitleButton');
     Addlabel.setTextContent('add');
     labelBackground.add(Addlabel);
     Addlabel.onClick(function(e){
     document.getElementById("viewport").style.cursor="cell";
     document.getElementById("viewport").addEventListener("mousedown",addlabelFun,false);
     document.addEventListener("mousedown",cancelAddlabel,false);

     });

     var Removelabel = new UI.Button();
     Removelabel.setClass('ScenariosTitleButton');
     Removelabel.setTextContent('remove');
     labelBackground.add(Removelabel);

     var Liblabel = new UI.Button();
     Liblabel.setClass('ScenariosTitleButton');
     Liblabel.setTextContent('lib');
     labelBackground.add(Liblabel);

     /!*物体-三角形图标*!/
     var listOfTransformHidden = new UI.Panel();
     listOfTransformHidden.setClass('listOfMaterialHidden');
     transformHeader.add(listOfTransformHidden);

     transformHeader.onClick(function () {
     if (transformBody.dom.style.display == "none") {
     transformBody.dom.style.display = "block";
     listOfTransformHidden.dom.style.backgroundImage="url('image/jiantou.png')";
     } else {
     transformBody.dom.style.display = "none";
     listOfTransformHidden.dom.style.backgroundImage="url('image/jiantou-you.png')";
     }
     });

     var listOfTransformHelper = new UI.Panel();
     listOfTransformHelper.setClass('listOfMaterialHelp');
     transformHeader.add(listOfTransformHelper);
     */
    return container;
};
/*end*/