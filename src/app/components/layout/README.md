# layout模块

> layout模块是应用中用到的外层结构，它进行了布局划分，每个区域中已引入了需要用到的菜单组件

``` typescript
import { LayoutModule } from '../../components';
```

``` typescript
import { LayoutService } from '../../components';

@Component({
    ...
    providers: [LayoutService]
})
```

layout模块中包括三个组件

layout     |
--------   |
cherry-header |
cherry-header |
cherry-main   |

## cherry-header组件

> 用于全局切换

``` html
<div class="architecture-box">
    <cherry-header [model]="header_items" ></cherry-header>
</div>
```

``` typescript
this.header_items = [
            { label: 'CRM', icon: 'fa-bar-chart fa-2x' },
            { label: 'Calendar', icon: 'fa-calendar fa-2x' },
            { label: 'Documentation', icon: 'fa-book fa-2x' },
            { label: 'Support', icon: 'fa-support fa-2x', routerLink: '/menudemo' },
            { label: 'Social', icon: 'fa-twitter fa-2x', url: 'http://www.baidu.com' }
        ];
```

提供的接口属性
| 属性     |    描述 | 用法  |
| -------- | -------- | --   |
| model  | 用来传入数据 |  [model]="items"   |
| itemClickEvent    |   事件接口 |  (itemClickEvent)="fun($event)"  |

如果你想要自己控制header的收起展开，方法在LayoutService中，使用方法可参照example/layout/headerdemo

## cherry-headermenubar组件

> 是顶部菜单条，由Logo，主菜单，右菜单三部分构成

``` html
<div class="architecture-box">
       <cherry-headmenubar [centerModel]="mainMenu" [rightModel]="rightMenu" [logoSrc]="logo" >
    </cherry-headmenubar>
</div>
```

``` typescript
        this.logo = 'assets/img/kylinLogo.png';
        this.mainMenu = [
            { label: 'File', icon: 'fa-bar-chart' },
            { label: 'Calendar', icon: 'fa-calendar'},
            { label: 'Documentation', icon: 'fa-book' },
            { label: 'Support', icon: 'fa-support' },
            { label: 'Social', icon: 'fa-twitter' }
        ];
        this.rightMenu = [{
            label: 'File',
            icon: 'fa-bar-chart',
            items: [
                { 'label': '1', 'icon': 'fa-user' },
                { 'label': 'Email', 'icon': 'fa-envelope' }
            ]
        }
```

提供的接口属性
| 属性     |    描述 | 用法  |
| -------- | --------| -- |
| centerModel  | 主菜单数据 |  [centerModel]="mainMenu"   |
| rightModel   |   右菜单数据 |  [rightModel]="rightMenu"  |
| logoSrc  | logo图片路径 |  [logoSrc]="logo"   |
| headerShow    |   是否显示控制header组件的开关，默认为true |  [headerShow]="true" |
| centerMenuClickEvent  | 主菜单事件接口 |  (centerMenuClickEvent)="fun($event)"   |
| rightMenuClickEvent    |   右菜单事件接口 |  (rightMenuClickEvent)="fun($event)"  |

## cherry-main组件

> 内容区域， 带一个可收缩的菜单组件，可在组件中添加内容，内容将被添加至工作区

``` html
<div class="architecture-box">
    <cherry-main [menuHeaderName]="menuName"  [footerText]="footerText" [menuModel]="items" >
        你的内容，你的路由
    </cherry-main>
</div>
```

``` typescript
        this.menuName = '管理中心';
        this.footerText = '300s后锁定';
        this.items = [{
            label: 'File',
            icon: 'fa-bar-chart',
            items: [
                { 'label': '1', 'icon': 'fa-user' },
                {
                    'label': 'Email', 'icon': 'fa-envelope', items: [
                        { 'label': '1', 'icon': 'fa-user' },
                        { 'label': 'Email', 'icon': 'fa-envelope' }
                    ]
                }
            ]
        }
        }];
```

提供的接口属性
| 属性     |    描述 | 用法  |
| -------- | --------| -- |
| menuModel  | 菜单数据 |  [menuModel]="items"   |
| menuHeaderName   |   菜单名字 |  [menuHeaderName]="menuName"  |
| menuHeaderIcon        |   菜单图标的class,如fa-file-o |  [menuHeaderIcon]="menuIcon" |
| menuHeaderIconHtml    |   菜单图标，可插入一段html，如 `<span class="fa-file-o"></span>` |  [menuHeaderIconHtml]="menuIconHtml" |
| menuShow    | 菜单是否显示,默认为true |  [menuShow]="menushow"  |
| itemClickEvent  | 菜单事件接口 |  (itemClickEvent)="MenuClick($event)"   |
| footerShow    |   底部是否显示，默认true |  [footerShow]="footershow"  |
| menuSearchShow    |   菜单搜索工具是否显示，默认true |  [menuSearchShow]="true"  |
| footerText  | 底部文字 |  [footerText]="footerText"   |
