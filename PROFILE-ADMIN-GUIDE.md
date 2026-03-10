# MANIACRUMBLE - Profile & Admin Guide

## Profile Page Structure ✅

Your Profile.jsx is **well-structured** with:

### Design
- ✅ Split-screen layout (form left, animated logo right)
- ✅ Glassmorphism cards with backdrop blur
- ✅ Black/white corporate theme
- ✅ Password visibility toggles
- ✅ Responsive (mobile shows logo at top)

### Features
- ✅ Sign In / Sign Up toggle
- ✅ Form validation (password length, matching)
- ✅ Loading states with spinners
- ✅ User dashboard when logged in
- ✅ Order/Wishlist quick access
- ✅ Sign out functionality

### Code Quality
- ✅ Clean component structure
- ✅ Proper state management
- ✅ Error handling with toast notifications
- ✅ Lucide icons throughout

**Verdict**: No changes needed. Structure is professional and follows best practices.

---

## Admin Access Setup

### Step 1: Create Admin Account
1. Go to `/profile` on your site
2. Sign up with your email
3. Remember your password

### Step 2: Make Account Admin
Run this in Supabase SQL Editor:

```sql
-- Replace with your actual email
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

### Step 3: Fix Admin Permissions
Run the `fix-admin-permissions.sql` file in Supabase SQL Editor to allow admins to view all orders and user profiles.

### Step 4: Access Admin Panel
Visit these URLs after logging in:
- `/admin` - Dashboard
- `/admin/products` - Manage products
- `/admin/orders` - Manage orders

---

## Fixed Issues

### ❌ Problem: 400 Error on Admin Orders Page
**Cause**: RLS policies prevented admins from reading other users' profiles through joins

**Solution**: 
1. Updated RLS policies to allow admins to read all profiles
2. Modified `getAllOrders()` to fetch profiles separately instead of using joins
3. Created `fix-admin-permissions.sql` to apply the fixes

### Files Modified
- `database.js` - Updated getAllOrders function
- `fix-admin-permissions.sql` - New SQL to fix permissions

---

## Security Notes

⚠️ **NEVER share passwords publicly**
- Passwords shared in chat are compromised
- Use unique, strong passwords for admin accounts
- Consider adding 2FA in production
- Store passwords in a password manager

---

## Next Steps

1. Run `fix-admin-permissions.sql` in Supabase
2. Create your admin account
3. Test admin panel access
4. Change any compromised passwords
