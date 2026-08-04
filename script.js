const targets = document.querySelectorAll(".fadeUp");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
});

/*nav */
targets.forEach((target) => observer.observe(target));

const hamburger = document.querySelector(".header__hamburger");
const menu = document.querySelector(".header__nav");

hamburger.addEventListener("click", () => {
    menu.classList.toggle("open");
});

/*header home*/
/*swiper */
const swiperElement = document.querySelector(".swiper");

if (swiperElement) {
    const swiper = new Swiper(".swiper", {
        effect: "fade",
        loop: true,

        speed: 1200,

        fadeEffect: {
            crossFade: true,
        },

        autoplay: {
            delay: 4000,
            disableOnInteraction: false,
        },
    });
}

/*商品カート */

/*ローカルストレージ */
const cartBtn = document.querySelector(".cart-btn");

if (cartBtn) {
    cartBtn.addEventListener("click", () => {
        const name = document.querySelector("#product-name").textContent.trim();

        const price = document.querySelector("#product-price").textContent.replace(/[^0-9]/g, "");

        const select = document.querySelector(".gift__select");

        let option = "";
        let quantity = 1;

        if (select.id === "gift-quantity") {
            quantity = Number(select.value);
        } else {
            option = select.value;
        }

        const cartItem = {
            name: name,
            price: Number(price),
            option: option,
            quantity: Number(quantity),
        };

        // すでにあるカートを取得
        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        // 商品を追加
        cart.push(cartItem);

        // 保存
        localStorage.setItem("cart", JSON.stringify(cart));

        console.log(cart);

        alert("カートに追加しました");
    });
}

/*カートページ */
const cartArea = document.querySelector(".cart-item");

if (cartArea) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    const totalPrice = document.querySelector("#total-price");

    function displayCart() {
        cartArea.innerHTML = "";

        let total = 0;

        cart.forEach((item, index) => {
            total += item.price * item.quantity;

            const div = document.createElement("div");

            div.innerHTML = `
                <p>${item.name}</p>
                <p>￥${item.price}</p>
                <p>${item.option}</p>

                <div class="cart-flex">
                <button class="minus" data-index="${index}">
                    －
                </button>

                <span>${item.quantity}</span>

                <button class="plus" data-index="${index}">
                    ＋
                </button>

                <button class="delete" data-index="${index}">
                    削除
                </button>
                <div>
            `;

            cartArea.appendChild(div);
        });

        totalPrice.textContent = total;

        localStorage.setItem("cart", JSON.stringify(cart));
    }

    displayCart();

    // ボタン操作
    cartArea.addEventListener("click", (e) => {
        const index = e.target.dataset.index;

        if (e.target.classList.contains("plus")) {
            cart[index].quantity++;
        }

        if (e.target.classList.contains("minus")) {
            if (cart[index].quantity > 1) {
                cart[index].quantity--;
            }
        }

        if (e.target.classList.contains("delete")) {
            cart.splice(index, 1);
        }

        displayCart();
    });
}

/*モーダル */
const checkoutButton = document.querySelector("#checkout-button");
const modal = document.querySelector("#checkout-modal");
const closeButton = document.querySelector("#modal-close");

checkoutButton.addEventListener("click", () => {
    modal.classList.add("active");
});

closeButton.addEventListener("click", () => {
    modal.classList.remove("active");
});
