# PHP slice start kit

###Config
Update project name inside functions.php (same as project name/project folder inside WP project builder — case sensitive):

```html
CONST PROJECT_NAME = 'project-name';
```


The global path should be changed inside functions.php baseURL function, according to project type:

###### dwp
```html
function bu($fileurl) {
    return "/" . PROJECT_NAME . "/wp-content/themes/" . PROJECT_NAME . "/" . $fileurl;
}
```

###### yapp/iapp
```html
function bu($fileurl) {
    return "/".PROJECT_NAME."/". $fileurl;
}
```

### Helpers
 
###### pages
 ```pages.php``` automatically goes through ```slice/pages``` folder and generates all project page links 
 
 
 
###### styleguide
 ```styleguide.php``` is just a basic styleguide template, for typography, colors, icons and other common stuff to test out before sliceing


### Workflow
Specific page files should be in separate folders inside ```slice/pages``` folder (e.g. ```slice/pages/home```). All pages files (e.g. ```slice/pages/index.php```) need to have ```functions.php``` file included on top:
 
 ```html
 require_once __DIR__ . '/helpers/functions.php';
 ```
