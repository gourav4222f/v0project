-- Insert sample branches
INSERT INTO branches (id, name, address, phone, email) VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'Main Campus', '123 Education Street, City Center', '+1234567890', 'main@educrm.com'),
    ('550e8400-e29b-41d4-a716-446655440002', 'North Branch', '456 Learning Ave, North District', '+1234567891', 'north@educrm.com'),
    ('550e8400-e29b-41d4-a716-446655440003', 'South Branch', '789 Knowledge Blvd, South Area', '+1234567892', 'south@educrm.com');

-- Insert sample courses
INSERT INTO courses (id, title, description, fee, duration_months, branch_id) VALUES
    ('550e8400-e29b-41d4-a716-446655440010', 'Mathematics Grade 10', 'Comprehensive mathematics course for grade 10 students', 15000.00, 12, '550e8400-e29b-41d4-a716-446655440001'),
    ('550e8400-e29b-41d4-a716-446655440011', 'Physics Grade 11', 'Advanced physics concepts for grade 11 students', 18000.00, 12, '550e8400-e29b-41d4-a716-446655440001'),
    ('550e8400-e29b-41d4-a716-446655440012', 'Chemistry Grade 12', 'Organic and inorganic chemistry for grade 12', 20000.00, 12, '550e8400-e29b-41d4-a716-446655440001'),
    ('550e8400-e29b-41d4-a716-446655440013', 'English Literature', 'English literature and language skills', 12000.00, 12, '550e8400-e29b-41d4-a716-446655440002'),
    ('550e8400-e29b-41d4-a716-446655440014', 'Computer Science', 'Programming and computer science fundamentals', 25000.00, 12, '550e8400-e29b-41d4-a716-446655440002');

-- Note: In a real application, you would create actual users through Supabase Auth
-- This is just for demonstration of the data structure

-- Insert sample events
INSERT INTO events (id, title, description, event_type, start_date, end_date, branch_id) VALUES
    ('550e8400-e29b-41d4-a716-446655440020', 'Mid-term Examinations', 'Mid-term exams for all courses', 'exam', '2024-02-15 09:00:00+00', '2024-02-20 17:00:00+00', '550e8400-e29b-41d4-a716-446655440001'),
    ('550e8400-e29b-41d4-a716-446655440021', 'Parent-Teacher Meeting', 'Quarterly parent-teacher interaction', 'meeting', '2024-02-25 10:00:00+00', '2024-02-25 16:00:00+00', '550e8400-e29b-41d4-a716-446655440001'),
    ('550e8400-e29b-41d4-a716-446655440022', 'Science Fair', 'Annual science project exhibition', 'event', '2024-03-10 09:00:00+00', '2024-03-10 18:00:00+00', '550e8400-e29b-41d4-a716-446655440002');

-- Insert fee structures
INSERT INTO fee_structures (course_id, amount, due_date, description) VALUES
    ('550e8400-e29b-41d4-a716-446655440010', 15000.00, '2024-01-31', 'Annual fee for Mathematics Grade 10'),
    ('550e8400-e29b-41d4-a716-446655440011', 18000.00, '2024-01-31', 'Annual fee for Physics Grade 11'),
    ('550e8400-e29b-41d4-a716-446655440012', 20000.00, '2024-01-31', 'Annual fee for Chemistry Grade 12'),
    ('550e8400-e29b-41d4-a716-446655440013', 12000.00, '2024-01-31', 'Annual fee for English Literature'),
    ('550e8400-e29b-41d4-a716-446655440014', 25000.00, '2024-01-31', 'Annual fee for Computer Science');
