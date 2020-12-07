import SvgIcon from '@components/SvgIcon/SvgIcon.vue'

export default {
    name: "Menu",
    props: {
        collapsed: {
            type: Boolean,
            default: false
        }
    },

    data() {
        return {
            windowWidth: 0,
        }
    },

    components: {
        SvgIcon
    },


    mounted() {
        this.getWindowWidth();
        this.collapseOnTabletOrLess();

        window.addEventListener('resize', () => {

            this.getWindowWidth();
            this.collapseOnTabletOrLess();
        })
    },

    computed: {
        isTabletOrLess() {
            return this.windowWidth <= 1023
        },

        isTablet() {
            return this.windowWidth <= 1023
                && this.windowWidth >= 576;
        },

        isMobile() {
            return this.windowWidth <= 575;
        },

        burgerIcon() {
            let icon = this.isMobile ? 'close' : 'back';
            return this.collapsed ? 'burger' : icon;
        }
    },

    watch: {
        collapsed() {
            if(this.isMobile) {
                if(this.collapsed) {
                    document.body.classList.remove('ovh');
                } else {
                    document.body.classList.add('ovh');
                }
            }
        }
    },

    methods: {
        toggleMenu() {
            if(!this.isTablet) {
                this.$emit('toggleMenu');
            }
        },

        collapseOnTabletOrLess() {
            if(this.isTabletOrLess && !this.collapsed) {
                this.$emit('toggleMenu');
            }
        },

        getWindowWidth() {
            this.windowWidth = window.innerWidth;
        },
    }
}
