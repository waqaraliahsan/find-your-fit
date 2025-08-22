-- Seed mentors and mentees with sample data
insert into profiles (id, full_name, username, role, can_mentor, gender, education, profession, experience_years, location_city)
values
  (gen_random_uuid(),'Ali Khan','alikhan','mentee',false,'male','BS CS','Student',0,'Karachi'),
  (gen_random_uuid(),'Sara Ahmed','saraahmed','mentee',false,'female','BBA','Student',0,'Lahore');

-- Add more as needed (10 mentors, 10 mentees)
