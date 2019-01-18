<?php

    if(count($_GET) == 0 || empty($_GET['CODE'])) {
        echo '<div class="invalidEntry">Invalid Parameter</div>';
        return;
    }
    $code = $_GET['CODE'];
    $returnVal;

    if(strcasecmp($code, 'ERICA') == 0) {
        $returnVal = '<div class="bookDownloadList">'.
                        '<h2>Download Links</h2><ul><li>'.
                        '<a href="./downloads/Sex in Zero Gravity - Erica Sparx.mobi">Kindle Mobi</a></li>'.
                        '<li><a href="./downloads/Sex in Zero Gravity - Erica Sparx.epub">EPub</a></li>'.
                        '<li><a href="./downloads/Sex in Zero Gravity - Erica Sparx.pdf">PDF</a></li></ul></div>';
    } else {
        $returnVal = '<div class="invalidEntry">Sorry, that\'s wrong, my dear.<div>';
    }
    echo $returnVal;
?>