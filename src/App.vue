<template>
    <div id="app" class="site-wrapper">
        <Header/>
        <div class="content">
            <Menu :collapsed="menuCollapsed" @toggleMenu="toggleMenu"/>
            <main class="main" :class="{ 'main--collapsed': !menuCollapsed }">
                <div class="main__container">
                    <router-view :collapsed="!menuCollapsed"/>
                </div>
            </main>
        </div>
        <footer class="copyright">
            <p class="copyright__text">
                Проект реализуется с использованием гранта Президента РФ на развитие гражданского общества,
                предоставленного
                Фондом президентских грантов
            </p>
        </footer>
        <Toast />
    </div>
</template>

<style src="@styles/base.sass" lang="sass"></style>

<script>
    import Header from '@components/Header/Header.vue'
    import Menu from '@components/Menu/Menu.vue'

    export default {
        name: 'App',
        components: {
            Header,
            Menu
        },
        data() {
            return {
                menuCollapsed: false
            }
        },

        watch: {
            $route() {
                let isMobile = window.innerWidth <= 575;

                if (isMobile && !this.menuCollapsed) {
                    this.menuCollapsed = true;
                }
            }
        },

        methods: {
            toggleMenu() {
                this.menuCollapsed = !this.menuCollapsed;
            }
        }
    }
</script>
