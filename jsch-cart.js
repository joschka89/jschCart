
jschRenderCartPanels();

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
            jschSetCart(prodId,1);
        }
    }
    
    var cartButtons=document.getElementsByClassName('jsch-cart-increase');
    for (let i = 0; i < cartButtons.length; i++) {
        cartButtons[i].onclick = function(e) {
            let prodId=e.target.parentElement.getAttribute('productId');
            jschSetCart(prodId,1);
        }
    }
    
    var cartButtons=document.getElementsByClassName('jsch-cart-decrease');
    for (let i = 0; i < cartButtons.length; i++) {
        cartButtons[i].onclick = function(e) {
            let prodId=e.target.parentElement.getAttribute('productId');
            jschSetCart(prodId,-1);
        }
    }        
    
}

document.getElementById('jsch-cart-btn').onclick = function() {     
        
        let menuelement=document.getElementById('jsch-cart');    
        if(menuelement) {
            jschToggleCart(menuelement,'jsch-hidden-cart');
            return;
        }
        var div = document.createElement("div");
        div.setAttribute("id", "jsch-cart");
        div.setAttribute("class", "jsch-show-animate");
        const createdDiv=document.body.appendChild(div);
        createdDiv.innerHTML+=jschCartClose();
}

function jschToggleCart(element,targetClass) {
    var hasClass=element.classList.contains(targetClass);
    if(hasClass) {
        element.classList.add('jsch-show-animate');
        element.classList.remove('jsch-hide-animate');
        element.classList.remove(targetClass);
    } else { 
        element.classList.add('jsch-hide-animate');      
        element.classList.remove('jsch-show-animate');       
        setTimeout(() =>{
            element.classList.add(targetClass);
        }, 450);                
    }
}

function jschCartClose() {
    return `<div class='jschCartClose'><span id='jsch-cart-close-x'>&#9932;</span></div>`;
}

function jschProductCartPanel(productId) {
    return `
    <button class='jsch-to-cart'>To Cart</button>
    <button class='jsch-cart-increase'>+</button>
    <button class='jsch-cart-decrease'>-</button>`;
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