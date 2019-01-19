<?php

    if(count($_POST) == 0 || empty($_POST['CODE'])) {
        http_response_code(400);
        echo '<div class="invalidEntry">Invalid Parameter</div>';
        return;
    }
    $code = $_POST['CODE'];
    $returnVal;

    if(strcasecmp($code, 'ERICA') == 0) {
        http_response_code(200);
        $returnVal = '<div class="bookDownloadList">'.
                        '<h2>Download Links</h2><ul><li>'.
                        '<a href="./downloads/Sex in Zero Gravity - Erica Sparx.mobi">Kindle Mobi</a></li>'.
                        '<li><a href="./downloads/Sex in Zero Gravity - Erica Sparx.epub">EPub</a></li>'.
                        '<li><a href="./downloads/Sex in Zero Gravity - Erica Sparx.pdf">PDF</a></li></ul></div>';
    } else {
        http_response_code(400);
        $returnVal = '<div class="invalidEntry">Sorry, that\'s wrong, my dear.<div>';
    }
    echo $returnVal;
?>