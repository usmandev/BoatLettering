<?php
$request=$_REQUEST['request'];
if($request=="stockLogos")
{
    $subJson='';
    if ($handle = opendir('../images/cliparts'))
    {
        $FileCounter=1;
        while (false !== ($entry = readdir($handle)))
        {
            if(strpos($entry,".")==0)
                ;
            else
            {

                $filename = pathinfo($entry, PATHINFO_FILENAME);
                $extension =  pathinfo($entry, PATHINFO_EXTENSION);
                if($extension!='svg')
                $subJson.='{"logoID":'.$FileCounter++.',"logoName":"'.$filename.'","logoSVG":"images/cliparts/'.$filename.'.svg","logoFile":"images/cliparts/'.$filename.'.'.$extension.'"},';
            }
        }
        $subJson=substr($subJson, 0, -1);//Remove last comma(,)
        $json='{	"availableStockLogos":['.$subJson.']}';
        closedir($handle);
    }
    echo $json;
}
if($request=="customLogos")
{
    $subJson='';
    if ($handle = opendir('../images/user_images'))
    {
        $FileCounter=1;
        while (false !== ($entry = readdir($handle)))
        {
            if(strpos($entry,".")==0)
                ;
            else
            {

                $filename = pathinfo($entry, PATHINFO_FILENAME);
                $extension =  pathinfo($entry, PATHINFO_EXTENSION);
                if($extension!='svg')
                $subJson.='{"logoID":'.$FileCounter++.',"logoName":"'.$filename.'","logoFile":"images/user_images/'.$filename.'.'.$extension.'"},';
            }
        }
        $subJson=substr($subJson, 0, -1);//Remove last comma(,)
        $json='{	"availableCustomLogos":['.$subJson.']}';
        closedir($handle);
    }
    echo $json;
}
elseif($request=="textFonts")
{
    $json='{
   "availableFonts":[
      {
         "FontID":"F01",
         "fontName":"Clearface-Heavy",
         "fontFile":"fonts/Clearface-Heavy.otf"
      },
      {
         "FontID":"F02",
         "fontName":"GillSans",
         "fontFile":"fonts/GillSans.otf"
      },
      {
         "FontID":"F03",
         "fontName":"Helvetica",
         "fontFile":"fonts/Helvetica.otf"
      },
      {
         "FontID":"F04",
         "fontName":"Souvenir-Demi",
         "fontFile":"fonts/Souvenir-Demi.otf"
      },
      {
         "FontID":"F05",
         "fontName":"Arial",
         "fontFile":"fonts/Arial.otf"
      }
   ]
}';
    echo $json;

}
elseif($request=="textShapes")
{
    $json='{
   "availableShapes":[
		{
         "ShapeID":"S01",
         "ShapeName":"STRAIGHT"
      },
      {
         "ShapeID":"S02",
         "ShapeName":"curved"
      },
	  {
         "ShapeID":"S06",
         "ShapeName":"arc"
      },
      {
         "ShapeID":"S03",
         "ShapeName":"smallToLarge"
      },
      {
         "ShapeID":"S04",
         "ShapeName":"largeToSmallTop"
      },
      {
         "ShapeID":"S05",
         "ShapeName":"largeToSmallBottom"
      }
	  ,
      {
         "ShapeID":"S07",
         "ShapeName":"bulge"
      }
   ]
}';
    echo $json;

}

elseif($request=="availableSizes")
{
$style=$_REQUEST['style'];
	if($style=="CT845")
	$json='{
   "availableSizes":[
      "XXS",
      "XS",
      "M",
      "L",
      "XL",
      "2X",
      "3X"
   ]
}';
else
	$json='{
   "availableSizes":[
      
      "XS",
      "M",
      "L"
   ]
}';
	echo $json;
}

elseif($request=="availableLengths")
{
	$json='{
   "availableLengths":[
      "S",
      "P",
      "T"
   ]
}';
	echo $json;
}

elseif($request=="changeProductColor")
{
	$colorName=$_REQUEST['color'];
	$style=$_REQUEST['style'];
	if($style=="CT845")
	$json='{
     
      "productImages":[
         {
            "viewName":"Front",
            "imageFile":"images/products/'.$colorName.'-'.$style.'-1.png",
            "thumbnailImageFile":"images/products/'.$colorName.'-'.$style.'-thumb1.png",
			"customizableArea":{
				"left":"150px",
				"top":"80px",
				"width":"300px",
				"height":"500px"
			}
         },
         {
            "viewName":"Back",
            "imageFile":"images/products/'.$colorName.'-'.$style.'-2.png",
            "thumbnailImageFile":"images/products/'.$colorName.'-'.$style.'-thumb2.png",
			"customizableArea":{
				"left":"150px",
				"top":"80px",
				"width":"300px",
				"height":"500px"
			}
         },
         {
            "viewName":"Left Side",
            "imageFile":"images/products/'.$colorName.'-'.$style.'-3.png",
            "thumbnailImageFile":"images/products/'.$colorName.'-'.$style.'-thumb3.png",
			"customizableArea":{
				"left":"175px",
				"top":"250px",
				"width":"200px",
				"height":"300px"
			}
         },
         {
            "viewName":"Right Side",
            "imageFile":"images/products/'.$colorName.'-'.$style.'-4.png",
            "thumbnailImageFile":"images/products/'.$colorName.'-'.$style.'-thumb4.png",
			"customizableArea":{
				"left":"250px",
				"top":"250px",
				"width":"200px",
				"height":"300px"
			}
         }
      ]
   
}';
else
$json='{
     
      "productImages":[
         {
            "viewName":"Front",
            "imageFile":"images/products/'.$colorName.'-'.$style.'-1.png",
            "thumbnailImageFile":"images/products/'.$colorName.'-'.$style.'-thumb1.png",
			"customizableArea":{
				"left":"125px",
				"top":"110px",
				"width":"350px",
				"height":"225px"
			}
         }
      ]
   
}';
	echo $json;
}
elseif($request=="changeProduct")
{
	
	$style=$_REQUEST['style'];
	if($style=="CT842")
		$json='{
	   "cartLineInfo":{
		  "lineNumber":"1",
		  "styleNumber":"CT842",
		  "productName":"Another hat",
		  "productDesc":"I\'m in another extraordinary condition about you, my dear Femme. Our Femme is a lightweight, form-fitting, long sleeve zip-up hoodie for sexy girls and skinny boys. 100% cotton. Love it.",
		  "productImage":"images/image_hat.png",
		  "selectedColor":{
			 "colorID":"WHITE",
			 "colorName":"White",
			 "colorHexCode":"#FFFFFF",
			 "trimColorHexCode":""
		  },
		  "selectedSize":"L",
		  "selectedLength":"",
		  "price":"44.99",
		  "quantity":"1",
		  "productImages":[
			 {
				"viewName":"Front",
				"imageFile":"images/products/White-CT842-1.png",
				"thumbnailImageFile":"images/products/White-CT842-thumb1.png",
				"customizableArea":{
					"left":"125px",
					"top":"110px",
					"width":"350px",
					"height":"225px"
				}
			 }
		  ]
	   }
	}';
	else
	$json='{
   "cartLineInfo":{
      "lineNumber":"1",
      "styleNumber":"CT845",
      "productName":"American Apparel Unisex Fleece Zip Hoodie (Classic Lite)",
	  "productDesc":"I\'m in an extraordinary condition about you, my dear Femme. You take nothing seriously, but you take it all to heart. You cavort about the town as though it were yours...and isn\'t it? Our Femme is a lightweight, form-fitting, long sleeve zip-up hoodie for sexy girls and skinny boys. 100% cotton. Love it.",
	  "productImage":"images/girl_03.jpg",
      "selectedColor":{
         "colorID":"WHITE",
         "colorName":"White",
         "colorHexCode":"#FFFFFF",
         "trimColorHexCode":""
      },
      "selectedSize":"L",
      "selectedLength":"",
      "price":"44.99",
      "quantity":"1",
      "productImages":[
         {
            "viewName":"Front",
            "imageFile":"images/products/white-CT845-1.png",
            "thumbnailImageFile":"images/products/white-CT845-thumb1.png",
			"customizableArea":{
				"left":"150px",
				"top":"80px",
				"width":"300px",
				"height":"500px"
			}
         },
         {
            "viewName":"Back",
            "imageFile":"images/products/white-CT845-2.png",
            "thumbnailImageFile":"images/products/white-CT845-thumb2.png",
			"customizableArea":{
				"left":"150px",
				"top":"80px",
				"width":"300px",
				"height":"500px"
			}
         },
         {
            "viewName":"Left Side",
            "imageFile":"images/products/white-CT845-4.png",
            "thumbnailImageFile":"images/products/white-CT845-thumb4.png",
			"customizableArea":{
				"left":"250px",
				"top":"250px",
				"width":"200px",
				"height":"300px"
			}
         },
         {
            "viewName":"Right Side",
            "imageFile":"images/products/white-CT845-3.png",
            "thumbnailImageFile":"images/products/white-CT845-thumb3.png",
			"customizableArea":{
				"left":"175px",
				"top":"250px",
				"width":"200px",
				"height":"300px"
			}
         }
      ]
   }
}';
	echo $json;
}
elseif($request=="saveDimensions")
{
$json='{"message":"success"}';
echo $json;
}
elseif($request=="saveDesignWithoutObject")
{
	
	$json='{"message":"success"}';
	echo $json;
}
elseif($request=="saveDesign")
{
    define('UPLOAD_DIR', '../images/designs/');
    $img = $_POST['imageStr'];
    $img = str_replace('data:image/png;base64,', '', $img);
    $img = str_replace(' ', '+', $img);
    $data = base64_decode($img);
    $title = time();

    $file = UPLOAD_DIR . $title . '.jpg';
    //$path = "http://beta.technology-architects.com//customizer/images/designs/".$title . '.jpg';
    $path = "http://localhost:8888/boatlettering/images/designs/".$title . '.jpg';
    $success = file_put_contents($file, $data);
    if($success)
        $json='{"message":"success","image":"'.$path.'"}';
    else
        $json='{"message":"failure"}';

    echo $json;
}
elseif($request=="saveImage")
{
	
	define('UPLOAD_DIR', '../images/designs/');
	$img = $_POST['image'];
	$img = str_replace('data:image/png;base64,', '', $img);
	$img = str_replace(' ', '+', $img);
	$data = base64_decode($img);
	$title = time();
	$file = UPLOAD_DIR . $title . '.png';
	$path = "http://beta.technology-architects.com//customizer/images/designs/".$title . '.png';
	$success = file_put_contents($file, $data);
	if($success)
		$json='{"message":"success","image":"'.$path.'"}';
	else
		$json='{"message":"failure"}';
	echo $json;
}
elseif($request=="saveDesignAdmin")
{
	$name=$_REQUEST['name'];
	$email=$_REQUEST['email'];
	$json=$_REQUEST['json'];
	$imageStr=$_REQUEST['imageStr'];
	$size=filesize('designs.txt');
	$f=fopen('designs.txt','r+');
	$allData=fread($f,$size);
	fclose($f);
	$designs=json_decode($allData);
	$new =  count($designs->designs);
	
	$designs->designs[$new] = new stdClass();
	$designs->designs[$new]->Name=$name;
	$designs->designs[$new]->Email=$email;
	$designs->designs[$new]->JSON_str=$json;
	$designs->designs[$new]->Image_str=$imageStr;
	$data=json_encode($designs);
	$f=fopen('designs.txt','w+');
	fwrite($f, $data, strlen($data));
	fclose($f);
	$json='{"message":"success"}';
	echo $json;
}
elseif($request=="loadDesigns")
{
	
	$size=filesize('designs.txt');
	$f=fopen('designs.txt','r+');
	$json=fread($f,$size);
	fclose($f);
	
	echo $json;
}
elseif($request=="cartLineInfo")
{
	
	$json='{
   "cartLineInfo":{
      "lineNumber":"1",
      "styleNumber":"CT845",
      "productName":"American Apparel Unisex Fleece Zip Hoodie (Classic Lite)",
	  "productDesc":"I\'m in an extraordinary condition about you, my dear Femme. You take nothing seriously, but you take it all to heart. You cavort about the town as though it were yours...and isn\'t it? Our Femme is a lightweight, form-fitting, long sleeve zip-up hoodie for sexy girls and skinny boys. 100% cotton. Love it.",
	  "productImage":"images/girl_03.jpg",
      "selectedColor":{
         "colorID":"WHITE",
         "colorName":"White",
         "colorHexCode":"#FFFFFF",
         "trimColorHexCode":""
      },
      "selectedSize":"L",
      "selectedLength":"",
      "price":"44.99",
      "quantity":"1",
      "productImages":[
         {
            "viewName":"Front",
            "imageFile":"images/products/white-CT845-1.png",
            "thumbnailImageFile":"images/products/white-CT845-thumb1.png",
			"customizableArea":{
				"left":"150px",
				"top":"80px",
				"width":"300px",
				"height":"500px"
			}
         },
         {
            "viewName":"Back",
            "imageFile":"images/products/white-CT845-2.png",
            "thumbnailImageFile":"images/products/white-CT845-thumb2.png",
			"customizableArea":{
				"left":"150px",
				"top":"80px",
				"width":"300px",
				"height":"500px"
			}
         },
         {
            "viewName":"Left Side",
            "imageFile":"images/products/white-CT845-4.png",
            "thumbnailImageFile":"images/products/white-CT845-thumb4.png",
			"customizableArea":{
				"left":"250px",
				"top":"250px",
				"width":"200px",
				"height":"300px"
			}
         },
         {
            "viewName":"Right Side",
            "imageFile":"images/products/white-CT845-3.png",
            "thumbnailImageFile":"images/products/white-CT845-thumb3.png",
			"customizableArea":{
				"left":"175px",
				"top":"250px",
				"width":"200px",
				"height":"300px"
			}
         }
      ]
   }
}';
	echo $json;
}
elseif($request=="productDetails")
{
	$styleNumber=$_REQUEST['styleNumber'];
	$productName="American Apparel Unisex Fleece Zip Hoodie (Classic Lite)";
	$productDesc="I'm in an extraordinary condition about you, my dear Femme. You take nothing seriously, but you take it all to heart. You cavort about the town as though it were yours...and isn't it? Our Femme is a lightweight, form-fitting, long sleeve zip-up hoodie for sexy girls and skinny boys. 100% cotton. Love it.";
	$productImage="images/girl_03.jpg";
	$productPrice="44.99";
	$productColors='[
		  {
			 "colorID":"WHITE",
			 "colorName":"White",
			 "colorHexCode":"#FFFFFF",
			 "trimColorHexCode":""
		  },
		  {
			 "colorID":"YELLOW",
			 "colorName":"Yellow",
			 "colorHexCode":"#E5E61D",
			 "trimColorHexCode":""
		  },
		  {
			 "colorID":"RED",
			 "colorName":"Red",
			 "colorHexCode":"#BA2633",
			 "trimColorHexCode":""
		  },
		  {
			 "colorID":"GTNAV",
			 "colorName":"Green Tea w/ Navy",
			 "colorHexCode":"#90AA81",
			 "trimColorHexCode":"#162D4B"
		  },
		  {
			 "colorID":"CAGRS",
			 "colorName":"Cayenne w/ Grey Stone",
			 "colorHexCode":"#D45125",
			 "trimColorHexCode":"#6A6365"
		  }
	   ]';
	if($styleNumber=='CT842')
	{
		$productName="Another hat";
		$productDesc="I'm in another extraordinary condition about you, my dear Femme. Our Femme is a lightweight, form-fitting, long sleeve zip-up hoodie for sexy girls and skinny boys. 100% cotton. Love it.";
		$productImage="images/image_hat.png";
		$productPrice="22.99";
		$productColors='[
      {
         "colorID":"WHITE",
         "colorName":"White",
         "colorHexCode":"#FFFFFF",
         "trimColorHexCode":""
      },
      {
         "colorID":"YELLOW",
         "colorName":"Yellow",
         "colorHexCode":"#E5E61D",
         "trimColorHexCode":""
      },
      {
         "colorID":"ORANGE",
         "colorName":"Orange",
         "colorHexCode":"#BA2633",
         "trimColorHexCode":""
      }
   ]';
	}
	
	$json='{
   "productInfo":{
      "styleNumber":"CT845",
      "productName":"'.$productName.'",
	  "productDesc":"'.$productDesc.'",
	  "imageFile":"'.$productImage.'",
      "price":"'.$productPrice.'"
     
   }
}';
	echo $json;
}
elseif($request=="searchProducts")
{
	$json='{
   "productList":{
      "total":"100",
      "products":[
         {
			"thumbnailImageFile":"images/item4_09.jpg",
			"lineNumber":"1",
			"styleNumber":"CT845",
			"productName":"American Apparel Unisex Fleece Zip Hoodie (Classic Lite)"
         },
         {
			"thumbnailImageFile":"images/item2_07.jpg",
			"lineNumber":"1",
			"styleNumber":"CT842",
			"productName":"Another Hat"
         },
         {
			"thumbnailImageFile":"images/item3_07.jpg",
			"lineNumber":"1",
			"styleNumber":"CT843",
			"productName":"Another product"
         },
         {
			"thumbnailImageFile":"images/item1_07.jpg",
			"lineNumber":"1",
			"styleNumber":"CT844",
			"productName":"My product"
         }
      ]
   }
}';
	echo $json;
}
elseif($request=="availableColors")
{
	$styleNumber=$_REQUEST['style'];
	if($styleNumber=="CT845")
	$json='{
   "availableColors":[
      {
         "colorID":"WHITE",
         "colorName":"White",
         "colorHexCode":"#FFFFFF",
         "trimColorHexCode":""
      },
      {
         "colorID":"YELLOW",
         "colorName":"Yellow",
         "colorHexCode":"#E5E61D",
         "trimColorHexCode":""
      },
      {
         "colorID":"RED",
         "colorName":"Red",
         "colorHexCode":"#BA2633",
         "trimColorHexCode":""
      },
      {
         "colorID":"GTNAV",
         "colorName":"Green Tea w/ Navy",
         "colorHexCode":"#90AA81",
         "trimColorHexCode":"#162D4B"
      },
      {
         "colorID":"CAGRS",
         "colorName":"Cayenne w/ Grey Stone",
         "colorHexCode":"#D45125",
         "trimColorHexCode":"#6A6365"
      }
   ]
}';
else
$json='{
   "availableColors":[
      {
         "colorID":"WHITE",
         "colorName":"White",
         "colorHexCode":"#FFFFFF",
         "trimColorHexCode":""
      },
      {
         "colorID":"YELLOW",
         "colorName":"Yellow",
         "colorHexCode":"#E5E61D",
         "trimColorHexCode":""
      },
      {
         "colorID":"ORANGE",
         "colorName":"Orange",
         "colorHexCode":"#BA2633",
         "trimColorHexCode":""
      }
   ]
}';
	echo $json;
}
elseif($request=="textColors")
{
$json='{
   "availableTextColors":[
      {
         "textColorID":"C01",
         "colorName":"Red",
         "colorHexCode":"#AE3540"
      },
      {
         "textColorID":"C02",
         "colorName":"Orange",
         "colorHexCode":"#C54D2C"
      },
      {
         "textColorID":"C03",
         "colorName":"Peach",
         "colorHexCode":"#DE8B73"
      },
      {
         "textColorID":"C04",
         "colorName":"Gold",
         "colorHexCode":"#D08E40"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      },
      {
         "textColorID":"C05",
         "colorName":"Yellow",
         "colorHexCode":"#ECCC35"
      }
   ]
}';
    echo $json;

}
?>