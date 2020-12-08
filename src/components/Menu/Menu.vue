<template>
    <aside class="menu" :class="{ 'menu--collapsed': collapsed }" ref="menu">
        <div class="menu__inner">
            <button class="menu__collapse-btn" @click="toggleMenu">
                <SvgIcon :name="burgerIcon" class="menu__collapse-icon"></SvgIcon>
                <p class="menu__collapse-text">Свернуть меню</p>
            </button>
            <nav class="menu__list">
                <router-link to="/" class="menu__item">
                    <SvgIcon name="list" class="menu__item-icon"></SvgIcon>
                    <p class="menu__item-text">Заявки на верификацию</p>
                </router-link>
            </nav>
        </div>
    </aside>
</template>

<script src="./Menu.js"></script>
<style src="./Menu.sass" lang="sass"></style>
