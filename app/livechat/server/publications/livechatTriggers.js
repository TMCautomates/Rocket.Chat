import { Meteor } from 'meteor/meteor';

import { hasPermission } from '../../../authorization';
import { LivechatTrigger } from '../../../models';

Meteor.publish('livechat:triggers', function(_id) {
	console.warn('The publication "livechat:triggers" is deprecated and will be removed after version v3.0.0');
	if (!this.userId) {
		return this.error(new Meteor.Error('error-not-authorized', 'Not authorized', { publish: 'livechat:triggers' }));
	}

	if (!hasPermission(this.userId, 'view-livechat-manager')) {
		return this.error(new Meteor.Error('error-not-authorized', 'Not authorized', { publish: 'livechat:triggers' }));
	}

	if (_id !== undefined) {
		return LivechatTrigger.findById(_id);
	}
	return LivechatTrigger.find();
});
