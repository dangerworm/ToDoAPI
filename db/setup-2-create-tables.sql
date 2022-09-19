create table if not exists public.tasks (
	task_id uuid primary key default(gen_random_uuid()),
	created timestamp(2) not null default(current_timestamp(2)),
	title text not null,
	description text null,
	tags text default('[]'),
	urgency_hours int not null,
	repeats boolean not null default(false),
	repeats_hours int null,
	repeats_start timestamp(2) null	
);

create table if not exists public.task_completions (
	task_id uuid not null,
	completed timestamp(2) not null default(current_timestamp(2))
);