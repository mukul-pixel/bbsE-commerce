const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const { ObjectId } = require('mongodb');
const collection = require("./models/userModel")
const bcrypt = require("bcryptjs")
const multer = require("multer");
const path = require('path');
const Product = require("./models/productModel");
const Review = require('./models/reviewModel');
const Cart = require("./models/cartModel");
const Subscriber = require('./models/subscribeModel'); 
const { MongoClient } = require('mongodb');
const { uploadOnCloudinary } = require('./cloudinary');
require("dotenv").config();
const PORT = 5000;
const MONGO_URI =process.env.MONGO_URI || "mongodb://127.0.0.1:27017/bbs";
const client = new MongoClient(process.env.MONGO_URI);

const app = express();
app.use(express.json());
app.use(cors());

const connection = ()=>{
  mongoose.connect(MONGO_URI)
.then(()=>{
    console.log("mongoDB connected successfully");
})
.catch(()=>{
    console.log("failed to connect with database");
})
}
connection();

function getDb(dbName = process.env.DB_NAME) {
  return client.db(dbName);
}

module.exports = { getDb };

//api for login
app.post("/login",async (req,res)=>{
    const { mail, password } = req.body;

    try {
        const userExist = await collection.findOne({ mail: mail });
        if (!userExist) {
            res.json("User not found");   
        } else {
            const match =  bcrypt.compare(password, userExist.password);
            if (match) {
                const token = await userExist.generateToken();
                res.status(200).json({
                    msg:"Login Successful",
                    token: token,
                    userId: userExist._id.toString(),
                    role: userExist.role,
                });
            } else {
                res.json("Invalid Credentials");
            }
        }
    } catch (e) {
        res.status(500).json("Internal server error");
    }
});


//api for register

app.post("/register", async (req, res) => {
    const { name, mail, contact, password } = req.body;
    try {
        const userExist = await collection.findOne({ mail: mail });
        if (userExist) {
            return res.json({ message : "exists" });
        } else {
            const hash = await bcrypt.hash(password, 10);
            const userCreated = await collection.create({ name, mail, contact, password: hash ,imageSrc:"https://th.bing.com/th/id/OIP.yYUwl3GDU07Q5J5ttyW9fQHaHa?w=185&h=184&c=7&r=0&o=5&dpr=1.3&pid=1.7"});
            const token = await userCreated.generateToken();
            res.status(201).json({ message: userCreated, token: token , userId : userCreated._id.toString() });
        }
    } catch (err) {
        res.status(500).json("Internal server error");
    }
});

app.post('/subscribe', async (req, res) => {
  try {
    const { name, email,mobile } = req.body;

    console.log(req.body);
    // Check if email already exists in database
    const existingSubscriber = await Subscriber.findOne({ email });

    if (existingSubscriber) {
      return res.status(400).json({ message: 'Email already subscribed' });
    }

    // Create new subscriber instance
    const newSubscriber = new Subscriber({
      name,
      email,
      mobile
    });

    // Save subscriber to database
    const savedSubscriber = await newSubscriber.save();

    console.log(`New subscription: Name - ${name}, Email - ${email}, Mobile - ${mobile}`);

    res.status(200).json({ message: 'Subscription successful!', subscriber: savedSubscriber });
  } catch (error) {
    console.error('Error subscribing:', error.message);
    res.status(500).json({ message: 'Internal server error' });
  }
});

//api for profile
app.get("/profile", async (req, res) => {
    const { userId } = req.query; // Retrieve userId from query parameters
  
    try {
      // Assuming 'collection' is your MongoDB collection reference
      const user = await collection.findOne({ _id: userId });
      
      if (user) {
        res.json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (err) {
      console.error("Error retrieving user data:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  //api for edit profile
  app.put("/edit", async (req,res)=>{
    const {name,mail,location,contact,imageSrc,userId} = req.body;
    // console.log(userId)

    try {
        const updatedUser = await collection.findOneAndUpdate(
            { _id:userId },
            { $set: { name, mail, location, contact, imageSrc } },
            { new: true }
        );
        // console.log(updatedUser);
        // Return the updated user data in the response
        res.status(200).json({ message: 'User data updated successfully', user: updatedUser });
    } catch (error) {
        // If any error occurs during database operation, return an internal server error
        console.error('Error updating user data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    });

    //Add Product 

    //multer middleware
    // const storage = multer.diskStorage({
    //     destination: function (req, file, cb) {
    //         cb(null, 'Images'); // Specify the destination folder for storing uploaded images
    //     },
    //     filename: function (req, file, cb) {
    //         cb(null, Date.now() + '-' + file.originalname); // Generate unique filename for each uploaded image
    //     }
    // });
    
    // const upload = multer({ storage: storage });
    // let multipleUpload = upload.fields([{ name : "images" , maxCount : 4 }]);
    // app.use('/Images', express.static(path.join(__dirname, 'Images')));

    //API for add product 
    // Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'Images'); // Temporary storage folder
  },
  filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname); // Generate unique filename
  }
});

const upload = multer({ storage: storage });

// Serve static files from the 'Images' folder
app.use('/Images', express.static(path.join(__dirname, 'Images')));

// API endpoint to add a product
app.post("/addProduct", upload.array("images", 4), async (req, res) => {
  try {
    const {
      productName,
      productPrice,
      productDescription,
      productCategory,
      productSubCategory,
      productMaterial,
      productQuantity,
      productFeatures
    } = req.body;

    console.log(req.body);

    const imageFiles = req.files;
    const imageUrls = [];

    for (const file of imageFiles) {
      try {
        const response = await uploadOnCloudinary(file.path);
        if (response && response.url) {
          imageUrls.push(response.url);
        } else {
          console.error("No URL returned from Cloudinary for file:", file.filename);
        }
      } catch (error) {
        console.error("Error uploading file to Cloudinary:", file.filename, error);
      }
    }

    const newProduct = await Product.create({
      productName,
      productPrice,
      productDescription,
      productCategory,
      productSubCategory,
      productMaterial,
      productQuantity,
      productFeatures: Array.isArray(productFeatures) ? productFeatures : [productFeatures],
      images: imageUrls
    });

    res.status(201).json(newProduct);
  } catch (error) {
    res.status(500).json({ error: "Error adding product" });
  }
});

    //api for product component to get products
    app.get("/getProduct", async (req,res)=>{
        try {
            const products = await Product.find({});
    
            // Send the product data as a response
            res.json({ status: "ok", data: products });
        } catch (error) {
            res.json({status:error})
        }
    })

    // api to get all users
    app.get("/getUsers", async (req,res)=>{
      try {
          const users = await collection.find({});
  
          // Send the user data as a response
          res.json({ status: "ok", data: users });
      } catch (error) {
          res.json({status:error})
      }
  })

    app.get("/productinfo/:id", async (req, res) => {
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId);
            // console.log(product);
            if (!product) {
                // If product with given _id is not found, return 404 Not Found status
                return res.status(404).json({ status: "error", message: "Product not found" });
            }
    
            // If product is found, return it as a response
            res.json({ status: "ok", data: product });
        } catch (error) {
            // If an error occurs, return 500 Internal Server Error status
            res.status(500).json({ status: "error", message: "Internal Server Error" });
        }
    });

//API to add a review 
app.post('/addReview', async (req, res) => {
    try {
      const review = new Review(req.body);
      await review.save();
      res.status(201).json(review);
    } catch (error) {
      console.error('Error saving review:', error);
      res.status(500).json({ error: 'Failed to save review' });
    }
  });

  app.get('/reviews', async (req, res) => {
    try {
      const { productId } = req.query;
      const reviews = await Review.find({ productId });
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error);
      res.status(500).json({ error: 'Failed to fetch reviews' });
    }
  });

  app.get('/userInfo/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
      const user = await collection.findOne({ _id: userId });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ imageSrc: user.imageSrc, name: user.name }); // Assuming user contains image and name fields
    } catch (error) {
      console.error('Error fetching user information:', error);
      res.status(500).json({ error: 'Failed to fetch user information' });
    }
  });

  //api to find cart for the user
  app.get('/cart', async (req, res) => {
    try {
      const userId = req.query.userId; // Assuming userId is a property of the request body
      const cart = await Cart.findOne({ userId: userId }); // Assuming userId is the field in your Cart model
      // console.log(cart);
      if (!cart) {
        return res.status(404).json({ error: 'Cart not found' });
      }
      res.json(cart.items);
    } catch (error) {
      console.error('Error fetching cart data:', error);
      res.status(500).json({ error: 'Failed to fetch cart data' });
    }
  });

  // POST /api/cart/add - Add product to cart
// app.post('/addToCart', async (req, res) => {
//     try {
//       const { productId, userId } = req.body;
  
//       // Find the user's cart or create a new one if it doesn't exist
//       let cart = await Cart.findOne({ userId });
//       if (!cart) {
//         cart = await Cart.create({ userId, items: [] });
//       }
  
//       // Check if the product is already in the cart
//       const existingItemIndex = cart.items.findIndex(item => item.productId.toString() === productId.toString());
//       if (existingItemIndex !== -1) {
//         // If the product is already in the cart, increase its quantity
//         cart.items[existingItemIndex].quantity++;
//       } else {
//         // If the product is not in the cart, add it with quantity 1
//         cart.items.push({ productId, quantity: 1 });
//       }
  
//       // Save the updated cart to the database
//       await cart.save();
  
//       res.json({ success: true, message: 'Product added to cart' });
//     } catch (error) {
//       console.error('Error adding product to cart:', error);
//       res.status(500).json({ success: false, error: 'Failed to add product to cart' });
//     }
//   });

  //api to get product details for the cart
  app.get('/products/:productId', async (req, res) => {
    try {
      const productId = req.params.productId;
  
      // Find the product by its ID in the database
      const product = await Product.findById(productId);
  
      if (!product) {
        // If the product with the specified ID does not exist, return 404 Not Found
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // If the product exists, return it in the response
      res.json(product);
    } catch (error) {
      // If an error occurs, return 500 Internal Server Error
      console.error('Error fetching product details:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  // api for quantity update in cart

  app.put('/cart/items/:itemId', async (req, res) => {
    const { itemId } = req.params;
    const { quantity } = req.body;
  
    try {
      const updatedCart = await Cart.findOneAndUpdate(
        { 'items._id': itemId },
        { $set: { 'items.$.quantity': quantity } },
        { new: true }
      );
  
      if (!updatedCart) {
        return res.status(404).json({ message: 'Cart item not found' });
      }
      console.log(updatedCart);
      res.json(updatedCart);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  });

  //api for item remove from cart
  app.delete('/cart/items/:itemId', async (req, res) => {
    const { itemId } = req.params;

    try {
        const cart = await Cart.findOne({ 'items._id': itemId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        cart.items.pull({ _id: itemId });
        await cart.save();
        res.json({ message: 'Item removed successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Endpoint to edit product information
app.put('/edit/:productId', async (req, res) => {
  const productId = req.params.productId;
  const {
      productName,
      productDescription,
      productPrice,
      productCategory,
      productQuantity,
      productMaterial
  } = req.body;

  try {
      const product = await Product.findById(productId);

      if (!product) {
          return res.status(404).json({ message: 'Product not found' });
      }

      // Update product fields
      if (productName) product.productName = productName;
      if (productDescription) product.productDescription = productDescription;
      if (productPrice) product.productPrice = productPrice;
      if (productCategory) product.productCategory = productCategory;
      if (productQuantity) product.productQuantity = productQuantity;
      if (productMaterial) product.productMaterial = productMaterial;

      // Save the updated product
      const updatedProduct = await product.save();

      res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
  } catch (error) {
      res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

app.listen(PORT,()=>{
    console.log(`your server is running at: ${PORT}`);
})
