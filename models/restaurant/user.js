const getdb = require('../../util/database').getdb;
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

class User {
    constructor(userId, name, email, cart) {
        this.name = name;
        this.email = email;
        this.cart = cart; // cart = {items: []}
        this._id = userId;
    }

    static findById(ID) {
      const db = getdb();
      return db.collection('user').find({_id: new ObjectId(ID)}).toArray()
      .then(userInfo => {
        return userInfo;
      })
      .catch(err => {
        console.log(err);
      });
    }

    saveUser() {
      const db = getdb();
        return db.collection('user').insertOne(this)
      .then(user => {
          return user;
      })
      .catch(err => {
          console.log("User creation not successful" + err);
      });  
    }

    addToCart(itemId) {
      let newQuantity = 1;
      const updatedCartItems = [...this.cart.items];
      let cartItemIndex = null;

      if (this.cart.items && this.cart.items.length > 0) {
        
        cartItemIndex = this.cart.items.findIndex(item => {
            return itemId ===  item.itemId;
        });
      }
    
      if (cartItemIndex !== undefined && cartItemIndex!== null && cartItemIndex >=0) {
          newQuantity = this.cart.items[cartItemIndex].quantity + newQuantity;
          updatedCartItems[cartItemIndex].quantity = newQuantity;

      } else {
        updatedCartItems.push({
          itemId: itemId,
          quantity: newQuantity
        });
      }
      const updatedCart = {
        items : updatedCartItems
      }
      const db = getdb();
      // console.log(updatedCart);
      return db.collection('user').updateOne({_id: new ObjectId(this._id)}, {$set: {cart: updatedCart}})
            .then(updatedCart => {
                return updatedCart;
            })
            .catch(err => {
              console.log(err);
            });
    }

    static fetchDisplayItems() {
      const db = getdb();
      console.log(this.cart);
      const ItemIds = this.cart.items.map(item=>{
        return item.itemId;
      })
      // return db.collection('user').find()
      // .then(userResult => {
          db.collection('restaurantDetail').find({"dishes.dishId": {$in:ItemIds}}).toArray()
          .then(items => {
              return items.map(item => {
                return {...item, 
                        quantity: this.cart.items.find(data => {
                           data.dishId === item.itemId;
                        }).quantity
                      }
            })
          })
          .catch(err => {
              console.log(err);
            });
      // })
      // 
    }
}



module.exports = User;