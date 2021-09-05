import MessageEditor from "./message-editor.js";

export default class ChatEdit {
	appendChatContextMenuOptions(options) {
		options.unshift({
			name: "bugedit.edit_message-s",
			icon: '<i class="fas fa-edit"></i>',
			condition: (header) => {
				const message = game.messages.get(header.data("messageId"));
				return message.isAuthor && !message.isRoll;
			},
			callback: (header) => {
				const chatData = game.messages.get(header.data("messageId"));
				const element = $(header[0]).clone().removeClass('continued').addClass('leading');
				this.editChatMessage(chatData, $(element)[0].outerHTML);
				return {};
			}
		});
	}

	// Will be bound to the instance of ChatMessage we are observing
	editChatMessage(chatData, html) {
		if (chatData.chatEditor) {
			chatData.chatEditor.bringToTop();
		} else {
			chatData.chatEditor = new MessageEditor(chatData, html);
			chatData.chatEditor.render(true);
		}
	}
}
