## Alert

### sample

```html
<Alert>
    
</Alert>
```
### props

> design:String
> - alert-primary , alert-danger , ...
> - text-dark , text-primary , ...

> dismiss:Boolean
>
> *activating close button*

> icon:String
>
> *sends font awesome classes for button close icon*



### slots

> icon
>
> *this slot sends icon next to the text*
>
> ```html
> <Alert>
>  <template v-slot:icon>
>      <i class="fa-solid fa-square alert-icon"></i>
>  </template>
> </Alert>
> ```


> ```html
> <Alert>
>    <template v-slot:content>
>           <h5>این یک متن تست است</h5>
>           <p>لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت
>            چاپ و با استفاده از طراحان گرافیک است.         
>          </p>
>    </template>
> </Alert>
> ```
<img src="../../assets/component_images/alert.jpg">