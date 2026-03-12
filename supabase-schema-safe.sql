-- MANIACRUMBLE E-Commerce Database Schema (Safe Version)
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Products Table (only if not exists)
CREATE TABLE IF NOT EXISTS products (
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

-- Users Profile Table (only if not exists)
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT,
    email TEXT UNIQUE,
    phone TEXT,
    role TEXT DEFAULT 'customer',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Addresses Table (only if not exists)
CREATE TABLE IF NOT EXISTS addresses (
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

-- Orders Table (only if not exists)
CREATE TABLE IF NOT EXISTS orders (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    total DECIMAL(10, 2) NOT NULL,
    subtotal DECIMAL(10, 2) NOT NULL,
    tax DECIMAL(10, 2) DEFAULT 500.00,
    status TEXT DEFAULT 'pending',
    payment_status TEXT DEFAULT 'pending',
    payment_intent_id TEXT,
    shipping_address_id UUID REFERENCES addresses(id),
    tracking_number TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Order Items Table (only if not exists)
CREATE TABLE IF NOT EXISTS order_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    product_id TEXT REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Wishlist Table (only if not exists)
CREATE TABLE IF NOT EXISTS wishlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Newsletter Subscribers Table (only if not exists)
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    subscribed_at TIMESTAMP DEFAULT NOW()
);

-- Reviews Table (only if not exists)
CREATE TABLE IF NOT EXISTS reviews (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    product_id TEXT REFERENCES products(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Update existing products with Naira prices
INSERT INTO products (id, name, description, price, image, category, quantity, featured) VALUES
('S1', 'Black SnapBack', 'Premium SnapBack Hat with embroidered logo.', 8999.00, '/Products/BlackSnapback.jpg', 'snapback', 15, true),
('S2', 'Red SnapBack', 'Bold red SnapBack for statement style.', 8999.00, '/Products/RedSnapback.jpg', 'snapback', 12, false),
('S3', 'Blonde SnapBack', 'Trendy blonde SnapBack cap.', 8999.00, '/Products/BlondeSnapbackpic.jpg', 'snapback', 10, false),
('B1', 'Black Beanie', 'Don''t Think, Jump Edition - Premium black beanie.', 8999.00, '/Products/Beanie.jpg', 'beanie', 20, true),
('B2', 'Beanie Model', 'Stylish everyday beanie.', 8999.00, '/Products/BeanieModel.jpg', 'beanie', 8, false),
('B3', 'Beanie Special', 'Limited Edition designer beanie.', 8999.00, '/Products/BeanieModel (2).jpg', 'beanie', 5, false),
('W1', 'Black Wave Cap', 'Classic black wave cap for ultimate comfort.', 6999.00, '/Products/BlackWaveCap.jpg', 'wavecap', 25, true),
('W2', 'Camo Wave Cap', 'Military-inspired camo wave cap.', 6999.00, '/Products/CamoSkullCap.jpg', 'wavecap', 18, false),
('W3', 'Pink Wave Cap', 'Vibrant pink wave cap.', 6999.00, '/Products/PinkSkullCap.jpg', 'wavecap', 14, false),
('W4', 'Gray Wave Cap', 'Subtle gray wave cap.', 6999.00, '/Products/GraySkullCap.jpg', 'wavecap', 10, false),
('W5', 'OG Wave Cap', 'Limited Edition original wave cap.', 6999.00, '/Products/OGSkullcap.jpg', 'wavecap', 7, false),
('W6', 'OG Wave Cap (Pink)', 'Limited Edition pink original wave cap.', 6999.00, '/Products/SkullCappink.jpg', 'wavecap', 6, false)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  price = EXCLUDED.price,
  image = EXCLUDED.image,
  category = EXCLUDED.category,
  quantity = EXCLUDED.quantity,
  featured = EXCLUDED.featured,
  active = EXCLUDED.active;