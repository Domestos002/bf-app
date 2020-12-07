import {eventDelegate} from "../../helpers";
import SvgIcon from "../SvgIcon/SvgIcon";

export default {
    props: {
        valuePropName: {
            type: String,
            default: 'val'
        },

        value: {
            type: String | Array,
            default: '' | []
        },

        options: {
            type: Array,
            default: []
        },

        id: {
            type: String,
            default: ''
        }
    },

    data() {
        return {
            isOpened: false,
            isFocused: false,
            optionsArr: [{id: 0, val: '', active: true}]
        }
    },

    components: {
        SvgIcon
    },

    mounted() {
        //если произошел клик вне селекта
        document.addEventListener('click', e => {
            if(!e.target.matches('.selector__single') && !e.target.matches('.selector__item')) {
                this.close()
            }
        });
    },

    watch: {
        options: {
            handler() {
                this.updateOptions();
                this.updateSelected();
            },
            immediate: true
        },

        value: {
            handler(newVal) {
                this.selectOption({ val: newVal });
            },
            immediate: true
        }
    },

    computed: {
        active() {
            return this.optionsArr.find(el => el.active)
        },
        currentSelected() {
            return this.active.val
        }
    },

    methods: {
        updateSelected() {
            let id = this.value.id != null ? this.value.id : 0;
            this.selectOption({ id: id});
        },

        updateOptions() {
            if(this.options.length === 0) {
                return false;
            }

            let isValEmpty = !(this.value && this.value.length > 0);

            this.optionsArr = this.options.map((el,index) => {
                let id = el.hasOwnProperty('id') ? el.id : index;

                return {
                    id: id,
                    active: isValEmpty ? index === 0 : this.value.id === el.id,
                    val: typeof el === 'object' ? el[this.valuePropName] : el
                }
            })
        },

        updateValue() {
            let data = {id: this.active.id};
                data[this.valuePropName] = this.active.val;

            this.$emit('input', data);
        },

        selectOption({ id, val}){
            let el;

            if(id != null) {
                el = this.optionsArr.find(el => el.id === id)
            } else {
                el = this.optionsArr.find(el => el.val === val[this.valuePropName])
            }

            if(el == null) {
                return false;
            }

            if(this.active.id !== el.id) {
                this.active.active = false;
                el.active = true;
            }
        },

        onFocus() {
            this.isFocused = true;
            this.toggleOpened();
        },

        onClick() {
            //предупреждение повторного открытия и закрытия,
            // в случае активации селекта через tab
            if(!this.isFocused) {
                this.toggleOpened();
            }

            this.isFocused = false
        },

        onBlur(e) {
            if(e.relatedTarget != null) {
                this.close();
            }
        },

        toggleOpened() {
            this.isOpened = !this.isOpened;
        },

        close() {
            if(this.isOpened) {
                this.isOpened = false
            }
        },

        itemsClick(e) {
            eventDelegate(e, '.selector__item', target => {
                this.isFocused = false;

                this.selectOption({id: parseInt(target.dataset.id)});

                this.updateValue();

                this.close();
            });
        }
    }
};
