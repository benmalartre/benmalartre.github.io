var UNCONNECTED_MESSAGE = [
	{
		name: 'account',
		value: 'Vous posséder un compte?',
		type: DB_TYPE_INFOS
	},
	{
		name: 'login',
		text: 'Connectez vous!',
		onclick: 'OpenLogin',
		type: DB_TYPE_BUTTON
	},
	{
		name: 'inscription',
		value: 'Pas encore inscrit?',
		type: DB_TYPE_INFOS
	},
	{
		name: 'register',
		text: 'Créer un compte!',
		onclick: 'OpenRegister',
		type: DB_TYPE_BUTTON
	}
];

var modal = new Modal_t('Vous n\'etes pas connecté!', JSON.stringify(UNCONNECTED_MESSAGE), false);


