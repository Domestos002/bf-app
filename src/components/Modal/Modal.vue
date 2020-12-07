<template>
    <div class="modal" :class="{ 'modal--active': showModal }" v-if="showModal" @click="onClick">
        <div class="modal__dialog">
            <div class="modal__head">
                <p class="modal__title">Назначить координатора</p>
                <div @click="closeModal" class="modal__close">
                    <SvgIcon name="close" class="modal__close-icon" />
                </div>
            </div>
            <div class="modal__inner">
                <Selector
                        valuePropName="full_name"
                        v-model="currentCoordinator"
                        :options="coordinatorList"/>
                <div class="modal__submit">
                    <button class="btn btn--block" @click="onSubmit">Назначить</button>
                </div>
            </div>
        </div>
    </div>
</template>
<style src="./Modal.sass" lang="sass"></style>
<script src="./Modal.js"></script>
