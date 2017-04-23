create table Activity (
	aid varchar(10) not null, 
    aname varchar(50) not null, 
    fromd date , 
    tod date , 
    organizer varchar(50),
	primary key(aid));
 
create table Reward (
	rid varchar(10) not null, 
    rname varchar(50) not null, 
    adate date, 
    prize integer(10), 
    organizer varchar(50),
	primary key(rid));

create table Research (
	reid varchar(10) not null, 
    rname varchar(50) not null, 
    pubdate date, 
    field varchar(50),
	primary key(reid));

create table Project (
	pjid varchar(10) not null,
    pname varchar(50) not null, 
    description varchar(100), 
    field varchar(50),
	primary key(pjid));

create table Postalcode (
	district varchar(50) not null, 
    pcode varchar(5),
	primary key(district));

create table Parent (
	ssn varchar(13) not null,
    fname varchar(50) not null, 
    sname varchar(50) not null, 
    houseno varchar(10),
	road varchar(30), 
    subdistrict varchar(30), 
    district varchar(30), 
    province varchar(30), 
    gender varchar(1) not null, 
    bdate date not null, 
	role varchar(20),
    email varchar(30),
    tel varchar(10),
	primary key(ssn), 
	foreign key(district) references Postalcode(district));

create table Company (
	coid varchar(10) not null, 
    cname varchar(50) not null, 
    houseno varchar(10), 
    road varchar(30), 
	subdistrict varchar(30), 
    district varchar(30), 
    province varchar(30), 
    country varchar(2) not null, 
    tel varchar(10),
	primary key(coid), 
	foreign key(district) references Postalcode(district));

create table University (
	uid varchar(10) not null, 
    uname varchar(50) not null, 
    houseno varchar(10), 
    road varchar(30), 
	subdistrict varchar(30), 
    district varchar(30), 
    province varchar(30), 
    country varchar(2) not null, 
    tel varchar(10),
	primary key(uid), 
	foreign key(district) references Postalcode(district));

create table Faculty (
	fid varchar(2) not null, 
    fname varchar(50) not null, 
    houseno varchar(10),
	road varchar(30), 
    subdistrict varchar(30), 
    district varchar(30), 
    province varchar(30), 
    tel varchar(10),
    primary key(fid),
foreign key(district) references Postalcode(district));

create table Department (
	did varchar(2) not null, 
    fid varchar(2) not null, 
    dname varchar(50) not null, 
    tel varchar(10),
	primary key(fid,did),
    key(did),
	foreign key(fid) references Faculty(fid)); 

create table Student (
	sid varchar(10) not null, 
    ssn varchar(13) not null, 
    fname varchar(50) not null, 
    sname varchar(50) not null,	
	houseno varchar(10), 
    road varchar(30), 
    subdistrict varchar(30), 
    district varchar(30), 
    province varchar(30),
	gender varchar(1) not null, 
    bdate date not null,
    email varchar(30),
    tel varchar(10),
    syear varchar(4) not null, 
    eyear varchar(4), 
    did varchar(2) not null,
	fid varchar(2) not null,
	primary key(sid),
	foreign key(did) references Department(did),
	foreign key(fid) references Faculty(fid),
	foreign key(district) references Postalcode(district));

create table  Student_Status (
	sid varchar(10) not null, 
    probation varchar(1) not null, 
    studyabroad varchar(1) not null, 
    leaving varchar(1) not null,
	primary key(sid),
	foreign key(sid) references Student(sid));
 
create table Undergraduate (
	sid varchar(10) not null, 
    ssn varchar(13) not null, 
    fname varchar(50) not null, 
    sname varchar(50) not null, 
    houseno varchar(10),
	road varchar(30), 
    subdistrict varchar(30), 
    district varchar(30), 
    province varchar(30), 
    gender varchar(1) not null, 
    bdate date not null, 
	email varchar(30),
    tel varchar(10),
	syear varchar(4) not null, 
    eyear varchar(4), 
    did varchar(2) not null, 
    fid varchar(2) not null, 
    pjid varchar(10), 	
	primary key(sid), 
	foreign key(did) references Department(did),
	foreign key(fid) references Faculty(fid),
	foreign key(pjid) references Project(pjid),
	foreign key(district) references Postalcode(district));
 
create table  Undergraduate_Status (
	sid varchar(10) not null, 
    probation varchar(1) not null, 
    studyabroad varchar(1) not null, 
    leaving varchar(1) not null,
	primary key(sid),
	foreign key(sid) references Undergraduate(sid));
 
create table Graduate (
	sid varchar(10) not null, 
    ssn varchar(13) not null, 
    fname varchar(50) not null, 
    sname varchar(50) not null, 
    houseno varchar(10),
	road varchar(30), 
    subdistrict varchar(30), 
    district varchar(30), 
    province varchar(30), 
    gender varchar(1) not null, 
    bdate date not null, 
	email varchar(30),
    tel varchar(10),
	syear varchar(4) not null, 
    eyear varchar(4), 
    did varchar(2) not null, 
    fid varchar(2) not null, 
    degree varchar(50), 
    uid varchar(10), 
    gyear varchar(4),
	primary key(sid), 
	foreign key(did) references Department(did),
	foreign key(fid) references Faculty(fid),
	foreign key(uid) references University(uid),
	foreign key(district) references Postalcode(district));
 
create table  Graduate_Status (
	sid varchar(10) not null, 
    probation varchar(1) not null, 
    studyabroad varchar(1) not null, 
    leaving varchar(1) not null,
	primary key(sid),
	foreign key(sid) references Graduate(sid));
 
create table Professor (
	pab varchar(3) not null, 
    ssn varchar(13) not null,
    fname varchar(50) not null, 
    sname varchar(50) not null, 
    houseno varchar(10),
	road varchar(30), 
    subdistrict varchar(30), 
    district varchar(30), 
    province varchar(30), 
    gender varchar(1) not null, 
    bdate date not null, 
	advanced varchar(50), 
    since varchar(4) not null, 
	email varchar(30),
    tel varchar(10), 
    did varchar(2) not null, 
    fid varchar(2) not null,
	primary key(pab), 
	foreign key(did) references Department(did),
	foreign key(fid) references Faculty(fid),
	foreign key(district) references Postalcode(district));
 
create table Staff (
	ssn varchar(13) not null,
    fname varchar(50) not null, 
    sname varchar(50) not null, 
    houseno varchar(10),
	road varchar(30), 
    subdistrict varchar(30), 
    district varchar(30), 
    province varchar(30), 
    gender varchar(1) not null, 
    bdate date not null, 
	role varchar(50), 
    since varchar(4) not null,
    email varchar(30),
    tel varchar(10), 
    did varchar(2) not null, 
    fid varchar(2) not null,
	primary key(ssn), 
	foreign key(did) references Department(did),
	foreign key(fid) references Faculty(fid),
	foreign key(district) references Postalcode(district));
 
create table Course (
	cid varchar(7) not null, 
    cname varchar(50) not null, 
    credit integer(1) not null, 
    did varchar(2) not null, 
    fid varchar(2) not null,
	primary key(cid), 
	foreign key(did) references Department(did),
	foreign key(fid) references Faculty(fid));

create table Rule (
	sid varchar(10) not null, 
    ssn varchar(13) not null,
	primary key(sid,ssn),
	foreign key(sid) references Student(sid),
	foreign key(ssn) references Parent(ssn));

create table Join_Activity (
	sid varchar(10) not null, 
    aid varchar(10) not null,
	primary key(sid,aid),
	foreign key(sid) references Student(sid),
	foreign key(aid) references Activity(aid));

create table Earn_Reward (
	sid varchar(10) not null, 
    rid varchar(10) not null,
	primary key(sid,rid),
	foreign key(sid) references Student(sid),
	foreign key(rid) references Reward(rid));

create table Own_Research (
	sid varchar(10) not null, 
    reid varchar(10) not null,
	primary key(sid,reid),
	foreign key(sid) references Student(sid),
	foreign key(reid) references Research(reid));

create table Intern (
	sid varchar(10) not null, 
    coid varchar(10) not null, 
    istatus varchar(1) not null, 
    fromd date, 
    tod date, 
    cfname varchar(50),
	csname varchar(50), 
    cposition varchar(50),
	email varchar(30),
    tel varchar(10),
	primary key(sid,coid),
	foreign key(sid) references Student(sid),
	foreign key(coid) references Company(coid));

create table Intern_Lab (
	sid varchar(10) not null, 
    uid varchar(10) not null, 
    istatus varchar(1) not null, 
    fromd date, 
    tod date,
	primary key(sid,uid),
	foreign key(sid) references Student(sid),
	foreign key(uid) references University(uid));

create table Advisor (
	sid varchar(10) not null, 
    pab varchar(3) not null, 
    fromd date not null, 
    tod date,
	primary key(sid,pab),
	foreign key(sid) references Student(sid),
	foreign key(pab) references Professor(pab));

create table Control_Project (
	pab varchar(3) not null, 
	pjid varchar(10) not null,
	primary key(pab,pjid),
	foreign key(pab) references Professor(pab),
	foreign key(pjid) references Project(pjid));

create table Enroll (
	sid varchar(10) not null, 
    cid varchar(7) not null, 
    eyear varchar(4) not null, 
    semester varchar(1) not null, 
    section varchar(2) not null, 
    grade varchar(1) not null,
	primary key (sid, cid, eyear, semester, section),
	foreign key(sid) references Student(sid),
	foreign key(cid) references Course(cid));

create table Attend (
	sid varchar(10) not null, 
    cid varchar(7) not null, 
    eyear varchar(4) not null, 
    semester varchar(1) not null, 
    section varchar(2) not null, 
    adate date not null,
	primary key (sid, cid, eyear, semester, section, adate),
	foreign key(sid) references Student(sid),
	foreign key(cid) references Course(cid));

create table Teach (
	pab varchar(3) not null, 
    cid varchar(7) not null, 
    eyear varchar(4) not null, 
    semester varchar(1) not null, 
    section varchar(2) not null,
	primary key (pab, cid, eyear, semester, section),
	foreign key(pab) references Professor(pab),
	foreign key(cid) references Course(cid)); 

create table Department_Leader (
	pab varchar(3) not null, 
    did varchar(2) not null, 
    fid varchar(2) not null, 
    fromd date not null, 
    tod date,
	primary key (pab, did, fid, fromd),
	foreign key(pab) references Professor(pab),
	foreign key(did) references Department(did),
	foreign key(fid) references Faculty(fid));

create table Faculty_Head (
	pab varchar(3) not null, 
    fid varchar(2) not null, 
    fromd date not null, 
    tod date,
	primary key (pab, fid,  fromd),
	foreign key(pab) references Professor(pab),
	foreign key(fid) references Faculty(fid));
    
/*Dummy Dump*/

insert into Postalcode
values ('Bangrak','10500');

insert into Postalcode
values ('Pathumwan','10330');

insert into Faculty
value ('21','Engineering',null,null,null,'Bangrak',null,null);

insert into Department
values ('10','21','Computer',null);

insert into Student 
values (5730196321,1111111111111,'Danupat','Khamnuansin','113/14','Nares','4 Phaya','Bangrak','Bangkok','M','19960430'
,'jrkns1996@gmail.com','0892668633','2014','','10','21');

insert into Student 
values (5730197421,222222222222,'Brown','Bigbear','15/14','Line Rd','4 Phaya','Bangrak','Bangkok','M','19960515'
,'brown@line.me','0899999999','2014','','10','21');

insert into Professor
values ('PFS',3333333333333,'Dummy','ProfessorX','12/112','Jupiter Rd','Puttaram','Pathumwan','Bangkok','M','19800130','Security'
,'1999','professorX@chula.ac.th','0911111111','10','21');

insert into Student_Status
values (5730196321,'N','N','Y');

insert into Advisor
values(5730196321,'PFS','20150101',null);

insert into Project
values('1102011','SecureBit v2','Impoved from SecureBit v1','Security');

insert into Undergraduate
values (5730196321,1111111111111,'Danupat','Khamnuansin','113/14','Nares','4 Phaya','Bangrak','Bangkok','M','19960430'
,'jrkns1996@gmail.com','0892668633','2014','','10','21','1102011');

insert into Undergraduate 
values (5730197421,222222222222,'Brown','Bigbear','15/14','Line Rd','4 Phaya','Bangrak','Bangkok','M','19960515'
,'brown@line.me','0899999999','2014','','10','21','1102011');

insert into Control_Project
values('PFS','1102011');

insert into Course
values('2110422','DB MGT SYS DESIGN',3,'10','21');

insert into Teach
values('PFS','2110422','2016','2','1');