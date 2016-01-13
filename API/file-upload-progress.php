<?php
error_reporting(E_ALL); 
ini_set("display_errors", 1);  
$error=0;

$subJson='';
	$uploads_dir = '../images/user_images/';
if(!is_dir($uploads_dir))
	mkdir($uploads_dir );

	$error=$_FILES["datafile"]["error"];
 {
    if ($error == UPLOAD_ERR_OK) {
		$FileCounter=1;
        $tmp_name = $_FILES["datafile"]["tmp_name"];
        $name = $_FILES["datafile"]["name"];
		$filename = pathinfo($name, PATHINFO_FILENAME);
        $filename=str_replace(" ","_",$filename);
        $filename=str_replace("%20","_",$filename);
        $filename=str_replace("&","_",$filename);
        $filename=str_replace("?","_",$filename);
        $filename=str_replace("(","_",$filename);
        $filename=str_replace(")","_",$filename);
        $filename=str_replace("[","_",$filename);
        $filename=str_replace("]","_",$filename);
		$extension =  pathinfo($name, PATHINFO_EXTENSION);
		$FinalFilename = $filename . '_' . $FileCounter++ . '.' . pathinfo($name, PATHINFO_EXTENSION);

		while (file_exists( $uploads_dir.'/'.$FinalFilename ))
  			  $FinalFilename = $filename . '_' . $FileCounter++ . '.' . $extension;
		
        if(move_uploaded_file($tmp_name, "$uploads_dir/$FinalFilename"))
		{
			list($width, $height, $type, $attr) = getimagesize($uploads_dir."/".$FinalFilename);
			$path=$uploads_dir."/".$FinalFilename;
			$path=str_replace("../","",$path);
			$subJson.='{"logoID":'.$FileCounter.',"imageFile":"'.$path.'","errorMessage":""},';
		}
		else
		{
			$subJson.='{"logoID":'.$FileCounter.',"imageFile":"'.$name.'","errorMessage":"error"},';
			$error=1;//Single file error
		}
		
    }
	else
	{	
		$error=1;//All files error
	}
}

$subJson=substr($subJson, 0, -1);
$json='{	"customLogoUploadResult":['.$subJson.']}';
if($error==1)
	echo "Error";
else
	echo $json;


function rename_file($path,$original)
{
	$ext = explode(".",$original);
	$part1=time();
	$newName=$part1.".".$ext[1];
	if (file_exists($path.$newName))
		rename_file($path,$newName);
	else
		return $newName;
}

?>