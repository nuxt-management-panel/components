
# Select

### sample

```html

<div>
    <Select/>
</div>
```

### props

> design:String
>
> - base
    >
    >   or no design, or leave empty
> - solid-panel > > used in panel
> - solid-site > > used in site
>

> Values: Array
> ```json
> [
>   { 
>         "id": "1",
>       "name": "test2"
>   },
>
>   { 
>       "id": "2",
>     "name": "test2"
>   },
>
>   { 
>       "id": "3",
>     "name": "test2"
>   }
> ] 
> ```


>object-key:String
> 
> *the desired value of the json object we want to show to the user*
> 
> 
> data = {some json}
> 
> data[object-key]

> label:String

> placeholder:String
>


> disabled



> ltr

>defaultValue:Object

### slots

> icon
>
>
> ```html
> <div>
>   <Input>
>       <template v-slot:icon>
>           <i class="somthing"></i>
>       </template>
>   </input>
> </div>
>```
> 
#Emits

>SelectedValue
> 
> returns the selected Object








