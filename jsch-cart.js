
jschRenderCartPanels();
jschRenderCart();

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
        let productId=cartPanels[i].getAttribute('productId');
        cartPanels[i].innerHTML=jschProductCartPanel(productId);
    }

    var cartButtons=document.getElementsByClassName('jsch-to-cart');
    for (let i = 0; i < cartButtons.length; i++) {
        cartButtons[i].onclick = function(e) {
            let prodId=e.target.parentElement.getAttribute('productId');
            addItemToCart(prodId,1);
            console.log(jschGetFromCart());
        }
    }
    
    var cartButtons=document.getElementsByClassName('jsch-cart-increase');
    for (let i = 0; i < cartButtons.length; i++) {
        cartButtons[i].onclick = function(e) {
            let prodId=e.target.parentElement.getAttribute('productId');
            setCountForItem(prodId,1);
            console.log(jschGetFromCart());
        }
    }
    
    var cartButtons=document.getElementsByClassName('jsch-cart-decrease');
    for (let i = 0; i < cartButtons.length; i++) {
        cartButtons[i].onclick = function(e) {
            let prodId=e.target.parentElement.getAttribute('productId');
            setCountForItem(prodId,-1);
            console.log(jschGetFromCart());
        }
    }        
    
}

function jschProductCartPanel(productId) {
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
    createdDiv.innerHTML+=jschCartClose();
}

function jschCartClose() {
    return `<div class='jschCartClose'><span id='jsch-cart-close-x'>&#9932;</span></div>`;
}

function jschRefreshCart() {
    let menuelement=document.getElementById('jsch-cart');    
    if(menuelement) {
        jschToggleCart(menuelement,'jsch-hidden-cart');
        return;
    }
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

function jschSetCart(id,num) {

    var arr=[];

    arr={'id': id,'q': num};


    var obj=jschGetFromCart();
    console.log(arr);
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
    i=0;
    for(var i in cart) {
      if (cart[i].id === id) {
        cart[i].count = count;
        break;
      }
      i++;
    }
  };
  // Remove item from cart
  function removeItemFromCart(name) {
      i=0;
      for(var i in cart) {
        if(cart[i].name === name) {
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
  function removeItemFromCartAll(name) {
    i=0;
    for(var i in cart) {
      if(cart[i].name === name) {
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
  }