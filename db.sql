show databases;

create database quiz_project;

use quiz_project;

show tables;

desc users;
desc question;
desc answers;
desc reviews;

select * from users;
select * from question;
select * from answers;
select * from reviews;

truncate table reviews;

ALTER TABLE users DROP COLUMN token;

ALTER TABLE users ADD COLUMN token TEXT NULL;

ALTER TABLE answers ADD COLUMN answer VARCHAR(10) NOT NULL ;

ALTER TABLE answers ADD COLUMN createdAt DATETIME NOT NULL;

delete from question;

delete from users where username="sadsfdfdf";

delete from answers where user_id="admin";

delete from reviews where user_id="admin2";

INSERT INTO question(id, question)
VALUES (1, "A"),
(2, "B"),
(3, "C"),
(4, "D"),
(5, "E"),
(6, "F"),
(7, "G"),
(8, "H"),
(9, "I"),
(10, "J"),
(11, "K"),
(12, "L"),
(13, "M"),
(14, "N"),
(15, "O"),
(16, "P"),
(17, "R"),
(18, "S"),
(19, "T"),
(20, "U");

create table reviews (
    id INT NOT NULL AUTO_INCREMENT,
    review VARCHAR(100) NOT NULL ,
    user_id VARCHAR(100) NOT NULL,

    PRIMARY KEY (id)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci ENGINE InnoDB;

alter table reviews add constraint reviews_user_id_fkey foreign key (user_id) references users(username) on delete cascade on update cascade;




