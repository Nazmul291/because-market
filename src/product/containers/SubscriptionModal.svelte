<script>
  import { getContext, createEventDispatcher } from "svelte"
  import { Price } from "../../sUI"
  import { APP_CONTEXT } from "../../const"

  const { getAssetsUrls, getStore } = getContext(APP_CONTEXT)
  const { logoUrl, productImg } = getAssetsUrls()
  const { product, discount, currentVariant } = getStore()
  const { price } = currentVariant
  const { subscribePrice } = discount

  const dispatch = createEventDispatcher()

  const handleSubscribe = () => dispatch("subscribe")
  const handleCancel = () => dispatch("cancel")
</script>

<div
  class="modal fade s-root"
  tabindex="-1"
  role="dialog"
  aria-labelledby="subscribeModalLabel"
  data-backdrop="static"
  data-keyboard="false"
>
  <div
    class="modal-dialog modal-dialog-centered modal-lg s-modal"
    role="document"
  >
    <div class="modal-content">
      <div class="modal-body">
        <img class="s-logo-image" src={logoUrl} alt="Logo" />
        <h5 class="s-h">SPECIAL OFFER</h5>
        <hr class="s-small-hr" />
        <h2 class="s-h">Subscribe and Save</h2>
        <h5 class="s-h">
          <u>81%</u> of our customers enjoy the convenience of monthly
          deliveries.
          <br class="d-block d-sm-none" />Cancel anytime.
        </h5>
        <div class="container-fluid justify-content-center s-main-body">
          <div class="row">
            <div class="s-product-img col-12 col-lg-6">
              <img src={productImg} alt="Product" />
            </div>
            <div class="col-12 col-lg-6">
              <div class="s-info-container">
                <div class="row">
                  <span class="s-title">{$product.title}</span>
                </div>
                <div class="row">
                  <span class="s-onetimeprice"><Price amount={$price} /></span>
                  <span class="s-subscriptionprice"
                    ><Price amount={$subscribePrice} /></span
                  >
                </div>
                <div class="row">
                  <button
                    class="btn btn-lg s-btn-subscribe"
                    on:click={handleSubscribe}>Subscribe and Save</button
                  >
                </div>
                <div class="row">
                  <a
                    class="cancel"
                    href={"#"}
                    on:click|preventDefault={handleCancel}
                    >No thanks, continue to cart</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .s-root {
    text-align: center;
    display: block;
    background: rgba(0, 0, 0, 0.5);
  }

  @media screen and (max-width: 500px) {
    .s-root {
      height: 100vh;
      max-height: 100vh;
      overflow: scroll;
    }

    .s-modal {
      transform: none !important; /* fix global style */
    }
  }

  .s-info-container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }

  .s-product-img {
    min-height: 400px;
    display: flex;
    align-items: center;
  }

  .s-title {
    color: #566583;
    font-size: 1.2rem;
    font-weight: 600;
    font-family: "Cooper Lt BT W05 Regular";
    width: 70%;
  }

  .row {
    margin-top: 5px;
    margin-bottom: 5px;
    justify-content: center;
  }

  .s-onetimeprice {
    text-decoration: line-through;
    margin-right: 2vw;
    color: gray;
    font-size: 1.5rem;
    font-weight: bold;
  }
  .s-subscriptionprice {
    color: red;
    font-size: 1.5rem;
    font-weight: bold;
  }

  .s-btn-subscribe {
    background-color: rgba(10, 229, 234, 1);
    color: #000;
    border-radius: 25px;
    padding: 1rem 3rem;
    font-weight: bold;
  }

  a.cancel,
  a.cancel:hover,
  a.cancel:visited,
  a.cancel:link {
    color: gray;
  }

  .s-main-body {
    padding-top: 15px;
    padding-bottom: 15px;
  }

  .s-small-hr {
    width: 20%;
    margin: 1rem auto;
  }

  .s-logo-image {
    position: absolute;
    left: 1rem;
    top: 1rem;
    height: 3rem;
  }

  .s-h {
    font-family: "Cooper Lt BT W05 Regular";
    color: #333;
  }
</style>
