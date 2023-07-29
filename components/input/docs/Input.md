# important

## emits are not included

# Input

### sample

```html

<div>
    <Input/>
</div>
```

### props

> design:String
>
> - base 
>    
>   or no design, or leave empty
> - solid-panel
> 
>  used in panel
> - solid-site
> 
>  used in site


> type: normal html types
> 
> type = clock, for choosing time

> label:String

> placeholder:String
>

>required:Boolean

>disabled:Boolean

> max-length:Number
>
> *for the character counter to show up, max-length must be defined*

> help:String
>
> *helper text in the bottom of the input*

> ltr:Boolean

> value:String


> nav:Boolean
> 
> gives height = 50px

> table:Boolean
> 
> gives height = 32px
> 

> separateLeft:Boolean
> 
> *Separates the text-left and input*


>separateRight:Boolean
> 
> *Separates the text-right and input* 

### slots

> iconRight
>
> *places an icon on the right side of the input*
>
> ```html
> <div>
>   <Input>
>       <template v-slot:iconRight>
>           <i class="somthing"></i>
>       </template>
>   </input>
> </div>
>```

> iconLeft
>
> *places an icon on the left side of the input*

> textRight
>
> *places text on the right side of the input*

> textLeft
>
> *places text on the left side of the input*







