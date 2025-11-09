"""
Mock API Server for Retail Agent System
Provides all backend endpoints with dummy data
"""

from flask import Flask, jsonify, request
from flask_cors import CORS
from datetime import datetime, timedelta
import random

app = Flask(__name__)
CORS(app)

# =============================================================================
# DUMMY DATA: 10 DIVERSE USERS
# =============================================================================

USERS = {
    "C001": {
        "user_id": "C001",
        "name": "Priya Sharma",
        "age": 28,
        "gender": "Female",
        "location": "Mumbai, Maharashtra",
        "income_bracket": "₹8-12 LPA",
        "lifestyle": "Fitness enthusiast, works in tech",
        "preferences": ["activewear", "running shoes", "yoga mats", "fitness trackers"],
        "past_purchases": ["Nike Air Zoom", "Lululemon Leggings", "Fitbit Charge"],
        "loyalty_tier": "Gold",
        "loyalty_points": 2500,
        "avg_order_value": 4500,
        "purchase_frequency": "Monthly"
    },
    "C002": {
        "user_id": "C002",
        "name": "Rajesh Kumar",
        "age": 42,
        "gender": "Male",
        "location": "Bangalore, Karnataka",
        "income_bracket": "₹15-25 LPA",
        "lifestyle": "Business professional, frequent traveler",
        "preferences": ["formal wear", "business laptops", "travel accessories", "luxury watches"],
        "past_purchases": ["Dell XPS 15", "Samsonite Luggage", "Raymond Suit"],
        "loyalty_tier": "Platinum",
        "loyalty_points": 8750,
        "avg_order_value": 12000,
        "purchase_frequency": "Bi-monthly"
    },
    "C003": {
        "user_id": "C003",
        "name": "Ananya Iyer",
        "age": 22,
        "gender": "Female",
        "location": "Chennai, Tamil Nadu",
        "income_bracket": "₹3-5 LPA",
        "lifestyle": "College student, fashion blogger",
        "preferences": ["trendy fashion", "accessories", "cosmetics", "phone cases"],
        "past_purchases": ["H&M Dress", "MAC Lipstick", "iPhone Cover"],
        "loyalty_tier": "Silver",
        "loyalty_points": 450,
        "avg_order_value": 1800,
        "purchase_frequency": "Weekly"
    },
    "C004": {
        "user_id": "C004",
        "name": "Mohammed Zubair",
        "age": 35,
        "gender": "Male",
        "location": "Hyderabad, Telangana",
        "income_bracket": "₹10-15 LPA",
        "lifestyle": "Software engineer, gamer, tech enthusiast",
        "preferences": ["gaming laptops", "mechanical keyboards", "gaming chairs", "VR headsets"],
        "past_purchases": ["ROG Strix Gaming Laptop", "Razer Mouse", "SteelSeries Headset"],
        "loyalty_tier": "Gold",
        "loyalty_points": 4200,
        "avg_order_value": 8500,
        "purchase_frequency": "Quarterly"
    },
    "C005": {
        "user_id": "C005",
        "name": "Sneha Desai",
        "age": 31,
        "gender": "Female",
        "location": "Pune, Maharashtra",
        "income_bracket": "₹7-10 LPA",
        "lifestyle": "Working mom, home decor enthusiast",
        "preferences": ["home decor", "kitchen appliances", "kids toys", "books"],
        "past_purchases": ["Philips Air Fryer", "IKEA Furniture", "Melissa & Doug Toys"],
        "loyalty_tier": "Gold",
        "loyalty_points": 3100,
        "avg_order_value": 5500,
        "purchase_frequency": "Monthly"
    },
    "C006": {
        "user_id": "C006",
        "name": "Arjun Patel",
        "age": 26,
        "gender": "Male",
        "location": "Ahmedabad, Gujarat",
        "income_bracket": "₹5-8 LPA",
        "lifestyle": "Startup employee, music lover",
        "preferences": ["audio equipment", "vinyl records", "casual wear", "smart home devices"],
        "past_purchases": ["Sony WH-1000XM5", "Echo Dot", "Levi's Jeans"],
        "loyalty_tier": "Silver",
        "loyalty_points": 1800,
        "avg_order_value": 3200,
        "purchase_frequency": "Bi-monthly"
    },
    "C007": {
        "user_id": "C007",
        "name": "Lakshmi Menon",
        "age": 55,
        "gender": "Female",
        "location": "Kochi, Kerala",
        "income_bracket": "₹12-18 LPA",
        "lifestyle": "Senior executive, health conscious",
        "preferences": ["organic products", "health supplements", "traditional wear", "gardening tools"],
        "past_purchases": ["Organic India Supplements", "Silk Saree", "Gardening Kit"],
        "loyalty_tier": "Platinum",
        "loyalty_points": 6500,
        "avg_order_value": 7000,
        "purchase_frequency": "Monthly"
    },
    "C008": {
        "user_id": "C008",
        "name": "Vikram Singh",
        "age": 38,
        "gender": "Male",
        "location": "Delhi NCR",
        "income_bracket": "₹20-30 LPA",
        "lifestyle": "Investment banker, luxury enthusiast",
        "preferences": ["luxury fashion", "premium electronics", "fine watches", "imported spirits"],
        "past_purchases": ["Tag Heuer Watch", "Apple MacBook Pro", "Gucci Belt"],
        "loyalty_tier": "Diamond",
        "loyalty_points": 15000,
        "avg_order_value": 25000,
        "purchase_frequency": "Monthly"
    },
    "C009": {
        "user_id": "C009",
        "name": "Riya Verma",
        "age": 19,
        "gender": "Female",
        "location": "Jaipur, Rajasthan",
        "income_bracket": "₹0-3 LPA",
        "lifestyle": "First-year college student, budget shopper",
        "preferences": ["stationery", "budget fashion", "mobile accessories", "snacks"],
        "past_purchases": ["Notebook Set", "Basic T-Shirts", "Phone Charger"],
        "loyalty_tier": "Bronze",
        "loyalty_points": 150,
        "avg_order_value": 800,
        "purchase_frequency": "Monthly"
    },
    "C010": {
        "user_id": "C010",
        "name": "Karthik Reddy",
        "age": 45,
        "gender": "Male",
        "location": "Visakhapatnam, Andhra Pradesh",
        "income_bracket": "₹18-25 LPA",
        "lifestyle": "Doctor, fitness and wellness advocate",
        "preferences": ["medical equipment", "fitness gear", "nutritional supplements", "books"],
        "past_purchases": ["Blood Pressure Monitor", "Treadmill", "Whey Protein"],
        "loyalty_tier": "Platinum",
        "loyalty_points": 7200,
        "avg_order_value": 9500,
        "purchase_frequency": "Bi-monthly"
    }
}

# =============================================================================
# PRODUCT CATALOG
# =============================================================================

PRODUCTS = {
    # Running & Fitness
    "SKU001": {
        "sku": "SKU001",
        "name": "Nike Air Zoom Pegasus 40",
        "category": "Running Shoes",
        "price": 10995,
        "description": "Premium running shoes with responsive cushioning for long-distance comfort",
        "rating": 4.5,
        "brand": "Nike",
        "tags": ["running", "sports", "fitness"]
    },
    "SKU002": {
        "sku": "SKU002",
        "name": "Adidas Ultraboost 23",
        "category": "Running Shoes",
        "price": 15999,
        "description": "Energy-returning running shoes with BOOST cushioning technology",
        "rating": 4.7,
        "brand": "Adidas",
        "tags": ["running", "sports", "premium"]
    },
    "SKU003": {
        "sku": "SKU003",
        "name": "Lululemon Align Leggings",
        "category": "Activewear",
        "price": 8900,
        "description": "Buttery-soft yoga leggings with four-way stretch",
        "rating": 4.8,
        "brand": "Lululemon",
        "tags": ["yoga", "activewear", "women"]
    },
    
    # Electronics
    "SKU004": {
        "sku": "SKU004",
        "name": "Dell XPS 15 (2024)",
        "category": "Laptops",
        "price": 135000,
        "description": "15.6\" 4K OLED, Intel i7-13700H, 32GB RAM, 1TB SSD",
        "rating": 4.6,
        "brand": "Dell",
        "tags": ["laptop", "business", "premium"]
    },
    "SKU005": {
        "sku": "SKU005",
        "name": "ASUS ROG Strix G16",
        "category": "Gaming Laptops",
        "price": 159900,
        "description": "Gaming powerhouse with RTX 4070, 16\" QHD 240Hz display",
        "rating": 4.7,
        "brand": "ASUS",
        "tags": ["gaming", "laptop", "high-performance"]
    },
    "SKU006": {
        "sku": "SKU006",
        "name": "Sony WH-1000XM5",
        "category": "Headphones",
        "price": 29990,
        "description": "Industry-leading noise cancellation with premium sound",
        "rating": 4.9,
        "brand": "Sony",
        "tags": ["audio", "premium", "wireless"]
    },
    
    # Fashion
    "SKU007": {
        "sku": "SKU007",
        "name": "Raymond Premium Suit",
        "category": "Formal Wear",
        "price": 22500,
        "description": "Classic 2-piece suit in navy blue with perfect tailoring",
        "rating": 4.4,
        "brand": "Raymond",
        "tags": ["formal", "business", "men"]
    },
    "SKU008": {
        "sku": "SKU008",
        "name": "H&M Trendy Summer Dress",
        "category": "Women's Fashion",
        "price": 1999,
        "description": "Flowy summer dress with floral print, perfect for casual outings",
        "rating": 4.2,
        "brand": "H&M",
        "tags": ["fashion", "casual", "women"]
    },
    
    # Home & Kitchen
    "SKU009": {
        "sku": "SKU009",
        "name": "Philips Air Fryer HD9252/90",
        "category": "Kitchen Appliances",
        "price": 12995,
        "description": "4.1L digital air fryer with Rapid Air technology",
        "rating": 4.5,
        "brand": "Philips",
        "tags": ["kitchen", "appliances", "healthy"]
    },
    "SKU010": {
        "sku": "SKU010",
        "name": "IKEA HEMNES Bookcase",
        "category": "Furniture",
        "price": 14990,
        "description": "Solid wood bookcase with adjustable shelves, white stain",
        "rating": 4.3,
        "brand": "IKEA",
        "tags": ["furniture", "home", "storage"]
    },
    
    # Luxury
    "SKU011": {
        "sku": "SKU011",
        "name": "Tag Heuer Carrera Calibre 5",
        "category": "Watches",
        "price": 285000,
        "description": "Swiss automatic chronograph with 39mm steel case",
        "rating": 4.9,
        "brand": "Tag Heuer",
        "tags": ["luxury", "watches", "swiss"]
    },
    "SKU012": {
        "sku": "SKU012",
        "name": "Samsonite Cosmolite 3.0",
        "category": "Luggage",
        "price": 18900,
        "description": "Ultra-lightweight 75cm spinner with 10-year warranty",
        "rating": 4.6,
        "brand": "Samsonite",
        "tags": ["travel", "luggage", "durable"]
    }
}

# =============================================================================
# INVENTORY DATA
# =============================================================================

INVENTORY = {
    "SKU001": {"quantity": 45, "store_location": "Mumbai Central", "warehouse": "Mumbai WH"},
    "SKU002": {"quantity": 32, "store_location": "Bangalore Indiranagar", "warehouse": "Bangalore WH"},
    "SKU003": {"quantity": 28, "store_location": "Mumbai Bandra", "warehouse": "Mumbai WH"},
    "SKU004": {"quantity": 12, "store_location": "Bangalore Koramangala", "warehouse": "Bangalore WH"},
    "SKU005": {"quantity": 8, "store_location": "Hyderabad Hitech City", "warehouse": "Hyderabad WH"},
    "SKU006": {"quantity": 67, "store_location": "Delhi Connaught Place", "warehouse": "Delhi WH"},
    "SKU007": {"quantity": 15, "store_location": "Mumbai Fort", "warehouse": "Mumbai WH"},
    "SKU008": {"quantity": 89, "store_location": "Chennai T Nagar", "warehouse": "Chennai WH"},
    "SKU009": {"quantity": 41, "store_location": "Pune Aundh", "warehouse": "Pune WH"},
    "SKU010": {"quantity": 23, "store_location": "Bangalore Whitefield", "warehouse": "Bangalore WH"},
    "SKU011": {"quantity": 3, "store_location": "Mumbai Juhu", "warehouse": "Mumbai WH"},
    "SKU012": {"quantity": 19, "store_location": "Delhi Saket", "warehouse": "Delhi WH"},
}

# =============================================================================
# API ENDPOINTS
# =============================================================================

@app.route('/api/recommendations/<user_id>', methods=['GET'])
def get_recommendations(user_id):
    """
    Get personalized product recommendations
    """
    user = USERS.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Match products based on user preferences
    preferences = user["preferences"]
    recommended = []
    
    for sku, product in PRODUCTS.items():
        # Check if product tags match user preferences
        if any(pref.lower() in " ".join(product["tags"]).lower() for pref in preferences):
            recommended.append(product)
    
    # Fallback to top-rated products
    if not recommended:
        recommended = sorted(PRODUCTS.values(), key=lambda x: x["rating"], reverse=True)[:5]
    
    return jsonify({
        "user_id": user_id,
        "user_name": user["name"],
        "recommendations": recommended[:5],
        "based_on": "purchase history and preferences"
    })


@app.route('/api/inventory/<sku>', methods=['GET'])
def check_inventory(sku):
    """
    Check stock availability for a product
    """
    if sku not in PRODUCTS:
        return jsonify({"error": "Product not found"}), 404
    
    product = PRODUCTS[sku]
    inventory = INVENTORY.get(sku, {"quantity": 0})
    
    in_stock = inventory["quantity"] > 0
    
    delivery_options = []
    if in_stock:
        delivery_options = [
            {"type": "Standard Delivery", "eta": "3-5 days", "cost": 0},
            {"type": "Express Delivery", "eta": "1-2 days", "cost": 150},
            {"type": "Same Day (select areas)", "eta": "Today", "cost": 250}
        ]
    
    return jsonify({
        "sku": sku,
        "product_name": product["name"],
        "in_stock": in_stock,
        "quantity": inventory["quantity"],
        "store_location": inventory.get("store_location", "N/A"),
        "warehouse": inventory.get("warehouse", "N/A"),
        "delivery_options": delivery_options,
        "restock_date": (datetime.now() + timedelta(days=7)).strftime("%Y-%m-%d") if not in_stock else None
    })


@app.route('/api/payment', methods=['POST'])
def process_payment():
    """
    Process payment transaction
    """
    data = request.json
    user_id = data.get("user_id")
    amount = data.get("amount")
    items = data.get("items", [])
    
    # Simulate payment processing (95% success rate)
    success = random.random() > 0.05
    
    if success:
        order_id = f"ORD{datetime.now().strftime('%Y%m%d%H%M%S')}{random.randint(1000, 9999)}"
        transaction_id = f"TXN{random.randint(100000, 999999)}"
        
        return jsonify({
            "status": "success",
            "order_id": order_id,
            "transaction_id": transaction_id,
            "amount": amount,
            "payment_method": "Card ending in 4242",
            "timestamp": datetime.now().isoformat()
        })
    else:
        return jsonify({
            "status": "failed",
            "error": "Insufficient funds or card declined"
        }), 400


@app.route('/api/loyalty/apply', methods=['POST'])
def apply_loyalty():
    """
    Apply loyalty points and discounts
    """
    data = request.json
    user_id = data.get("user_id")
    amount = data.get("amount", 0)
    
    user = USERS.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Calculate points earned (1 point per ₹100 spent)
    points_earned = int(amount / 100)
    
    # Calculate discount based on loyalty tier
    discount_rate = {
        "Bronze": 0.02,
        "Silver": 0.05,
        "Gold": 0.08,
        "Platinum": 0.12,
        "Diamond": 0.15
    }
    
    tier = user["loyalty_tier"]
    discount = int(amount * discount_rate.get(tier, 0))
    
    new_balance = user["loyalty_points"] + points_earned
    
    return jsonify({
        "user_id": user_id,
        "points_earned": points_earned,
        "new_balance": new_balance,
        "loyalty_tier": tier,
        "discount_applied": discount,
        "final_amount": amount - discount
    })


@app.route('/api/post-purchase', methods=['POST'])
def post_purchase():
    """
    Handle post-purchase activities
    """
    data = request.json
    order_id = data.get("order_id")
    
    tracking_id = f"TRACK{random.randint(100000, 999999)}"
    
    return jsonify({
        "order_id": order_id,
        "tracking_id": tracking_id,
        "tracking_link": f"https://track.retailstore.com/{tracking_id}",
        "delivery_eta": "3-5 business days",
        "feedback_link": f"https://feedback.retailstore.com/{order_id}",
        "return_policy": "30-day easy returns",
        "support_contact": "+91-1800-123-4567"
    })


@app.route('/api/users/<user_id>', methods=['GET'])
def get_user(user_id):
    """
    Get user profile
    """
    user = USERS.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user)


@app.route('/api/users', methods=['GET'])
def list_users():
    """
    List all users
    """
    return jsonify({"users": list(USERS.values())})


@app.route('/api/products', methods=['GET'])
def list_products():
    """
    List all products
    """
    return jsonify({"products": list(PRODUCTS.values())})


@app.route('/api/health', methods=['GET'])
def health_check():
    """
    Health check endpoint
    """
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "services": {
            "recommendations": "up",
            "inventory": "up",
            "payment": "up",
            "loyalty": "up"
        }
    })


# =============================================================================
# MAIN
# =============================================================================

if __name__ == '__main__':
    print("=" * 70)
    print("🚀 Starting Mock API Server")
    print("=" * 70)
    print(f"📊 Loaded {len(USERS)} users")
    print(f"📦 Loaded {len(PRODUCTS)} products")
    print(f"🏪 Loaded {len(INVENTORY)} inventory records")
    print("=" * 70)
    print("🌐 API running at: http://localhost:5000")
    print("=" * 70)
    print("\n📌 Available Endpoints:")
    print("  GET  /api/recommendations/<user_id>")
    print("  GET  /api/inventory/<sku>")
    print("  POST /api/payment")
    print("  POST /api/loyalty/apply")
    print("  POST /api/post-purchase")
    print("  GET  /api/users/<user_id>")
    print("  GET  /api/users")
    print("  GET  /api/products")
    print("  GET  /api/health")
    print("=" * 70)
    print("\n🎭 Test with: curl http://localhost:5000/api/health\n")
    
    app.run(debug=True, host='0.0.0.0', port=5000)
