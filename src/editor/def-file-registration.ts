import { App, TFile } from "obsidian";
import { getDefFileManager } from "src/core/def-file-manager";
import { DefFileType } from "src/core/settings/definition-settings";
import { FrontmatterDefinitions } from "src/core/settings/frontmatter-settings";
import { logError } from "src/util/log";


export function registerDefFile(app: App, file: TFile, fileType: DefFileType) {
	app.fileManager.processFrontMatter(file, fm => {
		fm[FrontmatterDefinitions.DefFileType] = fileType; 
		getDefFileManager().loadDefinitions();
	}).catch(e => {
		logError(`Err writing to frontmatter of file: ${e}`);
	});
}
