insert into public.tasks (
	created,
	title,
	description,
	urgency_hours
)
VALUES(
	current_timestamp(2),
	'title',
	'description',
	24
);
