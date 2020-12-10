<?php

/*
 * project name
 */

defined('LOCALHOST') or define('LOCALHOST', strpos($_SERVER['HTTP_HOST'], '.loc') === false ? false : true);

CONST PROJECT_NAME = 'may-1st-reboot-2017/karlo-videk';


function render($filePath, array $data = []) {
    $path = __DIR__ . '/../' . ltrim(rtrim($filePath, '/'), '/') . '.php';
    if (file_exists($path)) {
        extract($data, EXTR_OVERWRITE);
        require($path);
    } else {
        throw new Exception('File does not exists: ' . $path);
    }
}


/**
 * @param $baseDir
 * @param $dirname
 * @return string
 */
function getPageDir($baseDir, $dirname) {
    return str_replace('/', '', str_replace($baseDir, '', $dirname));
}

/**
 * @param $filePath
 * @return string
 */
function getPageName($filePath) {
    $chunks = explode('/', $filePath);
    
    return ucwords(str_replace('.php', '', end($chunks)));
}

/**
 * @param $dirName
 * @return array
 */
function getFirstLevelPages($dirName) {
    return glob(rtrim($dirName, '/') . '/*.php');
}

/**
 * @param $filePath
 * @return string
 */
function getPageUrl($filePath) {
    return 'pages/' . str_replace(PAGES_DIR, '', $filePath);
}

/*
 * base URL function
 */

//function bu($fileurl)
//{
//    $prefix = LOCALHOST === true ? '/' : '/yapp/';
//
//    return $prefix . PROJECT_NAME . '/' . $fileurl;
//}

function bu($fileurl) {
    //dwp
    //return "/" . PROJECT_NAME . "/wp-content/themes/" . PROJECT_NAME . "/" . $fileurl;

    //yapp
//    return "/yapp/may-1st-reboot-2017/".PROJECT_NAME."/". $fileurl;
    return $fileurl;

}