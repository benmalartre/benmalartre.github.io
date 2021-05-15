// register form description
inputs = [
		{
			name: 'username',
			label: 'Utilisateur',
			type: DB_TYPE_VARCHAR
		},
		{
			name: 'password',
			label: 'Mot de passe',
			type: DB_TYPE_PWD
        },
		{
			name: 'name',
			label: 'Prénom',
			type: DB_TYPE_VARCHAR
		},
		{
			name: 'surname',
			label: 'Nom',
			type: DB_TYPE_VARCHAR
        },
        {
			name: 'age',	
			label: 'Age',
			type: DB_TYPE_INT
        },
       
        {
			name: 'mail',
			label: 'Mail',
			type: DB_TYPE_MAIL
        },
        {
			name: 'address',
			label: 'Addresse',
			type: DB_TYPE_VARCHAR
        },
        {
			name: 'postcode',
			label: 'Code postal',
			type: DB_TYPE_INT
        },
        {
			name: 'city',
			label: 'Ville',
			type: DB_TYPE_VARCHAR
		},
		{
			name: 'country',
			label: 'Pays',
			type: DB_TYPE_VARCHAR
        }
    ];

var modal = new Modal_t('Creation nouvel utilisateur', JSON.stringify(inputs));
modal.SetCallback(OnRegister)

