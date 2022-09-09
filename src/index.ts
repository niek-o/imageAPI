import express                                   from "express";
import { existsSync, readdirSync, readFileSync } from "fs";
import { writeFile }                             from "fs/promises";
import { randomUUID }                            from "crypto";
import { Color }                                 from "colours.js";
import { PORT, IMAGES_PATH }                     from "./config.json";

require("@infinite-fansub/logger");

//#region Setup logger
logger.showMemory = true;
logger.showDay    = true;

logger.emojis = {
	emoji:      "✔",
	errorEmoji: "❌"
};

logger.colors = {
	color:      Color.fromHex("#2587FB"),
	errorColor: Color.fromHex("#FF0000")
};

//#endregion

const app  = express();
const port = PORT;
app.use(express.json());

app.get("/:path", (req, res) => {
	const img = getImage(IMAGES_PATH + req.params.path);
	
	if (img === 404) {
		logger.error("File does not exist");
		return res.sendStatus(404);
	}
	
	logger.log(`Sent: ${ req.params.path }`);
	
	res.json(img);
});

app.post("/", async (req, res) => {
	const { path, url } = req.body;
	const folders       = readdirSync(IMAGES_PATH);
	
	if (!folders.includes(path)) return res.sendStatus(400);
	if (!url.match(/\.(gif|jpg|jpeg|tiff|png)$/i)) return res.sendStatus(400);
	
	downloadFile(url, path);
	
	logger.log(`New image added to ${ path }`);
	
	res.sendStatus(200);
});

app.listen(port, () => {
	logger.log(`Listening on port ${ port }`);
});


function getImage(path: string) {
	if (!existsSync(path)) {
		return 404;
	}
	
	const file = getFile(path);
	
	return (file === 404)
		   ? 404
		   : Buffer.from(file)
				   .toString("base64");
}

function getFile(path: string) {
	const files = readdirSync(path);
	
	const img = files[Math.floor(Math.random() * files.length)];
	
	const filePath = `${ path }/${ img }`;
	
	return existsSync(filePath)
		   ? readFileSync(filePath)
		   : 404;
}

function downloadFile(url: string, outputPath: string) {
	fetch(url)
		.then(x => x.arrayBuffer())
		.then(x => writeFile(`${ IMAGES_PATH }${ outputPath }/${ randomUUID() }.png`, Buffer.from(x)));
}
