const Yup = require('yup');

exports.createUser = Yup.object({
	body: Yup.object({
		name: Yup.string().required('User name is required'),
		email: Yup.string()
			.email('Enter a valid email address')
			.required('Email address is required'),
		gender: Yup.string().required('Gender is required'),
		status: Yup.string().required('Status is required'),
	})
		.noUnknown(true)
		.strict(true),
});

exports.updateUser = Yup.object({
	params: Yup.object({
		id: Yup.string().required(),
	}),
	body: Yup.object({
		name: Yup.string().required('User name is required'),
		email: Yup.string()
			.email('Enter a valid email address')
			.required('Email address is required'),
		gender: Yup.string().required('Gender is required'),
		status: Yup.string().required('Status is required'),
	}),
});
