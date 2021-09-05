export const ModuleOptions = {
	DISABLE_NUMBER: "disable_number"
};

const OnChangeFunctions = {
	NOTHING: () => {},
	RELOAD: () => window.location.reload()
};

export class ModuleSettings {
	static MODULE_NAME = "bugedit";

	static registerSettings() {
		game.settings.register(
			this.MODULE_NAME,
			ModuleOptions.DISABLE_NUMBER,
			this._buildConfig(ModuleOptions.DISABLE_NUMBER, {
				default: true,
				scope: "world",
				onChange: OnChangeFunctions.NOTHING
			})
		);
	}

	static getSetting(option) {
		return game.settings.get(this.MODULE_NAME, option);
	}

	/** @private */
	static _getNameConfig(optionName) {
		return {
			name: `${this.MODULE_NAME}.${optionName}-s`,
			hint: `${this.MODULE_NAME}.${optionName}-l`
		};
	}

	/** @private */
	static _buildConfig(optionName, config = {}) {
		const defaultConfig = {
			scope: "client",
			config: true,
			default: false,
			type: Boolean,
			onChange: OnChangeFunctions.RELOAD
		};
		return {
			...defaultConfig,
			...this._getNameConfig(optionName),
			...config
		};
	}
}
