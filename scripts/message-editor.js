import TurndownService from "../lib/turndown.js";

export default class MessageEditor extends FormApplication {
	/**
	 * Assign the default options which are supported by the entity edit sheet.
	 * @returns The default options for this FormApplication class
	 * @override
	 * @see {@link Application.defaultOptions}
	 */
	static get defaultOptions() {
		return mergeObject(FormApplication.defaultOptions, {
			closeOnSubmit: true,
			editable: true,
			resizable: true,
			width: 400,
			popOut: true,
			title: "bugedit.editor-title",
			template: "modules/bugedit/templates/chat-edit.hbs"
		});
	}

	constructor(chatMessage, html) {
		super();
		this.chatMessage = chatMessage;
		this.html = html;
		this.turndown = new TurndownService();
	}

	/** @override */
	getData(options) {
		return mergeObject(options, {
			messageText: this._turndown(this.chatMessage.data.content.replace(/< *br *\/?>/gm, "\n").replace(/\<span +class="df-edited"\>.+/, "")),
			oldContent: this.html
		});
	}

	_turndown(htmlText) {
		return this.turndown.turndown(htmlText);
	}

	/** @override */
	activateListeners(html) {
		super.activateListeners(html);
		html.find("#cancel").on("click", async () => await this.close());
	}

	/** @override */
	async _updateObject(_event, formData) {
		var data = formData.content;
		data = data.replace(/\r?\n/gm, "<br/>");
		if (data.search(/\<span +class="df-edited"\>/) < 0) {
			data += `<span class="df-edited">(Edited)</span>`;
		}
		this.chatMessage.update({
			content: data
		});
	}
	/** @override */
	close(options) {
		delete this.chatMessage.chatEditor;
		return super.close(options);
	}
}
