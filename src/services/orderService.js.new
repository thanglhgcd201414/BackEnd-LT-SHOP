import { v4 as uuidv4 } from 'uuid';
import db from "../models/index";
import paypal from 'paypal-rest-sdk'
const { Op } = require("sequelize");
var querystring = require('qs');
var crypto = require("crypto");
var dateFormat = require('dateformat')
require('dotenv').config()
import moment from 'moment';
import localization from 'moment/locale/vi';
import { EXCHANGE_RATES } from '../utils/constants'
moment.updateLocale('vi', localization);
paypal.configure({
    'mode': 'sandbox',
    'client_id': 'AaeuRt8WCq9SBliEVfEyXXQMosfJD-U9emlCflqe8Blz_KWZ3lnXh1piEMcXuo78MvWj0hBKgLN-FamT',
    'client_secret': 'ENWZDMzk17X3mHFJli7sFlS9RT1Vi_aocaLsrftWZ2tjHtBVFMzr4kPf5_9iIcsbFWsHf95vXVi6EADv'
});

let createNewOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!data.addressUserId || !data.typeShipId) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {

                let product = await db.OrderProduct.create({

                    addressUserId: data.addressUserId,
                    isPaymentOnlien: data.isPaymentOnlien,
                    statusId: 'S3',
                    typeShipId: data.typeShipId,
                    note: data.note

                })

                data.arrDataShopCart = data.arrDataShopCart.map((item, index) => {
                    item.orderId = product.dataValues.id
                    return item;
                })

                await db.OrderDetail.bulkCreate(data.arrDataShopCart)
                let res = await db.ShopCart.findOne({ where: { userId: data.userId, statusId: 0 } })
                if (res) {
                    await db.ShopCart.destroy({
                        where: { userId: data.userId }
                    })
                    for (let i = 0; i < data.arrDataShopCart.length; i++) {
                        let productDetailSize = await db.ProductDetailSize.findOne({
                            where: { id: data.arrDataShopCart[i].productId },
                            raw: false
                        })
                        //  productDetailSize.stock = productDetailSize.stock - data.arrDataShopCart[i].quantity
                        await productDetailSize.save()

                    }

                }
                resolve({
                    errCode: 0,
                    errMessage: 'ok'
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}
let getAllOrders = (data) => {
    return new Promise(async (resolve, reject) => {
        try {

            let objectFilter = {
                include: [
                    { model: db.TypeShip, as: 'typeShipData' },
                    { model: db.Allcode, as: 'statusOrderData' },
                ],
                order: [['createdAt', 'DESC']],
                raw: true,
                nest: true
            }
            if (data.limit && data.offset) {
                objectFilter.limit = +data.limit
                objectFilter.offset = +data.offset
            }
            if (data.statusId && data.statusId !== '') {
                objectFilter.where = { ...objectFilter.where, statusId: data.statusId }
            }
            if (data.userId && data.userId !== '') {
                let addressUser = await db.AddressUser.findAll({ where: { userId: data.userId } })
                if (addressUser && addressUser.length > 0) {
                    let arrId = []
                    for (let i = 0; i < addressUser.length; i++) {
                        arrId.push(addressUser[i].id)
                    }
                    objectFilter.where = { ...objectFilter.where, addressUserId: { [Op.in]: arrId } }
                }
            }
            if (data.shipperId && data.shipperId !== '') {
                objectFilter.where = { ...objectFilter.where, shipperId: data.shipperId }
            }
            let res = await db.OrderProduct.findAndCountAll(objectFilter)
            if (res.rows && res.rows.length > 0) {
                for (let i = 0; i < res.rows.length; i++) {
                    if (res.rows[i].image) {
                        res.rows[i].image = new Buffer(res.rows[i].image, 'base64').toString('binary')
                    }
                    res.rows[i].addressUserData = await db.AddressUser.findOne({ where: { id: res.rows[i].addressUserId } })
                    if (res.rows[i].addressUserData) {
                        res.rows[i].addressUserData.userData = await db.User.findOne({ where: { id: res.rows[i].addressUserData.userId } })
                    }
                    res.rows[i].orderDetail = await db.OrderDetail.findAll({ where: { orderId: res.rows[i].id } })
                    let totalprice = 0
                    for (let j = 0; j < res.rows[i].orderDetail.length; j++) {
                        totalprice = totalprice + (res.rows[i].orderDetail[j].realPrice * res.rows[i].orderDetail[j].quantity)
                    }
                    res.rows[i].totalpriceProduct = totalprice + res.rows[i].typeShipData.price
                }
            }
            resolve({
                errCode: 0,
                data: res.rows,
                count: res.count
            })

        } catch (error) {
            reject(error)
        }
    })
}
let getDetailOrderById = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            if (!id) {
                resolve({
                    errCode: 1,
                    errMessage: 'Missing required parameter !'
                })
            } else {
                let order = await db.OrderProduct.findOne({
                    where: { id: id },
                    include: [
                        { model: db.TypeShip, as: 'typeShipData' },
                        { model: db.Allcode, as: 'statusOrderData' },
                    ],
                    raw: true,
                    nest: true
                })
                if (order.image) {
                    order.image = new Buffer(order.image, 'base64').toString('binary')
                }
                let orderDetail = await db.OrderDetail.findAll({
                    where: { orderId: id }
                })
                for (let i = 0; i < orderDetail.length; i++) {
                    orderDetail[i].productData = await db.ProductDetailSize.findOne({
                        where: { id: orderDetail[i].productId },
                        include: [
                            { model: db.Allcode, as: 'sizeData', attributes: ['value', 'code'] },
                        ],
                        raw: true,
                        nest: true
                    })
                    orderDetail[i].productData.productDetailData = await db.ProductDetail.findOne({ where: { id: orderDetail[i].productData.productdetailId } })
                    orderDetail[i].productData.productDetailData.productData = await db.Product.findOne({ where: { id: orderDetail[i].productData.productDetailData.productId } })
                    if (orderDetail[i].productData.productDetailData.image) {
                        orderDetail[i].productData.productDetailData.image = new Buffer(orderDetail[i].productData.productDetailData.image, 'base64').toString('binary')
                    }
                }
                order.orderDetail = orderDetail
                order.addressUserData = await db.AddressUser.findOne({ where: { id: order.addressUserId } })
                if (order.addressUserData) {
                    order.addressUserData.userData = await db.User.findOne({ where: { id: order.addressUserData.userId } })
                }
                let totalprice = 0
                for (let j = 0; j < order.orderDetail.length; j++) {
                    totalprice = totalprice + (order.orderDetail[j].realPrice * order.orderDetail[j].quantity)
                }
                order.totalpriceProduct = totalprice + order.typeShipData.price
                resolve({
                    errCode: 0,
                    data: order
                })
            }
        } catch (error) {
            reject(error)
        }
    })
}

// Các hàm khác giữ nguyên, chỉ loại bỏ các tham chiếu đến Voucher

module.exports = {
    createNewOrder: createNewOrder,
    getAllOrders: getAllOrders,
    getDetailOrderById: getDetailOrderById,
    // Các export khác giữ nguyên
}
