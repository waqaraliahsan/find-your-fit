-- Expanded seed data with 10 mentors and 10 mentees
insert into profiles (id, full_name, username, role, can_mentor, gender, education, profession, experience_years, location_city)
values
  (gen_random_uuid(),'Ali Khan','alikhan','mentee',false,'male','BS CS','Student',0,'Karachi'),
  (gen_random_uuid(),'Sara Ahmed','saraahmed','mentee',false,'female','BBA','Student',0,'Lahore'),
  (gen_random_uuid(),'Bilal Hussain','bilal','mentee',false,'male','BS Econ','Student',0,'Islamabad'),
  (gen_random_uuid(),'Nida Malik','nidamalik','mentee',false,'female','BA','Student',0,'Quetta'),
  (gen_random_uuid(),'Faraz Sheikh','faraz','mentee',false,'male','BS Physics','Student',0,'Peshawar'),
  (gen_random_uuid(),'Amna Yousaf','amna','mentee',false,'female','BCom','Student',0,'Multan'),
  (gen_random_uuid(),'Hamza Ali','hamza','mentee',false,'male','BS IT','Student',0,'Faisalabad'),
  (gen_random_uuid(),'Hira Shah','hira','mentee',false,'female','BS Bio','Student',0,'Rawalpindi'),
  (gen_random_uuid(),'Usman Raza','usman','mentee',false,'male','BS Math','Student',0,'Sialkot'),
  (gen_random_uuid(),'Zara Siddiqui','zara','mentee',false,'female','BA','Student',0,'Karachi');

-- mentors
insert into profiles (id, full_name, username, role, can_mentor, gender, education, profession, experience_years, location_city)
values
  (gen_random_uuid(),'Dr. Ayesha Khan','ayesha','mentee',true,'female','MBBS','Doctor',10,'Karachi'),
  (gen_random_uuid(),'Imran Qureshi','imran','mentee',true,'male','BS CS','Software Engineer',7,'Lahore'),
  (gen_random_uuid(),'Fatima Noor','fatima','mentee',true,'female','MBA','Marketing Manager',8,'Islamabad'),
  (gen_random_uuid(),'Ahmed Raza','ahmed','mentee',true,'male','MS Finance','Financial Analyst',6,'Karachi'),
  (gen_random_uuid(),'Sana Gul','sana','mentee',true,'female','BS Design','UX Designer',5,'Lahore'),
  (gen_random_uuid(),'Kashif Ali','kashif','mentee',true,'male','MS Supply Chain','Supply Chain Manager',9,'Faisalabad'),
  (gen_random_uuid(),'Mariam Javed','mariam','mentee',true,'female','BS CS','Data Scientist',4,'Rawalpindi'),
  (gen_random_uuid(),'Omar Latif','omar','mentee',true,'male','BS Civil','Civil Engineer',12,'Multan'),
  (gen_random_uuid(),'Rabia Hassan','rabia','mentee',true,'female','BS Media','Journalist',7,'Quetta'),
  (gen_random_uuid(),'Tariq Mehmood','tariq','mentee',true,'male','MS Electrical','Electrical Engineer',11,'Peshawar');
