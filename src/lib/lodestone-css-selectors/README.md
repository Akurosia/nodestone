# lodestone-css-selectors
CSS selectors for The Lodestone. These selectors are all made for non-browser clients; they may break in various browsers
due to DOM elements being injected by the browser itself. Please test them in a parser before reporting any errors.

## Character Profile
Do note that in Firefox, some page elements are slightly different from in other browsers. Use no user agent or try the provided ones in `meta.json`, for the most accurate results against the selectors it is recommended to use the value of `userAgentMobile`.

### Character info (`profile/character.json`)
Basic character data is on the main profile page.

### Attributes (`profile/attributes.json`)
Attribute data is on the main profile page.

### Gearset (`profile/gearset.json`)
Gearset data is on the main profile page.

### Classjobs (`profile/classjob.json`)
Classjob data is on the `/class_job` endpoint.

### Mounts/Minions (`profile/minion.json` and `profile/mount.json`)
Mount and minion data are on their own `/mount` and `/minion` endpoints, and need to be scraped using a mobile user agent. With a desktop UA, the mount/minion names are
injected into the page with AJAX, and separate requests need to be made to get every single one.

### Achievements (`profile/achievements.json`)
Achievements are on the `/achievement` endpoint. Use the list selector to get the list of achievements on the page, and then get their IDs from the `href` attribute
of the link. Use the next button's selector to request the next page and scrape the next set of achievements until the href is `javascript:void(0);`.

## Types

All selectors are accompanied by a `type` field, which specifies what the expected type is for the field. At current, only the following types are used:

| Name      | Description                                                                           |
| --------- | ------------------------------------------------------------------------------------- |
| `integer` | The type is an integer                                                                |
| `string`  | The type is a string                                                                  |
| `boolean` | The type is expected to be `true` if the selector returns a result; `false` otherwise |

There are two formats for type:

* Common form - the selector is of this type

```json
{
    "type": "integer"
}
```

* Multiple value form - the selector results in multiple named values; this is only used with regex selectors that have named groups

```json
{
    "type": {
        "Server": "string",
        "DC": "string"
    }
}
```
