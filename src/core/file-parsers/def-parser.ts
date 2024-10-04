import { App, TFile } from "obsidian";
import { DefFileType } from "../settings/definition-settings";
import { Definition } from "../model";

export abstract class DefParser {
    app: App;
	file: TFile;
    private fileType: DefFileType;

    constructor(app: App, files: TFile, fileType: DefFileType) {
		this.app = app;
		this.file = files;
        this.fileType = fileType;
	}

    get FileType(): DefFileType { return this.fileType; }

    abstract parseFile(fileContent?: string): Promise<Definition[]>;
}