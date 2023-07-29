## Dropdown

### sample

```html
<DropDown>
    <template #dropBtn>
        <DropDownButton></DropDownButton>
    </template>
    <template #menu>
        <DropDownMenu>
            <DropDownSubItems>
            </DropDownSubItems>
        </DropDownMenu>
    </template>
</DropDown>
```

### props
>dropdown:String
>
> *define type of drop down*
>
> - complete
> - *with text and icon*
> - icon 
> - *only with icon*
> 
> *give this prop to ``<DropDown>``*

>design:String
>
> *style of the dropdown*
>
> - mix-white
> - mix-secondary
> - separate-white
> - separate-secondary
> - table
>
> *give this prop to ``<DropDown>``*

>icon:String
>
> *define icon for dropdown button and dropdown subItems*
>
> *send font awesome classes*
>
> *you can use this prop for ``<DropDownBtn>`` and ``<DropDownSubItems>``*

>name:String
>
> *use this prop on ``<DropDownBtn>`` and ``<SubMenu>``*

>divider:Boolean
>
> *use this prop only on ``<DropDownMenu>``*
>
> *this prop defines a divider inside menu*

>divider_name:Boolean
> 
> *define a value for devider*
> 
> *use this prop only on ``<DropDownMenu>``*

>divider_border:Boolean
>
> *define a border for divider*

>link:String
>
> *prop only for ``<SubMenu>``*
>
> *gives link to nuxtlink li tags*

>dir:String
> 
> *this prop is only for ``<DropDown>``*
> 
> *this prop change the direction of component itself , for example in a rtl page you need a ltr dropdown*
>
> *don't use this prop on complete dropdowns , use it only for icon dropdown*

>scroll:Boolean
>
> *prop only for ``<DropDownMenu>``*
>
> *gives scroll to the dropdown*

### slots
>dropBtn
> 
> *sends dropdown button*
> ```html
> <template #dropBtn>
>   <DropDownButton></DropDownButton>
> </template>
> ```

>menu
> 
> *sends drop down Menu*
> 
> *send sub menu inside of menu as default slot*
> 
> *use v-for on submenu component*
> 
> *inside sub-menu we can send icon as default slot*
> ```html
> <template #menu>
>   <DropDownMenu>
>     <DropDownSubItems>
>     </DropDownSubItems>
>   </DropDownMenu>
> </template>
> ```

### *Important Note*

> - If the dropdown is in the form of an icon, the width must be given manually to the ``<DropDownMenu>``
> 
> 
> - The value must be given by vw unit : 
> 
> 
> - vw-xxl-10 , vw-xxl-20 , ... , vw-xxl-100
> 
> 
> - vw-xl-10 , vw-xl-20 , ... , vw-xl-100
> 
> 
> - vw-lg-10  , vw-lg-20 , ... , vw-lg-100
> 
> 
> - vw-md-10 , vw-md-20 , ... , vw-md-100
> 
> 
> - vw-sm-10 , ..... , vw-sm-100
> 
> 
> - vw-xs-10 , ..... , vw-xs-100