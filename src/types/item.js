const Serializable = require('../serializable');

class DocumentedItem extends Serializable {
	constructor(parent, info) {
		super(parent);

		try {
			this.registerMetaInfo(info);
		} catch(err) {
			err.message = `Error while loading ${this.detailedName(info)}: ${err.message}`;
			throw err;
		}
	}

	// eslint-disable-next-line no-empty-function
	registerMetaInfo() {}
}

module.exports = DocumentedItem;
