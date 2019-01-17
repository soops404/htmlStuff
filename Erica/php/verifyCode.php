<?php

    if(count($_GET) == 0 || empty($_GET['CODE'])) {
        echo 'Invalid Parameter';
        return;
    }
    $code = $_GET['CODE'];
    $returnVal;

    if(strcasecmp($code, 'ERICA') == 0) {
        $returnVal = '<a href="/gitrep/erica/myBook.txt">My Book</a>';
    } else {
        $returnVal = "Sorry, that's wrong, my dear.";
    }
    echo $returnVal;
?>