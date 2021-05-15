// login form description
inputs = {
	'name': 'login',
	'datas':[
		{
			name: 'cmd',
			value: 'log_in',
			type: DB_TYPE_HIDDEN
		},
		{
			name: 'username',
			value: '',
			type: DB_TYPE_VARCHAR
		},
		{
			name: 'password',
			value: '',	
			type: DB_TYPE_PWD
		}
	]
};

function TextButton(form, label, cmd){
	var btn = document.createElement('a');
	btn.href = '#';
	btn.textContent = label;
	btn.onclick = cmd;
	form.appendChild(btn)
}

function Or(form){
	var btn = document.createElement('');
	btn.href = '#';
	btn.textContent = label;
	btn.onclick = cmd;
	form.appendChild(btn)

}

var modal = new Modal_t('Log-In', JSON.stringify(inputs['datas']));
var passwordBtn = TextButton(modal.form, 'Mot de passe perdu?', OpenLostPassword);
var registerBtn = TextButton(modal.form, 'Créer un compte?', OpenRegister);

var login = new Login_t(modal);
login.Setup();
