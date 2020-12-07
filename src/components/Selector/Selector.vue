<template>
    <div class="selector" :class="{'selector--opened': isOpened}">
        <!-- элемент для открытия селекта через tab -->
        <div class="selector__filler" contentEditable @focus="onFocus" @blur="onBlur"></div>

        <div class="selector__single-wrapper">
            <input :id="id" readonly tabindex="-1" class="selector__single" ref="input"
                   :value="currentSelected"
                   @click="onClick">
            <div class="selector__arrow">
                <SvgIcon name="arrow" class="selector__arrow-icon" />
            </div>
        </div>

        <div class="selector__dropdown" v-if="isOpened">
            <div class="selector__list" @click="itemsClick">
                <div class="selector__item"
                     :class="item.active ? 'selector__item--active' : ''"
                     :data-id="item.id" :key="item.id" v-for="item in optionsArr">
                    {{ item.val }}
                </div>
            </div>
        </div>
    </div>
</template>

<style src="./Selector.sass" lang="sass"></style>
<script src="./Selector.js"></script>
