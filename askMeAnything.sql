create table session_info
(
    user_session  varchar(10)             not null,
    owner_session varchar(10)             not null,
    is_started     boolean   default false not null,
    created_time  timestamp default current_timestamp,

    PRIMARY KEY (user_session)
);

create table questions
(
    question_id          serial    not null,
    question_description varchar(150)          not null,
    user_session         varchar(10)           not null,
    is_answered           boolean default false not null,
    answer               varchar(150),
    follow_up_to           int,

    PRIMARY KEY (question_id),
    foreign key (user_session) references session_info (user_session) on delete cascade,
    foreign key (follow_up_to) references questions (question_id)
);

create table comments
(
    comment_id          serial not null,
    comment_description varchar(150)       not null,
    question_id         int                not null,

    PRIMARY KEY (comment_id),
    foreign key (question_id) references questions (question_id) on delete cascade
);
