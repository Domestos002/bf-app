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
        this.collapseOnMobile();

        window.addEventListener('resize', () => {
            this.getWindowWidth();
            this.collapseOnMobile();
        })
    },

    computed: {
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
            this.$emit('toggleMenu');
        },

        collapseOnMobile() {
            if(this.isMobile && !this.collapsed) {
                this.$emit('toggleMenu');
            }
        },

        getWindowWidth() {
            this.windowWidth = window.innerWidth;
        },
    }
}
