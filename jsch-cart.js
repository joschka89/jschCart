
jschRenderCartPanels();
jschRenderCart();
jschCartItemsRender();

document.getElementById('jsch-cart-btn').onclick = function() {     
    jschToggleCart();
}        
document.getElementById('jsch-clear-btn').onclick = function() {     
    clearCart();
}        
document.getElementById('jsch-cart-close-x').onclick = function() {     
    jschToggleCart();
} 

var cart=[];

function jschRenderCartPanels() {
    var cartPanels=document.getElementsByClassName('jsch-product-cart-panel');
    for (let i = 0; i < cartPanels.length; i++) {
        cartPanels[i].innerHTML=jschProductCartPanel();
    }

    var cartButtons=document.getElementsByClassName('jsch-to-cart');
    for (let i = 0; i < cartButtons.length; i++) {
        cartButtons[i].onclick = function(e) {
            let prodId=e.target.parentElement.getAttribute('productId');
            addItemToCart(prodId,1);
            jschCartItemsRender();
        }
    }
    
    var cartButtons=document.getElementsByClassName('jsch-cart-increase');
    for (let i = 0; i < cartButtons.length; i++) {
        cartButtons[i].onclick = function(e) {
            let prodId=e.target.parentElement.getAttribute('productId');
            addItemToCart(prodId,1);
            jschCartItemsRender();
        }
    }
    
    var cartButtons=document.getElementsByClassName('jsch-cart-decrease');
    for (let i = 0; i < cartButtons.length; i++) {
        cartButtons[i].onclick = function(e) {
            let prodId=e.target.parentElement.getAttribute('productId');
            removeItemFromCart(prodId);
            jschCartItemsRender();
        }
    }        
    
}

function jschProductCartPanel() {
    return `
    <button class='jsch-to-cart'>To Cart</button>
    <button class='jsch-cart-increase'>+</button>
    <button class='jsch-cart-decrease'>-</button>`;
}

function jschRenderCart() {
    var div = document.createElement("div");
    div.setAttribute("id", "jsch-cart");
    div.setAttribute("class", "jsch-hidden-cart");
    const createdDiv=document.body.appendChild(div);
    createdDiv.innerHTML+=jschCartInner();
}

function jschCartInner() {
    return `<div class='jschCartClose'><span id='jsch-cart-close-x'>&#9932;</span></div>
    <div id='jsch-cart-items'></div>`;
}

function jschRefreshCart() {
    let menuelement=document.getElementById('jsch-cart');    
    if(menuelement) {
        jschToggleCart(menuelement,'jsch-hidden-cart');
        return;
    }
}

function jschCartItemsRender() {
  var cart=jschGetFromCart();
  if(cart.length!=0) {
    var string=`
    <table>
      <tr>
        <td>Id</td>
        <td>Quantity</td>
        <td>Name</td>
        <td>Price</td>
        <td></td>
        <td></td>
        <td></td>
      </tr>
    
    `;
    
    i=0;
    for(var i in cart) {
      string+=`<tr>
      <td>${cart[i].id}</td>
      <td>${cart[i].id}</td>
      <td>${cart[i].count}</td>
      <td>${cart[i].id}</td>
      <td><button class='jsch-cart-increase'>+</button></td>
      <td><button class='jsch-cart-decrease'>-</button></td>
      <td><button class='jsch-cart-delete'>x</button></td>
      </tr>`;
      i++;
    }
    string+=`</table>`;   
  } else {
    var string="";
  }
  document.getElementById('jsch-cart-items').innerHTML=string;
}

function jschToggleCart() { 
    var element=document.getElementById('jsch-cart')
    var hasClass=element.classList.contains('jsch-hidden-cart');
    if(hasClass) {
        element.classList.add('jsch-show-animate');
        element.classList.remove('jsch-hide-animate');
        element.classList.remove('jsch-hidden-cart');
    } else { 
        element.classList.add('jsch-hide-animate');      
        element.classList.remove('jsch-show-animate');       
        setTimeout(() =>{
            element.classList.add('jsch-hidden-cart');
        }, 450);                
    }
}

function jschSetToCart(CartObject) {
    localStorage.setItem("CartObject", JSON.stringify(CartObject));
}

function jschGetFromCart() {
    if(localStorage.getItem("CartObject")) {
        return JSON.parse(localStorage.getItem("CartObject"));
    } else {
        return '';
    }
    
}

  // Add to cart
  function addItemToCart(id,count) {
    var cart=jschGetFromCart();
    i=0;
    for(var i in cart) {
      if(cart[i].id === id) {
        cart[i].count ++;
        jschSetToCart(cart);
        return;
      }
      i++;
    }
    let newIndex={'id': id,'count': count};
    cart.push(newIndex);
    jschSetToCart(cart);
  }
  // Set count from item
  function setCountForItem(id,count) {
    var cart=jschGetFromCart();
    i=0;
    for(var i in cart) {
      if (cart[i].id === id) {
        cart[i].count = count;
        break;
      }
      i++;
    }
    jschSetToCart(cart);
  };
  // Remove item from cart
  function removeItemFromCart(id) {
      var cart=jschGetFromCart();  
      i=0;
      for(var i in cart) {
        if(cart[i].id === id) {
          cart[i].count --;
          if(cart[i].count === 0) {
            cart.splice(i, 1);
            i++;
          }
          break;
        }
    }
    jschSetToCart(cart)
  }

  // Remove all items from cart
  function removeItemFromCartAll(id) {
    var cart=jschGetFromCart();
    i=0;
    for(var i in cart) {
      if(cart[i].id === id) {
        cart.splice(i, 1);
        i++;
        break;
      }
    }
    jschSetToCart(cart)
  }

  // Clear cart
  function clearCart() {
    cart = [];
    jschSetToCart(cart);
    jschCartItemsRender();
  }