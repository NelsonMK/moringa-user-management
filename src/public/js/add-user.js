(function () {
	const addUserForm = document.forms.namedItem('add-user');

	addUserForm.addEventListener('submit', function (e) {
		e.preventDefault();

		if (document.querySelector('#email').value == '') {
			document
				.getElementById('email')
				.appendChild(document.createTextNode('Email is required'));
		}

		const formData = Object.fromEntries(
			new FormData(addUserForm).entries()
		);

		console.log(formData);

		fetch('/api/users', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(formData),
		})
			.then((r) => r.json())
			.then((res) => {
				if (res.error) {
					const errorDiv = document.getElementById('error');

					errorDiv.innerText = res.message;
				} else {
					alert('User created successfully');
					addUserForm.reset();
					console.log(res);
				}
			})
			.catch((error) => {
				const errorDiv = document.getElementById('error');

				errorDiv.innerText = error.message;
				console.log(error);
			});
	});
})();
