<?php
echo '<canvas id="bubble" width="720" height="120"></canvas>
<script type="text/javascript" src="../scripts/talkingbubble.js"></script>';
$msg = 'Hello, my name is Benjamin Malartre.I m a french computer graphist.I live and works in Paris.';
echo '<script type="text/javascript"> TalkingBubble("'.$msg.'");</script>';
?>