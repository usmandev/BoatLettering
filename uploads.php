<?php


$abs_media_path = '/opt/lampp/htdocs/usman-dev/boatlettering'.'/uploads/'; //$_SERVER['DOCUMENT_ROOT']
  
  $media_url = "http://production.technology-architects.com/usman-dev/boatlettering/order.html".'uploads/';
  $img = $_POST['img'];
  $img = str_replace('data:image/png;base64,', '', $img);
  $img = str_replace(' ', '+', $img);
  $data = base64_decode($img);
  $title = time();
  $file = $abs_media_path . $title . '.png';
  $path = $media_url.$title . '.png';
  $success = file_put_contents($file, $data);
  if($success){
   //$this->session->data['custom_img_path'][] = $path;
      //header($media_url.'Content-Disposition: attachment; filename="downloaded.svg"');
   $json='{"message":"success","image":"'.$path.'", "img":"'.$title.'.png"}';

  }else
   $json='{"message":"failure"}';
  echo $json;




//header("Content-type:application/svg");
//
//// It will be called downloaded.pdf
//echo header("Content-Disposition:attachment;filename='downloaded.svg'");
//// The PDF source is in original.pdf
//readfile("original.svg");

// $target_dir = "uploads/";
// 
//
//
//
////header($media_url'Content-Disposition: attachment; filename="downloaded.svg"');
// 
//$target_dir = "uploads/";
//echo $_FILES["svgBoat"];
//$target_file = $target_dir . basename($_FILES["svgBoat"]);
//$uploadOk = 1;
//$imageFileType = pathinfo($target_file,PATHINFO_EXTENSION);
//// Check if image file is a actual image or fake image
//if(isset($_POST["submit"])) {
//    $check = getimagesize($_FILES["svgBoat"]["tmp_name"]);
//    if($check !== false) {
//        echo "File is an image - " . $check["mime"] . ".";
//        $uploadOk = 1;
//    } else {
//        echo "File is not an image.";
//        $uploadOk = 0;
//    }
//}
//// Check if file already exists
//if (file_exists($target_file)) {
//    echo "Sorry, file already exists.";
//    $uploadOk = 0;
//}
//// Check file size
//if ($_FILES["svgBoat"]["size"] > 500000) {
//    echo "Sorry, your file is too large.";
//    $uploadOk = 0;
//}
//// Allow certain file formats
//if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
//&& $imageFileType != "gif" && $imageFileType != "svg" ) {
//    echo "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
//    $uploadOk = 0;
//}
//// Check if $uploadOk is set to 0 by an error
//if ($uploadOk == 0) {
//    echo "Sorry, your file was not uploaded.";
//// if everything is ok, try to upload file
//} else {
//    if (move_uploaded_file($_FILES["fileToUpload"]["tmp_name"], $target_file)) {
//        echo "The file ". basename( $_FILES["fileToUpload"]["name"]). " has been uploaded.";
//    } else {
//        echo "Sorry, there was an error uploading your file.";
//    }
//}
?>