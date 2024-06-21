const Order = require('../models/Order')
const path = require('path');
const fs = require('fs');
const handlebars = require('handlebars');
const emailController = require('./emailController')
class orderController {
    async getOrdersOfUser(req, res) {
        try {
            const id = req.params.userId
            const orders = await Order.find({ user_id: id })
            const page = req.params.page
            const limit = req.params.limit
            const startIndex = (parseInt(page) - 1) * parseInt(limit);
            const endIndex = startIndex + parseInt(limit);
            const orders_length = orders.length;
            const totalPages = Math.ceil(orders_length / limit);
            const reverseOrders = orders.reverse()
            let ordersData = reverseOrders.slice(startIndex, endIndex);

            const obj = {
                page: page,
                totalPages: totalPages,
                orders: orders,
                startIndex: startIndex,
                endIndex: endIndex,
                orders_length: orders_length,
                ordersData: ordersData,
            }

            if (obj) {
                return res.status(200).json(obj)
            } else {
                return res.status(404).json({ message: "Not found" })
            }
        } catch (error) {
            return res.status(500).json(err)
        }
    }

    async ascendingOrdersByTotal(req, res) {
        try {
            const id = req.params.userId
            const orders = await Order.find({ user_id: id })
            const page = req.params.page
            const limit = req.params.limit
            const startIndex = (parseInt(page) - 1) * parseInt(limit);
            const endIndex = startIndex + parseInt(limit);
            const orders_length = orders.length;
            const totalPages = Math.ceil(orders_length / limit);
            const sortOrders = orders.sort((a, b) => a.total - b.total)
            let ordersData = sortOrders.slice(startIndex, endIndex);

            const obj = {
                page: page,
                totalPages: totalPages,
                orders: sortOrders,
                startIndex: startIndex,
                endIndex: endIndex,
                orders_length: orders_length,
                ordersData: ordersData,
            }

            if (obj) {
                return res.status(200).json(obj)
            } else {
                return res.status(404).json({ message: "Not found" })
            }
        } catch (error) {
            return res.status(500).json(err)
        }
    }

    async descendingOrdersByTotal(req, res) {
        try {
            const id = req.params.userId
            const orders = await Order.find({ user_id: id })
            const page = req.params.page
            const limit = req.params.limit
            const startIndex = (parseInt(page) - 1) * parseInt(limit);
            const endIndex = startIndex + parseInt(limit);
            const orders_length = orders.length;
            const totalPages = Math.ceil(orders_length / limit);
            const sortOrders = orders.sort((a, b) => b.total - a.total)
            let ordersData = sortOrders.slice(startIndex, endIndex);

            const obj = {
                page: page,
                totalPages: totalPages,
                orders: sortOrders,
                startIndex: startIndex,
                endIndex: endIndex,
                orders_length: orders_length,
                ordersData: ordersData,
            }

            if (obj) {
                return res.status(200).json(obj)
            } else {
                return res.status(404).json({ message: "Not found" })
            }
        } catch (error) {
            return res.status(500).json(err)
        }
    }

    async getAllOrders(req, res) {
        try {
            const orders = await Order.find({})
            if (orders) {
                return res.status(200).json(orders)
            } else {
                return res.status(404).json({ message: "Not found" })
            }
        } catch (error) {
            return res.status(500).json(err)
        }
    }
    async insertOrder(req, res) {
        let { date, da_tra, discount, note, order_id, payment_method, quantity, status, total, user_id, full_name, email, phone, address, city } = req.body
        let orders = new Order({
            date: date,
            da_tra: da_tra,
            discount: discount,
            note: note,
            order_id: order_id,
            payment_method: payment_method,
            quantity: quantity,
            status: status,
            total: total,
            user_id: user_id,
            full_name: full_name,
            email: email,
            phone: phone,
            address: address,
            city: city
        })

        const insertedOrder = await orders.save()
        if (insertedOrder) {
            return res.status(200).json(insertedOrder)
        } else {
            return res.status(404).json({ message: 'Insert failed!' })
        }
    }

    async changeOrderStatus(req, res) {
        try {
            const orderId = req.params.orderId
            const order = await Order.findOne({ order_id: orderId })
            if (order) {
                order.status = req.body.status
                await order.save()
                return res.status(200).json({ message: 'Order status has changed successfully' })
            } else {
                return res.status(404).json({ message: 'Order not found' })
            }
        } catch (error) {
            return res.status(500).json(err)
        }
    }

      
      async triggerEmail(req, res) {
        try {
          const emailTemplate = fs.readFileSync(
            path.join('D:', 'monfee', 'monfee-be-nodejs', 'views', 'email-template.html'),
            'utf8'
          );
          const template = handlebars.compile(emailTemplate);
          const {items, total, orderId, email, username} = req.body
          const html = template({
            items: items,
            total: total,
            orderNumber: orderId,
            username: username
          });
      
          await emailController.sendEmail(
            email,
            'Order Confirmation',
            'Please see the order details in the email body.',
            html
          );
      
          return res.status(200).json({ message: 'Order placed successfully!' });
        } catch (error) {
          console.error('Error triggering email:', error);
          return res.status(500).json({ error: 'Error sending email' });
        }
      }
}

module.exports = new orderController