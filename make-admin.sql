-- MANIACRUMBLE - Make User Admin
-- Replace 'YOUR_EMAIL_HERE' with your actual email address

-- Option 1: Make existing user admin by email
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'YOUR_EMAIL_HERE';

-- Option 2: Check current admin users
SELECT id, email, name, role, created_at 
FROM profiles 
WHERE role = 'admin';

-- Option 3: View all users and their roles
SELECT id, email, name, role, created_at 
FROM profiles 
ORDER BY created_at DESC;
