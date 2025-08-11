-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
    INSERT INTO public.profiles (id, full_name, role)
    VALUES (new.id, new.raw_user_meta_data->>'full_name', 'student');
    RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to call the function on user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add updated_at triggers to relevant tables
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_branches_updated_at BEFORE UPDATE ON branches
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_courses_updated_at BEFORE UPDATE ON courses
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_fee_payments_updated_at BEFORE UPDATE ON fee_payments
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Function to calculate attendance percentage
CREATE OR REPLACE FUNCTION calculate_attendance_percentage(
    p_student_id UUID,
    p_course_id UUID,
    p_start_date DATE DEFAULT NULL,
    p_end_date DATE DEFAULT NULL
)
RETURNS DECIMAL(5,2) AS $$
DECLARE
    total_classes INTEGER;
    present_classes INTEGER;
    attendance_percentage DECIMAL(5,2);
BEGIN
    -- Count total classes
    SELECT COUNT(*)
    INTO total_classes
    FROM attendance
    WHERE student_id = p_student_id
    AND course_id = p_course_id
    AND (p_start_date IS NULL OR date >= p_start_date)
    AND (p_end_date IS NULL OR date <= p_end_date);

    -- Count present classes
    SELECT COUNT(*)
    INTO present_classes
    FROM attendance
    WHERE student_id = p_student_id
    AND course_id = p_course_id
    AND status = 'present'
    AND (p_start_date IS NULL OR date >= p_start_date)
    AND (p_end_date IS NULL OR date <= p_end_date);

    -- Calculate percentage
    IF total_classes > 0 THEN
        attendance_percentage := (present_classes::DECIMAL / total_classes::DECIMAL) * 100;
    ELSE
        attendance_percentage := 0;
    END IF;

    RETURN attendance_percentage;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get pending fee amount for a student
CREATE OR REPLACE FUNCTION get_pending_fees(p_student_id UUID)
RETURNS DECIMAL(10,2) AS $$
DECLARE
    pending_amount DECIMAL(10,2);
BEGIN
    SELECT COALESCE(SUM(amount_due - amount_paid), 0)
    INTO pending_amount
    FROM fee_payments
    WHERE student_id = p_student_id
    AND status IN ('pending', 'overdue');

    RETURN pending_amount;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to automatically update fee status based on due date
CREATE OR REPLACE FUNCTION update_overdue_fees()
RETURNS void AS $$
BEGIN
    UPDATE fee_payments
    SET status = 'overdue'
    WHERE status = 'pending'
    AND due_date < CURRENT_DATE
    AND amount_paid < amount_due;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to create audit log entry
CREATE OR REPLACE FUNCTION create_audit_log(
    p_user_id UUID,
    p_action VARCHAR(100),
    p_table_name VARCHAR(100),
    p_record_id UUID,
    p_old_values JSONB DEFAULT NULL,
    p_new_values JSONB DEFAULT NULL
)
RETURNS void AS $$
BEGIN
    INSERT INTO audit_logs (
        user_id,
        action,
        table_name,
        record_id,
        old_values,
        new_values,
        ip_address,
        user_agent
    ) VALUES (
        p_user_id,
        p_action,
        p_table_name,
        p_record_id,
        p_old_values,
        p_new_values,
        inet_client_addr(),
        current_setting('request.headers', true)::json->>'user-agent'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
