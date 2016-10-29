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
  
  create table materials (
	id int not null primary key auto_increment,
    name varchar(35) not null
  );
  
  alter table words add materialid int not null;
  
  alter table words add constraint fk_wordtype foreign key (typeid) references wordtype(id);
  alter table words add constraint fk_meterial foreign key (materialid) references meterials(id);
  
  create table wordreferences (
	id int not null primary key auto_increment,
    wordid int not null,
    wordreferenceid int not null
  );
  
  alter table wordreferences add constraint fk_word foreign key (wordid) references words(id);
  alter table wordreferences add constraint fk_wordreference foreign key (wordreferenceid) references words(id);
  
  alter table words add usedInRound bool not null default false;