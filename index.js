document.addEventListener('DOMContentLoaded', () => {
    const btnCart = document.querySelector('.container-cart-icon');
    const containerCartProducts = document.querySelector('.container-cart-products');
    const rowProduct = document.querySelector('.row-product');
    const productList = document.querySelector('.container-items');
    const countProducts = document.querySelector('#contador-productos');
    const totalElement = document.querySelector('.total-pagar');

    let allProducts = [];

    btnCart.addEventListener('click', () => {
        containerCartProducts.classList.toggle('hidden-cart');
    });

    productList.addEventListener('click', e => {
        if(e.target.classList.contains('btn-add-cart')){
            const product = e.target.parentElement;
            const title = product.querySelector('h2').textContent;
            const price = product.querySelector('p').textContent;

            const existingProduct = allProducts.find(
                product => product.title === title
            );

            if(existingProduct){
                existingProduct.quantity++;
            } else {
                allProducts.push({
                    quantity: 1,
                    title: title,
                    price: price
                });
            }

            showHTML(); 
        }
    });

    const showHTML = () => {
        rowProduct.innerHTML = '';

        let total = 0;
        let totalOfProducts = 0;

        allProducts.forEach(product => {
            const containerProduct = document.createElement('div');
            containerProduct.classList.add('cart-product');

            containerProduct.innerHTML = `
                <div class="info-cart-product">
        <div class="cart-product-imagen">
            <imagen src="imagen/${product.title.toLowerCase().replace(/\s/g, '')}.jpg" alt="${product.title}">
        </div>
        <div class="cart-product-info">
            <span class="cantidad-producto-carrito">${product.quantity}</span>
            <p class="titulo-producto-carrito">${product.title}</p>
            <span class="precio-producto-carrito">${product.price}</span>
        </div>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
`;

            rowProduct.append(containerProduct);

            const price = Number(product.price.replace('Q', ''));
            total += price * product.quantity;
            totalOfProducts += product.quantity;
        });

        countProducts.innerText = totalOfProducts;
        totalElement.innerText = `Q${total}`;
    };

    rowProduct.addEventListener('click', e => {
        if(e.target.classList.contains('icon-close')){
            const product = e.target.closest('.cart-product');
            const title = product.querySelector('.titulo-producto-carrito').textContent;
            
            allProducts = allProducts.filter(
                product => product.title !== title
            );
            
            showHTML();
        }
    });
});