<?php
// must be here
require_once __DIR__ . '/helpers/functions.php';
?>

<!DOCTYPE HTML>
<html>
<?php
render('layout/_head');
?>
<body>
<!-- HEADER -->
<?php
render('layout/partials/_navigation');
?>

<!-- LOADER -->
<div class="loader__wrapper" data-js="loader-wrapper">
    <div class="loader" data-js="loader">
        <div class="loader__segment loader__segment--1" data-js="loader-segment">
            <i class="loader__segment-inner" data-js="loader-segment-inner"></i>
        </div>
        <div class="loader__segment loader__segment--2" data-js="loader-segment">
            <i class="loader__segment-inner" data-js="loader-segment-inner"></i>
        </div>
        <div class="loader__segment loader__segment--3" data-js="loader-segment">
            <i class="loader__segment-inner" data-js="loader-segment-inner"></i>
        </div>
    </div>
</div>
<i class="loader__line" data-js="loader-line"></i>
<!-- //LOADER -->

<div class="loader__counter" data-js="loader-counter">0</div>

<!-- MAIN -->
<div class="main__wrapper">
    <div class="page__wrapper">

        <?php
        render('pages/home/partials/_header', [
            'className' => 'section--header'
        ]);
        render('pages/home/partials/_work', [
            'className' => 'section--work'
        ]);
        render('pages/home/partials/_awards', [
            'className' => 'section--awards'
        ]);
        render('pages/home/partials/_contact', [
            'className' => 'section--contact'
        ]);
        ?>
    </div>

    <!-- FOOTER -->
    <?php
    render('layout/partials/_footer', [ ]);
    ?>
</div>
<!-- //MAIN -->

<!-- PROGRESS LINE -->
<div class="progress-line__wrapper">
    <div class="progress-line" data-js="progress-line">
        <i class="progress-line__inner" data-js="progress-line-inner"></i>
    </div>
</div>
<!-- //PROGRESS LINE -->

<!-- LINES -->
<div class="lines__wrapper" data-js="lines-wrapper">
    <i class="line line--horizontal line--horizontal-1" data-js="line-horizontal"></i>
    <i class="line line--horizontal line--horizontal-2" data-js="line-horizontal"></i>
    <i class="line line--horizontal line--horizontal-3" data-js="line-horizontal"></i>
    <i class="line line--vertical line--vertical-1" data-js="line-vertical"></i>
    <i class="line line--vertical line--vertical-2" data-js="line-vertical"></i>
    <i class="line line--vertical line--vertical-3" data-js="line-vertical"></i>
</div>
<!-- //LINES -->

<?php
render('layout/_scripts');
?>
</body>
</html>