<template>
    <div>
        <TransitionGroup class="toast" name="toast" tag="div" appear>
            <div class="toast__message toast__message--show"
                 :class="'toast__message--' + item.type"
                 v-for="item in messages" :key="item.id">
                <div class="toast__body">
                    {{ item.message }}
                </div>
            </div>
        </TransitionGroup>
    </div>
</template>

<style src="./Toast.sass" lang="sass"></style>
<script src="./Toast.js"></script>
