-- RLS Policies for fine-grained access control

-- Profiles policies
CREATE POLICY "Users can view their own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all profiles" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

CREATE POLICY "Admins can manage all profiles" ON profiles
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Teachers can view students in their courses
CREATE POLICY "Teachers can view their students" ON profiles
    FOR SELECT USING (
        role = 'student' AND EXISTS (
            SELECT 1 FROM teacher_courses tc
            JOIN enrollments e ON tc.course_id = e.course_id
            JOIN students s ON e.student_id = s.id
            WHERE tc.teacher_id = auth.uid() AND s.id = profiles.id
        )
    );

-- Branch-based access for branch managers
CREATE POLICY "Branch managers can view branch users" ON profiles
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM branches b
            WHERE b.manager_id = auth.uid() AND b.id = profiles.branch_id
        )
    );

-- Students policies
CREATE POLICY "Students can view their own data" ON students
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Teachers can view their students" ON students
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM teacher_courses tc
            JOIN enrollments e ON tc.course_id = e.course_id
            WHERE tc.teacher_id = auth.uid() AND e.student_id = students.id
        )
    );

CREATE POLICY "Admins and accountants can view all students" ON students
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'accountant')
        )
    );

-- Teachers policies
CREATE POLICY "Teachers can view their own data" ON teachers
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can manage all teachers" ON teachers
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Courses policies
CREATE POLICY "Everyone can view courses" ON courses FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage courses" ON courses
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Enrollments policies
CREATE POLICY "Students can view their enrollments" ON enrollments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM students s 
            WHERE s.id = auth.uid() AND s.id = enrollments.student_id
        )
    );

CREATE POLICY "Teachers can view enrollments for their courses" ON enrollments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM teacher_courses tc
            WHERE tc.teacher_id = auth.uid() AND tc.course_id = enrollments.course_id
        )
    );

CREATE POLICY "Admins can manage all enrollments" ON enrollments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Attendance policies
CREATE POLICY "Students can view their attendance" ON attendance
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM students s 
            WHERE s.id = auth.uid() AND s.id = attendance.student_id
        )
    );

CREATE POLICY "Teachers can manage attendance for their courses" ON attendance
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM teacher_courses tc
            WHERE tc.teacher_id = auth.uid() AND tc.course_id = attendance.course_id
        )
    );

CREATE POLICY "Admins can view all attendance" ON attendance
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Fee payments policies
CREATE POLICY "Students can view their fee payments" ON fee_payments
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM students s 
            WHERE s.id = auth.uid() AND s.id = fee_payments.student_id
        )
    );

CREATE POLICY "Accountants can manage all fee payments" ON fee_payments
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role IN ('accountant', 'admin')
        )
    );

-- Salary records policies
CREATE POLICY "Teachers can view their salary records" ON salary_records
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM teachers t 
            WHERE t.id = auth.uid() AND t.id = salary_records.teacher_id
        )
    );

CREATE POLICY "Accountants can manage salary records" ON salary_records
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role IN ('accountant', 'admin')
        )
    );

-- Notifications policies
CREATE POLICY "Users can view their notifications" ON notifications
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update their notifications" ON notifications
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all notifications" ON notifications
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );

-- Study materials policies
CREATE POLICY "Students can view materials for enrolled courses" ON study_materials
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM enrollments e
            JOIN students s ON e.student_id = s.id
            WHERE s.id = auth.uid() AND e.course_id = study_materials.course_id
        )
    );

CREATE POLICY "Teachers can manage materials for their courses" ON study_materials
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM teacher_courses tc
            WHERE tc.teacher_id = auth.uid() AND tc.course_id = study_materials.course_id
        )
    );

-- Events policies
CREATE POLICY "Everyone can view events" ON events FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins and teachers can manage events" ON events
    FOR ALL USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role IN ('admin', 'teacher')
        )
    );

-- Audit logs policies (admin only)
CREATE POLICY "Admins can view audit logs" ON audit_logs
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM profiles 
            WHERE id = auth.uid() AND role = 'admin'
        )
    );
