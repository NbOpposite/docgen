class Serializable {
	constructor(parent) {
		this.parent = parent;
		this.directData = null;
	}
	serialize() {
		try {
			return this.serializer();
		} catch(err) {
			err.message = `Error while serializing ${this.detailedName(this.directData)}: ${err.message}`;
			throw err;
		}
	}

	// eslint-disable-next-line no-empty-function
	serializer() {}

	detailedName(data) {
		if(!data) return this.constructor.name;
		if(data.id) return `${data.id} (${this.constructor.name})`;
		if(data.name) return `${data.name} (${this.constructor.name})`;
		return this.constructor.name;
	}
}

module.exports = Serializable;
