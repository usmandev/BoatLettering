<?php
/*********************************************
* Fitting text to arc
*
* TextOnArc
* Author   :  Barand July 2007
**********************************************/
$im = imagecreate(400,400);

$white = imagecolorallocate($im, 0xFF, 0xFF, 0xFF);
$grey  = imagecolorallocate($im, 0xCC, 0xCC, 0xCC);
$txtcol = imagecolorallocate($im, 0xFF, 0x00, 0x00);

$s = 220;
$e = 320;
$r = 100;
$cx = 200;
$cy = 200;
$txt = $_REQUEST['text'];
$font = 'c:/windows/fonts/arial.ttf';


imagearc($im,$cx,$cy,$r*2,$r*2,$s,$e,$grey);
textOnArc($im,$cx,$cy,$r,$s,$e,$txtcol,$txt,$font,12);

header("content-type: image/png");
imagepng($im);
imagedestroy($im);

function textOnArc($im,$cx,$cy,$r,$s,$e,$txtcol,$txt,$font,$size)
{
    $tlen = strlen($txt);
    $arclen = deg2rad($e - $s);
    $perChar = $arclen/($tlen-1);              // monospaced text - you may want to measure each char and
                                               // space proportionally
    for ($i=0, $theta = deg2rad($s); $i < $tlen; $i++, $theta+=$perChar)
    {
        $ch = $txt{$i};
        $tx = $cx + $r*cos($theta);
        $thank_you = $cy + $r*sin($theta);
        $angle = rad2deg(M_PI*3/2 - $theta);
        imagettftext($im, $size, $angle, $tx, $thank_you, $txtcol, $font, $ch);
    }
}
?>