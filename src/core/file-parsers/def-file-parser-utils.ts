import { App, TFile } from "obsidian";
import { getSettingsManager } from "../settings/settings-manager";
import { DefFileType } from "../settings/definition-settings";
import { AtomicDefParser } from "./atomic-def-parser";
import { ConsolidatedDefParser } from "./consolidated-def-parser";
import { DefParser } from "./def-parser";

export function CreateDefFileParser(app: App, file: TFile): DefParser {
	const defFileType = getSettingsManager().getDefFileType(file);

	switch (defFileType) {
		case DefFileType.Consolidated:
			return new ConsolidatedDefParser(app, file);
		case DefFileType.Atomic:
			return new AtomicDefParser(app, file);
	}
}