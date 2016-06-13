/* Global Var Intilization */
var canvas;
var hailing;
var context;
var myLogos;
var myCustomLogos;
var debug;
var textSample;
var state;
var HeightInch;
var WidthInch =1.5;
var boatclone;
// past states
var undo = [];
// reverted states
var redo = [];
var obj, objHail;
var save_design_API = 'API/API.php?request=saveDesign';
//console.log( __dirname);
//var font = new canvas.Font('Ubuntu', __dirname + '/fonts/Ubuntu-B.ttf');
//
//font.addFace(__dirname + '/fonts/Ubuntu-Bold.ttf', 'bold');
//font.addFace(__dirname + '/fonts/Ubuntu-Italic.ttf', 'normal', 'italic');
//font.addFace(__dirname + '/fonts/Ubuntu-BoldItalic.ttf', 'bold', 'italic');
//
//canvas.contextContainer.addFont(font);  // when using createPNGStream or createJPEGStream

$(document).on('submit',function(){
    myFunc();
});
function myFunc() {
    //intial variable

    


    // var ActiveCanvas = $(".tab-style-1").children("ul").find("li").hasClass("active");//.hasClass("resp-tab-active");

    // Fabric Canvas intialization
    canvas = new fabric.Canvas('canvas');
    boatclone = window._canvas = new fabric.Canvas('boatclone');

    canvas.clear();
    boatclone.clear();
    // remove currently selected object
    canvas.remove(canvas.getActiveObject());    
    $this = $("#B_text1");

// Canvas Add Text Object
     textSample = new fabric.Text("Enter Text Here", {
        left: canvas.getWidth() / 2,
        top: canvas.getHeight() / 2,
         //fontSize:'48', we can do as well
        fontSize: function () {
            return 48;
        //    scaleY: 0.5;
        },
        fontStyle: '',
        fontFamily: 'Arial',
        angle: 0,
        renderOnAddRemove: false,
        backgroundColor: '',
        spacing: 1,
        scaleX: 1,
        shadow:'',
        scaleY: 1,
        maxWidth: 350,
        fontWeight: '',
        textAlign: 'center',       
        originX: 'center',
        originY: 'center',
        centerTransform: true
    });


     canvas.add(textSample);
     canvas.setActiveObject(canvas.item(canvas.getObjects().length-1));
    textSample.hasControls = false;
    canvas.item(0).lockMovementY = true;
    canvas.item(0).lockMovementX = true;
    canvas.item(0).selectable = false;
    canvas.renderAll();

   	canvas.on('selection:cleared', onDeSelected);
	canvas.on('object:selected', onSelected);
	canvas.on('selection:created', onSelected);
    
    function duplicateObj() {
       
  var obj = canvas.getActiveObject();
  var clone = fabric.util.object.clone(obj);
  
  //boatclone.set({left: 100,top: 100});
  boatclone.add(clone); 
}
$(".next, .hailing").click(function(){
   duplicateObj(); 
});
    
      
    $(document.body).on('change', '#fontFamily', function (e) {
        var Ffamily = $(this).val();
        $("#fontFamily option:selected").each(function () {
            obj = canvas.getActiveObject() || canvas.item(0),
                    text = e.target.value;
            obj.setFontFamily(Ffamily);                       
            //obj.scaleToHeight(52);
            canvas.renderAll();
           
        });


    });
  
    var initialColor = "#000";
    function updateColor(element, color) {

        // console.log(this.toRgbString(color));
        $(element).css("color",
                (color ? color.toHexString() : ""));
        obj = canvas.getActiveObject() || canvas.item(0);                    
        obj.setFill(color.toHexString());      
        // fabric.util.string.camelize(type.charAt(0).toUpperCase() + type.slice(1));
        canvas.renderAll();
      
    }
    
    function updateShadowColor(element,color){
        $(element).css("color",
                (color ? color.toHexString() : ""));                
                obj = canvas.getActiveObject() || canvas.item(0);
                obj.setShadow({
                    color: color.toHexString(),
                    blur: 2,
                    offsetX: -5,
                    offsetY: 5 
                });
                canvas.renderAll();
    }

    $(".custom").spectrum({
        color: initialColor,
        showPalette: true,
        palette: [
            ['black', 'white', 'blanchedalmond'],
            ['rgb(255, 128, 0);', 'hsv 100 70 50', 'lightyellow']
        ],
        move: function (color) {
            updateColor(obj, color);
        },
        hide: function (color) {
            updateColor(obj, color);
        }
    }
    );
      $(".shadowcolor").spectrum({
        color: initialColor,
        showPalette: true,
        palette: [
            ['black', 'white', 'blanchedalmond'],
            ['rgb(255, 128, 0);', 'hsv 100 70 50', 'lightyellow']
        ],
        change: function (color) {
            updateShadowColor(obj, color);
        },
        hide: function (color) {
            updateShadowColor(obj, color);
        }
    }
    );
    function updatebackColor(element, color) {
        $(element).css("color",
                (color ? color.toHexString() : ""));
        obj = canvas.getActiveObject() || canvas.item(0);     
        canvas.backgroundColor = color.toHexString();
        canvas.renderAll();
       
    }
    $(".customback").spectrum({
        color: 'white',
        showPalette: true,
        palette: [
            ['black', 'white', 'blanchedalmond'],
            ['rgb(255, 128, 0);', 'hsv 100 70 50', 'lightyellow']
        ],
        move: function (color) {
            updatebackColor(obj, color);
        },
        hide: function (color) {
            updatebackColor(obj, color);
        }
    }
    );

//canvas.on('object:scaling', onObjectScaled);
//
//function onObjectScaled(e) {
//    var obj = e.target;
//var origWidth = 40;
//var origHeight = 100;
//var origStrokeWidth = 3;
//    var factorHeight = origHeight / obj.getHeight();
//    var factorWidth = origWidth / obj.getWidth();
//    var factor;
//    if (factorHeight < factorWidth)
//        factor = factorHeight;
//    else
//        factor = factorWidth;
//    var newStrokeWidth = origStrokeWidth * factor;
//
//    obj.setStrokeWidth(newStrokeWidth);
//    canvas.renderAll();
//}

    function UpperCase() {
        var BoatString = textSample.getText();
        var UPPER = BoatString.toUpperCase();
       // fabric.util.string.capitalize(BoatString)
        obj = canvas.getActiveObject() || canvas.item(0);
        obj.setText(UPPER);
        canvas.renderAll();
        $('.uppercase').addClass('active');   
    }
    function LowerCase() {
        var BoatString = textSample.getText();
        var lower = BoatString.toLowerCase();
        obj = canvas.getActiveObject() || canvas.item(0);
       
        obj.setText(lower);
        canvas.renderAll();
        $('.uppercase').removeClass('active');
    }

    $(".uppercase").click(function () {
        $(this).toggleClass('hasUpper');
       return $(this).hasClass('hasUpper') ? UpperCase() : LowerCase();
    });

    function UFirst( ) {
        var BoatString = textSample.getText();
        BoatString = BoatString.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
        });
        // var cap = BoatString.charAt(0).toUpperCase() + BoatString.slice(1);  
//       console.log( fabric.util.string.camelize(BoatString.charAt(0).toUpperCase() + BoatString.slice(1)));
        obj = canvas.getActiveObject() || canvas.item(0);
        obj.setText(BoatString);
        canvas.renderAll();
        $('.capitalize').addClass('active');

    }

    function LFirst( ) {
        var BoatString = textSample.getText();
        BoatString = BoatString.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toLowerCase();
        });
        //var lcap = BoatString.charAt(0).toLowerCase() + BoatString.slice(1); 
        obj = canvas.getActiveObject() || canvas.item(0);
        obj.setText(BoatString);
        canvas.renderAll();
        $('.capitalize').removeClass('active');
    }

    $('.capitalize').click(function () {        
        $(this).toggleClass('hasCap');
        return $(this).hasClass('hasCap') ? UFirst() : LFirst();
    });

    function SCaps( ) {        
      
         var BoatString = textSample.getText()        
         fabric.util.string.capitalize(BoatString,true);
         obj = canvas.getActiveObject() || canvas.item(0);
         obj.setText(BoatString);
         canvas.renderAll();
    }

    function LCaps( ) {       
        obj = canvas.getActiveObject() || canvas.item(0);
        obj.setFontFamily('normal');
        canvas.renderAll();
    }


    $('.smallcap').click(function () {
        $(this).toggleClass('hasSCap');
        return $(this).hasClass('hasSCap') ? SCaps() : LCaps();
    });

    function setBold() {
        obj = canvas.getActiveObject() || canvas.item(0);
        //text = e.target.value;              
        obj.setFontWeight('bold');
        canvas.renderAll();
        $('.bold').addClass('active');
    }
    function rBold() {
        obj = canvas.getActiveObject() || canvas.item(0);
        // text = e.target.value;              
        obj.setFontWeight('normal');
        canvas.renderAll();
        $('.bold').removeClass('active');
    }
    $('.bold').click(function () {
        $(this).toggleClass('setBold');
        return $(this).hasClass('setBold') ? setBold() : rBold();
    });

    function setItalic() {
        obj = canvas.getActiveObject() || canvas.item(0);
        obj.setFontStyle('italic');
        canvas.renderAll();
        $('.italic').addClass('active');
    }
    function rItalic() {
        obj = canvas.getActiveObject() || canvas.item(0);
        obj.setFontStyle('normal');
        canvas.renderAll();
        $('.italic').removeClass('active');
    }
    $('.italic').click(function () {
        $(this).toggleClass('setItalic');
        return $(this).hasClass('setItalic') ? setItalic() : rItalic();
    });
    
    function LowerLeft(pickerColor){
        $this = $('.shadowBox');
         obj = canvas.getActiveObject() || canvas.item(0);  
         state = JSON.stringify(canvas);        
         undo.push(state);         
         obj.setShadow({
                    color: pickerColor.toHexString(),
                    blur: 2,
                    offsetX: -5,
                    offsetY: 5 
                });        
         canvas.renderAll();
         //$this.removeClass('leftB');
         //$this.removeClass('active');                                       
    }
    function NoShadowLL(){   
         $this = $('.shadowBox');
         canvas.loadFromJSON(state, function() {     
         canvas.renderAll(state);
         //$this.addClass('leftB');
         //$this.addClass('rigtB');
         //$this.addClass('leftT');
        });
//         obj = canvas.getActiveObject() || canvas.item(0);    
//         state.push(obj);
//         canvas.renderAll.bind(state[state.length - 1]);
    }
    function TopLeft(pickerColor){       
        obj = canvas.getActiveObject() || canvas.item(0);
         state = JSON.stringify(canvas);     
         undo.push(state);
                obj.setShadow({
                    color: pickerColor.toHexString(),
                    blur: 2,
                    offsetX: -5,
                    offsetY: 0 
                });
                canvas.renderAll();
              //console.log(  $this.find('leftB'))//.removeClass('active')
                //$this.addClass('active');  
    }
    function LowerRight(pickerColor){
       obj = canvas.getActiveObject() || canvas.item(0);
         state = JSON.stringify(canvas);     
         undo.push(state);
                obj.setShadow({
                    color: pickerColor.toHexString(),
                    blur: 2,
                    offsetX: 0,
                    offsetY: 5 
                });
                canvas.renderAll();
                //$this.removeClass('rigtB');
                //$this.removeClass('active');  
    }
    function TopRight(pickerColor) {
           obj = canvas.getActiveObject() || canvas.item(0);
         state = JSON.stringify(canvas);     
         undo.push(state);
                obj.setShadow({
                    color: pickerColor.toHexString(),
                    blur: 2,
                    offsetX: 5,
                    offsetY: 5 
                });
                canvas.renderAll();
                //$this.removeClass('rigtB');
                //$this.removeClass('active');  
    }
    
    $('.shadowBox').click(function(){        
      var pickerColor = $('.shadowcolor').spectrum("get");               
         $(this).hasClass('leftB') ? LowerLeft(pickerColor) : NoShadowLL();
         $(this).hasClass('leftT') ? TopLeft(pickerColor) : NoShadowLL();
         $(this).hasClass('rigtB') ? LowerRight(pickerColor) : NoShadowLL();
           $(this).hasClass('rigtT') ? TopRight(pickerColor) : NoShadowLL();
         
    });
    $this.on('keyup', function (e) {
        obj = canvas.getActiveObject() || canvas.item(0),
                text = e.target.value;
             
        if (!obj || obj.type !== 'text')
            return;

        obj.setText($this.val());
        canvas.setActiveObject(obj);
        //console.log(JSON.stringify(canvas));
       // canvas.renderAll();
    });
//  $('.registration, .graphics').click(function(event){            
//            var regNum = window._canvas = new fabric.Canvas('boatClonereg');
//            var boatGraphics = window._canvas = new fabric.Canvas('graphicBoat');  
//            canvas.renderAll();
//            var data = canvas.toSVG();  
//            
////            fabric.loadSVGFromString(data, function(objects, options) {
////               var  obj = fabric.util.groupSVGElements(objects, options);
////                boatclone.add(obj).renderAll();
////                regNum.add(obj).renderAll();
////  
////});
//            //boatclone.loadFromJSON(data, canvas.renderAll.bind(canvas));
//            regNum.loadFromJSON(data, canvas.renderAll.bind(canvas));
//            boatGraphics.loadFromJSON(data, canvas.renderAll.bind(canvas));
////             fabric.Text.fromObject = function(object) {
////                return new fabric.Text(object.text, clone(object));
////                boatclone.add(canvas.renderAll.bind(canvas))
////            };
//                 
//            });             
     
          // canvas.setActiveObject(canvas.item(canvas.getObjects().length-1));
            $("#my_text_shape").change(function(){                                             
                    var props = {};
                    obj = canvas.getActiveObject();                     
                  if(obj){
                       if($(this).val()=='ITALIC') {
                var default_text = obj.getText();
                props = obj.toObject();
                delete props['type'];
                var textSample = new fabric.Text(default_text, props);
                textSample.setFontStyle('italic');
                canvas.renderAll();
                textSample.hasControls = false;
                textSample.lockMovementY = true;
                textSample.lockMovementX = true;
                textSample.selectable = false;
                                   
            }
           else if(/curvedText/.test(obj.type) && $(this).val()=='STRAIGHT') {
                var default_text = obj.getText();
                props = obj.toObject();
                delete props['type'];
                textSample = new fabric.Text(default_text, props);
                textSample.hasControls = false;
                textSample.lockMovementY = true;
                textSample.lockMovementX = true;
                textSample.selectable = false;
            }else if(/text/.test(obj.type) && $(this).val()=='curved'||'arc') {                   
                var default_text = obj.getText();
                props = obj.toObject();
                delete props['type'];
                props['textAlign'] = 'center';
                props['radius'] = 120;
                props['spacing'] = 20;
                textSample = new fabric.CurvedText(default_text, props);               
                textSample.hasControls = false;
                textSample.lockMovementY = true;
                textSample.lockMovementX = true;
                textSample.selectable = false;
                
            }
            canvas.remove(obj);           
            canvas.add(textSample).renderAll();           
            canvas.setActiveObject(canvas.item(0));
        }                                    
            });
            function onSelected(){
	var obj = canvas.getActiveObject();
    $('#B_text1').val(obj.getText());
   
}

function updateOuterBorder(element,color){
     // console.log(this.toRgbString(color));
        $(element).css("color",
                (color ? color.toHexString() : ""));
                   
        obj = canvas.getActiveObject() || canvas.item(0);                    
        obj.set({
            borderColor: color.toHexString(),
            cornerColor: color.toHexString(),
            cornerSize: 6
            });
      
        canvas.renderAll();
}
   $(".outBorder").spectrum({
        color: initialColor,
        showPalette: true,
        palette: [
            ['black', 'white', 'blanchedalmond'],
            ['rgb(255, 128, 0);', 'hsv 100 70 50', 'lightyellow']
        ],
        move: function (color) {
            updateOuterBorder(obj, color);
        },
        hide: function (color) {
            updateOuterBorder(obj, color);
        }
    });
function onDeSelected(){
    $('#B_text1').val('');
  
}
           
                        fabric.util.object.extend(fabric.Text.prototype, {
letterSpace: 0,
_renderChars: function (method, ctx, chars, left, top) {
    if (!this.letterSpace) {
        ctx[method](chars, left, top);
        return;
    }
    var characters = String.prototype.split.call(chars, '');
   
    if(this.textAlign == 'left'){
        var charShift = 0;
        for (var i = 0; i < characters.length; i++) {
            if (i > 0) {
                charShift += this.letterSpace + ctx.measureText(chars.charAt(i - 1)).width;
                console.log(charShift);
            }
            ctx[method](chars.charAt(i), left + charShift, top);
        }    
    }else if(this.textAlign == 'right'){

        characters.reverse();
        chars = characters.join('');
        var charShift = 0;
        for (var i = 0; i < characters.length; i++) {
            if (i > 0) {
                charShift += this.letterSpace + ctx.measureText(chars.charAt(i - 1)).width;
            }
            ctx[method](chars.charAt(i), left - charShift, top);
        }    
    }else if(this.textAlign == 'center'){

        var totalWidth = 0;
        for (var i = 0; i < characters.length; i++) {            
            totalWidth += (ctx.measureText(characters[i]).width + this.letterSpace);
        }
        console.log(left);
        var currentPosition = left;  // - (totalWidth / 2);

        var charShift = 0;
        for (var i = 0; i < chars.length; i++) {
            if (i > 0) {
                charShift += this.letterSpace + ctx.measureText(chars.charAt(i - 1)).width;
            }
            ctx[method](chars.charAt(i), currentPosition + left + charShift, top);
        }    
    }

},
//_getLineWidth: function (ctx, lineIndex) {
//    var lineLength = this._textLines[lineIndex].length;
//    var additionalSpaceSum = 0
//    if (lineLength > 0) {
//        additionalSpaceSum = this.letterSpace * (lineLength - 1);
//    }
//    this.__lineWidths[lineIndex] = ctx.measureText(this._textLines[lineIndex]).width + additionalSpaceSum;
//    return this.__lineWidths[lineIndex];
//}
});
            
            this.AddSpace = function(){
        
                textSample.letterSpace=textSample.letterSpace+3;                 
                canvas.renderAll();
            };
            
               this.LessSpace = function(){
                textSample.letterSpace=textSample.letterSpace-3; 
                canvas.renderAll();
            };
          this.ExpandSpace = function(){
              textSample.set('fontSize',textSample.getFontSize()+1);
//                      set(
//                       {
//                   left: canvas.width/2,
//                   top: canvas.height/2,
//                   scaleY: textSample.height-=textSample.height+2,                   
//                   scaleX: textSample.width-=textSample.width+2
//                            });
                            textSample.setCoords();
                            canvas.renderAll();
            };
            
            this.CondensedSpace= function(){
                
              textSample.set('fontSize',textSample.getFontSize()-1);
//                       set(
//                       {
//                   left: canvas.width/2,
//                   top: canvas.height/2,
//                   scaleY: textSample.height-=textSample.height-1,                   
//                   scaleX: textSample.width-=textSample.width-1
//                            });
                             textSample.setCoords();
                            canvas.renderAll();
                
               
            };
           
$(".addspace").click(function(){
    
    AddSpace();
});

$(".lessspace").click(function(){
    
    LessSpace();
});

$(".expand-letter").click(function(){
    
    ExpandSpace();
});

$(".condensed-letter").click(function(){
    
    CondensedSpace();
});

    function rgb2hex(rgb) {
        rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
        return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
    }

fabric.Object.prototype.toObject = (function (toObject) {
    return function () {
        return fabric.util.object.extend(toObject.call(this), {
            Id: 123,
            variant:'small-caps'
        });
    };
})(fabric.Object.prototype.toObject);
textSample.Id='123';
//console.log(JSON.stringify(canvas.toDatalessJSON()));
this.getSelection = function getSelection(){
  return canvas.getActiveObject() == null ? canvas.getActiveGroup() : canvas.getActiveObject()
};

}

function ChnageHeighIn(){
    var changeHeight = $(".heightF").children('select');
     changeHeight.on('change',function(){
         var abc = $(this).val();
        HeightInch = abc.split('"')[0];
//        obj = canvas.getActiveObject() || canvas.item(0);
//        obj.scaleToHeight(fabric.util.parseUnit(HeightInch + 'in'));
//   // if($(".widthF").children('select').val('3"').change())
//    //obj.scaleToWidth(fabric.util.parseUnit(WidthInch + 'in'));     
//        var bound = obj.getBoundingRect();
//        
//    canvas.width = Math.ceil(bound.width);
//    canvas.height = Math.ceil(bound.height);
//    canvas.left = textSample.getWidth(),
//    canvas.top = textSample.getHeight(),
//
//    canvas.renderAll();    
        $.ajax({
            url: "", 
            success: function(result){
            $(".price").find('h4').html("$"+HeightInch+".00");
        }
    });
    
         
     }); 
}
function Hailing() {
    hailing = new fabric.Canvas('hailing');
//      hailing.clear();  
//      hailing.remove(hailing.getActiveObject());
    $hailCan = $("#B_text2");
    var HailingText = new fabric.Text("Enter Text Here", {
        left: canvas.getWidth() / 2,
        top: 80,
        fontSize: function () {
            return 49;
        },
        fontStyle: 'italic',
        fontFamily: 'Arial',
        angle: 0,
        spacing: 1,
        scaleX: 1,
        scaleY: 1,
        fontWeight: '',
        textAlign: 'center',
        originX: 'center',
        originY: 'center',
        hasRotatingPoint: true,
        centerTransform: true
    });
    hailing.add(HailingText);
    HailingText.hasControls = false;
    hailing.item(0).lockMovementY = true;
    hailing.item(0).lockMovementX = true;
    hailing.renderAll();
    //hailing.setActiveObject(hailing.item(0));

    $hailCan.on('keyup', function (e) {
        objHail = hailing.getActiveObject() || hailing.item(0),
                text = e.target.value;
        if (!objHail || objHail.type !== 'text')
            return;

        objHail.setText(text);

        hailing.renderAll();
    });
      
    var initialColor = "#000";
    function updateHailColor(element, color) {

        // console.log(this.toRgbString(color));
        $(element).css("color",
                (color ? color.toHexString() : ""));
                   
        objHail = hailing.getActiveObject() || hailing.item(0);
       
        objHail.setFill(color.toHexString());       
      
      
        hailing.renderAll();
    }
      $(".customHail").spectrum({
        color: initialColor,
        showPalette: true,
        palette: [
            ['black', 'white', 'blanchedalmond'],
            ['rgb(255, 128, 0);', 'hsv 100 70 50', 'lightyellow']
        ],
        move: function (color) {
            updateHailColor(objHail, color);
        },
        hide: function (color) {
            updateHailColor(objHail, color);
        }
    });
    
        function updatebackHailColor(element, color) {
        $(element).css("color",
                (color ? color.toHexString() : ""));
       
        objHail = hailing.getActiveObject() || hailing.item(0);
        hailing.backgroundColor = color.toHexString();
        hailing.renderAll();
    }
    
     $(".custombackHailing").spectrum({
        color: 'white',
        showPalette: true,
        palette: [
            ['black', 'white', 'blanchedalmond'],
            ['rgb(255, 128, 0);', 'hsv 100 70 50', 'lightyellow']
        ],
        move: function (color) {
            updatebackHailColor(objHail, color);
        },
        hide: function (color) {
            updatebackHailColor(objHail, color);
        }
    }
    );
         function UpperCase() {
        var HailingString = HailingText.getText();
        var UPPER = HailingString.toUpperCase();
       // fabric.util.string.capitalize(BoatString)
        objHail = hailing.getActiveObject() || hailing.item(0);
        objHail.setText(UPPER);
        hailing.renderAll();
        $('.uppercaseHail').addClass('active');   
    }
    function LowerCase() {
        var HailingString = HailingText.getText();
        var lower = HailingString.toLowerCase();
        objHail = hailing.getActiveObject() || hailing.item(0);
        objHail.setText(lower);
        hailing.renderAll();
        $('.uppercaseHail').removeClass('active');
    }

    $(".uppercaseHail").click(function () {
        $(this).toggleClass('hasUpper');
        $(this).hasClass('hasUpper') ? UpperCase() : LowerCase();
    });
        function UFirst( ) {
        var HailingString = HailingText.getText();
        HailingString = HailingString.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toUpperCase();
        });
        // var cap = BoatString.charAt(0).toUpperCase() + BoatString.slice(1);  
//       console.log( fabric.util.string.camelize(BoatString.charAt(0).toUpperCase() + BoatString.slice(1)));
        objHail = hailing.getActiveObject() || hailing.item(0);
        objHail.setText(HailingString);
        hailing.renderAll();
        $('.capitalizeHail').addClass('active');

    }

    function LFirst( ) {
        var HailingString = HailingText.getText();
        HailingString = HailingString.toLowerCase().replace(/\b[a-z]/g, function (letter) {
            return letter.toLowerCase();
        });
        //var lcap = BoatString.charAt(0).toLowerCase() + BoatString.slice(1); 
        objHail = hailing.getActiveObject() || hailing.item(0);
        objHail.setText(HailingString);
        hailing.renderAll();
        $('.capitalizeHail').removeClass('active');
    }

    $('.capitalizeHail').click(function () {        
        $(this).toggleClass('hasCap');
        return $(this).hasClass('hasCap') ? UFirst() : LFirst();
    }); 
    
    
     function setBold() {
        objHail = hailing.getActiveObject() || hailing.item(0);
        //text = e.target.value;              
        objHail.setFontWeight('bold');
        hailing.renderAll();
        $('.boldHail').addClass('active');
    }
    function rBold() {
        objHail = hailing.getActiveObject() || hailing.item(0);
        // text = e.target.value;              
        objHail.setFontWeight('normal');
        hailing.renderAll();
        $('.boldHail').removeClass('active');
    }
    $('.boldHail').click(function () {
        $(this).toggleClass('setBold');
        return $(this).hasClass('setBold') ? setBold() : rBold();
    });
      function setItalic() {
        objHail = hailing.getActiveObject() || hailing.item(0);
        objHail.setFontStyle('italic');
        hailing.renderAll();
        $('.italicHail').addClass('active');
    }
    function rItalic() {
        objHail = hailing.getActiveObject() || hailing.item(0);
        objHail.setFontStyle('normal');
        hailing.renderAll();
        $('.italicHail').removeClass('active');
    }
    $('.italicHail').click(function () {
        $(this).toggleClass('setItalic');
        return $(this).hasClass('setItalic') ? setItalic() : rItalic();
    });
    
    this.AddhSpace = function() {

        fabric.util.object.extend(fabric.Text.prototype, {
            letterSpace: 0,
            _renderChars: function(method, ctx, chars, left, top) {
                if (!this.letterSpace) {
                    ctx[method](chars, left, top);
                    return;
                }
                var charShift = 0;
                for (var i = 0; i < chars.length; i++) {
                    if (i > 0) {
                        charShift += this.letterSpace + ctx.measureText(chars.charAt(i - 1)).width;
                        //console.log(charShift);
                    }
                    ctx[method](chars.charAt(i), left + charShift, top);
                }
            },
            _getLineWidth: function(ctx, lineIndex) {
                var lineLength = this._textLines[lineIndex].length;
                var lineWidth = this._textLines[lineIndex];
                var additionalSpaceSum = 0
                if (lineLength > 0) {
                    additionalSpaceSum = this.letterSpace * (lineLength - 1);
                }
//        
//        this.__lineWidths[lineIndex] = ctx.measureText(lineLength).width + additionalSpaceSum;
//        return this.__lineWidths[lineIndex];
            }
        });
        HailingText.letterSpace = 3;
        hailing.renderAll();
    };
       
    this.updateOutHailBorder = function(element, color){
        $(element).css("color",
                (color ? color.toHexString() : ""));
       
        objHail = hailing.getActiveObject() || hailing.item(0);
        //hailing.backgroundColor = ;
        HailingText.setStroke(color.toHexString());
        hailing.renderAll();
        

    };    
      this.LesshSpace = function(){
                HailingText.letterSpace=0; 
                hailing.renderAll();
            };
            
            this.ExpandhSpace = function(){
                HailingText.set('scaleX',2); 
                hailing.renderAll();
            };
            
            this.CondensedhSpace= function(){
                 HailingText.set('scaleX',1); 
                hailing.renderAll();
            };
            this.outBorderless = function(){
                HailingText.setStrokeWidth(1);
                hailing.renderAll();
            };
            this.outBorderInc = function(){
                 HailingText.setStrokeWidth(4);
                hailing.renderAll();
            };
            
    $(".addhspace").click(function(){
    
        AddhSpace();
    });
$(".lesshspace").click(function(){   
    LesshSpace();
});
$(".expandh").click(function(){
    
    ExpandhSpace();
});

$(".lessh").click(function(){
    
    CondensedhSpace();
});
$(".outborder-l").click(function(){
    outBorderless();
});
$(".outborder-h").click(function(){
    outBorderInc();
});

  $(".outHailBorder").spectrum({
        color: initialColor,
        showPalette: true,
        palette: [
            ['black', 'white', 'blanchedalmond'],
            ['rgb(255, 128, 0);', 'hsv 100 70 50', 'lightyellow']
        ],
        move: function (color) {
            updateOutHailBorder(objHail, color);
        },
        hide: function (color) {
            updateOutHailBorder(objHail, color);
        }
    });
    $('.boat-name, .hailing .registration, .graphics,.next').click(function(e) {
        // var boatclone = new fabric.Canvas('boatclone');   
        var chail = window._canvas = new fabric.Canvas('CopyHailCanvas');
        var regNum = window._canvas = new fabric.Canvas('boatClone');
        var boatGraphics = window._canvas = new fabric.Canvas('graphicBoat');
        //chail.clear();
        var data = JSON.stringify(hailing);
        chail.loadFromJSON(data, hailing.renderAll.bind(hailing));
        regNum.loadFromJSON(data, hailing.renderAll.bind(hailing));
        boatGraphics.loadFromJSON(data, hailing.renderAll.bind(hailing));
//             fabric.Text.fromObject = function(object) {
//                return new fabric.Text(object.text, clone(object));
//                boatclone.add(canvas.renderAll.bind(canvas))
//            };
////            function(o,object){
//               
//            });                  
    });
    
    
    $(document.body).on('change', '#fontFamilyhail', function(e) {
        var Ffamily = $(this).val();
//        console.log(Ffamily);
        objHail = hailing.getActiveObject() || hailing.item(0),
                text = e.target.value;

        objHail.setFontFamily(Ffamily);
        hailing.renderAll();
    });

}
function RegCanvas() {
    var reg = new fabric.Canvas('Reg');
    
    var boatreg = new fabric.Canvas('boatClonereg');
//    var imgElement = document.getElementById('my-image');
////    var imgInstance = new fabric.Image(imgElement, {
////        left: 100,
////        top: 100,
////        angle: 30,
////        opacity: 0.85
////    });
//    
//   
//         boatreg.add(imgInstance);
//         boatreg.renderAll();
//    
   
     $regInput  = $("#entername");
    var RegText = new fabric.Text("Enter Reg #", {
        fontFamily: 'Comic Sans',
        left: 220,//() / 2,
        top: 20,//reg.getHeight() / 2,
        angle: 0,
        spacing: 1,
        scaleX: 1,
        scaleY: 1,
        fontWeight: '',
        textAlign: 'center',
        originX: 'center',
        originY: 'center',
        hasRotatingPoint: true,
        centerTransform: true,
        hasControls: false
    });

    reg.add(RegText);
    reg.renderAll();
        $regInput.on('keyup', function (e) {
        obj = reg.getActiveObject() || reg.item(0),
                text = e.target.value;
             
        if (!obj || obj.type !== 'text')
            return;

        obj.setText($regInput.val());
        canvas.setActiveObject(obj);
       
    });

}



function exportSVG() {
    
//    if(HeightInch == undefine){
//        HeightInch = 236;
//    }
     obj = canvas.getActiveObject() || canvas.item(0);
     canvas.renderAll();
        
    
    var svgBoat = canvas.toSVG({
            viewBox: {
        x: 0,
        y: 0,
        width: canvas.getWidth(),
        height: canvas.getHeight()
    }
});

        //var svgString = new XMLSerializer().serializeToString(svgBoat);
        var imageStr = canvas.toDataURL(svgBoat);
        
        data = {'img':imageStr};
  $.ajax({
            url: 'uploads.php',
            type: "POST",
            data: data,
            success: function (data) {
                alert('Design has been saved to database');
            },

            error: function (result) {
                alert('Error occurred, please try again later!');
            }
        });
    

//    var svgHail = hailing.toSVG();
    var data = "data:image/svg+xml," + encodeURIComponent(svgBoat);
   
   
   
//    var Haildata = "data:image/svg+xml," + encodeURIComponent(svgHail);
    //window.open(data);
//    winddow.open(HailData);
    
 

  
//      fabric.loadSVGFromString( svg , function (objects, options) {
//         fabric.util.groupSVGElements(objects, options);
//      canvas.set(
//        svg.left + 0.5,
//        svg.top + 0.5,
//        svg.width,
//        svg.height
//      );
////     canvas.add(obj).centerObject(obj);
////     obj.setCoords();
////    canvas.calcOffset();
//     canvas.renderAll();
//     var previewSVG = canvas.toSVG();
//     var data = "data:image/svg+xml," + encodeURIComponent(previewSVG);
//     
//     window.open(data);
//   });

// 


}







