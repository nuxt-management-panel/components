## Modal

### sample

```html

<Button data-bs-toggle="modal" :data-bs-target="'#modal_' + id">

</Button>
<Modal :id="id">

</Modal>
```

### props

> border : Boolean
> - *description: border top and bottom for modal body*

> vertical : Boolean
> - *description: vertical style for modal*

> scroll : Boolean
> - *description: scroll style for body*

> center : Boolean
> - *description: position when modal is open*

> staticBackdrop : Boolean

> blur : Boolean
> - *description: blur or normal backdrop*

> title : String
> - *description : when header slot is sent this props does not work*

> id : String
> - *make a unique id for each modal*
### slots

> header
> ```html
> <template #header>
> </template>
> ```
> - *description : send some components to header of modal*

> body
> ```html
> <template #body>
> </template>
> ```
> - *description : send some components to body of modal*

> footer
> ```html
> <template #footer>
>  <Button name="this is close button"  data-bs-dismiss="modal"></Button>
>  <Button name="this is normal button"></Button>
> </template>
> ```
> - *description : send close and normal button to footer of modal*
