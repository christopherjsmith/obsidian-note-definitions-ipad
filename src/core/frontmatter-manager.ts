import { App, TFile } from "obsidian";
import { FrontmatterDefinitions } from "./settings/frontmatter-settings";

export class FrontmatterBuilder {
	fm: Map<string, string>;

	constructor() {
		this.fm = new Map<string, string>();
	}

	add(k: string, v: string) {
		this.fm.set(k, v);
	}

	finish(): string {
		let fm = '---\n';
		this.fm.forEach((v, k) => {
			fm += `${k}: ${v}\n`
		});
		fm += '---\n'
		return fm;
	}
}

export class FrontMatterReader {
    app: App;

    constructor(app: App) {
        this.app = app;
    }

    read(file: TFile, key: FrontmatterDefinitions) {
        const fileCache = this.app.metadataCache.getFileCache(file);
		return fileCache?.frontmatter?.[key];
    }
}