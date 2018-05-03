# grid模块

> grid模块用于网格的划分，将一行划分为24格, grid提供指令让你可以对网格的间距, 偏移, 排序， 对齐方式等基础功能进行设置。 grid同时还提供了响应式的指令, 可以配合响应式指令来使用网格基础功能, 实现网格的响应式变化。

``` typescript
import { GridModule } from '../../components/grid/grid.module';


@NgModule( {
    imports: [
        ...
        GridModule
    ]
})
```

grid模块功能清单

grid     |
--------   |
布局     |
间隔     |
偏移     |
排序     |
对齐方式 |
响应式   |

## 网格基础使用

> grid将一行化为24列, 使用列来对你的元素进行布局。

``` html
        <div cherry-row>
            <div cherry-col [uiSpan]="12">
                col-12
            </div>
            <div cherry-col [uiSpan]="12">
                col-12
            </div>
        </div>
        <div cherry-row>
            <div cherry-col [uiSpan]="6">
                col-6
            </div>
            <div cherry-col [uiSpan]="6">
                col-6
            </div>
            <div cherry-col [uiSpan]="6">
                col-6
            </div>
            <div cherry-col [uiSpan]="6">
                col-6
            </div>
        </div>
```

## 网格间隔

> 通过row的uiGutter属性来设置网格的间隔

``` html
      <div cherry-row [uiGutter]="6">
    <div cherry-col [uiSpan]="8">
        <div class="colbox">
            col-8</div>
    </div>
    <div cherry-col [uiSpan]="8">
        <div class="colbox">
            col-8</div>
    </div>
    <div cherry-col [uiSpan]="8">
        <div class="colbox">
            col-8</div>
    </div>
</div>
```

## 网格偏移

> 可以将网格向右偏移x列

``` html
              <div cherry-row>
            <div cherry-col [uiOffset]="2" [uiSpan]="8">
                <div class="colbox">
                    offset-2
                </div>
            </div>

        </div>
```

## 网格顺序

> 通过push和pull来改变网格的顺序

``` html
               <div cherry-row>
            <div cherry-col [uiSpan]="7" [uiPush]="17">
                <div class="colbox">
                    我一开始在左边
                </div>
            </div>



            <div cherry-col [uiSpan]="17" [uiPull]="7">
                <div class="colbox">
                    我一开始在右边
                </div>
            </div>
        </div>
```

## 网格水平方向排列方式

> 通过flex来改变水平排列方式

``` html
        <p>居左</p>
        <div cherry-row [uiType]="'flex'" [uiJustify]="'start'">
         ...
        </div>

        <p>居右</p>
        <div cherry-row [uiType]="'flex'" [uiJustify]="'end'">
         ...
        </div>

        <p>居中</p>
        <div cherry-row [uiType]="'flex'" [uiJustify]="'center'">
         ...
        </div>

        <p>space-between</p>
        <div cherry-row [uiType]="'flex'" [uiJustify]="'space-between'">
         ...
        </div>

        <p>space-around</p>
        <div cherry-row [uiType]="'flex'" [uiJustify]="'space-around'">
         ...
        </div>
```

## 网格垂直方向排列方式

> 通过flex来改变垂直排列方式

``` html
        <p>top</p>
        <div cherry-row [uiType]="'flex'" [uiJustify]="'space-around'" [uiAlign]="'top'" class="rowbox">
            ...
        </div>

        <p>middle</p>
        <div cherry-row [uiType]="'flex'" [uiJustify]="'space-around'" [uiAlign]="'middle'" class="rowbox">
          ...
        </div>

        <p>bottom</p>
        <div cherry-row [uiType]="'flex'" [uiJustify]="'space-around'" [uiAlign]="'bottom'" class="rowbox">
           ...
        </div>
```

## 网格排序

> 通过flex来改变网格的顺序

``` html
         <div cherry-row [uiType]="'flex'">
            <div cherry-col [uiSpan]="5" [uiOrder]="4">
                <div class="colbox">
                    1
                </div>
            </div>

            <div cherry-col [uiSpan]="5" [uiOrder]="3">
                <div class="colbox">
                    2
                </div>
            </div>

            <div cherry-col [uiSpan]="5" [uiOrder]="2">
                <div class="colbox">
                    3
                </div>
            </div>

            <div cherry-col [uiSpan]="5" [uiOrder]="1">
                <div class="colbox">
                    4
                </div>
            </div>
        </div>
```

## 响应式

> 响应式的划分网格,有xs,sm,md,lg,xl五个尺寸

``` html
        <div>响应式的划分网格</div>

        <div cherry-row>
            <div cherry-col [uiXs]="5" [uiSm]="12" [uiMd]="6" [uiLg]="2" [uiXl]="6">
                <div class="colbox">
                    1
                </div>
            </div>

            <div cherry-col [uiXs]="5" [uiSm]="12" [uiMd]="6" [uiLg]="3" [uiXl]="8">
                <div class="colbox">
                    2
                </div>
            </div>

            <div cherry-col [uiXs]="5" [uiSm]="12" [uiMd]="6" [uiLg]="8" [uiXl]="2">
                <div class="colbox">
                    3
                </div>
            </div>

            <div cherry-col [uiXs]="5" [uiSm]="12" [uiMd]="6" [uiLg]="5" [uiXl]="4">
                <div class="colbox">
                    4
                </div>
            </div>
        </div>
```

> 响应式的控制网格的显示和隐藏

``` html
        <div>响应式的显示网格</div>
        <div cherry-row>
            <div cherry-col [uiXs]="{ span: 4}" [uiLg]="{ span: 4 }">
                <span cherry-col [uiXs]="{ show: 'hidden'}">xs型</span>
                <span cherry-col [uiXs]="{ show: 'visible'}">✔ 在xs型设备上可见</span>
            </div>
            <div cherry-col [uiXs]="{ span: 4 }" [uiLg]="{ span: 4 }">
                <span cherry-col [uiSm]="{ show: 'hidden'}">s型</span>
                <span cherry-col [uiSm]="{ show: 'visible'}">✔ 在s型设备上可见</span>
            </div>
            <div cherry-col [uiXs]="{ span: 4 , show:'hidden' }" [uiLg]="{ span: 4 }">
                <span cherry-col [uiMd]="{ show: 'hidden'}">m型</span>
                <span cherry-col [uiMd]="{ show: 'visible'}">✔ 在m型设备上可见</span>
            </div>
            <div cherry-col [uiXs]="{ span: 4 }" [uiLg]="{ span: 4 }">
                <span cherry-col [uiLg]="{ show: 'hidden'}">lg型</span>
                <span cherry-col [uiLg]="{ show: 'visible'}">✔ 在lg型设备上可见</span>
            </div>
            <div cherry-col [uiXs]="{ span: 4 }" [uiLg]="{ span: 4 }">
                <span cherry-col [uiXl]="{ show: 'hidden'}">xl型</span>
                <span cherry-col [uiXl]="{ show: 'visible'}">✔ 在xl型设备上可见</span>
            </div>
        </div>
```

> 响应式的使用网格的基础属性

``` html
            <div cherry-row>
            <div cherry-col [uiXl]="{ span: 6,pull:1,push:3, offset:2, order:2 }" [uiLg]="{ span: 6,offset:12 }">
                <div class="colbox">
                    1
                </div>
            </div>
            <div cherry-col [uiXs]="{ span: 4,pull:1,push:3, offset:2, order:1 }" [uiLg]="{ span: 4,show: 'hidden' }">
                <div class="colbox">
                    2
                </div>
            </div>
        </div>
```
