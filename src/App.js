import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import "./index";

function App() {

  let user_point = 200;
  let summary_price = 0;
  let discounted_price = 0;
  const [item1Count, setItem1Count] = useState(0);
  const [item2Count, setItem2Count] = useState(0);
  const [item3Count, setItem3Count] = useState(0);
  const [item4Count, setItem4Count] = useState(0);
  const [item5Count, setItem5Count] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState([]);

  const increaseItem = (index) => {
    switch(index) {
      case 0:
        setItem1Count(item1Count + 1)
        break;
      case 1:
        setItem2Count(item2Count + 1)
        break;
      case 2:
        setItem3Count(item3Count + 1)
        break;
      case 3:
        setItem4Count(item4Count + 1)
        break;
      case 4:
        setItem5Count(item5Count + 1)
        break;
      default:
        console.log('default')
    }
  }

  const decreaseItem = (index) => {
    switch(index) {
      case 0:
        if(item1Count > 0)
          setItem1Count(item1Count - 1)
        break;
      case 1:
        if(item2Count > 0)
          setItem2Count(item2Count - 1)
        break;
      case 2:
        if(item3Count > 0)
          setItem3Count(item3Count - 1)
        break;
      case 3:
        if(item4Count > 0)
          setItem4Count(item4Count - 1)
        break;
      case 4:
        if(item5Count > 0)
          setItem5Count(item5Count - 1)
        break;
      default:
        console.log('default')
    }
  }

  let itemList = [
    {
      img: "Loose_Fit_Resort_shirt.jpg",
      title: "Loose Fit Resort shirt",
      type: "Clothing",
      price: "549",
      count: item1Count
    },
    {
      img: "Wide_Jeans.jpg",
      title: "Wide Jeans",
      type: "Clothing",
      price: "899",
      count: item2Count
    },
    {
      img: "Slip-on_trainers.jpg",
      title: "Slip-on trainers",
      type: "Clothing",
      price: "459",
      count: item3Count
    },
    {
      img: "Logitech_G102_Lightsync.jpg",
      title: "Logitech G102 Lightsync",
      type: "Computer",
      price: "590",
      count: item4Count
    },
    {
      img: "Signo_Macro_Gaming_Mouse_GM-972.jpg",
      title: "Signo Macro Gaming MOUSE GM-972",
      type: "Computer",
      price: "650",
      count: item5Count
    },
  ];

  let couponList = [
    {
      title: "Fix amount 50฿",
      type: "Coupon",
      genre: "Fix-amount",
      value: 50
    },
    {
      title: "Percentage discount 20%",
      type: "Coupon",
      genre: "Percentage",
      value: 20
    },
    {
      title: "10 Percentage discount by item category [Clothing]",
      type: "On-Top",
      genre: "Percentage",
      value: 10,
      category: "Clothing"
    },
    {
      title: "10 Percentage discount by item category [Computer]",
      type: "On-Top",
      genre: "Percentage",
      value: 10,
      category: "Computer"
    },
    {
      title: "Discount by points",
      type: "On-Top",
      genre: "Point",
    },
    {
      title: "Special campaigns discount 50฿ every 300฿",
      type: "Seasonal",
      discount_num: 50,
      discount_every: 300
    },
  ];

  // let selectedCoupon = []
  

  const couponSelect = (index) => {
    const couponDiv = document.getElementById(index);
    const couponName = couponList[index];

    if(summary_price == 0)
      return 0;
    // console.log(couponName)
    if(couponDiv.classList.contains('fill1')){
      couponDiv.classList.remove('fill1');

      const coupon_index = selectedCoupon.findIndex(item => item.title === couponName.title);
      console.log("if" + coupon_index)
      if (coupon_index !== -1) {
        const newArray = [...selectedCoupon.slice(0, coupon_index), ...selectedCoupon.slice(coupon_index + 1)];
        setSelectedCoupon(newArray);
      }
    }
    else {

      const coupon_index = selectedCoupon.findIndex(item => item.type === couponName.type);
      if (coupon_index !== -1) {
        console.log("Find selected Coupon same type :  " + coupon_index)
        const tab_coupon = selectedCoupon[coupon_index]
        // console.log(tab_coupon)
        const newArray = [...selectedCoupon.slice(0, coupon_index), ...selectedCoupon.slice(coupon_index + 1)];
        console.log("newArray : ")
        console.log(newArray)
        setSelectedCoupon(newArray);

        const couponList_index = couponList.findIndex(item => item.title === tab_coupon.title);
        document.getElementById(couponList_index).classList.remove('fill1');
      }

      console.log("Last Part Add new Coupon" + coupon_index)
      console.log(couponName)

      couponDiv.classList.add('fill1');
      setSelectedCoupon(selectedCoupon => [...selectedCoupon, couponName] );
      // selectedCoupon.push(couponName)
    }
    console.log(selectedCoupon)
  }

  const summary = () => {
    summary_price = 0;
    for(let i=0; i<itemList.length; i++){
      summary_price = summary_price + itemList[i].count * itemList[i].price
      // console.log(itemInterest[i])
    }
    console.log(summary_price)
    // if(summary_price == 0){
      // setSelectedCoupon([])
      // couponList
    // }
    console.log(selectedCoupon)
  }

  const discount = () => {
    discounted_price = summary_price;
    if(selectedCoupon.length>0){
      
      let coupon_index = selectedCoupon.findIndex(item => item.type === "Coupon");
      if (coupon_index !== -1) {
        let useCoupon = selectedCoupon[coupon_index];
        if(useCoupon.genre === "Fix-amount"){
          selectedCoupon[coupon_index].discount = useCoupon.value;
          discounted_price = discounted_price - useCoupon.value;
        }
        else if(useCoupon.genre === "Percentage"){
          selectedCoupon[coupon_index].discount = discounted_price * (useCoupon.value) / 100;
          discounted_price = discounted_price * (100-useCoupon.value) / 100;
        }
      }
    
      coupon_index = selectedCoupon.findIndex(item => item.type === "On-Top");
      if (coupon_index !== -1) {
        let useCoupon = selectedCoupon[coupon_index];
        if(useCoupon.genre === "Point"){
          let maximum = 20 / 100 * discounted_price;
          if(user_point > maximum){
            selectedCoupon[coupon_index].discount = maximum;
            discounted_price = discounted_price - maximum;
          }
          else{
            selectedCoupon[coupon_index].discount = user_point;
            discounted_price = discounted_price - user_point;
          }
          
        }
        else if(useCoupon.genre === "Percentage"){
          let category = useCoupon.category;
          let category_price = 0;
          for (let i=0; i<itemList.length; i++){
            if(itemList[i].type === category)
              category_price = category_price + itemList[i].count * itemList[i].price
          }
          selectedCoupon[coupon_index].discount = category_price * useCoupon.value / 100;
          discounted_price = discounted_price - (category_price * useCoupon.value / 100);
        }
      }

      coupon_index = selectedCoupon.findIndex(item => item.type === "Seasonal");
      if (coupon_index !== -1) {
        let useCoupon = selectedCoupon[coupon_index];
        let iter = Math.floor(discounted_price / useCoupon.discount_every);

        selectedCoupon[coupon_index].discount = useCoupon.discount_num * iter;

        discounted_price = discounted_price - useCoupon.discount_num * iter;
      }

    }
  }

  summary()
  discount()

  return (
    <div className="App">
      <div class="shopping-cart">
        {/* <!-- Title --> */}
        <div class="title">
          <div>Shopping Bag</div>
          <div>User Point : {user_point}</div>
        </div>

        {itemList.map((item, index) => (
          <div class="item">
          <div class="image">
            <img class='image' src={item.img} alt="" />
          </div>
          <div class="description">
            <span>{item.title}</span>
            <span>{item.type}</span>
          </div>
          <div class="quantity">
            <button class="plus-btn" type="button" name="button" id="plus_item_1" onClick={() => increaseItem(index)}>
              <img src="plus.svg" alt="" />
            </button>
            <input type="text" name="name" value={item.count} id="value_item_1" disabled></input>
            <button class="minus-btn" type="button" name="button" id="minus_item_1" onClick={() => decreaseItem(index)}>
              <img src="minus.svg" alt="" />
            </button>
          </div>
          <div class="total-price">{item.price}฿</div>
          <div class="total-price" id="total_item_1">{item.price * item.count}฿</div>
        </div>
        ))}

        <div class="summary-price-bar">
          <div>Total</div>
          <div>{summary_price}฿</div>
        </div>
        <div class="coupon-title">
          Coupon
        </div>
        <div class="coupon-item">
          {couponList.map((item, index) => ( 
            <div class="coupon" id={index} onClick={() => couponSelect(index)}>
              <div>[{item.type}] {item.title} </div>
              {selectedCoupon.map((cou, index) => (
                cou.title === item.title ? - cou.discount : null
                // <div>{cou.title === item.title ? cou.discount : null}</div>
              ))}
              {/* <div> 5 </div> */}
            </div>
          ))}
        </div>
        <div class="discounted-price-bar">
          <div>Discounted Price</div>
          <div>{discounted_price.toFixed(2)}฿</div>
        </div>
      </div>
    </div>
  );
}

export default App;