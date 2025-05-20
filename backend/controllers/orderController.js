import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import Razorpay from 'razorpay'

//global variables
const currency = 'usd'
const delivery_charge=500

//gateway initialize
const stripe=new Stripe(process.env.STRIPE_SECRET_KEY)
const razorpay=new Razorpay({
key_id:process.env.RAZORPAY_KEY_ID,
key_secret:process.env.RAZORPAY_KEY_SECRET,
})

//placing order using cod
const placedOrder=async(req,res)=>{
try{
    const {userId,items,amount,address}=req.body;
    const orderData={userId,items,address,amount,paymentMethod:"COD",payment:false,date:Date.now()}
    const newOrder=new orderModel(orderData)
    await newOrder.save()
    await userModel.findByIdAndUpdate(userId,{cartData:{}})
    res.json({success:true,message:"Order Placed"})

}catch(error){
console.log(error);
res.json({success:false,message:error.message});

}
}

//placing order using stripe method
const placedOrderStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Stripe",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // price in paisa
      },
      quantity: item.quantity,
    }));

    // Add delivery charge as a separate line item
    line_items.push({
      price_data: {
        currency,
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: delivery_charge,
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
      line_items,
      mode: "payment",
    });

    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
//verify stripe
const verifyStripe = async (req, res) => {
  const { orderId, success, userId } = req.body;

  try {
    if (success === "true") {
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      if (userId) {
        await userModel.findByIdAndUpdate(userId, { cartData: {} });
      }
      return res.json({ success: true });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      return res.json({ success: false });
    }
  }
catch (error) {
  console.log('Axios error:', error.response?.data || error.message);
  toast.error(error.response?.data?.message || error.message);


  }
};


//placing order using razorpay method
const placedOrderRazorpay = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    const orderData = {
      userId,
      items,
      address,
      amount,
      paymentMethod: "Razorpay",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new orderModel(orderData);
    await newOrder.save();

    const options = {
      amount: amount * 100, // in paise
      currency: "INR",
      receipt: newOrder._id.toString(), // fixed variable
    };

    const razorpayOrder = await razorpay.orders.create(options); // async/await version

    res.json({
      success: true,
      order: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        curr: razorpayOrder.currency,
        receipt: razorpayOrder.receipt,
      },
    });
  } catch (error) {
    console.error("Razorpay order error:", error);
    res.json({ success: false, message: error.message });
  }
};
//verify stripe
const verifyRazorpay = async (req, res) => {
  try {
    const { orderId, razorpay_order_id, userId } = req.body; // Ensure userId is passed from the frontend
    
    // Fetch the Razorpay order details
    const orderInfo = await razorpay.orders.fetch(razorpay_order_id);

    if (orderInfo.status === 'paid') {
      // Update your order in the database to mark it as paid
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      
      // Clear the user's cart if needed
      await userModel.findByIdAndUpdate(userId, { cartData: {} });
      
      res.json({ success: true, message: "Payment successful" });
    } else {
      res.json({ success: false, message: "Payment failed" });
    }
  } catch (error) {
    console.error("Razorpay verification error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};


//All orders data for admin panel
const allOrders=async(req,res)=>{
    try {
        const orders=await orderModel.find({})
        res.json({success:true,orders})
    } catch (error) {
                console.log(error);
res.json({success:false,message:error.message});
    }
}

//User orders data for frontend
const userOrders=async(req,res)=>{
    try{
        const {userId}=req.body
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})

    }catch(error){
        console.log(error);
res.json({success:false,message:error.message});
    }
}

//update orders status from admin panel
const updateStatus=async(req,res)=>{
    try {
        const {orderId,status}=req.body
        await orderModel.findByIdAndUpdate(orderId,{status})
                res.json({success:true,message:"Status Changed"} )
    } catch (error) {
                console.log(error);
res.json({success:false,message:error.message});
    }
}

export {verifyRazorpay,placedOrder,placedOrderRazorpay,placedOrderStripe,allOrders,userOrders,updateStatus,verifyStripe}