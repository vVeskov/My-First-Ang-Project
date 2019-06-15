
const Gift = require('../models/Gift');
const Orders = require('../models/Order');
const PendingOrder = require('../models/AllGifts');
module.exports = {
  getGifts: (req, res) => {
    Gift.find()
      .then((gifts) => {
        res
          .status(200)
          .json({ message: "All gifts fetched successfully.", gifts });
      }
      )
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      });
  },

  giftDetails: (req, res) => {
    let id = req.params.id;
    Gift.findById(id).then((gift) => {
      res.status(200).json({ message: "Gift details fetched successfully.", gift })
    })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
        next(error);
      })
  },

  getPendingOrders: (req, res) => {
    PendingOrder.find().then((orders) => {
      res.status(200)
        .json({ message: "All orders fetched successfully", orders })
    }).catch((err) => {
      next(err);
    })
  },

  getUserOrders: (req, res) => {
    Orders.find().then((order) => {
      res.status(200)
        .json({ message: "User orders fetched successfully.", order })
    })
      .catch((error) => {
        // if (!error.statusCode) {
        //   error.statusCode = 500;
        // }
        next(error);
      })
  },


  createGift: (req, res) => {
    const giftObj = req.body;
    Gift.create(giftObj)
      .then((gift) => {
        res.status(200)
          .json({
            message: 'Gift created successfully!',
            gift
          })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
      });
  },

  addNewOrderToUser: (req, res) => {
    const orderObj = req.body;
    Orders.create(orderObj)
      .then((order) => {
        res.status(200).json({
          message: "Gift added to cart successfully!",
          order
        })
      }).catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
      })
  },

  addPendingOrders: async (req, res) => {
    try {
      let data = req.body;
      let findOrderByUser = await PendingOrder.find({
        user: data.user
      });
      console.log(data);
      if (findOrderByUser.length < 1) {

        await PendingOrder.create({
          user: data.user,
          totalSum: data.totalSum,
          giftsName: data.giftsNameAndQnt,
        }).then((order) => {
          res.status(200).json({
            order
          })
        });

      }
      else {

        let giftNames = data.giftsNameAndQnt;
        let currentSum = findOrderByUser[0].totalSum;
        let totalSum = data.totalSum + currentSum;
        await PendingOrder.findOneAndUpdate({ user: data.user }, { $push: { giftsName: giftNames } })
          .then((order) => {
            res.status(200).json({
              order
            })
          })

        await PendingOrder.findOneAndUpdate({ user: data.user }, { $set: { totalSum: totalSum } })
          .then((order) => {
            res.status(200).json({
              order
            })
          });

      }
    } catch (error) {
      console.log(error);
    }

  },

  deleteSingleOrder: (req, res) => {

    let id = req.body.id;
    
    PendingOrder.findByIdAndRemove({
      _id: id
    }).then(() => {
        res.status(200).json({
          message: 'You`ve deleted the choosen order mighty admin'
        })
      }).catch((err) => {
        console.log(err);
      })
  },

  deleteSingleGift: (req, res) => {
    let user = req.body.user;
    let giftName = req.body.giftName;
    Orders.deleteMany({
      user: user,
      giftName: { $in: [giftName] }
    }).then(() => {
      res.status(200).json({
        message: 'You`ve deleted the choosen gift ma` friend'
      })
    })
  },
  removeUserOrders: (req, res) => {
    let currUser = req.body.user;
    Orders.deleteMany(
      {
        user: currUser,
      }).then(() => {
        res.status(200).json({
          message: "You`ve made a successfull purchase"
        })
      }).catch((err) => {
        console.log(err);
      })
  },

  deleteGift: (req, res) => {

    let id = req.params.id;
    let query = { '_id': req.params.id };
    Gift.deleteOne(query, function (err) {
      console.log(err)
    })
      .then(() => {
        res.status(200)
          .json({
            message: 'Gift deleted successfully!',
          })
      })
  },

  editGift: (req, res) => {
    let id = req.params.id;

    let query = { '_id': id };
    let newData = req.body;
    Gift.findOneAndUpdate(query, newData, { upsert: true }, function (err, doc) {
      if (err) {
        console.log("An error occurred while updating document:")
        console.log(err)
        return res.send(500, { error: err });
      }
      // return res.send("succesfully saved");
    })
      .then((gift) => {
        res.status(200)
          .json({
            message: 'Gift edit successfully!',
            gift
          })
      })
      .catch((error) => {
        if (!error.statusCode) {
          error.statusCode = 500;
        }
      });
  },


}