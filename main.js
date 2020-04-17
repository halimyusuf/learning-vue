Vue.component("product", {
  props: {
    premium: {
      type: String,
      required: true
    }
  },
  template: `
    <div class="product">
    <div class="product-img">
        <img v-bind:src="image" alt="">
    </div>
    <div class="product-info">
        <h1>{{ title }}</h1>
        <!-- we can use v-show to hide the visibility -->
        <p v-if="inStock">In stock</p>
        <p v-else :class="{lineTru : !inStock}">Out of Stock</p>
        <p>shipping: {{ premium }} </p>

        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
        <div v-for="(variant, index) in variants" :key="variant.id" class="color-box"
            v-bind:style="{backgroundColor: variant.variantColor}" @mouseover="updateProduct(index)">
            <p></p>
        </div>

        <button v-on:click="addToCart" v-bind:disabled="!inStock" :class="{ disabledButton : !inStock}">Add to
            cart</button>
        <h3>Reviews  </h3>
        <p v-if="!reviews.length">There are no reviews yet. </p>
        <ul>
            <li v-for="review in reviews">name: {{ review.name }} <p> Review: {{ review.review }} </p> <p> Rating:{{ review.rating }} </p></li>
        </ul>
        <product-review @review-submitted="addReview" />
    </div>
    </div>
    `,

  data() {
    return {
      brand: "Vue Mastery",
      product: "new product",
      selectedVariant: 0,
      reviews: [],
      details: ["80% cotton", "20% polyester", "Gender Neutrel"],
      variants: [
        {
          id: 1,
          variantColor: "green",
          variantImage: "./After-Hours.png",
          variantQty: 0
        },
        {
          id: 2,
          variantColor: "blue",
          variantImage: "./cam_flash.jpg",
          variantQty: 10
        }
      ]
    };
  },

  methods: {
    addToCart() {
      this.$emit("add-to-cart", this.variants[this.selectedVariant].id);
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
    addReview(productReview) {
      this.reviews.push(productReview);
    }
  },
  computed: {
    title() {
      return this.brand + " " + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      return this.variants[this.selectedVariant].variantQty;
    }
  }
});

Vue.component("productDetail", {});

Vue.component("product-review", {
  template: `
    <form class="review-form" @submit.prevent="onSubmit" >
        <ul>
            <li v-for="error in this.errors"> {{ error }} </li>
        </ul>
        <label for="name">Name:</label>
        <input v-model="name">
        <label for="review">Review:</label>
        <textarea v-model="review"> </textarea>
        <label for="ratings">Ratings:</label>
        <select v-model.number="rating" name="" id="">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
        </select>
        <button>Submit</button>
    
    </form >
    `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    };
  },

  methods: {
    onSubmit() {
      if (this.name && this.review && this.rating) {
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating
        };
        this.$emit("review-submitted", productReview);
        this.name = null;
        this.review = null;
        this.rating = null;
      } else {
        if (!this.name) this.errors.push("name is required");
        if (!this.review) this.errors.push("review is required");
        if (!this.rating) this.errors.push("ratings is required");
      }
    }
  }
});

var app = new Vue({
  el: "#app",
  data: {
    premium: true,
    cart: []
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    }
  },
  computed: {
    shipping() {
      if (this.premium) return "Free";
      return "3.5";
    }
  }
});
