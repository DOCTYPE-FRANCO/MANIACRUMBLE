# MANIACRUMBLE Setup Instructions

## Step 1: Setup Supabase Database

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/lcmfqsuunifopdaifmxw
2. Click on "SQL Editor" in the left sidebar
3. Click "New Query"
4. Copy and paste the entire content from `supabase-schema.sql` file
5. Click "Run" to execute the SQL

This will create all necessary tables:
- products
- profiles
- addresses
- orders
- order_items
- wishlist
- newsletter_subscribers
- reviews

## Step 2: Get Flutterwave API Key

1. Go to https://flutterwave.com
2. Sign up or login
3. Go to Settings > API Keys
4. Copy your Public Key (Test or Live)
5. Update `.env` file with your Flutterwave key:
   ```
   VITE_FLUTTERWAVE_PUBLIC_KEY=your_actual_flutterwave_key
   ```

## Step 3: Install Dependencies

```bash
npm install
```

## Step 4: Run Development Server

```bash
npm run dev
```

## Step 5: Create Admin User

1. Sign up through the website
2. Go to Supabase Dashboard > Table Editor > profiles
3. Find your user and change `role` from `customer` to `admin`
4. Now you can access admin panel at `/admin`

## Environment Variables

Your `.env` file is already configured with:
- ✅ Supabase URL
- ✅ Supabase Anon Key
- ⚠️ Flutterwave Public Key (needs your actual key)

## Features Available

### Customer Features:
- Browse products with advanced filtering
- Product detail pages with reviews
- Shopping cart with Flutterwave payment
- Wishlist management
- Order history
- User authentication

### Admin Features:
- Product management (CRUD)
- Order management
- Analytics dashboard
- Inventory tracking

## Troubleshooting

### 404 Errors on Products
- Make sure you ran the SQL schema in Supabase
- Check that products table exists
- Verify RLS policies are set correctly

### Payment Issues
- Update Flutterwave key in `.env`
- For testing, use Flutterwave test cards
- Check Flutterwave dashboard for transaction logs

### Authentication Issues
- Clear browser cache and cookies
- Check Supabase auth settings
- Verify email confirmation settings

## Tech Stack

- React 19 + Vite
- Supabase (Database + Auth)
- Flutterwave (Payments)
- Tailwind CSS
- Framer Motion
- React Router DOM

## Support

For issues, check:
1. Browser console for errors
2. Supabase logs
3. Network tab for API calls
4. Flutterwave dashboard for payment logs
