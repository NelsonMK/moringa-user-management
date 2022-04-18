(function () {
	$onDelete = $('.table tbody td a.delete');
	$onDelete.click(function () {
		let id = $(this).attr('data-id');

		if (confirm('Do you want to delete this user?')) {
			fetch(`/api/users/${id}`, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
				},
			})
				.then((r) => r.json())
				.then((res) => {
					if (res.error) {
						alert(`Unable to delete user due to: ${res.message}`);
					} else {
						alert(res.message);
						location.reload();
					}
				})
				.catch((error) => {
					alert(`Unable to delete user due to: ${error.message}`);
				});
		}
	});
})();
