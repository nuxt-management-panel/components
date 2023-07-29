# button

### sample

```html

<Button>

</Button>
```

### props

> design:String
> - btn-danger , btn-primary , ...
> - *for base button styles*
> -
> - btn-light-danger , btn-light-primary , ...
> - *for light button styles*
> -
> - btn-outline-danger , btn-outline-primary , ...
> - *for outline button styles*

> rounded:Boolean
> - *for rounded button styles*

> name:String

> size:String
> - lg
> - md
> - sm

> type:String
> - text
> - icon
> - text-icon

> disabled:Boolean
> - *btn disabled style*

> loading:Boolean
> - *loading button styles*


### slots

```html
<Button>
    <template #icon>
        <i class="fa-solid fa-arrow-alt-circle-left"></i>
    </template>
</Button>
```
