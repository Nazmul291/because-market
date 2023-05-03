<script>
  import { createEventDispatcher } from "svelte"

  const dispatch = createEventDispatcher()

  const handleCancel = () => dispatch("cancel")
  const handleConfirm = () => dispatch("confirm")
</script>

<div
  class="modal fade s-root"
  tabindex="-1"
  role="dialog"
  aria-labelledby="removeModalLabel"
  aria-hidden="true"
  data-backdrop="static"
  data-keyboard="false"
  style="z-index: 5000"
>
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="removeModalLabel">Confirm Remove</h5>
      </div>
      <div class="modal-body">
        Are you sure you want to remove this item from the cart?
      </div>
      <div class="modal-footer">
        <button
          type="button"
          class="btn btn-secondary btn-cancel-remove"
          data-dismiss="modal"
          on:click={handleCancel}>No</button
        >
        <button
          type="button"
          class="btn btn-primary btn-confirm-remove"
          on:click={handleConfirm}>Yes</button
        >
      </div>
    </div>
  </div>
</div>

<style>
  .s-root {
    display: block;
    background: rgba(0, 0, 0, 0.5);
  }

  .modal-dialog {
    transform: translateY(0) !important;
  }
</style>
