<template>
    <div class="header">
        <div class="header__inner">
            <router-link to="/" class="header__logo">
                <SvgIcon class="header__logo-pic" name="logo"></SvgIcon>
            </router-link>
            <div class="header__person">
                <div class="header__avatar">
                    <img class="header__avatar-pic" src="@images/avatar.png" alt="">
                </div>
                <p class="header__name">Иван Иванов</p>
            </div>
        </div>
    </div>
</template>

<script src="./Header.js"></script>
<style src="./Header.sass" lang="sass"></style>
