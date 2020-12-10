<?php

define('PAGES_DIR', __DIR__ . '/pages/');

require_once __DIR__ . '/helpers/functions.php';

?><!DOCTYPE HTML>
<html>
<?php
render('layout/_head');
?>
<body>
<div class="main__wrapper main__wrapper--styleguide">
    <!-- STYLEGUIDE -->

    <!-- logo -->
    <section class="section styleguide__section section--logo">
        <div class="container styleguide__container">
            <svg class="icon icon-badel">
                <use xlink:href="<?= bu('static/ui/svg/symbol-defs.svg#icon-badel'); ?>">
                </use>
            </svg>
        </div>
    </section>
    <!-- //logo -->

    <!-- pages -->
    <section class="section styleguide__section section--pages">

        <div class="section__heading">
            <div class="container styleguide__container">
                <p class="styleguide__heading">
                    Pages
                </p>
            </div>
        </div>
        <div class="container styleguide__container">
            <ul class="styleguide__pages">
                <?php
                $dirs = array_filter(glob(PAGES_DIR . '*'), 'is_dir');
                
                foreach($dirs as $directory) {
                    $pageDir = getPageDir(PAGES_DIR, $directory);
                    $subPages = getFirstLevelPages(PAGES_DIR . $pageDir);
                    ?>
                    <li><?= strtoupper($pageDir) ?></li>
                    <?php
                    
                    foreach($subPages as $subPage) { ?>
                        <li><a target="_blank" href="<?= getPageUrl($subPage) ?>"><?= getPageName($subPage) ?></a></li>
                    <?php }
                    
                } ?>
            </ul>
        </div>

        <i class="styleguide__separator"></i>

    </section>
    <!-- //pages -->

    <!-- //STYLEGUIDE -->
</div>
<?php
render('layout/_scripts');
?>
</body>
</html>