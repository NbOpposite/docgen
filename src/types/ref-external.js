const Serializable = require('../serializable');

class ReferencedExternal extends Serializable {
	constructor(parent, external) {
		super(parent);
		this.directData = this.constructor.buildDirectData(external);
	}

	static buildDirectData(external) {
		return {
			id: `external:${external[0]}`,
			longname: `external:${external[0]}`,
			kind: `external`,
			scope: 'global',
			name: external[0],
			see: [`{@link ${external[1]}`]
		};
	}

	serializer() {
		return {
			name: this.directData.name,
			see: this.directData.see
		};
	}
}

module.exports = ReferencedExternal;
