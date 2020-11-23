calculateLength = () => {
	let url = document.querySelector('.input-field').value;
	let length = url.length;
	let current = document.querySelector('#current-length');
	let final = document.querySelector('#final-length');

	if (url === '') {
		current.innerHTML = '';
		final.innerHTML = '';
	} else {
		current.innerHTML = ' Length of your current link: ' + length;
		final.innerHTML = ' Length of trimmed link: 20';
	}
};

copyLinkHandler = () => {
	var copyText = document.getElementById('copy-link');
	copyText.select();
	copyText.setSelectionRange(0, 99999);
	document.execCommand('copy');
	document.querySelector('#link-copied').innerHTML =
		'Link copied to clipboard.';
};
