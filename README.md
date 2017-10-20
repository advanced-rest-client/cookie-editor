[![Build Status](https://travis-ci.org/advanced-rest-client/cookie-editor.svg?branch=stage)](https://travis-ci.org/advanced-rest-client/cookie-editor)  

# cookie-editor

`<cookie-editor>` An element to edit cookie details

### Example
```
<cookie-editor></cookie-editor>
```

### Styling
`<cookie-editor>` provides the following custom properties and mixins for styling:

Custom property | Description | Default
----------------|-------------|----------
`--cookie-editor` | Mixin applied to the element | `{}`



### Events
| Name | Description | Params |
| --- | --- | --- |
| cancel-cookie-edit | Fired when edit was cancelled. | __none__ |
| save-cookie | Fired when a cookie should be saved.  The event does not bubble. | name **String** -  |
value **String** -  |
domain **String** -  |
path **String** -  |
expires **Number** -  |
hostOnly **Boolean** -  |
httpOnly **Boolean** -  |
secure **Boolean** -  |
session **Boolean** -  |
