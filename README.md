# Image API

A simple self-hosted image API made using express

## Usage

Example file structure:

    .
    ├── .yarn                
    ├── img     
    │   ├── cat
    │   │   └── 6b48f43f-aaed-40d7-a38b-9484d12e903d.png
    │   └── dog
    ├── node_modules                    
    ├── src
    ├── .gitignore
    ├── .yarnrc.yml
    ├── LICENSE.md
    ├── package.json
    ├── README.md
    ├── tsconfig.json
    └── yarn.lock

### Posting new image
````ts
fetch(BASE_IP, {
    method:  "POST",
    headers: {
        "content-type": "application/json"
    }, body: JSON.stringify({
        path: folder,
        url:  url,
    })
});
````

### Getting image from cat folder
````ts
const img = await fetch(BASE_IP + "/cat");
````
The images are returned in Base64 string.
