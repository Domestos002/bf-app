<template>
    <div class="menu" :class="{ 'menu--collapsed': collapsed }" ref="menu">
        <div class="menu__inner">
            <div class="menu__collapse-btn" @click="toggleMenu">
                <SvgIcon :name="burgerIcon" class="menu__collapse-icon"></SvgIcon>
                <p class="menu__collapse-text">Свернуть меню</p>
            </div>
            <div class="menu__list">
                <router-link to="/" class="menu__item">
                    <SvgIcon name="list" class="menu__item-icon"></SvgIcon>
                    <p class="menu__item-text">Заявки на верификацию</p>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script src="./Menu.js"></script>
<style src="./Menu.sass" lang="sass"></style>
