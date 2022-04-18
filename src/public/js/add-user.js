(function () {
	const addUserForm = document.forms.namedItem('add-user');

	addUserForm.addEventListener('submit', function (e) {
		e.preventDefault();

		const formData = Object.fromEntries(
			new FormData(addUserForm).entries()
		);

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
				}
			})
			.catch((error) => {
				const errorDiv = document.getElementById('error');

				errorDiv.innerText = error.message;
			});
	});
})();
