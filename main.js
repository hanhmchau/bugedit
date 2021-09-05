"use strict";

import { libWrapper } from "./lib/libwrapper.js";
import ChatEdit from "./scripts/chat-edit.js";
import { ModuleSettings, ModuleOptions } from "./scripts/settings.js";

Hooks.on("setup", () => {
	// ModuleSettings.registerSettings();

	libWrapper.register("bugedit", "ChatLog.prototype._getEntryContextOptions", function (wrapped, ...args) {
		const options = wrapped(...args);
		ChatEdit.prototype.appendChatContextMenuOptions(options);
		return options;
	});
});
