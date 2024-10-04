
import { App, TFile } from "obsidian";
import { getSettings } from "src/settings";
import { FrontMatterReader } from "../frontmatter-manager";
import { DefFileType } from "./definition-settings";
import { FrontmatterDefinitions } from "./frontmatter-settings";

let settingsManager: SettingsManager;

export class SettingsManager {
    app: App;
    fmReader: FrontMatterReader;

    constructor(app: App) {
        this.app = app;
        this.fmReader = new FrontMatterReader(this.app);
    }

    public getDefFileType(file: TFile): DefFileType {
        const fmFileType = this.fmReader.read(file, FrontmatterDefinitions.DefFileType)

        if (fmFileType &&
            (fmFileType === DefFileType.Consolidated || fmFileType === DefFileType.Atomic)) {
            return fmFileType;
        }

        // Fallback to configured default
        const parserSettings = getSettings().defFileParseConfig;

        if (parserSettings.defaultFileType) {
            return parserSettings.defaultFileType;
        }

        return DefFileType.Consolidated;
    }
}

export function initSettingsManager(app: App): SettingsManager {
    settingsManager = new SettingsManager(app);
    return settingsManager;
}

export function getSettingsManager(): SettingsManager {
    return settingsManager;
}