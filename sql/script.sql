create database LanguageLearning 
  DEFAULT CHARACTER SET utf8
  DEFAULT COLLATE utf8_general_ci;
  
  use LanguageLearning;
  
  create table words (
   id int not null primary key auto_increment,
   origin varchar(512) not null,
   origincomments varchar(1024),
   translation varchar(512) not null,
   translationcomments varchar(1024),
   type int not null
  );
  
  alter table words add stars int not null default 0;
  
  create table wordtype(
	id int not null primary key auto_increment,
    name char(8) not null
  );
  
  
  insert into wordtype (id, name) values (1, 'word');
  insert into wordtype (id, name) values (2, 'phrase');