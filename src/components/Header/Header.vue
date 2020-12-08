<template>
    <header class="header">
        <div class="header__inner">
            <router-link to="/" class="header__logo">
                <SvgIcon class="header__logo-pic" name="logo" title="Логотип &laquo;Нужна помощь&raquo;"></SvgIcon>
            </router-link>
            <div class="header__person">
                <div class="header__avatar" v-if="user">
                    <img class="header__avatar-pic" :src="user.avatar" alt="Аватар">
                </div>
                <p class="header__name" v-if="user">{{ user.name }}</p>
            </div>
        </div>
    </header>
</template>

<script src="./Header.js"></script>
<style src="./Header.sass" lang="sass"></style>
