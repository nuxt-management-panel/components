## Tab

### sample

```html

<div class="col-5">
    <Tab>
        <template #tabButton>
            <TabButton>
                <i class="fa-solid fa-square"></i>
            </TabButton>
        </template>
        <template #tabBody>
            <TabBody>
                <p>test</p>
            </TabBody>
        </template>
    </Tab>
</div>
```

### props

> vertical:Boolean
>
> *for ``<Tab>`` and ``<TabButton>``*

> design:String
>
> *only for ``<tabButton>``*
>
> - tab-primary
> - *style1*
> - tab-light-primary
> - *style2*
> - tab-text-primary
> - *style3*
> - tab-underline-primary
> - *style4*

> disabled:Boolean
>
> *only for ``<TabButton>``*

> name:String

> index:Number
>
> *send index while iterating with v-for*
>
> send this prop for both ``<TabButton>`` and ``<TabBody>``*
>
> *this prop uses to active first item*

> targetIndex:String
>
> *send value from json file while iterating with v-for*
>
> *send this prop for both ``<TabButton>`` and ``<TabBody>``*
>
> *this prop uses to make unique target id for each item*

>margin:String
> 
> *send this for ``<Tab>``*
> 
> *margin for tab body*
> 
> *send value with number and px like 6px in shape of normal margin shorthand*

### slots

> tabButton
>
> *default slot for icon between TabButton*
>
> ```html
> <template #tabButton>
>   <TabButton>
>      <i class="fa-solid fa-square"></i>
>    </TabButton>
> </template>
> ```

> tabBody
>
> *default slot between TabBody*
>
> ```html
> <template #tabBody>
>     <TabBody>
>         <p>test</p>
>     </TabBody>
> </template>
> ```

### json

>  ```json  
> [
>    {
>       "id": 1,
>       "name": "ایتم اول",
>       "text": "سلام این ایتم اول است",
>       "disabled": false,
>       "dataTarget":"1a",
>    },
> ]
>  ```

