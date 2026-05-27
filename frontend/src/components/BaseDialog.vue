<template>
  <div class="backdrop">
    <dialog open class="dialog-box">
      <h2>Delete Item</h2>

      <p>
        Are you sure you want to delete this item?
      </p>

      <div class="but">
        <button class="cancel" @click="$emit('cancel')">
          Cancel
        </button>

        <button class="delete" @click="$emit('confirm')">
          Delete
        </button>
      </div>
    </dialog>
  </div>
</template>

<script>
export default {
  emits: ['confirm', 'cancel']
}
</script>

<style scoped>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100vh;

  background: rgba(0, 0, 0, 0.5);

  display: flex;
  justify-content: center;
  align-items: center;

  z-index: 1000;
}

.dialog-box {
  border: 1px solid #222;

  padding: 2rem;

  width: 400px;

  text-align: center;

  box-shadow: 0 10px 25px rgba(0,0,0,0.3);
}

.but {
  margin-top: 1.5rem;

  display: flex;
  justify-content: center;
  gap: 1rem;
}

button {
  border: 1px solid #222;
  padding: 10px 18px;

  cursor: pointer;

  color: white;
  font-weight: bold;
}

.cancel {
  background: gray;
}

.delete {
  background: #222;
}
</style>