create database beauty_bar;

create table account(
    id serial primary key not null,
    email varchar(100) not null,
    acc_password varchar(72) not null ,
    tel varchar(13) not null ,
    user_name varchar(50) not null ,
    user_surname varchar(50) null ,
    acc_role varchar(20) not null
);

create table employee(
    id serial primary key not null ,
    account_id int not null ,
    work_type varchar(20) not null ,
    work_hours_range varchar(20) not null ,
    work_status varchar(20) not null ,
    profile_picture bytea null,
    foreign key(account_id) references account(id)
);
drop table procedure;
create table procedure(
    id serial primary key not null ,
    procedure_type varchar(20) not null ,
    procedure_name varchar(50) not null ,
    description text null ,
    price double precision not null ,
    estimated_time varchar(5) null,
    discount smallint null
);

drop table receipt;
create table receipt(
    id serial primary key not null ,
    user_id int not null ,
    total_amount double precision not null ,
    payment_status varchar(20) not null ,
    payment_type varchar(20) not null
);
ALTER TABLE receipt
    ADD CONSTRAINT fk_user_receipt
        FOREIGN KEY (user_id) REFERENCES account(id);
drop table appointment;

create table appointment(
    id serial primary key not null ,
    client_id int not null ,
    employee_id int not null ,
    procedure_id int not null ,
    receipt_id int not null ,
    appointment_date timestamp not null,
    appointment_status varchar(20) not null ,
    foreign key (client_id) references account(id),
    foreign key (employee_id) references employee(id),
    foreign key (procedure_id) references procedure(id),
    foreign key (receipt_id) references receipt(id)
);

create table message(
    id serial primary key not null ,
    user_id int not null ,
    admin_id int null ,
    title text not null ,
    question text not null ,
    response text null ,
    closed boolean not null ,
    foreign key (user_id) references account(id),
    foreign key (admin_id) references account(id)
);

CREATE TABLE refresh_token (
  id serial primary key not null ,
  user_id int references account(id),
  token varchar(255) not null unique ,
  expiry_date timestamptz not null
);

alter table procedure add column image_data bytea null;

ALTER TABLE procedure
    ADD COLUMN procedure_time INTERVAL;

UPDATE procedure
SET procedure_time = estimated_time::interval;

ALTER TABLE employee
    ADD COLUMN work_start_time TIME,
    ADD COLUMN work_end_time TIME;
