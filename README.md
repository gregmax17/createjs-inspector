# CreateJS Inspector
An inspector tool to use with the CreateJS suite. Allows the developer to view and manipulate various Display Object properties, view the hierarchy, and add and remove Display Objects (not fully implemented).

## Setup
```
npm install createjs-inspector

--

import Inspector from "createjs-inspector";

let stage = new createjs.Stage(document.querySelector('canvas'));

Inspector.init({ stage: stage, createjs: createjs });
```

You will need to pass an instance of `createjs.Stage` and the `createjs` object.

## Hotkeys
Once a Display Object is selected from the Hierarchy (via double clicking), you can:

`D` - drags around the Display Object
`X` or `Y` - drags/scales the Display Object along the desired axis
`R` - rotates the Display Object
`S` - scales the Display Object
`A` - changes the alpha value
`W` - will target the Display Object's mask (if any)
`H` - will target the Display Object's hit area (if any)
`ARROW KEYS` - with `D` being held down, you can use the arrow keys to move the Display Object around
`MOUSE WHEEL` - over the input field will change the Display Object's property value

_Misc Notes:_
* You don't need to click on the Display Object to start dragging the element, it just needs to be selected in the Hierarchy.
* Double clicking on the Header of the injected Inspector DOM elements will expand/collapse its menu and options.
* Click on the `Refresh` button will update the Hierarchy list.
* To get the selected Display Object from Hierarchy via web dev console: `$inspector`.