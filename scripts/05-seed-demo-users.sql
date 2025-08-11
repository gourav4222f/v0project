-- Seed demo users for testing (REMOVE IN PRODUCTION)
-- This creates users directly in the profiles table for demo purposes

-- Insert demo branches first
INSERT INTO branches (id, name, address, phone, email) VALUES
    ('demo-branch-main', 'Demo Main Campus', '123 Demo Street, Demo City', '+1-555-0100', 'main@democrm.com'),
    ('demo-branch-north', 'Demo North Branch', '456 North Ave, Demo City', '+1-555-0101', 'north@democrm.com')
ON CONFLICT (id) DO NOTHING;

-- Insert demo user profiles
INSERT INTO profiles (id, full_name, role, phone, address, branch_id) VALUES
    -- Admin users
    ('demo-admin-1', 'Admin User', 'admin', '+1-555-1001', '123 Admin St', 'demo-branch-main'),
    ('demo-admin-2', 'Sarah Administrator', 'admin', '+1-555-1002', '456 Admin Ave', 'demo-branch-main'),
    
    -- Teachers
    ('demo-teacher-1', 'Dr. John Smith', 'teacher', '+1-555-2001', '789 Teacher Rd', 'demo-branch-main'),
    ('demo-teacher-2', 'Prof. Emily Johnson', 'teacher', '+1-555-2002', '321 Faculty St', 'demo-branch-main'),
    ('demo-teacher-3', 'Dr. Michael Brown', 'teacher', '+1-555-2003', '654 Education Blvd', 'demo-branch-north'),
    ('demo-teacher-4', 'Ms. Lisa Davis', 'teacher', '+1-555-2004', '987 Learning Lane', 'demo-branch-main'),
    
    -- Accountants
    ('demo-accountant-1', 'Robert Finance', 'accountant', '+1-555-3001', '111 Money St', 'demo-branch-main'),
    ('demo-accountant-2', 'Maria Accounts', 'accountant', '+1-555-3002', '222 Budget Ave', 'demo-branch-north'),
    
    -- Students
    ('demo-student-1', 'Alice Cooper', 'student', '+1-555-4001', '100 Student St', 'demo-branch-main'),
    ('demo-student-2', 'Bob Wilson', 'student', '+1-555-4002', '200 Learner Ave', 'demo-branch-main'),
    ('demo-student-3', 'Charlie Brown', 'student', '+1-555-4003', '300 Study Rd', 'demo-branch-main'),
    ('demo-student-4', 'Diana Prince', 'student', '+1-555-4004', '400 Knowledge St', 'demo-branch-north'),
    ('demo-student-5', 'Edward Norton', 'student', '+1-555-4005', '500 Education Ave', 'demo-branch-main'),
    ('demo-student-6', 'Fiona Green', 'student', '+1-555-4006', '600 Learning Blvd', 'demo-branch-main'),
    ('demo-student-7', 'George Miller', 'student', '+1-555-4007', '700 Academic St', 'demo-branch-north'),
    ('demo-student-8', 'Hannah White', 'student', '+1-555-4008', '800 Scholar Ave', 'demo-branch-main'),
    ('demo-student-9', 'Ian Black', 'student', '+1-555-4009', '900 Pupil Rd', 'demo-branch-main'),
    ('demo-student-10', 'Julia Red', 'student', '+1-555-4010', '1000 Student Lane', 'demo-branch-north'),
    
    -- Parents
    ('demo-parent-1', 'Mr. Cooper Sr.', 'parent', '+1-555-5001', '100 Student St', 'demo-branch-main'),
    ('demo-parent-2', 'Mrs. Wilson', 'parent', '+1-555-5002', '200 Learner Ave', 'demo-branch-main'),
    ('demo-parent-3', 'Mr. Brown Sr.', 'parent', '+1-555-5003', '300 Study Rd', 'demo-branch-main'),
    
    -- Alumni
    ('demo-alumni-1', 'Alex Graduate', 'alumni', '+1-555-6001', '123 Alumni St', 'demo-branch-main'),
    ('demo-alumni-2', 'Beth Former', 'alumni', '+1-555-6002', '456 Graduate Ave', 'demo-branch-main')
ON CONFLICT (id) DO NOTHING;

-- Insert demo courses
INSERT INTO courses (id, title, description, fee, duration_months, branch_id) VALUES
    ('demo-course-1', 'Advanced Mathematics', 'Comprehensive mathematics course covering algebra, calculus, and statistics', 15000.00, 12, 'demo-branch-main'),
    ('demo-course-2', 'Physics Fundamentals', 'Introduction to physics concepts including mechanics, thermodynamics, and electromagnetism', 18000.00, 12, 'demo-branch-main'),
    ('demo-course-3', 'Chemistry Basics', 'Basic chemistry covering organic and inorganic chemistry', 16000.00, 12, 'demo-branch-main'),
    ('demo-course-4', 'English Literature', 'Study of classic and modern literature with writing skills', 12000.00, 12, 'demo-branch-north'),
    ('demo-course-5', 'Computer Science', 'Programming fundamentals and computer science concepts', 25000.00, 12, 'demo-branch-main'),
    ('demo-course-6', 'Biology Advanced', 'Advanced biology covering genetics, ecology, and molecular biology', 20000.00, 12, 'demo-branch-north')
ON CONFLICT (id) DO NOTHING;

-- Insert teacher records
INSERT INTO teachers (id, employee_id, salary, hire_date, qualification, specialization) VALUES
    ('demo-teacher-1', 'EMP001', 50000.00, '2020-01-15', 'PhD in Mathematics', 'Advanced Mathematics'),
    ('demo-teacher-2', 'EMP002', 55000.00, '2019-08-20', 'PhD in Physics', 'Theoretical Physics'),
    ('demo-teacher-3', 'EMP003', 48000.00, '2021-03-10', 'MSc in Chemistry', 'Organic Chemistry'),
    ('demo-teacher-4', 'EMP004', 45000.00, '2022-01-05', 'MA in English', 'Literature and Writing')
ON CONFLICT (id) DO NOTHING;

-- Insert student records
INSERT INTO students (id, student_id, guardian_name, guardian_phone, guardian_email, emergency_contact) VALUES
    ('demo-student-1', 'STU001', 'Mr. Cooper Sr.', '+1-555-5001', 'cooper.sr@email.com', '+1-555-5001'),
    ('demo-student-2', 'STU002', 'Mrs. Wilson', '+1-555-5002', 'wilson.mom@email.com', '+1-555-5002'),
    ('demo-student-3', 'STU003', 'Mr. Brown Sr.', '+1-555-5003', 'brown.dad@email.com', '+1-555-5003'),
    ('demo-student-4', 'STU004', 'Mrs. Prince', '+1-555-5004', 'prince.mom@email.com', '+1-555-5004'),
    ('demo-student-5', 'STU005', 'Mr. Norton', '+1-555-5005', 'norton.dad@email.com', '+1-555-5005'),
    ('demo-student-6', 'STU006', 'Mrs. Green', '+1-555-5006', 'green.mom@email.com', '+1-555-5006'),
    ('demo-student-7', 'STU007', 'Mr. Miller', '+1-555-5007', 'miller.dad@email.com', '+1-555-5007'),
    ('demo-student-8', 'STU008', 'Mrs. White', '+1-555-5008', 'white.mom@email.com', '+1-555-5008'),
    ('demo-student-9', 'STU009', 'Mr. Black', '+1-555-5009', 'black.dad@email.com', '+1-555-5009'),
    ('demo-student-10', 'STU010', 'Mrs. Red', '+1-555-5010', 'red.mom@email.com', '+1-555-5010')
ON CONFLICT (id) DO NOTHING;

-- Assign teachers to courses
INSERT INTO teacher_courses (teacher_id, course_id) VALUES
    ('demo-teacher-1', 'demo-course-1'), -- Dr. Smith teaches Math
    ('demo-teacher-2', 'demo-course-2'), -- Prof. Johnson teaches Physics
    ('demo-teacher-3', 'demo-course-3'), -- Dr. Brown teaches Chemistry
    ('demo-teacher-4', 'demo-course-4'), -- Ms. Davis teaches English
    ('demo-teacher-1', 'demo-course-5'), -- Dr. Smith also teaches Computer Science
    ('demo-teacher-2', 'demo-course-6')  -- Prof. Johnson also teaches Biology
ON CONFLICT (teacher_id, course_id) DO NOTHING;

-- Enroll students in courses
INSERT INTO enrollments (student_id, course_id, status, enrolled_at, progress) VALUES
    -- Alice Cooper enrollments
    ('demo-student-1', 'demo-course-1', 'active', '2024-01-15', 75.5),
    ('demo-student-1', 'demo-course-2', 'active', '2024-01-15', 68.2),
    
    -- Bob Wilson enrollments
    ('demo-student-2', 'demo-course-1', 'active', '2024-01-16', 82.1),
    ('demo-student-2', 'demo-course-3', 'active', '2024-01-16', 71.8),
    
    -- Charlie Brown enrollments
    ('demo-student-3', 'demo-course-2', 'active', '2024-01-17', 79.3),
    ('demo-student-3', 'demo-course-5', 'active', '2024-01-17', 85.7),
    
    -- Diana Prince enrollments
    ('demo-student-4', 'demo-course-4', 'active', '2024-01-18', 88.9),
    ('demo-student-4', 'demo-course-6', 'active', '2024-01-18', 76.4),
    
    -- Edward Norton enrollments
    ('demo-student-5', 'demo-course-1', 'active', '2024-01-19', 73.2),
    ('demo-student-5', 'demo-course-5', 'active', '2024-01-19', 91.5),
    
    -- More enrollments for variety
    ('demo-student-6', 'demo-course-2', 'active', '2024-01-20', 67.8),
    ('demo-student-7', 'demo-course-3', 'active', '2024-01-21', 84.3),
    ('demo-student-8', 'demo-course-4', 'active', '2024-01-22', 79.1),
    ('demo-student-9', 'demo-course-5', 'active', '2024-01-23', 72.6),
    ('demo-student-10', 'demo-course-6', 'active', '2024-01-24', 86.2)
ON CONFLICT (student_id, course_id) DO NOTHING;

-- Insert sample attendance records (last 30 days)
INSERT INTO attendance (student_id, course_id, teacher_id, date, status, notes, marked_by) VALUES
    -- Alice Cooper attendance
    ('demo-student-1', 'demo-course-1', 'demo-teacher-1', '2024-01-15', 'present', NULL, 'demo-teacher-1'),
    ('demo-student-1', 'demo-course-1', 'demo-teacher-1', '2024-01-16', 'present', NULL, 'demo-teacher-1'),
    ('demo-student-1', 'demo-course-1', 'demo-teacher-1', '2024-01-17', 'absent', 'Sick leave', 'demo-teacher-1'),
    ('demo-student-1', 'demo-course-1', 'demo-teacher-1', '2024-01-18', 'present', NULL, 'demo-teacher-1'),
    ('demo-student-1', 'demo-course-1', 'demo-teacher-1', '2024-01-19', 'present', NULL, 'demo-teacher-1'),
    
    -- Bob Wilson attendance
    ('demo-student-2', 'demo-course-1', 'demo-teacher-1', '2024-01-15', 'present', NULL, 'demo-teacher-1'),
    ('demo-student-2', 'demo-course-1', 'demo-teacher-1', '2024-01-16', 'present', NULL, 'demo-teacher-1'),
    ('demo-student-2', 'demo-course-1', 'demo-teacher-1', '2024-01-17', 'present', NULL, 'demo-teacher-1'),
    ('demo-student-2', 'demo-course-1', 'demo-teacher-1', '2024-01-18', 'late', 'Traffic jam', 'demo-teacher-1'),
    ('demo-student-2', 'demo-course-1', 'demo-teacher-1', '2024-01-19', 'present', NULL, 'demo-teacher-1'),
    
    -- More attendance records for variety
    ('demo-student-3', 'demo-course-2', 'demo-teacher-2', '2024-01-15', 'present', NULL, 'demo-teacher-2'),
    ('demo-student-4', 'demo-course-4', 'demo-teacher-4', '2024-01-15', 'present', NULL, 'demo-teacher-4'),
    ('demo-student-5', 'demo-course-5', 'demo-teacher-1', '2024-01-15', 'present', NULL, 'demo-teacher-1')
ON CONFLICT (student_id, course_id, date) DO NOTHING;

-- Insert fee payment records
INSERT INTO fee_payments (student_id, course_id, amount_due, amount_paid, due_date, paid_date, status, payment_method, transaction_id) VALUES
    -- Paid fees
    ('demo-student-1', 'demo-course-1', 15000.00, 15000.00, '2024-01-31', '2024-01-15', 'paid', 'bank_transfer', 'TXN001'),
    ('demo-student-2', 'demo-course-1', 15000.00, 15000.00, '2024-01-31', '2024-01-16', 'paid', 'credit_card', 'TXN002'),
    ('demo-student-3', 'demo-course-2', 18000.00, 18000.00, '2024-01-31', '2024-01-17', 'paid', 'cash', 'TXN003'),
    
    -- Pending fees
    ('demo-student-1', 'demo-course-2', 18000.00, 0.00, '2024-02-28', NULL, 'pending', NULL, NULL),
    ('demo-student-4', 'demo-course-4', 12000.00, 6000.00, '2024-02-28', NULL, 'pending', NULL, NULL),
    ('demo-student-5', 'demo-course-5', 25000.00, 0.00, '2024-02-28', NULL, 'pending', NULL, NULL),
    
    -- Overdue fees
    ('demo-student-6', 'demo-course-2', 18000.00, 0.00, '2024-01-15', NULL, 'overdue', NULL, NULL),
    ('demo-student-7', 'demo-course-3', 16000.00, 8000.00, '2024-01-20', NULL, 'overdue', NULL, NULL)
ON CONFLICT DO NOTHING;

-- Insert salary records
INSERT INTO salary_records (teacher_id, amount, month, year, paid_date, status, bonus, deductions) VALUES
    ('demo-teacher-1', 50000.00, 12, 2023, '2024-01-01', 'paid', 5000.00, 2000.00),
    ('demo-teacher-2', 55000.00, 12, 2023, '2024-01-01', 'paid', 3000.00, 2500.00),
    ('demo-teacher-3', 48000.00, 12, 2023, '2024-01-01', 'paid', 2000.00, 1800.00),
    ('demo-teacher-4', 45000.00, 12, 2023, '2024-01-01', 'paid', 1500.00, 1500.00),
    
    -- Current month (pending)
    ('demo-teacher-1', 50000.00, 1, 2024, NULL, 'pending', 0.00, 2000.00),
    ('demo-teacher-2', 55000.00, 1, 2024, NULL, 'pending', 0.00, 2500.00),
    ('demo-teacher-3', 48000.00, 1, 2024, NULL, 'pending', 0.00, 1800.00),
    ('demo-teacher-4', 45000.00, 1, 2024, NULL, 'pending', 0.00, 1500.00)
ON CONFLICT (teacher_id, month, year) DO NOTHING;

-- Insert notifications
INSERT INTO notifications (user_id, title, message, type, read, sent_at) VALUES
    ('demo-student-1', 'Fee Payment Due', 'Your Physics course fee of $18,000 is due on Feb 28, 2024', 'payment', false, NOW() - INTERVAL '2 hours'),
    ('demo-student-1', 'Assignment Submitted', 'Your Math assignment has been successfully submitted', 'academic', true, NOW() - INTERVAL '1 day'),
    ('demo-teacher-1', 'New Student Enrolled', 'A new student has enrolled in your Mathematics course', 'enrollment', false, NOW() - INTERVAL '3 hours'),
    ('demo-teacher-2', 'Salary Processed', 'Your December salary has been processed and will be credited soon', 'salary', true, NOW() - INTERVAL '2 days'),
    ('demo-admin-1', 'Monthly Report Ready', 'The monthly financial report is ready for review', 'report', false, NOW() - INTERVAL '1 hour'),
    ('demo-accountant-1', 'Payment Received', 'Fee payment of $15,000 received from Alice Cooper', 'payment', false, NOW() - INTERVAL '4 hours')
ON CONFLICT DO NOTHING;

-- Insert events
INSERT INTO events (title, description, event_type, start_date, end_date, location, course_id, branch_id, created_by) VALUES
    ('Mid-term Examinations', 'Mid-term exams for all courses', 'exam', '2024-02-15 09:00:00+00', '2024-02-20 17:00:00+00', 'Main Examination Hall', NULL, 'demo-branch-main', 'demo-admin-1'),
    ('Parent-Teacher Meeting', 'Quarterly parent-teacher interaction session', 'meeting', '2024-02-25 10:00:00+00', '2024-02-25 16:00:00+00', 'Conference Room A', NULL, 'demo-branch-main', 'demo-admin-1'),
    ('Science Fair', 'Annual science project exhibition', 'event', '2024-03-10 09:00:00+00', '2024-03-10 18:00:00+00', 'Main Auditorium', NULL, 'demo-branch-main', 'demo-teacher-2'),
    ('Mathematics Workshop', 'Advanced mathematics problem-solving workshop', 'workshop', '2024-02-28 14:00:00+00', '2024-02-28 17:00:00+00', 'Room 101', 'demo-course-1', 'demo-branch-main', 'demo-teacher-1'),
    ('Career Guidance Session', 'Career counseling for final year students', 'seminar', '2024-03-05 11:00:00+00', '2024-03-05 13:00:00+00', 'Seminar Hall', NULL, 'demo-branch-north', 'demo-admin-1')
ON CONFLICT DO NOTHING;

-- Insert study materials
INSERT INTO study_materials (course_id, teacher_id, title, description, file_url, file_type, version) VALUES
    ('demo-course-1', 'demo-teacher-1', 'Algebra Fundamentals', 'Basic algebra concepts and problem-solving techniques', '/materials/algebra-fundamentals.pdf', 'pdf', 1),
    ('demo-course-1', 'demo-teacher-1', 'Calculus Introduction', 'Introduction to differential and integral calculus', '/materials/calculus-intro.pdf', 'pdf', 2),
    ('demo-course-2', 'demo-teacher-2', 'Physics Lab Manual', 'Laboratory experiments and procedures', '/materials/physics-lab.pdf', 'pdf', 1),
    ('demo-course-3', 'demo-teacher-3', 'Organic Chemistry Notes', 'Comprehensive notes on organic chemistry reactions', '/materials/organic-chem.pdf', 'pdf', 1),
    ('demo-course-4', 'demo-teacher-4', 'Literature Analysis Guide', 'Guide to analyzing literary works', '/materials/lit-analysis.pdf', 'pdf', 1),
    ('demo-course-5', 'demo-teacher-1', 'Programming Basics', 'Introduction to programming concepts', '/materials/programming-basics.pdf', 'pdf', 3)
ON CONFLICT DO NOTHING;

-- Insert leave requests
INSERT INTO leave_requests (teacher_id, start_date, end_date, reason, status, approved_by, approved_at) VALUES
    ('demo-teacher-1', '2024-02-10', '2024-02-12', 'Medical appointment', 'approved', 'demo-admin-1', '2024-02-05 10:00:00+00'),
    ('demo-teacher-2', '2024-02-20', '2024-02-21', 'Family emergency', 'approved', 'demo-admin-1', '2024-02-18 14:30:00+00'),
    ('demo-teacher-3', '2024-03-01', '2024-03-03', 'Conference attendance', 'pending', NULL, NULL),
    ('demo-teacher-4', '2024-02-15', '2024-02-15', 'Personal work', 'rejected', 'demo-admin-1', '2024-02-12 09:15:00+00')
ON CONFLICT DO NOTHING;

-- Insert audit logs for demo
INSERT INTO audit_logs (user_id, action, table_name, record_id, old_values, new_values) VALUES
    ('demo-admin-1', 'CREATE', 'profiles', 'demo-student-1', NULL, '{"full_name": "Alice Cooper", "role": "student"}'),
    ('demo-teacher-1', 'UPDATE', 'attendance', 'demo-student-1', '{"status": "absent"}', '{"status": "present"}'),
    ('demo-accountant-1', 'CREATE', 'fee_payments', 'demo-student-1', NULL, '{"amount_due": 15000, "status": "pending"}'),
    ('demo-admin-1', 'UPDATE', 'salary_records', 'demo-teacher-1', '{"status": "pending"}', '{"status": "paid"}')
ON CONFLICT DO NOTHING;

-- Create a function to clean up demo data
CREATE OR REPLACE FUNCTION cleanup_demo_data()
RETURNS void AS $$
BEGIN
    -- Delete in reverse order of dependencies
    DELETE FROM audit_logs WHERE user_id LIKE 'demo-%';
    DELETE FROM leave_requests WHERE teacher_id LIKE 'demo-%';
    DELETE FROM study_materials WHERE course_id LIKE 'demo-%';
    DELETE FROM events WHERE branch_id LIKE 'demo-%';
    DELETE FROM notifications WHERE user_id LIKE 'demo-%';
    DELETE FROM salary_records WHERE teacher_id LIKE 'demo-%';
    DELETE FROM fee_payments WHERE student_id LIKE 'demo-%';
    DELETE FROM attendance WHERE student_id LIKE 'demo-%';
    DELETE FROM enrollments WHERE student_id LIKE 'demo-%';
    DELETE FROM teacher_courses WHERE teacher_id LIKE 'demo-%';
    DELETE FROM students WHERE id LIKE 'demo-%';
    DELETE FROM teachers WHERE id LIKE 'demo-%';
    DELETE FROM courses WHERE id LIKE 'demo-%';
    DELETE FROM profiles WHERE id LIKE 'demo-%';
    DELETE FROM branches WHERE id LIKE 'demo-%';
    
    RAISE NOTICE 'Demo data cleaned up successfully';
END;
$$ LANGUAGE plpgsql;

-- Add a comment to remind about cleanup
COMMENT ON FUNCTION cleanup_demo_data() IS 'Run this function to remove all demo data: SELECT cleanup_demo_data();';
