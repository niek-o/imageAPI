# Image API

A simple self-hosted image API made using express

## Usage

### OpenAPI spec

The openapi specification can be found [here](https://github.com/niek-o/imageAPI/blob/main/openAPI.yaml)

### Prerequisites

- [Node.js](https://nodejs.org/en/) >= 18.9

### How to set up

1. Clone the repository.
2. Install all the packages using `yarn install`.
3. Use `yarn start` to start the API in `ts-node`, or build it using `yarn build`.

### Configuration

Inside ``src`` you will find ``config.json``. In here you can change the port and base path for the images.

``config.json`` example:

````json
{
  "PORT": "3000",
  "IMAGES_PATH": "img/"
}
````

### File structure

Example file structure:

    .
    ├── .yarn                
    ├── img     
    │   ├── cat
    │   │   └── 6b48f43f-aaed-40d7-a38b-9484d12e903d.png
    │   └── dog
    ├── node_modules                    
    ├── src
    │   ├── config.json
    │   └── index.ts
    ├── .gitignore
    ├── .yarnrc.yml
    ├── LICENSE.md
    ├── openAPI.yaml
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

The images are returned in Base64 string. To get the image as a buffer you can use

````ts
Buffer.from(await img.json(), "base64")
````
