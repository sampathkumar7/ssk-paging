# ssk-paging
Angular JS pagination module

![ssk pagination](/pagination.png?raw=true "ssk pagination")


# Usage

### include stylesheet
```sh
<link href="ssk-paging.css" rel="stylesheet" />
```

### add the script reference after angular.
```sh
<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.7.5/angular.min.js"></script>
<script src="ssk-paging.js"></script>
```

### add ssk.paging as the module dependency
```sh
var sskApp = angular.module('sskTest',['ssk.paging']);
```

### add pagination directive to the view
set current-page,last-page,page-size,step and total as below
```sh
<ssk-pagination current-page="1" step="1" last-page="5" page-size="10" total="50"></ssk-pagination>
```


### How to customize
| Option name | Description] |
| ------ | ------ |
| currentPage | set current page, e.g current-page="1" |
| lastPage | set last page, e.g last-page="5" |
| pageSize | set page size, e.g page-size="10" |
| total | total, e.g total="50" |
| pagingAction | set paging action, e.g paging-action="item.click(item)" |
| disabled | set disabled, e.g disabled="item.current == 5" |