import express from "express"
import authUser from "../middleware/auth.js"
import adminAuth from "../middleware/adminAuth.js"
import { placedOrder,placedOrderRazorpay,placedOrderStripe,allOrders,userOrders,updateStatus, verifyStripe, verifyRazorpay} from "../controllers/orderController.js"

const orderRouter=express.Router();

orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

orderRouter.post('/place',authUser, placedOrder)
orderRouter.post('/stripe',authUser, placedOrderStripe)
orderRouter.post('/razorpay',authUser, placedOrderRazorpay)

orderRouter.post('/userorders',authUser, userOrders)

orderRouter.post('/verifyStripe',authUser, verifyStripe)
orderRouter.post('/verifyRazorpay',authUser, verifyRazorpay)


export default orderRouter

