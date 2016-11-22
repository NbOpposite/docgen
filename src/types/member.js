const DocumentedItem = require('./item');
const DocumentedItemMeta = require('./item');
const DocumentedVarType = require('./var-type');
const DocumentedParam = require('./param');

class DocumentedMember extends DocumentedItem {
	registerMetaInfo(data) {
		data.meta = new DocumentedItemMeta(this, data.meta);
		data.type = new DocumentedVarType(this, data.type);
		if(data.properties) {
			if(data.properties.length > 0) {
				for(let i = 0; i < data.properties.length; i++) {
					data.properties[i] = new DocumentedParam(this, data.properties[i]);
				}
			} else {
				data.properties = undefined;
			}
		}
		this.directData = data;
	}

	serialize() {
		return {
			name: this.directData.name,
			description: this.directData.description,
			scope: this.directData.scope !== 'instance' ? this.directData.scope : undefined,
			access: this.directData.access,
			readonly: this.directData.readonly,
			type: this.directData.type.serialize(),
			props: this.directData.properties ? this.directData.properties.map(p => p.serialize()) : undefined,
			meta: this.directData.meta.serialize()
		};
	}
}

/*
{ id: 'Client#rest',
  longname: 'Client#rest',
  name: 'rest',
  scope: 'instance',
  kind: 'member',
  description: 'The REST manager of the client',
  memberof: 'Client',
  type: { names: [ 'RESTManager' ] },
  access: 'private',
  meta:
   { lineno: 32,
     filename: 'Client.js',
     path: 'src/client' },
  order: 11 }
*/

module.exports = DocumentedMember;