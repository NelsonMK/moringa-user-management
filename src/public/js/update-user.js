(function () {
	const updateUserForm = document.forms.namedItem('update-user');

	updateUserForm.addEventListener('submit', function (e) {
		e.preventDefault();

		const formData = Object.fromEntries(
			new FormData(updateUserForm).entries()
		);

		fetch(`/api/users/${formData.id}`, {
			method: 'PUT',
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
					alert(res.message);
				}
			})
			.catch((error) => {
				const errorDiv = document.getElementById('error');
				errorDiv.innerText = error.message;
			});
	});
})();
