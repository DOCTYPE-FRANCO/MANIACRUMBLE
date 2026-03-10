-- COMPLETE FRESH SETUP - Run this entire script in Supabase SQL Editor

-- Drop existing tables if they exist (in correct order due to foreign keys)
DROP TABLE IF EXISTS reviews CASCADE;
DROP TABLE IF EXISTS wishlist CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS addresses CASCADE;
DROP TABLE IF EXISTS newsletter_subscribers CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS profiles CASCADE;

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table (no foreign keys, create first)
CREATE TABLE products (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    image TEXT,
    category TEXT NOT NULL,
    quantity INTEGER DEFAULT 0,
    featured BOOLEAN DEFAULT false,
    active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Profiles Table
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    role TEXT DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Addresses Table
CREATE TABLE addresses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    street_address TEXT NOT NULL,
    city TEXT NOT NULL,
    state TEXT NOT NULL,
    zip_code TEXT,
    country TEXT DEFAULT 'Nigeria',
    is_default BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Orders Table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    total DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) DEFAULT 10.00,
    status TEXT DEFAULT 'pending',
    payment_status TEXT DEFAULT 'pending',
    payment_intent_id TEXT,
    shipping_address_id UUID REFERENCES addresses(id),
    tracking_number TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Order Items Table
CREATE TABLE order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id TEXT REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Wishlist Table
CREATE TABLE wishlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Newsletter Table
CREATE TABLE newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMP DEFAULT NOW()
);

-- Reviews Table
CREATE TABLE reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Enable RLS on all tables
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE addresses ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Products policies (PUBLIC ACCESS)
CREATE POLICY "Public can read products" ON products FOR SELECT TO public USING (true);
CREATE POLICY "Admins manage products" ON products FOR ALL USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

-- Profiles policies
CREATE POLICY "Users view own profile" ON profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Addresses policies
CREATE POLICY "Users manage own addresses" ON addresses FOR ALL USING (auth.uid() = user_id);

-- Orders policies
CREATE POLICY "Users view own orders" ON orders FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users create own orders" ON orders FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Order items policies
CREATE POLICY "Users view own order items" ON order_items FOR SELECT 
    USING (EXISTS (SELECT 1 FROM orders WHERE orders.id = order_items.order_id AND orders.user_id = auth.uid()));

-- Wishlist policies
CREATE POLICY "Users manage own wishlist" ON wishlist FOR ALL USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Public read reviews" ON reviews FOR SELECT TO public USING (true);
CREATE POLICY "Users manage own reviews" ON reviews FOR ALL USING (auth.uid() = user_id);

-- Newsletter policies
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers FOR INSERT TO public WITH CHECK (true);

-- Insert products
INSERT INTO products (id, name, description, price, image, category, quantity, featured, active) VALUES
('S1', 'Black SnapBack', 'Premium SnapBack Hat with embroidered logo.', 19.99, '/Products/BlackSnapback.jpg', 'snapback', 15, true, true),
('S2', 'Red SnapBack', 'Bold red SnapBack for statement style.', 19.99, '/Products/RedSnapback.jpg', 'snapback', 12, false, true),
('S3', 'Blonde SnapBack', 'Trendy blonde SnapBack cap.', 19.99, '/Products/BlondeSnapbackpic.jpg', 'snapback', 10, false, true),
('B1', 'Black Beanie', 'Premium black beanie.', 19.99, '/Products/Beanie.jpg', 'beanie', 20, true, true),
('B2', 'Beanie Model', 'Stylish everyday beanie.', 19.99, '/Products/BeanieModel.jpg', 'beanie', 8, false, true),
('B3', 'Beanie Special', 'Limited Edition designer beanie.', 19.99, '/Products/BeanieModel (2).jpg', 'beanie', 5, false, true),
('W1', 'Black Wave Cap', 'Classic black wave cap for ultimate comfort.', 14.99, '/Products/BlackWaveCap.jpg', 'wavecap', 25, true, true),
('W2', 'Camo Wave Cap', 'Military-inspired camo wave cap.', 14.99, '/Products/CamoSkullCap.jpg', 'wavecap', 18, false, true),
('W3', 'Pink Wave Cap', 'Vibrant pink wave cap.', 14.99, '/Products/PinkSkullCap.jpg', 'wavecap', 14, false, true),
('W4', 'Gray Wave Cap', 'Subtle gray wave cap.', 14.99, '/Products/GraySkullCap.jpg', 'wavecap', 10, false, true),
('W5', 'OG Wave Cap', 'Limited Edition original wave cap.', 14.99, '/Products/OGSkullcap.jpg', 'wavecap', 7, false, true),
('W6', 'OG Wave Cap (Pink)', 'Limited Edition pink original wave cap.', 14.99, '/Products/SkullCappink.jpg', 'wavecap', 6, false, true);
